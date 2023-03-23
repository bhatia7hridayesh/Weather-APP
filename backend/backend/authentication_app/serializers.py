from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User
from rest_framework.validators import UniqueValidator

class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
    write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ( 'password', 'password2',
             'email', 'full_name')
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs
    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            full_name=validated_data['full_name']
            )
        user.set_password(validated_data['password'])
        user.save()
        return user

class AddToFavourites(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['favourites']
    