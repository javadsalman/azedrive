from rest_framework import generics, views, parsers, status
from rest_framework.response import Response
from django.conf import settings
from django.http import HttpResponse, Http404
from django.shortcuts import get_object_or_404
from os.path import join, exists
from pathlib import Path
from .models import File, Folder, Comment
from .serializers import FileListSerializer, FileDetailSerializer, FolderSerializer, CommentSerializer

# Create your views here.
class FileListAV(generics.ListCreateAPIView):
    queryset=File.objects.all()
    serializer_class = FileListSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class FileDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset=File.objects.all()
    serializer_class = FileDetailSerializer

class FileUploadView(views.APIView):
    parser_classes = [parsers.FileUploadParser]

    def put(self, request, pk, filename, format=None):
        file_data = request.data['file']
        file_instance = File.objects.get(pk=pk)
        directory = join(
            str(file_instance.author.id),
            str(file_instance.folder and file_instance.folder.id)
        )
        full_directory = join(settings.MEDIA_ROOT, directory)
        full_path = join(full_directory, filename)
        media_inner_path = join(directory, filename)
        
        Path(full_directory).mkdir(parents=True, exist_ok=True)
        with open(full_path, mode='wb+') as file:
            for chunk in file_data.chunks():
                file.write(chunk)

        # print('\n\n\n\n', file_path, '\n\n\n\n')
        file_instance.file_object.name = media_inner_path
        file_instance.save()
        
        return Response(status=204)

def download(request, pk):
    instance = get_object_or_404(File, pk=pk)
    file_path = instance.file_object.path
    print('\n\n\n\n', file_path, '\n\n\n\n')

    if exists(file_path) and "(instance.author == request.user or request.user in instance.users.all())":
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type=instance.mime_type)
            response['Content-Disposition'] = 'attachment; filename=' + instance.name
            return response
    raise Http404

class FolderListAV(generics.ListCreateAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class FolderDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer


class CommentListAV(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer