import graphene
from graphene_django import DjangoObjectType
from authors.models import Author
from todo_app.models import Project, Todo_todo


class AuthorType(DjangoObjectType):
    class Meta:
        model = Author
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo_todo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_authors = graphene.List(AuthorType)
    all_projects = graphene.List(ProjectType)
    all_todo = graphene.List(TodoType)
    project_by_id = graphene.List(ProjectType, id=graphene.Int(required=False))
    project_by_author = graphene.List(ProjectType, project_staff=graphene.String(required=False))

    def resolve_all_authors(root, info):
        return Author.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todo(root, info):
        return Todo_todo.objects.all()

    def resolve_project_by_id(self, info, id=None):
        projects = Project.objects.all()
        if id:
            projects = projects.filter(id=id)
        return projects

    def resolve_project_by_author(self, info, project_staff=None):
        projects = Project.objects.all()
        if project_staff:
            projects = projects.filter(project_staff=project_staff)
        return projects


schema = graphene.Schema(query=Query)
