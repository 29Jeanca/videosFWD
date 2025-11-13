from django.urls import path
from .views import PostListCreateView,CategoryPostListCreateView
from .views import CommentPostListCreateView, CommentByPostView
from .views import LikeUnlikePostView
urlpatterns = [
    path('create-post/', PostListCreateView.as_view(), name='create-post'),
    path('create-category/', CategoryPostListCreateView.as_view(), name='create-category'),
    path('create-comment/', CommentPostListCreateView.as_view(), name='create-comment'),
    path('post-comments/<int:post_id>/', CommentByPostView.as_view(), name='comments-by-post'),
    path('like-unlike-post/<int:post_id>/', LikeUnlikePostView.as_view(), name='like-unlike-post'),
]