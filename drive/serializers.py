from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Folder, File, Comment


class FileListSerializer(serializers.ModelSerializer):
    stared = serializers.SerializerMethodField()
    class Meta:
        model = File
        fields = ['id', 'name', 'folder', 'description', 'type', 'size', 'stared', 'deleted', 'file_object']
        read_only_fields = ['id', 'type']
        extra_kwargs = {
            'description': {'write_only': True},
            'folder': {'write_only': True},
            'description': {'write_only': True},
            'size': {'write_only': True},
            'deleted': {'write_only': True},
            'file_object': {'write_only': True},
        }

    def create(self, validated_data):
        file = File.objects.create(
            **validated_data,
            author = self.context['request'].user
        )
        return file

    def get_stared(self, obj):
        return self.context['request'].user in obj.stared_users.all()

    def validate(self, data):
        user = self.context['request'].user
        folder = data['folder']
        name = data['name']
        if File.objects.filter(author=user, folder=folder, name=name):
            raise serializers.ValidationError(f'{name} adlı fayl mövcuddur!')
        return data

class FileDetailSerializer(serializers.ModelSerializer):
    downloadUrl = serializers.HyperlinkedIdentityField(view_name='download', read_only=True)
    created = serializers.DateTimeField(format='%d.%m.%Y', read_only=True)
    stared = serializers.SerializerMethodField()
    username = serializers.CharField(source='author.username')
    folderName = serializers.SerializerMethodField()
    commentOn = serializers.BooleanField(source='comment_on')

    class Meta:
        model = File
        fields = ['author', 'downloadUrl', 'id', 'name', 'stared', 'username', 'folder', 'deleted', 'folderName', 'description', 'size', 'type', 'commentOn', 'created']
        read_only_fields = ['id', 'created', 'author']

    def get_stared(self, obj):
        return self.context['request'].user in obj.stared_users.all()

    def get_folderName(self, obj):
        folder = obj.folder
        return folder.name if folder else None

class SharedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']
        read_only_fields = ['id', 'username']


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        exclude = ['author', 'created']
        read_only_fields = ['id']
        extra_kwargs = {
            'folder': {'write_only': True},
            'deleted': {'write_only': True},
        }

    def create(self, validated_data):
        folder = Folder.objects.create(
            **validated_data,
            author = self.context['request'].user
        )
        return folder

    def validate(self, data):
        user = self.context['request'].user
        folder = data.get('folder')
        name = data.get('name')
        if File.objects.filter(author=user, folder=folder, name=name):
            raise serializers.ValidationError(f'{name} adlı fayl mövcuddur!')
        return data

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='author.username', required=False)
    class Meta:
        model = Comment
        exclude = ['created']
        read_only_fields = ['author', 'created', 'username']
        extra_kwargs = {
            'file': {'write_only': True, 'required': False}
        }