from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    color = models.CharField(max_length=7, default="#FFFFFF")  # Hex color code


class UserEvent(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    color = models.CharField(max_length=7, default="#FFFFFF")  # Hex color code

