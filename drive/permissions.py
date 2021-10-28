from rest_framework import permissions

class IsAuthorOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.author

class IsAuthorOrSharedReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return request.user == obj.author or request.user in obj.shared_users.all()
        else:
            return request.user == obj.author

class IsAuthorOrSharedDeleteAndReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ['GET', 'DELETE']:
            return request.user == obj.author or request.user in obj.shared_users.all()
        else:
            return request.user == obj.author

class IsAuthorOrShared(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.author or request.user in obj.shared_users.all()

class CommentDetailPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'DELETE':
            return request.user == obj.author or request.user == obj.file.author
        elif request.method in ['PUT', 'PATCH']:
            return request.user == obj.author
        else:
            return True