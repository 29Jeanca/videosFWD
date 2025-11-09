from django.urls import path
from .views import UserCreateView, UserLogin

urlpatterns = [
    path('create/',UserCreateView.as_view(), name='user-create'),
    path('login/',UserLogin.as_view(), name='user-login'),
]
