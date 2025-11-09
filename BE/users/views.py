from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class UserCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer



from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

class UserLogin(TokenObtainPairView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"message": "Email y contraseña son requeridos."}, status=400)

        username_email = User.objects.filter(email=email).values_list('username', flat=True).first()

        if username_email is None:
            return Response({"message": "No existe una cuenta con ese correo."}, status=404)

        user = authenticate(username=username_email, password=password)

        if user is None:
            return Response({"message": "Credenciales inválidas."}, status=401)

        if not user.is_active:
            return Response({"message": "Cuenta inactiva."}, status=403)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response({
            "message": "Login exitoso",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            }
        }, status=200)

        # Cookies seguras
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,         
            samesite="Lax",
            max_age=60 * 15,    
        )
        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=60 * 60 * 24 * 7, 
        )

        return response

from .authentication import CookieJWTAuthentication  # importa tu clase

class UserProfileView(APIView):
    authentication_classes = [CookieJWTAuthentication]  # ✅ obligatorio
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
