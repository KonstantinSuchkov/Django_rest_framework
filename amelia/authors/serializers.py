from rest_framework.serializers import ModelSerializer
from .models import Author, Test_for_best


class AuthorModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        exclude = ('is_staff', 'is_superuser',)


class AuthorFullModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class TestModelSerializer(ModelSerializer):
    class Meta:
        model = Test_for_best
        fields = '__all__'