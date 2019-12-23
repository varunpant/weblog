
+++
title = "Update the locate DB on OS X"
date = "2014-09-10"
author = " "
cover = ""
description = ""
category = []
+++

Apparently out OS X does not have an updatedb command like linux has, so I was stumped on how to update the locate database.

 I have quickly added this command here, incase I need to use it again.

```bash
sudo /usr/libexec/locate.updatedb 
```


