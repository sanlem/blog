from django.shortcuts import render
from rest_framework import viewsets
from posts.models import Post
from posts.serializers import PostSerializer
from django.conf import settings
from django.http import HttpResponse

def index(request):
    return render(request, "index.html")	

class PostViewset(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = ()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
# Create your views here.
