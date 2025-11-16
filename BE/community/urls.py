from django.urls import path
from .views import PostListCreateView,CategoryPostListCreateView
from .views import CommentPostListCreateView, CommentByPostView
from .views import LikeUnlikePostView
from .views import GetLikesByPostView
from .views import CreatePostView
from .views import GetPostByIdView
from .views import FilterPostByCategoryView
from .views import FilterPostByTitleView
from .views import RecentPostListView
from .views import MostLikedPostListView
from .views import CommentPostView

urlpatterns = [
    path('create-post/', CreatePostView.as_view(), name='create-post'),
    path('posts/', PostListCreateView.as_view(), name='posts-list'),
    path('create-category/', CategoryPostListCreateView.as_view(), name='create-category'),
    path('create-comment/', CommentPostListCreateView.as_view(), name='create-comment'),
    path('comment-post/', CommentPostView.as_view(), name='comment-post'),
    path('post-comments/<int:post_id>/', CommentByPostView.as_view(), name='comments-by-post'),
    path('like-unlike-post/<int:post_id>/', LikeUnlikePostView.as_view(), name='like-unlike-post'),
    path('likes-by-post/<int:post_id>/', GetLikesByPostView.as_view(), name='likes-by-post'),
    path('post/<int:post_id>/', GetPostByIdView.as_view(), name='get-post-by-id'),
    path('posts-by-category/<int:category_id>/', FilterPostByCategoryView.as_view(), name='posts-by-category'),
    path('posts-by-title/<str:title_query>/', FilterPostByTitleView.as_view(), name='posts-by-title'),
    path('posts-most-liked/', MostLikedPostListView.as_view(), name='posts-most-liked'),
    path('recent-posts/', RecentPostListView.as_view(), name='recent-posts'),
]