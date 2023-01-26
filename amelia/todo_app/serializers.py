from rest_framework.serializers import ModelSerializer

from authors.serializers import AuthorModelSerializer
from .models import Project, Todo_todo


class ProjectModelSerializer(ModelSerializer):
    # author = AuthorModelSerializer()
    class Meta:
        model = Project
        fields = '__all__'


class Todo_todoModelSerializer(ModelSerializer):
    # author = AuthorModelSerializer()
    class Meta:
        model = Todo_todo
        fields = '__all__'

        extra_kwargs = {
            'id': {'read_only': False},
        }
