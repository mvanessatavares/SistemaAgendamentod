from rest_framework import serializers
from .models import Booking, Laboratory
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User, Group
UserModel = get_user_model()
#----- Django Auth
from django.contrib.auth import authenticate, login, logout

class TaskSerializer(serializers.ModelSerializer):
	class Meta:
		model = Booking
		fields ='__all__'
  
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        
class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laboratory
        fields = ['LabName',]

        
class AuthSerializer(serializers.Serializer):   
    username = serializers.CharField()
    password = serializers.CharField()     
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['username'], password=clean_data['password'])
        if not user:
            print('user not found')
        return user
