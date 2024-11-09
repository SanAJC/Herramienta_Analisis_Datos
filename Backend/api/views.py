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
        
        # Guardar el archivo (añade tu lógica aquí según tus necesidades)
        file_instance = File.objects.create(file=file, user=request.user)
        serializer = FileSerializer(file_instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class AuthViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

     # Permitir acceso sin autenticación a login y register
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
        auth.logout(request) 
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)