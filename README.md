# PACTT  (Planning And Collaborative Tracking Tool)

### Depedencies
PACTT uses a number of open source projects to work properly:
* [Python 2.7.x] - pyenv / virtualenv is highly recommended for isolating python environment
* [AngularJS] - HTML enhanced for web apps!
* [Django & Django REST framework] - backend with RESTful API
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [sqlite] - lightweight DB for prototyping
* [Gulp] - the streaming build system
* [jQuery] - duh
* [Others...] - is installed and can be found in bower / npm / pip

### Deployment
First of all, make sure you got the right version of Python, and have pip working
```sh
$ pip install -r requirements.txt
$ python manage.py migrate
$ python manage.py runserver
```
### Modification
##### change primary color
modify 
```
PACTT/static/stylesheets/material.less
```
then run (you will need less compiler)
```
./change_theme_color.sh
```

### Code style
https://github.com/johnpapa/angular-styleguide

### TODOs before production
* Janus integration
* test
