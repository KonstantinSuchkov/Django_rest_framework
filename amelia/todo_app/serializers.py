#from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Project, Todo_todo


class ProjectModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class Todo_todoModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Todo_todo
        fields = '__all__'

