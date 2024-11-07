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
            rol=validated_data['rol']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):  
    username = serializers.CharField()  
    password = serializers.CharField()

    def validate(self, data):
        # Imprimir los datos recibidos para ver si están correctos
        print("Datos recibidos para autenticación:", data)

        # Buscar el usuario en la base de datos
        try:
            user = User.objects.get(username=data['username'])
            print("Usuario encontrado en la base de datos:", user.username)
            print("Contraseña almacenada (hashed):", user.password)
            print("Contraseña proporcionada:", data['password'])
        except User.DoesNotExist:
            print("Usuario no encontrado en la base de datos.")
            raise serializers.ValidationError("Usuario no encontrado")

        # Comparar la contraseña proporcionada con la almacenada (usando `check_password`)
        if not user.check_password(data['password']):
            print("La contraseña proporcionada no coincide con la almacenada.")
            raise serializers.ValidationError("Credenciales incorrectas")

        # Si la autenticación tiene éxito
        print("Usuario autenticado exitosamente:", user.username)
        return user