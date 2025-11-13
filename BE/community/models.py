from django.db import models

class Post(models.Model):
    user = models.ForeignKey('users.User',on_delete=models.CASCADE)
    category = models.ForeignKey('CategoryPost',on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    anonymous = models.BooleanField(default=False)
    thumbs_up = models.IntegerField(default=0)
    
class CategoryPost(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

class CommentPost(models.Model):
    post = models.ForeignKey('Post',on_delete=models.CASCADE)
    user = models.ForeignKey('users.User',on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    anonymous = models.BooleanField(default=False)
    thumbs_up = models.IntegerField(default=0)

class AnswerComment(models.Model):
    comment = models.ForeignKey('CommentPost',on_delete=models.CASCADE)
    user = models.ForeignKey('users.User',on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    anonymous = models.BooleanField(default=False)
    thumbs_up = models.IntegerField(default=0)
