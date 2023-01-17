from rest_framework import pagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .filters import ProjectFilter
from .models import Project, Todo_todo
# Create your views here.
from .serializers import ProjectModelSerializer, Todo_todoModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    filterset_class = ProjectFilter
    pagination.PageNumberPagination.page_size = 10


class TodoModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Todo_todo.objects.all()
    serializer_class = Todo_todoModelSerializer
    pagination.PageNumberPagination.page_size = 20

    def destroy(self, request, *args, **kwargs):  # переопределяем метод destroy
        instance = self.get_object()
        if instance.mark_done is False:
            instance.mark_done = True
            instance.save()
            return Response()
        return Response()
