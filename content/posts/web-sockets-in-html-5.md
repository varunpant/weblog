
+++
title = "Web Sockets in HTML 5"
date = "2011-01-10"
author = " "
cover = ""
description = ""
category = ["programming","websockets","httppush",".net","javascript"]
+++

 HTML5 [WebSockets](http://en.wikipedia.org/wiki/WebSockets), defines a full-duplex communication channel that operates through a single socket over the web. **WebSocket** is not just another incremental enhancement to conventional HTTP communications, it represents a large advance, especially for real-time, [event driven](http://en.wikipedia.org/wiki/Event-driven_programming) web applications. 

  Normally when a browser visits a web page, an HTTP request is sent to the web server that hosts that page. The web server acknowledges this request and sends back the response. In many cases—for example, for stock prices, news reports, ticket sales, traffic patterns, medical device readings, and so on—the response could be stale by the time the browser renders the page. 

  Current attempts to provide real-time web applications largely revolve around polling and other server-side push technologies, the most notable of which is "[Comet](http://en.wikipedia.org/wiki/Comet_(programming))", which delays the completion of an HTTP response to deliver messages to the client. 

  There are many open source implementation of Http Push, one of my personal favorite is [APE](http://www.ape-project.org/) i.e. Ajax Push Engine. 

 
>   **Update**: Microsoft has added a small demo of HTML5 support , it comes as an extension to WCF (Windows communication foundation) .The links can be found [here](http://connect.microsoft.com/VisualStudio/feedback/details/520742/use-of-html-5-web-sockets-for-wcf-duplex-services-and-silverlight), [here](http://html5labs.interoperabilitybridges.com/media/1165/readme.htm) and [here](http://msdn.microsoft.com/en-us/magazine/ee309879.aspx). 
> 
>    There is still no news of Microsoft adding this feature in IE 9, at the time of writing this post, only Firefox 4, Chrome 4, Safari 5 and Opera 11 and above have support for this feature. 

 
>   **Update**: Due to security flaw Firefox and Opera have disabled their support for Web Sockets, more info can be found [here](http://www.webmonkey.com/2010/12/security-flaws-force-firefox-opera-to-turn-off-websockets/). 
> 
>    For those interested here is the [draft](http://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-03) , official [website](http://websocket.org/), the [API](http://dev.w3.org/html5/websockets/) and a nice [tutorial](http://net.tutsplus.com/tutorials/javascript-ajax/start-using-html5-websockets-today/). 

  To establish a WebSocket connection, the client and server upgrade from the HTTP protocol to the WebSocket protocol during their initial handshake, as shown in below, note that this connection description represents draft 76 of the protocol, the connection handshake may change during future specification revisions. 

 
>   **From client to server:   
>  **GET /demo HTTP/1.1   
>  Host: example.com   
>  Connection: Upgrade   
>  Sec-WebSocket-Key2: 12998 5 Y3 1 .P00   
>  Sec-WebSocket-Protocol: sample   
>  Upgrade: WebSocket   
>  Sec-WebSocket-Key1: 4@1 46546xW%0l 1 5   
>  Origin: <http://example.com>  
>  [8-byte security key] 
> 
>     
>  **From server to client**:   
>  HTTP/1.1 101 WebSocket Protocol Handshake   
>  Upgrade: WebSocket   
>  Connection: Upgrade   
>  WebSocket-Origin: <http://example.com>  
>  WebSocket-Location: ws://example.com/demo   
>  WebSocket-Protocol: sample   
>  [16-byte hash response] 
> 
>    I was trying to find an alternative which is comfortable enough to be used in my pet projects in Microsoft Tech stack, at the time of writing I couldn’t any so I here it is my very own HTTP Web Socket server written in .Net via C#, this implementation does not use WCF and is basically written using HTTP Async Sockets, the client API is pretty straight forward 

 ```
var url = "ws://localhost:999&rdquo"
var sock = new WebSocket(url);
sock.onopen = function () {
    log("open");
    sock.send("Message….");
}
sock.onmessage = function (e) {
    log(e.data);
}
sock.onclose = function (e) {
    log(" closed");
}

```
  and that's it!!! I plan to add some more examples and perhaps come with something more concrete later, till then I hope you enjoy using this code sample and enhancing it as you desire. 

 [A complete example in c# can be downloaded from here ](http://www.varunpant.com/demo/WebSocketServer.rar)

