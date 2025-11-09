from django.urls import path
from .views import UserCreateView, UserLogin, UserProfileView

urlpatterns = [
    path('create/',UserCreateView.as_view(), name='user-create'),
    path('login/',UserLogin.as_view(), name='user-login'),
    path('me/', UserProfileView.as_view(), name='user-profile'),

]
