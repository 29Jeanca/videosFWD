from rest_framework import serializers
from .models import Post,CategoryPost,CommentPost,AnswerComment

class PostSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'user_name', 'category', 'category_name', 'title', 'content', 'created_at', 'anonymous', 'thumbs_up']

class CategoryPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryPost
        fields = ['id', 'name', 'created_at']

class CommentPostSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = CommentPost
        fields = ['id', 'post', 'user', 'user_name', 'content', 'created_at', 'anonymous']

class AnswerCommentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = AnswerComment
        fields = ['id', 'comment', 'user', 'user_name', 'content', 'created_at', 'anonymous']

