"""amelia URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from authors import views
from authors.views import AuthorModelViewSet, TestModelViewset
from todo_app.views import ProjectModelViewSet, TodoModelViewSet
from rest_framework.authtoken import views


router = DefaultRouter()
router.register('authors', AuthorModelViewSet)
router.register('projects', ProjectModelViewSet, basename='Project')
router.register('todo', TodoModelViewSet, basename='Todo')
router.register('test', TestModelViewset, basename='Test')
#router.register('my', AuthorModelViewSet, basename='api2')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    #path('api/', AuthorModelViewSet.as_view({'get': 'list'})),
    path('api/<int:pk>/', AuthorModelViewSet.as_view({'get': 'list'})),
    path('api-token-auth/', views.obtain_auth_token),
]
