
+++
title = "how to read json from web http request of url via python urllib"
date = "2018-01-30"
author = " "
cover = ""
description = ""
category = ["python","http","web","urllib2"]
+++

I generally am looking for a quick snippet to issue an http request using urllib2 lib. 

 Here is a quick snippet to do so

  

```url = "https://api.waqi.info/mapq/bounds/?bounds=%20-180.0,-85.0,180.0,85.0"

import urllib2
import json
from pprint import pprint

req = urllib2.Request(url)
opener = urllib2.build\_opener()
f = opener.open(req)

#data varibale recieves the parsed json
data = json.loads(f.read())


print len(data)
for r in data:
    pprint(r)
    print "-"*50

```
 Hope this helps



