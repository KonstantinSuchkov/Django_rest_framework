from rest_framework import viewsets, mixins, pagination
from .models import Author
from .serializers import AuthorModelSerializer


# Create your views here.


class AuthorModelViewSet(
    mixins.ListModelMixin,  # просмотр списком
    mixins.RetrieveModelMixin,  # просмотр по id
    mixins.UpdateModelMixin,  # изменения
    # mixins.DestroyModelMixin, # удаление
    # mixins.CreateModelMixin, # создание
    viewsets.GenericViewSet):
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer
