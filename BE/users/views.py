from .authentication import CookieJWTAuthentication 
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
from django.http import JsonResponse
from django.middleware.csrf import get_token

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

class UserProfileView(APIView):
    authentication_classes = [CookieJWTAuthentication]  
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class UserProfileUptadeView(APIView):
    authentication_classes = [CookieJWTAuthentication]  
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        # Usuario que inicia sesion
        user_login = request.user

        # Datos que se van a actualizar
        username = request.data.get('username')
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        password = request.data.get('password')
        profile_picture = request.data.get('profile_picture')

        if username:
            user_login.username = username
        if email:
            user_login.email = email
        if first_name:
            user_login.first_name = first_name
        if last_name:
            user_login.last_name = last_name
        if profile_picture:
            user_login.profile_picture = profile_picture
        if password:
            user_login.set_password(password)
        
        user_login.save()

        return Response({'message':"User profile updated successfully."})






def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})
