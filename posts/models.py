from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=15)
    text = models.TextField(max_length=400)
    author = models.CharField(max_length=15)
