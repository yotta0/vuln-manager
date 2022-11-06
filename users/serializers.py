from rest_framework import serializers
from .models import CustomUser, Roles


class CreateUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    full_name = serializers.CharField()
    role = serializers.ChoiceField(choices=Roles)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(required=False)
    is_new_user = serializers.BooleanField(default=False, required=False)


class UpdatePasswordSerializer(serializers.Serializer):
    password = serializers.CharField()
    user_id = serializers.CharField()
