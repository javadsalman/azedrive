from django.urls import path, re_path
from . import views

urlpatterns = [
    path('filelist/', views.FileListAV.as_view(), name='file-lsit'),
    path('filelist/<int:pk>/', views.FileDetailAV.as_view(), name='file-detail'),
    re_path(r'^upload/(?P<pk>\d+)/(?P<filename>[^/]+)/$', views.FileUploadView.as_view(), name='file-upload'),
    path('download/<int:pk>/', views.download, name='download'),
    path('folderlist/', views.FolderListAV.as_view(), name='folder-list'),
    path('folderlist/<int:pk>/', views.FolderDetailAV.as_view(), name='folder-detail'),
    path('commentlist/', views.CommentListAV.as_view(), name='comment-list'),
    path('commentlist/<int:pk>/', views.CommentDetailAV.as_view(), name='comment-detail'),
]