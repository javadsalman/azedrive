from django.contrib.auth.models import User
from django.db.models.aggregates import Sum
from rest_framework import generics, views, parsers, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django_filters.rest_framework import DjangoFilterBackend
from django.http import HttpResponse, Http404
from django.shortcuts import get_object_or_404
from os.path import exists
from re import compile

from .filters import FileFilter, FolderFilter
from .models import File, Folder

from .permissions import (
    CommentDetailPermission, 
    IsAuthorOrShared, 
    IsAuthorOrSharedReadOnly, 
    IsAuthorOnly, 
    IsAuthorOrSharedDeleteAndReadOnly
)
from .serializers import (
    FileListSerializer, 
    FileDetailSerializer, 
    FolderSerializer, 
    CommentSerializer,
    SharedUserSerializer
)

# Create your views here.


class FileListAV(generics.ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = FileFilter
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    total_size_limit_mb = 500
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        # pass the request in context for use request also in serializer class
        serializer = self.get_serializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def create(self, request):
        # get sum of size column
        total_size = self.queryset.aggregate(total_size = Sum('size'))['total_size']
        # convert that value to megabyte to find total size
        total_size_mb = total_size / 1048576 if total_size else 0
        # get uploaded file size
        file_size = int(request.data.get('size', 0))
        # convert that value to megabyte
        file_size_mb = file_size / 1048576 if file_size else 0
        # if total size + file size bigger thant total size limit then raise error
        if (total_size_mb + file_size_mb) > self.total_size_limit_mb:
            return Response(
                {'detail': f'{self.total_size_limit_mb}mb ölçü limiti keçildiyi üçün fayl qəbul edilmədi!'},
                status=status.HTTP_405_METHOD_NOT_ALLOWED
            )
        request.data['folder'] = request.data['folder'] if request.data['folder'] != 'null' else None
        serializer = self.serializer_class(data=request.data, context={'request': request})

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class FileDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset=File.objects.all()
    serializer_class = FileDetailSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrSharedDeleteAndReadOnly]

    # if file deleting for first time then set the deleted property to true if it's second time then delete that model instance
    # if it's shared file then delete request user from shared users list
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user == instance.author:
            if instance.deleted:
                instance.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                instance.deleted = True
                instance.save()
                return Response(data=self.get_serializer(instance=instance).data, status=status.HTTP_202_ACCEPTED)
        elif request.user in instance.shared_users.all():
            instance.shared_users.remove(request.user)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

# view for download the file
def download(request, pk):
    instance = get_object_or_404(File, pk=pk)
    file_path = instance.file_object.path
    if exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type=instance.mime_type)
            response['Content-Disposition'] = 'attachment; filename=' + instance.name
            return response
    raise Http404

# get total size used size and limit
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def total_size(request):
    queryset = File.objects.filter(author=request.user)
    result_size = queryset.aggregate(total_size = Sum('size'))['total_size']
    result = (result_size / 1048576) if result_size else 0
    return Response({'totalSize': round(result, 2), 'totalSizeLimit': FileListAV.total_size_limit_mb})

# make file stared or unstared
@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def file_star(request, pk):
    file = get_object_or_404(File, pk=pk)
    if request.user == file.author or request.user in file.shared_users.all():
        pass
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)
    should_be_stared = request.data.get('stared')
    if not should_be_stared and file in request.user.stared_files.all():
        file.stared_users.remove(request.user)
    elif should_be_stared:
        file.stared_users.add(request.user)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    file.save()
    serializer = FileDetailSerializer(instance=file, context={'request': request})
    return Response(data=serializer.data ,status=status.HTTP_202_ACCEPTED)

# get shared users of file or delete and add the one
class ShareView(views.APIView):
    mail_compiler = compile(r'^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
    username_compiler = compile(r'^\w+$')
    permission_classes = [permissions.IsAuthenticated, IsAuthorOnly]

    def get_user(self, input_text):
        if self.mail_compiler.match(input_text):
            user_kwarg = {'email': input_text}
        elif self.username_compiler.match(input_text):
            user_kwarg = {'username': input_text}
        else:
            return None

        return User.objects.filter(**user_kwarg).first()


    def get(self, request, pk):
        instance = get_object_or_404(File, pk=pk)
        self.check_object_permissions(request, instance)
        serializer = SharedUserSerializer(instance=instance.shared_users, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        input_text = request.data.get('input', '')
        new_user = self.get_user(input_text)
        if request.user == new_user:
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        if not new_user: 
            return Response(data={'detail': 'Istifadəçi tapılmadı!'}, status=status.HTTP_404_NOT_FOUND)
        instance = get_object_or_404(File, pk=pk)
        self.check_object_permissions(request, instance)
        instance.shared_users.add(new_user)
        serializer = SharedUserSerializer(instance=new_user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        user_list = request.data.get('deletedUsers', [])
        instance = get_object_or_404(File, pk=pk)
        self.check_object_permissions(request, instance)
        instance.shared_users.remove(*user_list)
        instance.stared_users.remove(*user_list)
        serializer = SharedUserSerializer(instance=instance.shared_users, many=True)
        return Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)


class FolderListAV(generics.ListCreateAPIView):
    serializer_class = FolderSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = FolderFilter
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Folder.objects.filter(author=self.request.user)

    def create(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class FolderDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrSharedReadOnly]

    # if deleted property is false then make it true, if it's true already then delete model instance
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.check_object_permissions(request, instance)
        if instance.deleted:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            instance.deleted = True
            instance.save()
            return Response(data=self.get_serializer(instance=instance).data, status=status.HTTP_202_ACCEPTED)


class CommentListAV(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrShared]

    # get queryset based on spesific file comments
    def get_queryset(self):
        filepk = self.kwargs.get('filepk')
        file = get_object_or_404(File, pk=filepk)
        self.check_object_permissions(self.request, file)
        return file.comment_set.all()

    # get file pk from url and user from request and create new comment with them
    def create(self, request, filepk):
        file = get_object_or_404(File, pk=filepk)
        if not file.comment_on:
            return Response({'detail': 'Bu faylın şərhləri bağlıdır'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(file=file, author=request.user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

class CommentDetailAV(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, CommentDetailPermission]

    def get_queryset(self):
        filepk = self.kwargs.get('filepk')
        file = get_object_or_404(File, pk=filepk)
        return file.comment_set.all()