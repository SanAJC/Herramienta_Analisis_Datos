from django.contrib import admin
from .models import User , File
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'rol', 'is_active', 'is_admin')
    search_fields = ('email', 'username')
    list_filter = ('is_active', 'is_admin')

# Registro del modelo File
@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ('user', 'file', 'file_type', 'uploaded_at')
    search_fields = ('user__email', 'file__name')
    list_filter = ('file_type', 'uploaded_at')


