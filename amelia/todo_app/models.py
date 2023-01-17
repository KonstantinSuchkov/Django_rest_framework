from django.db import models
# Create your models here.


from authors.models import Author


class Project(models.Model):
    name = models.CharField(max_length=100)  # название проекта, для которого записаны TO_DO
    project_link = models.URLField(max_length=128, default=None)  # ссылка на репозиторий проекта
    project_staff = models.ManyToManyField(Author)  # набор пользователей, которые работают с этим проектом

    def __str__(self):
        return self.name  # отображение


class Todo_todo(models.Model):
    project_name = models.ForeignKey(Project, default="NewProject", on_delete=models.PROTECT)  # ссылка на проект
    text = models.TextField(blank=True)  # текст заметки
    author = models.OneToOneField(Author, on_delete=models.CASCADE)  # автор заметки
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    mark_done = models.BooleanField(default=False)

    def __str__(self):
        return self.project_name
