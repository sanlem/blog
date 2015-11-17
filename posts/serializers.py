from rest_framework import serializers
from posts.models import Post
from django.contrib.auth.models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'url')

class PostSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField(required=False)
    author = serializers.ReadOnlyField(source="author.username")
    class Meta:
        model = Post
        fields = ('title', 'text', 'id', 'author')