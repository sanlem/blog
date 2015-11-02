from rest_framework import serializers
from posts.models import Post

class PostSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(required=False)
    class Meta:
        model = Post
