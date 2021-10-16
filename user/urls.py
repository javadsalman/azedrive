from django.http.response import HttpResponse
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import RegisterUserView, login_view, logout_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('register/', RegisterUserView.as_view(), name='register'),
]
