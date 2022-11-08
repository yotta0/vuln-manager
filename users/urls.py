from django.urls import path, include
from .views import (
    CreateUserView, LoginView, UpdatePasswordView, CustomUserView, 
    UserActivitiesView, UsersView
)

from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)

router.register('create-user', CreateUserView, 'create user')
router.register('login', LoginView, 'login')
router.register('update-password', UpdatePasswordView, 'update password')
router.register('me', CustomUserView, 'me')
router.register('activities', UserActivitiesView, 'activities')
router.register('users', UsersView, 'users')

urlpatterns = [
    path('', include(router.urls)),
]