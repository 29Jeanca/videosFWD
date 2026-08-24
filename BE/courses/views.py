from django.shortcuts import render
from .models import Course
from .serializers import CourseSerializer
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from users.authentication import CookieJWTAuthentication
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework import status
import cloudinary.uploader

class CourseListCreateView(ListCreateAPIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def create(self, request, *args, **kwargs):
        data = {
            "title": request.data.get("title"),
            "description": request.data.get("description"),
            "teacher": request.data.get("teacher"),
            "module": request.data.get("module"),
            "video_url": request.data.get("video_url"),
            "tags": request.data.get("tags"),
        }

        if "thumbnail_img" in request.FILES:
            upload = cloudinary.uploader.upload(
                request.FILES["thumbnail_img"],
                folder="courses"
            )
            data["thumbnail_img"] = upload["secure_url"]

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


