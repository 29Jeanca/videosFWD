from django.urls import path
from .views import UserCreateView, UserLogin, UserProfileView,UserProfileUptadeView, get_csrf_token, LogoutView

urlpatterns = [
    path('create/',UserCreateView.as_view(), name='user-create'),
    path('login/',UserLogin.as_view(), name='user-login'),
    path('me/', UserProfileView.as_view(), name='user-profile'),
    path('me/update/', UserProfileUptadeView.as_view(), name='user-profile-update'),
    path('csrf/', get_csrf_token, name='get-csrf-token'),
    path("logout/", LogoutView.as_view(), name="logout"),
]
