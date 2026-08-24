from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User
from .models import RecoverCode

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile_picture', 'role', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self,data):
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("El correo ya está en uso.")
        
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("El nombre de usuario ya está en uso.")
        
        if len(data['password']) < 8:
            raise serializers.ValidationError("La contraseña debe tener al menos 8 caracteres.")
        
        if not any(char.isdigit() for char in data['password']):
            raise serializers.ValidationError("La contraseña debe contener al menos un número.")

        return data

        
        

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password is not None:
            user.set_password(password)
            user.save()
            return user



class RecoverCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoverCode
        fields = "__all__"