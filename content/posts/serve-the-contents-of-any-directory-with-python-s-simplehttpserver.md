
+++
title = "Serve the contents of any directory with Python's SimpleHTTPServer"
date = "2013-02-08"
author = " "
cover = ""
description = ""
tags = ["python","utility","web"]
+++

Generally, when I am in a middle of prototyping a concept or in a need of quickly executing Ajax requests or using browser features which would need the page to be hosted on a web server, I use Python's [SimpleHTTPServer](http://docs.python.org/2/library/simplehttpserver.html) module.

 Python's SimpleHTTPServer is a great way of serve the contents of the current directory,all one needs to do is change directory and execute a command which will expose all contents as if they were hosted in a web page. 

 ```python
 cd myfolder
 python -m SimpleHTTPServer  
```
 you don't need a line of code or a even a python file anywhere inside the directory for this to work, the module works all on its own and just needs a **port number**. 

 If there is a file called index.html inside the root, then its served when the user types localhost:port. 

 SimpleHTTPServer is a great module for quick start, however its not a production ready tool and must be used only for lightweight use.

 Another use of this module is a quick utility Proxy. This does need a few lines of code though :!

 ```python
import SocketServer
import SimpleHTTPServer
import urllib

PORT = 3333

class Proxy(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do\_GET(self):
        self.copyfile(urllib.urlopen(self.path), self.wfile)

httpd = SocketServer.ForkingTCPServer(('', PORT), Proxy)
print "serving at port", PORT
httpd.serve\_forever()
```
 Hope it helps.



