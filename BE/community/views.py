from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Post, CategoryPost, CommentPost
from .serializers import PostSerializer, CategoryPostSerializer, CommentPostSerializer
from rest_framework.permissions import IsAuthenticated
from users.authentication import CookieJWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
class PostListCreateView(ListCreateAPIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer

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

    def patch(self,request,post_id):
        try:
            post=Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"message":"Post no encontrado."},status=404)
        
        action=request.data.get("action")
        if action=="like":
            post.thumbs_up+=1
            post.save()
            return Response({"message":"Post gustado.","thumbs_up":post.thumbs_up},status=200)
        elif action=="unlike":
            if post.thumbs_up>0:
                post.thumbs_up-=1
                post.save()
            return Response({"message":"Post no gustado.","thumbs_up":post.thumbs_up},status=200)
        else:
            return Response({"message":"Acción inválida."},status=400)
