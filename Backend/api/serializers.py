from rest_framework import serializers
from .models import File ,User
from django.contrib.auth import authenticate

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
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            rol=validated_data['rol']
        )
        user.save()
        return user

class LoginSerializer(serializers.Serializer):  
    username = serializers.CharField()  
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Credenciales incorrectas")
        return user