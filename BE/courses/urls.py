from django.urls import path
from .views import CourseListCreateView

urlpatterns = [
    path('create-course/', CourseListCreateView.as_view(), name='course-list-create'),
]
