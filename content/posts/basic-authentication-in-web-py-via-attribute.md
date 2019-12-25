
+++
title = "Basic authentication in web.py via attribute"
date = "2013-01-23"
author = " "
cover = ""
description = ""
tags = ["python","utility","how to","web.py"]
+++

Here I demonstrate the process of [Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication) in [web.py](http://webpy.org/) python web framework. 

 There is a proof of concept article [provided](http://webpy.org/cookbook/userauthbasic) in the main site,however I just thought doing the same via an attribute might be a cleaner solution.

 HTTP Basic authentication implementation is one of the easiest ways to secure web pages because it doesn't require cookies, session handling, or the development of login pages. Rather, HTTP Basic authentication uses static headers which means that no handshakes have to be done in anticipation,however the n the credentials are passed as [plain-text ](http://en.wikipedia.org/wiki/Plaintext)and could be intercepted. 

 The header looks something like this 

 WWW-Authenticate: Basic realm="*insert realm*" To construct the header

 Username and password are concatenated into a string "username:password" and this sting is encoded using [Base64](http://en.wikipedia.org/wiki/Base64) and then a constant string is prepended with a space **Authorization: Basic **. So the final value looks like Authorization: Basic dXNlcm5tYWU6cGFzc3dvcmQ= 

 To decode the string on server side, the reverse of above mentioned process is performed.

 ```
###############################################################################
# BASIC AUTH      #############################################################
###############################################################################

def check\_auth(username, password):
    return username == 'username' and password == 'password'


def requires\_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = web.ctx.env['HTTP\_AUTHORIZATION'] if 'HTTP\_AUTHORIZATION' in  web.ctx.env else None
        if auth:
            auth = re.sub('^Basic ', '', auth)
            username, password = base64.decodestring(auth).split(':')
        if not auth or not check\_auth(username, password):
            web.header('WWW-Authenticate', 'Basic realm="admin"')
            web.ctx.status = '401 Unauthorized'
            return Unauthorized()

        return f(*args, **kwargs)

    return decorated

class Unauthorized():
    def GET(self):
        return "401 Unauthorized"

    def POST(self):
        return "401 Unauthorized"
```
 So basically if a route handler needs authentication, all it needs is an attribute ```
@requires\_auth
class Index:
    def GET(self):
	pass;

```


 Hope this helps. 



