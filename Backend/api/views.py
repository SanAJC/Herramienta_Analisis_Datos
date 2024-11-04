from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import File
from .serializers import FileSerializer

class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer

    def antes_de_guardar(self, serializer):
        archivo = serializer.validated_data.get('file')
        if archivo:
            tipo = archivo.name.split('.')[-1].lower()
            if tipo not in ['csv', 'xls', 'xlsx']:
                raise ValueError('Archivo no permitido')
        serializer.save(user=self.request.user)

    def actualizar(self, serializer):
        archivo = serializer.validated_data.get('file')
        if archivo:
            tipo = archivo.name.split('.')[-1].lower()
            if tipo not in ['csv', 'xls', 'xlsx']:
                raise ValueError('Archivo no permitido')
        serializer.save()

    def usuarios_permisos(self):
        usuario = self.request.user
        if not usuario.is_superuser:
            return File.objects.filter(user=usuario)
        return File.objects.all()

    @action(detail=True, methods=['get'], name='Extract File Data')
    def extract_file_data(self, request, pk=None):
        try:
            archivo = self.get_object()
            proceso = archivo.extraer_data()
            return Response(proceso, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
