from rest_framework import serializers
from posts.models import Post

class PostSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = Post
