
+++
title = "how to make https requests with python httplib2 ssl"
date = "2018-02-02"
author = " "
cover = ""
description = ""
tags = ["ssl","python","httplib"]
+++

Here are few snippets to make **secure** **http** requests using various python libraries.

 ### httplib2

 ```python
 import httplib2

link = "https://example.com
h = httplib2.Http(".cache")
r, content = h.request(link, "GET")

```
 ### another exmaple

 ```python

import httplib2

h = httplib2.Http(".cache")
h.add_credentials('user', 'pass')
r, content = h.request("https://api.github.com", "GET")

print r['status']
print r['content-type']

```
 ### Urllib2

 Here is a simmilar example using **urlib2** for comparison and lines of code.

 ```python

import urllib2

gh_url = 'https://example.com'

auth_handler = urllib2.HTTPBasicAuthHandler()
auth_handler.add_password(None, gh_url, 'user', 'password')

opener = urllib2.build_opener(auth_handler)
urllib2.install_opener(opener)
handler = urllib2.urlopen(gh_url)

print handler.getcode()
print handler.headers.getheader('content-type')

```
 ### Requests

  The easiest, has always been **requests**. 

 ```python
 import requests

r = requests.get('https://example.com')
#r = requests.get('https://example.com', auth=('user', 'pass'))
print r.status_code
print r.headers['content-type']

```
 Hope this helps.



