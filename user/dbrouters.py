from .models import LoginLog

class LoginLogDBRouter:
    def db_for_read (self, model, **hints):
        if (model == LoginLog):
            # your model name as in settings.py/DATABASES
            return 'logdb'
        return None
    
    def db_for_write (self, model, **hints):
        if (model == LoginLog):
            # your model name as in settings.py/DATABASES
            return 'logdb'
        return None