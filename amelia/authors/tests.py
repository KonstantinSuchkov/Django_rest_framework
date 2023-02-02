import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from todo_app.serializers import ProjectModelSerializer
from .views import AuthorModelViewSet
from .models import Author
from todo_app.models import Project, Todo_todo


# Create your tests here.

class TestAuthorViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/authors/')
        view = AuthorModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors/', {
            'id': 111,
            'first_name': 'Александр',
            'last_name': 'Пушкин',
            'username': 'Поэт',
            'email': 'pushka@poet.ru'}, format='json')
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors/', {
            'first_name': 'Александр',
            'last_name': 'Пушкин',
            'username': 'Поэт',
            'email': 'pushka@poet.ru'}, format='json')
        admin = User.objects.create_superuser('admin', 'admin@admin.com',
                                              'admin123456')
        force_authenticate(request, admin)
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        author = Author.objects.create(first_name='Александр',
                                       last_name='Пушкин',
                                       username='Поэт',
                                       email='pushka@poet.ru')
        client = APIClient()
        response = client.get(f'/api/authors/{author.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        test_project = Author.objects.create(first_name='Александр',
                                             last_name='Пушкин',
                                             username='Поэт',
                                             email='pushka@poet.ru')
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com',
                                              'admin123456')
        client.login(username='admin', password='admin123456')
        response = client.put(f'/api/authors/{test_project.id}/', {'first_name': 'Федор',
                                                                   'last_name': 'Достоевский',
                                                                   'username': 'Писатель',
                                                                   'email': 'karamazov@poet.ru'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        test_project = Author.objects.get(id=test_project.id)
        self.assertEqual(test_project.username, 'Писатель')
        client.logout()


class TestProjectsViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        author = Author.objects.create(first_name='Александр',
                                       last_name='Пушкин',
                                       username='Поэт',
                                       email='pushka@poet.ru')
        project = Project.objects.create(name='Операция Ы', project_link='https://gb.ru/lessons/295723')
        project.project_staff.add(author)
        project.save()
        response = self.client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        project.name = 'Operation Y'
        serializer = ProjectModelSerializer(project)
        response = self.client.put(f'/api/projects/{project.id}/', serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'Operation Y')

    def test_edit_mixer(self):
        mission = mixer.blend(Todo_todo)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.get(f'/api/todo/{mission.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# Found 8 test(s).
# Creating test database for alias 'default'...
# System check identified no issues (0 silenced).
# ........
# ----------------------------------------------------------------------
# Ran 8 tests in 1.517s
#
# OK
# Destroying test database for alias 'default'...
