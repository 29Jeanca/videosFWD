from django.urls import path
from .views import (
    # POSTS
    PostListCreateView,
    CreatePostView,
    GetPostByIdView,
    RecentPostListView,
    MostLikedPostListView,
    FilterPostByCategoryView,
    FilterPostByTitleView,
    FilterPostByUserView,

    # CATEGORÍAS
    CategoryPostListCreateView,

    # COMENTARIOS
    CommentPostListCreateView,
    CommentPostView,
    CommentByPostView,
    FilterCommentByUserView,

    # LIKES
    LikeUnlikePostView,
    GetLikesByPostView,
    FilterLikeByUserView,
    GetAllLikes,
)

urlpatterns = [
    # ============================
    # POSTS
    # ============================
    path('create-post/', CreatePostView.as_view(), name='create-post'),
    path('posts/', PostListCreateView.as_view(), name='posts-list'),
    path('post/<int:post_id>/', GetPostByIdView.as_view(), name='get-post-by-id'),
    path('recent-posts/', RecentPostListView.as_view(), name='recent-posts'),
    path('posts-most-liked/', MostLikedPostListView.as_view(), name='posts-most-liked'),
    path('posts-by-category/<int:category_id>/', FilterPostByCategoryView.as_view(), name='posts-by-category'),
    path('posts-by-title/<str:title_query>/', FilterPostByTitleView.as_view(), name='posts-by-title'),
    path('posts-by-user/', FilterPostByUserView.as_view(), name='posts-by-user'),

    # ============================
    # CATEGORÍAS
    # ============================
    path('create-category/', CategoryPostListCreateView.as_view(), name='create-category'),

    # ============================
    # COMENTARIOS
    # ============================
    path('create-comment/', CommentPostListCreateView.as_view(), name='create-comment'),
    path('comment-post/', CommentPostView.as_view(), name='comment-post'),
    path('post-comments/<int:post_id>/', CommentByPostView.as_view(), name='comments-by-post'),
    path('comments-by-user/', FilterCommentByUserView.as_view(), name='comments-by-user'),

    # ============================
    # LIKES
    # ============================
    path('like-unlike-post/<int:post_id>/', LikeUnlikePostView.as_view(), name='like-unlike-post'),
    path('likes-by-post/<int:post_id>/', GetLikesByPostView.as_view(), name='likes-by-post'),
    path('likes-by-user/', FilterLikeByUserView.as_view(), name='likes-by-user'),
    path('all-likes/', GetAllLikes.as_view(), name='all-likes'),

]
