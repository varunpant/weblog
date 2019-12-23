
+++
title = "Avoid  console errors in browsers that lack a console"
date = "2013-01-30"
author = " "
cover = ""
description = ""
category = ["javascript","programming","web"]
+++

I love JavaScript and code a lot in it .Since I code, I also encounter problems and bugs from time to time and therefore need a Debugger and a debug mechanism to view whats going on.

 In good old days when I learned this language, I used JavaScript's inbuilt alert mechanism to view the value of a variable or a property of an object. This was a terrible mechanism, calling alert was blocking, one had to press OK to continue and if you had to take a look inside an array then well it was emotionally an overwhelming task is all I would say here.

 There were of course workarounds and techniques(like printing in a text area) but I guess people soon realized the need of console like mechanism which is present in other languages.

 I had my first encounter with console in FF and right there I had a Nerdgasm. It was nice , easy to use and simply put beautiful, and then chrome came in and did it even better. Today id you print an xml object then good capable consoles will actually pretty print the markup and objects will be printed in a tree structure thus a JavaScript programmer can breathe easy, well almost.... we still have IE to haunt us for ever.

 IE will as always screw with your happiness and will find a way to make you do something extra and different . To enable console in IE, Click the "Script" tab, then click "Console" on the right, however your JavaScript will throw error if you simply use console.log without enabling it, which we can safely assume our users will not.

 Here is a workaround

 HTML5 Boilerplate guys present us with this technique

 ```javascript
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

```
 my personal fav is this

 ```javascript
var log = function (text) {
    // if (!window.console) window.console = {};
    // if (!window.console.log) window.console.log = function () { };
    "use strict";

    if (typeof (console) !== "undefined" && console.log !== undefined) {
        try {
            console.log.apply(console, arguments);
        } catch (e) {
            var log = Function.prototype.bind.call(console.log, console);
            log.apply(console, arguments);
        }
    }
}

```
 use which ever you prefer. Hope this helps.



