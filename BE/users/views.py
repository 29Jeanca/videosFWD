from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed

from .models import User
from .serializers import UserSerializer
from .authentication import CookieJWTAuthentication


class UserCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserLogin(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"message": "Email y contraseña son requeridos."}, status=400)
        
        username_email = User.objects.filter(email=email).values_list("username", flat=True).first()

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
            },
        })

        # Configurar cookies seguras
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

        # Generar CSRF token al loguear
        csrf_token = get_token(request)
        response.set_cookie("csrftoken", csrf_token, samesite="Lax")

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
        user_login = request.user

        if not user_login.is_authenticated:
            raise AuthenticationFailed("Usuario no autenticado")

        username = request.data.get("username")
        email = request.data.get("email")
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        password = request.data.get("password")
        profile_picture = request.data.get("profile_picture")

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

        return Response({"message": "User profile updated successfully."})


@api_view(["GET"])
def get_csrf_token(request):
    token = get_token(request)
    return Response({"csrfToken": token})

class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Sesión cerrada correctamente"})
        response.delete_cookie("access_token", path="/")
        response.delete_cookie("refresh_token", path="/")
        response.delete_cookie("csrftoken", path="/")
        return response