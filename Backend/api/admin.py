from django.contrib import admin
from .models import User
# Register your models here.

@admin.register(User)

class admin(admin.ModelAdmin):
    list_display = ('email', 'password', 'rol') 