from django.db import models
from uuid import uuid4


# Create your models here.
class Author(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    username = models.CharField(max_length=32)
    email = models.EmailField()
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)


class Test_for_best(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name
