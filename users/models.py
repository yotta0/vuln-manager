from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)

roles = (('admin', 'admin'), ('user', 'user'), ('reporter', 'reporter'))

class CustomUserManager(BaseUserManager):
    """Custom superuser model
    """
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 'admin')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        if not email:
            raise ValueError('The Email must be set')

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    """Custom user model
    """
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=8, choices=roles)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(null=True)

    USERNAME_FIELD = 'email'
    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
    class Meta:
        ordering = ('created_at',)