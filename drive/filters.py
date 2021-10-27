from django_filters import rest_framework as filters
from .models import File, Folder


class FileFilter(filters.FilterSet):
    parentFolderNull = filters.BooleanFilter(field_name='folder', lookup_expr='isnull')
    parentFolder = filters.NumberFilter(field_name='folder')
    staredUser = filters.NumberFilter(field_name='stared_users')
    class Meta:
        model = File
        fields = ['author', 'deleted', 'users']


class FolderFilter(filters.FilterSet):
    parentFolderNull = filters.BooleanFilter(field_name='folder', lookup_expr='isnull')
    parentFolder = filters.NumberFilter(field_name='folder')
    class Meta:
        model = Folder
        fields = ['author', 'stared', 'deleted']