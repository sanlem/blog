from django.shortcuts import render
from rest_framework import viewsets
from posts.models import Post
from posts.serializers import PostSerializer
from django.conf import settings
from django.http import HttpResponse

def index(request):
    print(settings.BASE_DIR)	
    return HttpResponse("asdasd")	

class PostViewset(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = ()
# Create your views here.
