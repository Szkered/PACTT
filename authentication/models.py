from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class AccountManager(BaseUserManager):
    def create_user(self, sid, password=None, **kwargs):
        if not sid:
            raise ValueError('Users must have a sid.')

        if not kwargs.get('email'):
            raise ValueError('Users must have an email.')

        account = self.model(
            sid=sid,
            email=self.normalize_email(kwargs.get('email')),
            first_name=kwargs.get('first_name'),
            last_name=kwargs.get('last_name'),
            lob=kwargs.get('lob')
        )

        account.set_password(password)
        account.save()
        
        return account

    def create_superuser(self, sid, password, **kwargs):
        account = self.create_user(sid, password, **kwargs)

        account.is_admin = True
        account.save()

        return account
    

class Account(AbstractBaseUser):
    sid = models.CharField(max_length=7, unique=True)
    email = models.EmailField(unique=True)

    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    LOB_TYPE = (
        ('G', 'GTRM'),
        ('C', 'CIB TRM'),
        ('P', 'PM')
    )
    lob = models.CharField(max_length=1, choices=LOB_TYPE, blank=True)

    is_admin = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'sid'
    
    REQUIRED_FIELDS = ['email']

    def __unicode__(self):
        return self.email

    def get_full_name(self):
        return ', '.join([self.last_name, self.first_name])

    def get_short_name(self):
        return self.first_name
