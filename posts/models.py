from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=30)
    text = models.TextField(max_length=400)
    author = models.ForeignKey(User, related_name="posts")
