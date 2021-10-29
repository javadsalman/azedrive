# ☁ AZEDRIVE - GOOGLE DRIVE LIKE CLOUD APP ☁
Used Languages: [Python](https://www.python.org), [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript?retiredLocale=tr), [SCSS](https://sass-lang.com/guide)  *(Stylesheet Language)* \
Used Frameworks and Libraries: [Django](https://www.djangoproject.com/), [Django Rest Framework](https://www.django-rest-framework.org/), [React](https://reactjs.org/), [MaterialUI](https://mui.com/)

![MAIN IMAGE](https://github.com/cavadsalman/azedrive/blob/main/screenshots/dashboard_main.JPG)
## ⚙ SETUP
1. Create base dir of project
```
> mkdir projectbase
> cd projectbase
```
2. Create virtual environment and activate
```
> py -m venv projectenv
> projectenv\Scripts\activate
```
3. Clone this repository
```
> git clone https://github.com/cavadsalman/azedrive.git
> cd azedrive
```
4. Change database settings from settings.py based on your own
```python
'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'azedrive_db',
        'USER': 'yourusername',
        'PASSWORD': 'yourpassword',
        'HOST': 'localhost',
        'PORT': '5432',
},
```
5. Create database in PostgreSQL. By the way the database choosing is up to you, you can create database on any SQL database which supported by Django
```
> psql -U postgres -h localhost
> CREATE DATABASE azedrive_db;
> \q
```
6. Install required libraries, migrate main and secondary database (for save login logs) and run server
```
> pip install -r requirements.txt
> py manage.py makemigrations
> py manage.py migrate
> py manage.py migrate --database=logdb
> py manage.py runserver
```
7. Backend finished. Now open new CMD and change directory to frontend folder. Afterwards install all required node modules
```
> cd frontend
> npm install
> npm start
```
8. Everything finished 🎉. Now you can open app on 👉 [http://localhost:3000/](http://localhost:3000/)

## 📸 SCREENSHOTS
![DASHBOARD DETAIL](https://github.com/cavadsalman/azedrive/blob/main/screenshots/dashboard_detail.JPG)
---
![LOGIN](https://github.com/cavadsalman/azedrive/blob/main/screenshots/login.JPG)
---
![FILE ADD](https://github.com/cavadsalman/azedrive/blob/main/screenshots/file_add.JPG)
---
![FOLDER ADD](https://github.com/cavadsalman/azedrive/blob/main/screenshots/add_folder.JPG)
---
![DASHBOARD STARED](https://github.com/cavadsalman/azedrive/blob/main/screenshots/dashboard_stared.JPG)
---
![DASHBOARD SHARED](https://github.com/cavadsalman/azedrive/blob/main/screenshots/dashboard_shared.JPG)
---
![DASHBOARD TRASH](https://github.com/cavadsalman/azedrive/blob/main/screenshots/dashboard_trash.JPG)
