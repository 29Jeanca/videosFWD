from django.db import models


class Course(models.Model):
    CHOICES_MODULE = [
        ('backend', 'Backend'),
        ('frontend', 'Frontend'),
        ('fullstack', 'Fullstack'),
    ]
    title = models.CharField(max_length=200)
    description = models.TextField()
    teacher = models.CharField(max_length=100)
    module = models.CharField(max_length=100, choices=CHOICES_MODULE)
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.JSONField(default=list)  
    video_url = models.URLField()
    thumbnail_img = models.URLField()

    def __str__(self):
        return self.title

