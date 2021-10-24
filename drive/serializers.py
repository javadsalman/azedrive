from django.db.models import fields
from rest_framework import serializers
from .models import Folder, File, Comment

class FileListSerializer(serializers.ModelSerializer):
    stared = serializers.SerializerMethodField()
    class Meta:
        model = File
        fields = ['id', 'name', 'folder', 'description', 'type', 'size', 'stared', 'deleted']
        read_only_fields = ['id', 'type']
        extra_kwargs = {
            'description': {'write_only': True}
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
    download_url = serializers.HyperlinkedIdentityField(view_name='download', read_only=True)
    created = serializers.DateTimeField(format='%d-%m-%Y')
    class Meta:
        model = File
        exclude = ['folder', 'description', 'stared_users', 'deleted', 'file_object', 'mime_type']
        read_only_fields = ['id', 'created']


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        exclude = ['author']
        read_only_fields = ['id']

    def create(self, validated_data):
        folder = Folder.objects.create(
            **validated_data,
            author = self.context['request'].user
        )
        return folder

    def validate(self, data):
        user = self.context['request'].user
        folder = data['folder']
        name = data['name']
        if File.objects.filter(author=user, folder=folder, name=name):
            raise serializers.ValidationError(f'{name} adlı fayl mövcuddur!')
        return data

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'