from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import File,User
from .serializers import FileSerializer , LoginSerializer, UserSerializer,RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import login, logout
from django.contrib import auth 
from rest_framework_simplejwt.tokens import RefreshToken


class FileViewSet(viewsets.ModelViewSet):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        usuario = self.request.user
        if usuario.is_superuser:
            return File.objects.all()
        return File.objects.filter(user=usuario)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save()

    @action(detail=True, methods=['get'], name='Extract File Data')
    def extract_file_data(self, request, pk=None):
        try:
            archivo = self.get_object()
            proceso = archivo.extraer_data()
            return Response(proceso, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

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
            user = serializer.validated_data['user']  # Asegúrate de obtener el usuario correctamente
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