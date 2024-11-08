from rest_framework import serializers
from .models import File ,User
from django.contrib.auth import authenticate
from django.contrib import auth 
class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'

    def validate_file(self, value):
        tipo = value.name.split('.')[-1].lower()
        if tipo not in ['csv', 'xls', 'xlsx']:
            raise serializers.ValidationError('Archivo no permitido. Debe ser CSV, XLS o XLSX.')
        return value
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'rol']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'rol']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            rol=validated_data['rol']
        )
        return user


class LoginSerializer(serializers.Serializer):  
    username = serializers.CharField()  
    password = serializers.CharField()

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")
        print(f"Intentando autenticar con username: {username} y password: {password}")
        
        # Autenticar usando el username y password
        user = auth.authenticate(username=username, password=password)
        
        if user is None:
            raise serializers.ValidationError("Error de autenticación")
        else:
            print(f"Autenticacion con exito {username}")
        
        return user
