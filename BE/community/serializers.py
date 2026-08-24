from rest_framework import serializers
from .models import Post,CategoryPost,CommentPost,AnswerComment,LikePost,SavedPost

class PostSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    is_post = serializers.BooleanField(default=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'user_name', 'category', 'category_name', 'title', 'content', 'created_at', 'anonymous', 'is_post']

class CategoryPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryPost
        fields = ['id', 'name', 'created_at']

class CommentPostSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    post_comment = serializers.CharField(source='post.title', read_only=True)
    is_comment = serializers.BooleanField(default=True, read_only=True)
    class Meta:
        model = CommentPost
        fields = ['id', 'post', 'user', 'user_name', 'content', 'created_at', 'anonymous', 'post_comment', 'is_comment']

class AnswerCommentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = AnswerComment
        fields = ['id', 'comment', 'user', 'user_name', 'content', 'created_at', 'anonymous']

class LikePostSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    post_title = serializers.CharField(source='post.title', read_only=True)
    is_like = serializers.BooleanField(default=True, read_only=True)
    class Meta:
        model = LikePost
        fields = ['id', 'post', 'user', 'created_at', 'user_name', 'user_id', 'post_title', 'is_like']


class SavedPostSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    post_title = serializers.CharField(source='post.title', read_only=True)
    post_content = serializers.CharField(source='post.content', read_only=True)
    post_category_name = serializers.CharField(source='post.category.name', read_only=True)
    post_created_at = serializers.DateTimeField(source='post.created_at', read_only=True)
    post_user_name = serializers.CharField(source='post.user.username', read_only=True)
    post_anonymous = serializers.BooleanField(source='post.anonymous', read_only=True)

    class Meta:
        model = SavedPost
        fields = [
            'id', 'post', 'user', 'created_at', 'user_name', 'user_id',
            'post_title', 'post_content', 'post_category_name', 'post_created_at',
            'post_user_name', 'post_anonymous',
        ]