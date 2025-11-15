from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Post, CategoryPost, CommentPost, LikePost
from .serializers import PostSerializer, CategoryPostSerializer, CommentPostSerializer,LikePostSerializer
from rest_framework.permissions import IsAuthenticated
from users.authentication import CookieJWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response


class PostListCreateView(ListCreateAPIView):
    method = 'GET'
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer


class CreatePostView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self,request):
        user=request.user
        title = request.data.get('title')
        content = request.data.get('content')
        category_id = request.data.get('category')
        anonymous = request.data.get('anonymous', False)

        if not title or not content or not category_id:
            return Response({"error":"Faltan campos obligatorios"},status=400)
        
        post = Post.objects.create(
            user=user,
            title=title,
            content=content,
            category_id=category_id,
            anonymous=anonymous
        )
        serializer = PostSerializer(post)
        post.save()
        return Response(serializer.data, status=201)
    


class CategoryPostListCreateView(ListCreateAPIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = CategoryPost.objects.all().order_by('name')
    serializer_class = CategoryPostSerializer

class CommentPostListCreateView(ListCreateAPIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = CommentPost.objects.all().order_by('-created_at')
    serializer_class = CommentPostSerializer

class CommentByPostView(ListCreateAPIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CommentPostSerializer

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return CommentPost.objects.filter(post_id=post_id)

class LikeUnlikePostView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self,request,post_id):
        user = request.user
        post = Post.objects.get(id=post_id)
        like_instance = LikePost.objects.filter(user=user, post=post).first()

        if like_instance:
            like_instance.delete()
            return Response({"message":"Post unliked"})
        else:
            LikePost.objects.create(user=user, post=post)
            return Response({"message":"Post liked"})
        

class GetLikesByPostView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request,post_id):
        post = LikePost.objects.filter(post_id=post_id)
        serializer = LikePostSerializer(post,many=True)
        
        return Response(serializer.data)


   