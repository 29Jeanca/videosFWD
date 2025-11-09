from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.response import Response

class UserCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer



class UserLogin(TokenObtainPairView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"message": "Email y contraseña son requeridos."}, status=400)


        # Como el django valida con user, lo que hago es buscar el username asociado al email
        username_email = User.objects.filter(email=email).values_list('username', flat=True).first()


        if username_email is None:
            return Response({"message": "No existe una cuenta con ese correo."}, status=404)

        user = authenticate(username=username_email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login exitoso",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                }
            }, status=200)
        else:
            return Response({"message": "Credenciales inválidas."}, status=401)

        