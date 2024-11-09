import pandas as pd
from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager

class MyAccountManager(BaseUserManager):
    def create_user(self,username,email,password, rol="admin"):
        if not email:
            raise ValueError('el usuario debe tener un email')
     
        user=self.model(
            email=self.normalize_email(email),
            username=username,
            rol=rol,  
        )
        user.is_active=True
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,username,email,password, rol="admin"):
        user=self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username,
            rol=rol,
        )
        
        user.is_admin=True
        user.is_active=True
        user.is_staff=True
        user.is_superadmin= True
        user.save(using=self._db)
        
        return user
        
        
class User(AbstractBaseUser):
    username=models.CharField(max_length=50,unique=True)
    email=models.CharField(max_length=100,unique=True)
    password=models.CharField(max_length=100)
    rol=models.CharField(max_length=50)
    
    #campos atributos de django
    
    date_joined=models.DateTimeField(auto_now_add=True)
    last_login=models.DateTimeField(auto_now_add=True)
    is_admin=models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)
    is_superadmin=models.BooleanField(default=False)
    
    USERNAME_FIELD='username'
    REQUIRED_FIELDS=['email','rol']
    
    
    objects=MyAccountManager()
    
    
    def __str__(self) :
        return self.email
    
    def has_perm(self,perm,obj=None):
        return self.is_admin
    
    def has_module_perms(self,add_label):
        return True


class File(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='excel_files')
    file = models.FileField(upload_to='excel_files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file_type = models.CharField(max_length=10, choices=[('csv', 'CSV'), ('xls', 'XLS'), ('xlsx', 'XLSX')])

    def __str__(self):
        return f'{self.user.email} - {self.file.name}'


