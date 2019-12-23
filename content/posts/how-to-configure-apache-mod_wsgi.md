
+++
title = "How to configure Apache mod_wsgi"
date = "2013-02-26"
author = " "
cover = ""
description = ""
category = ["general","python"]
+++

I am a big fan and user of python. one of the most popular ways to create quick web app in python is via using mod wsgi.

 The aim of mod\_wsgi is to implement a simple to use [Apache](http://httpd.apache.org/) module which can host any [Python](http://www.python.org/) application which supports the Python [WSGI](http://www.wsgi.org/) interface. 

 The module would be suitable for use in hosting high performance production web sites, as well as your average self managed personal sites running on web hosting services.

 There are many frameworks in python, I like [web.py](http://webpy.org/) so here is a quick example.

 First lets configure modwsgi in Ubuntu 

 sudo apt-get install libapache2-mod-wsgi

  sudo a2enmod wsgi

 sudo service apache2 restart

 ##### configuration in /etc/apache2/sites-available/defaults

  WSGIScriptAlias /appname /var/www/webpy-app/code.py/ Alias /appname/static /var/www/webpy-app/static/ AddType text/html .py <Directory /var/www/webpy-app/> Order deny,allow Allow from all </Directory>   There is generally a handler present in most web applications for wsgi calls, here is one from web.py 

  import web urls = ( '/.*', 'hello', ) class hello: def GET(self): return "Hello, world." application = web.application(urls, globals()).wsgifunc()   and that's it.Hope it helps 



