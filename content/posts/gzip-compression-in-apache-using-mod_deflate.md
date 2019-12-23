
+++
title = "gzip compression in apache using mod_deflate"
date = "2013-01-19"
author = " "
cover = ""
description = ""
category = ["how to","web","utility"]
+++

[HTTP Compression](http://en.wikipedia.org/wiki/HTTP_compression) is a very simple and effective way to save bandwidth and improve web applications performance over network.

 Output compression is basically a process of compressing web servers response by using a loss-less compression algorithm called [gzip](http://en.wikipedia.org/wiki/Deflate). 

 This technique is fairly modern and almost all modern browsers honor it, however if a page is requested from a browser which does not send a header Accept-Encoding: gzip,deflate then the response comes back uncompressed.

 In Apache under Ubuntu OS this is fairly simple.

 **Enable mod\_deflate in Apache2 **sudo a2enmod deflate

 **configure /etc/apache2/httpd.conf mod\_deflate ** by adding content mentioned below.

 ```
# compress text, html, javascript, css, xml:
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE application/x-javascript
# Or, compress certain file types by extension:
<files *.html>
SetOutputFilter DEFLATE
</files>

```
 **Restart apache to anable the changes** sudo apachectl graceful 

  There is another powerfull apache module called mod\_gzip which can precompress output as well. 

 Hope this helps.



