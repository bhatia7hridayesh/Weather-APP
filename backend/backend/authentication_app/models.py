from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

from .manager import UserManager
# Create your models here.

class User(AbstractUser):
    username = None
    full_name = models.CharField(max_length=250,null=True,blank=True)
    email = models.EmailField(max_length=300,null=True,unique=True)
    is_active = models.BooleanField(default=True)
    favourites = ArrayField(models.CharField(max_length=100,null=True,blank=True),default=list,null=True,blank=True)
    objects=UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    def __str__(self):
        if not self.email:
            return ""
        return self.email
