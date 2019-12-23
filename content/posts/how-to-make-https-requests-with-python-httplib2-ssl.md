
+++
title = "how to make https requests with python httplib2 ssl"
date = "2018-02-02"
author = " "
cover = ""
description = ""
category = ["ssl","python","httplib"]
+++

Here are few snippets to make **secure** **http** requests using various python libraries.

 ### httplib2

 import httplib2 link = "https://example.com h = httplib2.Http(".cache") r, content = h.request(link, "GET")  ##### another exmaple

 import httplib2 h = httplib2.Http(".cache") h.add\_credentials('user', 'pass') r, content = h.request("https://api.github.com", "GET") print r['status'] print r['content-type']  ### Urllib2

 Here is a simmilar example using **urlib2** for comparison and lines of code.

 import urllib2 gh\_url = 'https://example.com' auth\_handler = urllib2.HTTPBasicAuthHandler() auth\_handler.add\_password(None, gh\_url, 'user', 'password') opener = urllib2.build\_opener(auth\_handler) urllib2.install\_opener(opener) handler = urllib2.urlopen(gh\_url) print handler.getcode() print handler.headers.getheader('content-type')  ### Requests

  The easiest, has always been **requests**. 

 import requests r = requests.get('https://example.com') #r = requests.get('https://example.com', auth=('user', 'pass')) print r.status\_code print r.headers['content-type']  Hope this helps.



