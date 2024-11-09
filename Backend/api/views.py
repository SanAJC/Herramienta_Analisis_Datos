from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from .models import File,User
from .serializers import FileSerializer , LoginSerializer, UserSerializer,RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import login, logout
from django.contrib import auth
from rest_framework_simplejwt.tokens import RefreshToken
import pandas as pd

class FileViewSet(viewsets.ModelViewSet):
    serializer_class = FileSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        usuario = self.request.user
        if usuario.is_superuser:
            return File.objects.all()
        return File.objects.filter(user=usuario)

    def perform_create(self, serializer):
        try:
            print("Datos recibidos:", self.request.data) # Imprimir datos recibidos para depuración 
            print("Archivos recibidos:", self.request.FILES)
            serializer.save(user=self.request.user)
        except Exception as e:
            print("Error al guardar el archivo:", str(e))
            raise serializers.ValidationError("Error al guardar el archivo: " + str(e))

    @action(detail=True, methods=['get'], name='Extract File Data')
    def extract_file_data(self, request, pk=None):
        archivo = self.get_object()
        archivo_path = archivo.file.path

        try:
            if archivo.file_type == 'csv':
                df = pd.read_csv(archivo_path)
            elif archivo.file_type in ['xls', 'xlsx']:
                df = pd.read_excel(archivo_path)

            processed_data = {
                "columns": df.columns.tolist(),
                "summary": df.describe().to_dict(),
                "data_array": df.to_dict(orient="records")
            }
            return Response(processed_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"No se pudo procesar el archivo: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


class AuthViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    @action(detail=False, methods=['post'], url_path='register')
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        else:
            print("Errores de validación:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='login')
    def login_view(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data  # Asegúrate de obtener el usuario correctamente
            auth.login(request, user)

            # Generar el token
            token = RefreshToken.for_user(user).access_token

            # Devolver la respuesta en el formato esperado
            return Response({
                'token': str(token),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'rol': user.rol
                }
            }, status=status.HTTP_200_OK)
        else:
            print("Errores de validación:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='logout')
    def logout_view(self, request):
        logout(request) 
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)