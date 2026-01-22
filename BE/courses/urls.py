from django.urls import path
from .views import CourseListCreateView
from .views import CourseTagsGetView

urlpatterns = [
    path('create-course/', CourseListCreateView.as_view(), name='course-list-create'),
    path('course-tags/', CourseTagsGetView.as_view(), name='course-tags'),
]
