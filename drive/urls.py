from django.urls import path
from . import views

urlpatterns = [
    path('filelist/', views.FileListAV.as_view(), name='file-lsit'),
    path('filelist/<int:pk>/', views.FileDetailAV.as_view(), name='file-detail'),
    path('filelist/<int:pk>/filestar/', views.file_star, name='file-star'),
    path('filelist/<int:pk>/sharedusers/', views.ShareView.as_view(), name='shared-users'),
    path('filelist/<int:filepk>/commentlist/', views.CommentListAV.as_view(), name='shared-users'),
    path('filelist/<int:filepk>/commentlist/<int:pk>/', views.CommentDetailAV.as_view(), name='shared-users'),
    path('download/<int:pk>/', views.download, name='download'),
    path('folderlist/', views.FolderListAV.as_view(), name='folder-list'),
    path('folderlist/<int:pk>/', views.FolderDetailAV.as_view(), name='folder-detail'),
    path('commentlist/', views.CommentListAV.as_view(), name='comment-list'),
    path('commentlist/<int:pk>/', views.CommentDetailAV.as_view(), name='comment-detail'),
    path('totalsize/', views.total_size, name='total-size'),
]