from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    color = models.CharField(max_length=7, default="#FFFFFF")  
    fecha_inicio = models.DateTimeField(blank=True, null=True)
    fecha_fin = models.DateTimeField(blank=True, null=True)


class UserEvent(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    color = models.CharField(max_length=7, default="#FFFFFF")
    fecha_inicio = models.DateTimeField(blank=True, null=True)
    fecha_fin = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True) 

