from rest_framework.serializers import ModelSerializer
from  rest_framework import serializers
from authors.models import Author
from authors.serializers import AuthorModelSerializer
from .models import Project, Todo_todo


class ProjectModelSerializer(ModelSerializer):
    project_staff = serializers.SlugRelatedField(
        many=True,
        # read_only=True,
        slug_field='username',
        queryset=Author.objects.all(),
    )

    class Meta:
        model = Project
        fields = '__all__'


class Todo_todoModelSerializer(ModelSerializer):

    class Meta:
        model = Todo_todo
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(Todo_todoModelSerializer, self).to_representation(instance)
        rep['author'] = instance.author.username
        rep['project_name'] = instance.project_name.name
        if rep['mark_done']:
            rep['mark_done'] = 'mission completed'
        else:
            rep['mark_done'] = 'mission not completed'
        return rep
