from rest_framework import viewsets, mixins, pagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from .models import Author, Test_for_best
from .serializers import AuthorModelSerializer, TestModelSerializer


# Create your views here.


class AuthorModelViewSet(
    mixins.ListModelMixin,  # просмотр списком
    mixins.RetrieveModelMixin,  # просмотр по id
    mixins.UpdateModelMixin,  # изменения
    # mixins.DestroyModelMixin, # удаление
    # mixins.CreateModelMixin, # создание
    viewsets.GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer


class TestModelViewset(ModelViewSet):
    #renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Test_for_best.objects.all()
    serializer_class = TestModelSerializer
