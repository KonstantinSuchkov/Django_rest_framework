from rest_framework.serializers import ModelSerializer

from .models import Project, Todo_todo


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class Todo_todoModelSerializer(ModelSerializer):
    class Meta:
        model = Todo_todo
        fields = '__all__'

        extra_kwargs = {
            'id': {'read_only': False},
        }
