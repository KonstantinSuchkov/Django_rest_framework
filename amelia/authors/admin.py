from django.contrib import admin

# Register your models here.
from todo_app.models import Project, Todo_todo
from .models import Author


admin.site.register(Author)
admin.site.register(Project)
admin.site.register(Todo_todo)
