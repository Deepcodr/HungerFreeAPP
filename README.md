# HungerFreeAPP
HungerFree is a web app for sharing and requesting food .

Steps To Run The Project :

**`Note 1`: This Project Uses API which should also be run along with this project**

**Link To API :**
[HungerFreeAPI](https://github.com/Deepcodr/HungerFreeAPI).

**`Note 2`: This Project Uses Google Map APIs**

_add your own API key to templates_

*_____________________________________________________________________________*

1:
`First change the settings.py with required settings of database details.`

2:
`Set enviroment variables for the project or use django.environ.`

**_for django.environ add .env file to root folder(directory containing settings.py)_**

3:
`Edit Javascript files with the API url at which your API is running .`

4:
`Set CORS headers and ALLOWED_HOSTS for API as well as project.`

5:
`After Adding Google Map API key to template and changing API url in javascript the project is ready to run.`

6:
`Run this command to start project locally.`
```
python manage.py runserver
```

`NOTE`
`If you are running the API and Project Locally.`

`start your app server at 127.0.0.1:8000(by default)`

`start your API server at 127.0.0.1:5000(run command below)`
```
python manage.py runserver 5000
```
