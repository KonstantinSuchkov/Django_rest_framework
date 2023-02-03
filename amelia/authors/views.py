from rest_framework import viewsets, mixins, pagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from .models import Author, Test_for_best
from .serializers import AuthorModelSerializer, TestModelSerializer, AuthorFullModelSerializer


# Create your views here.


class AuthorModelViewSet(
    mixins.ListModelMixin,  # просмотр списком
    mixins.RetrieveModelMixin,  # просмотр по id
    mixins.UpdateModelMixin,  # изменения
    mixins.DestroyModelMixin,  # удаление
    mixins.CreateModelMixin,  # создание
    viewsets.GenericViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return AuthorFullModelSerializer
        return AuthorModelSerializer


class TestModelViewset(ModelViewSet):
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Test_for_best.objects.all()
    serializer_class = TestModelSerializer
