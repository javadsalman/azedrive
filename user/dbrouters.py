from .models import LoginLog

# Create spesific db router for LoginLog models updated affect to only logdb database
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