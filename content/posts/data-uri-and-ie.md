
+++
title = "Data URI and IE"
date = "2010-06-15"
author = " "
cover = ""
description = ""
tags = ["programming","utility","web","data uri",".net"]
+++

Few days ago I was experimenting with a nifty technique of embedding images in web pages by base64 encoding them first and then using a standard known as [Data URI Scheme](http://en.wikipedia.org/wiki/Data_URI_scheme), which basically defines a method of assigning a ‘src’ of an image tag as a base64 serialized string, like this:

 ```css

background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUBAMAAACKWYuOAAAAMFBMVEX///92dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnYvD4PNAAAAD3RSTlMAACTkfhvbh3iEewTtxBIFliR3AAAAUklEQVQY02NgIBMwijgKCgrAef5fkHnz/y9E4kn+/4XEE6z/34jEE///A4knev7zAwQv7L8RQk40/7MiggeUQpjJff+zIpINykbIbhFSROIRDQAWUhW2oXLWAQAAAABJRU5ErkJggg==");

    
```
 Although this technique could save some server round trips, however Microsoft ver. (IE < 8). does not support this scheme even though its a [standard](http://tools.ietf.org/html/rfc2397), which then makes this technique unfavorable to use as its not cross browser.

 I was trying to find a work around and came across [MHTML hack](http://www.phpied.com/mhtml-when-you-need-data-uris-in-ie7-and-under/)which is not an elegant approach especially for dynamic solutions and is also not supported by Microsoft any more.

 I found an interesting [article](http://dean.edwards.name/weblog/2005/06/base64-ie/)by Dean Edwards, which suggested in IE <8 scenarios a request could be send back with base64 encoded data as a query string to server, where a server module would then de-serialize the image and write it back in response:

 Client Side:

 ```javascript
function urlEncode(str) {
    str = escape(str);
    str = str.replace(new RegExp('\\+', 'g'), '%2B');

    return str.replace(new RegExp('%20', 'g'), '+');
}

function assign() {
    document.getElementById("img1").src = "Handler.ashx?q=" + urlEncode("iVBORw0KGgoAAAANSUhEUgAAABkAAAAUBAMAAACKWYuOAAAAMFBMVEX///92dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnYvD4PNAAAAD3RSTlMAACTkfhvbh3iEewTtxBIFliR3AAAAUklEQVQY02NgIBMwijgKCgrAef5fkHnz/y9E4kn+/4XEE6z/34jEE///A4knev7zAwQv7L8RQk40/7MiggeUQpjJff+zIpINykbIbhFSROIRDQAWUhW2oXLWAQAAAABJRU5ErkJggg==");
}
    
```
 and on the server side one can use a generic http Handler like this

 ```csharp
 public class Handler: IHttpHandler { public void ProcessRequest(HttpContext
    context) { context.Response.ContentType = "image/gif"; try { string data
    = context.Request.QueryString["q"]; byte[] todecode\_byte = Convert.FromBase64String(data);
    context.Response.BinaryWrite(todecode\_byte); } catch (Exception e) { //Log
    } } }
```
 The only thing to note here is to URLEncode the string before sending it to avoid *FormatException* .

 This is not by any means an elegant solution and will work only for small images, as bigger images will serialize into large string chunks and browsers limits urls to 2083 characters, but I just thought writing a c# version of this approach would be interesting. :)



