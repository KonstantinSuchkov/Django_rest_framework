from rest_framework.viewsets import ModelViewSet
from .models import Project, Todo_todo
# Create your views here.
from .serializers import ProjectModelSerializer, Todo_todoModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class TodoModelViewSet(ModelViewSet):
    queryset = Todo_todo.objects.all()
    serializer_class = Todo_todoModelSerializer
