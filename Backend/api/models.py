from django.db import models
from django.contrib.auth.models import AbstractUser ,Group , Permission
# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)
    password=models.CharField(max_length=10)

    # Agregar related_name para evitar conflictos
    groups = models.ManyToManyField(
        Group,
        related_name="grupos",  
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="permisos",  
        blank=True
    )

class File(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='excel_files')
    file = models.FileField(upload_to='excel_files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file_type = models.CharField(max_length=10, choices=[('csv', 'CSV'), ('xls', 'XLS'), ('xlsx', 'XLSX')])

    def __str__(self):
        return f'{self.user.username} - {self.file.name}'
