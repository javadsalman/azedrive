from rest_framework import permissions

# only authors have permission for any action
class IsAuthorOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.author

# author have any permission and shared user can only send get request
class IsAuthorOrSharedReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return request.user == obj.author or request.user in obj.shared_users.all()
        else:
            return request.user == obj.author

# author have any permission and shared user can send get and delete request
class IsAuthorOrSharedDeleteAndReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ['GET', 'DELETE']:
            return request.user == obj.author or request.user in obj.shared_users.all()
        else:
            return request.user == obj.author

# author and shared user have all permissions
class IsAuthorOrShared(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.author or request.user in obj.shared_users.all()

# special permission for comment detail. Only comment author can update his comment but file author can remove either him
# or shared user comments
class CommentDetailPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'DELETE':
            return request.user == obj.author or request.user == obj.file.author
        elif request.method in ['PUT', 'PATCH']:
            return request.user == obj.author
        else:
            return True