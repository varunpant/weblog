
+++
title = "How To Install and use Python Web.py framework on Windows"
date = "2012-05-06"
author = " "
cover = ""
description = ""
category = ["programming","python","utility","web","how to"]
+++

 [Web.py](http://webpy.org/) has been one of my favorite web frameworks as its pretty easy to get cracking on it.

 It's super quick to install and one can come up with a prototype and rapid web services in matter of minutes.

 Install on windows
------------------

 If you haven't configured easy\_install on windows, then read [ this ](http://www.varunpant.com/posts/how-to-setup-easy_install-on-windows) article.

 Once easy\_install has been configured believe it or not, all you have to do is open a command prompt and type

 
>  easy\_install web.py 
> 
>   and that’s it, you are all set , to test if things work properly, create a test.py file and paste this code from [Web.py](http://webpy.org/) web site

  import web urls = ( '/(.*)', 'hello' ) app = web.application(urls, globals()) class hello: def GET(self, name): if not name: name = 'World' return 'Hello, ' + name + '!' if \_\_name\_\_ == "\_\_main\_\_": app.run()  run the code by typing python test.py 3333, then open the web browser and go to

  <http://localhost:3333/Einstein>, on the browser you should see Hello,Einstein.

 Hope this helps .



