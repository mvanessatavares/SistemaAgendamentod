from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
from django.contrib.auth import get_user_model, login, logout, authenticate


from django.contrib.auth.models import User, Group
from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions, status


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer, UserSerializer, AuthSerializer, LabSerializer

from .models import Booking, Laboratory
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'List':'/task-list/',
		'Detail View':'/task-detail/<str:pk>/',
		'Create':'/task-create/',
		'Update':'/task-update/<str:pk>/',
		'Delete':'/task-delete/<str:pk>/',
		'Create User': '/create-user/',
		'Auth User': '/auth-user/',
		'Lab List': '/lab-list/',
		}

	return Response(api_urls)

@api_view(['GET'])
def taskList(request):
	tasks = Booking.objects.all().order_by('-id')
	serializer = TaskSerializer(tasks, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def LabsList(request):
	labs = Laboratory.objects.all().order_by('-id')
	serializer = LabSerializer(labs, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def taskDetail(request, pk):
	tasks = Booking.objects.get(id=pk)
	serializer = TaskSerializer(tasks, many=False)
	return Response(serializer.data)


@api_view(['POST'])
def taskCreate(request):
	serializer = TaskSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)


@api_view(['POST'])
def createUser(request):
	serializer = UserSerializer(data=request.data)
	print(serializer)

	if serializer.is_valid():
		serializer.save()
  

	return HttpResponseRedirect('../')


@api_view(['POST'])
def authUser(request):
    permission_classes = (permissions.AllowAny, )
    autentication_classes = (SessionAuthentication, )
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        authSerializer = AuthSerializer()
        auth = authenticate(username=username, password=password)
        if auth is not None:
            login(request, auth)
            return HttpResponse("../")
    return HttpResponse("../")
        
    
	
	#username = serializer.validated_data['username']
	#password = serializer.validated_data['password']
 
	

@api_view(['POST'])
def taskUpdate(request, pk):
	task = Booking.objects.get(id=pk)
	serializer = TaskSerializer(instance=task, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)


@api_view(['DELETE'])
def taskDelete(request, pk):
	task = Booking.objects.get(id=pk)
	task.delete()

	return Response('Item succsesfully delete!')



