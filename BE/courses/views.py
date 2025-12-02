from django.shortcuts import render
from .models import Course
from .serializers import CourseSerializer
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from users.authentication import CookieJWTAuthentication

class CourseListCreateView(ListCreateAPIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

