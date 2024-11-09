from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action ,permission_classes
from .models import File,User
from .serializers import FileSerializer , LoginSerializer, UserSerializer,RegisterSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import login, logout
from django.contrib import auth
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.viewsets import ModelViewSet
import pandas as pd
import os

class FileViewSet(ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    @action(detail=False, methods=['post'])
    def upload(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        extension = os.path.splitext(file.name)[1].lower()
        if extension == '.csv':
            file_type = 'csv'
        elif extension in ['.xls', '.xlsx']:
            file_type = 'xls'  
        else:
            return Response({"error": "Unsupported file format"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            file_instance = File.objects.create(
                file=file, 
                user=request.user, 
                file_type=file_type
            )
            serializer = FileSerializer(file_instance)
            if file_type == 'csv':
                archivo = pd.read_csv(file)
            elif file_type == 'xls':
                archivo = pd.read_excel(file)
            datos = {}
            for columna in archivo.columns:
                datos[columna] = archivo[columna].tolist()
            
            print(datos)
            return Response({"file_data": datos}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AuthViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['login_view', 'register']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    @action(detail=False, methods=['post'], url_path='register')
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='login')
    def login_view(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            auth.login(request, user)
            token = RefreshToken.for_user(user).access_token
            return Response({
                'token': str(token),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'rol': user.rol
                }
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='logout')
    def logout_view(self, request):
        auth.logout(request) 
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='profile', permission_classes=[IsAuthenticated])
    def profile(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    @action(detail=False, methods=['put','patch'], url_path='update-profile', permission_classes=[IsAuthenticated])
    def update_profile(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
