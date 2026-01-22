from django.urls import path
from .views import UserCreateView, UserLogin, UserProfileView,UserProfileUptadeView, get_csrf_token, LogoutView
from .views import UserEmailCheckView,SendRecoverCodeView
from .views import RecoverPasswordView

urlpatterns = [
    path('create/',UserCreateView.as_view(), name='user-create'),
    path('check-email/',UserEmailCheckView.as_view(), name='user-check-email'),
    path('login/',UserLogin.as_view(), name='user-login'),
    path('me/', UserProfileView.as_view(), name='user-profile'),
    path('me/update/', UserProfileUptadeView.as_view(), name='user-profile-update'),
    path('csrf/', get_csrf_token, name='get-csrf-token'),
    path("logout/", LogoutView.as_view(), name="logout"),
    path('send-recover-code/', SendRecoverCodeView.as_view(), name='send-recover-code'),
    path('recover-password/', RecoverPasswordView.as_view(), name='recover-password'),
]
