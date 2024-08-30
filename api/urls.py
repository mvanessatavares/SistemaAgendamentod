from django.urls import path
from . import views

from api.views import createUser, authUser, LabsList

urlpatterns = [
	path('', views.apiOverview, name="api-overview"),
	path('task-list/', views.taskList, name="task-list"),
	path('task-detail/<str:pk>/', views.taskDetail, name="task-detail"),
	path('task-create/', views.taskCreate, name="task-create"),
	path('create-user/', view=createUser, name='create-user'),
	path('auth-user/', view=authUser, name="auth-user"),
	path('lab-list/', view=LabsList, name='lab-list'),

	path('task-update/<str:pk>/', views.taskUpdate, name="task-update"),
	path('task-delete/<str:pk>/', views.taskDelete, name="task-delete"),
]
