from django.db import models
from django.contrib.auth.models import User
from mimetypes import guess_type
from .utils import detect_file_type, file_direcotory_path

# Create your models here.

class Folder(models.Model):
    name = models.CharField(max_length=100)
    folder = models.ForeignKey('self', null=True, on_delete=models.CASCADE, related_name='folder_set')
    stared = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    deleted = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created']

class File(models.Model):
    name = models.CharField(max_length=100)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, null=True, related_name='file_set')
    stared_users = models.ManyToManyField(User, related_name='stared_files', blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    deleted = models.BooleanField(default=False)
    type = models.CharField(max_length=10, default='undefined')
    mime_type = models.CharField(max_length=100, null=True, blank=True)
    comment_on = models.BooleanField(default=True)
    description = models.CharField(max_length=150, null=True, blank=True)
    shared_users = models.ManyToManyField(User, related_name='shared_files')
    size = models.FloatField()
    created = models.DateTimeField(auto_now_add=True)
    file_object = models.FileField(upload_to=file_direcotory_path)

    def save(self, *args, **kwargs):
        self.type = detect_file_type(self.name)
        self.mime_type = guess_type(self.name)[0]
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['created']

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ['-created']

    