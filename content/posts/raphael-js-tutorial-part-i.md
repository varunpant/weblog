
+++
title = "Raphael JS Tutorial - Part I"
date = "2013-03-10"
author = " "
cover = ""
description = ""
category = ["how to","html5","web","programming","javascript","raphael js"]
+++

[Raphael.JS](http://raphaeljs.com/) is a SVG/VML library which helps you to create quick vector shapes and images. Its very small and compact (only 86kb),easy to use,well documented and works in all browsers and yes even IE. Here is a list of all major browsers this library works on: [Chrome](http://en.wikipedia.org/wiki/Chrome_browser) 5.0+ [Firefox](http://en.wikipedia.org/wiki/Firefox) 3.0+, [Safari](http://en.wikipedia.org/wiki/Safari_(web_browser)) 3.0+, [Opera](http://en.wikipedia.org/wiki/Opera_(web_browser)) 9.5+ and [Internet Explorer](http://en.wikipedia.org/wiki/Internet_Explorer) 6.0+

,finally its distributed under [MIT license](http://raphaeljs.com/license.html). In this tutorial ,I intend to introduce basics of this library and help you get started. 

 Lets begin with some basic concepts. [Raphael.JS](http://raphaeljs.com/) uses the SVG W3C Recommendation and VML as a base for creating graphics, it hides quite a lot of technology specific nitty-gritties and instead present a unified api model . Here is a quick code sample

  // Creates canvas 250 × 250 at 0, 0 **var** canvas = Raphael(0, 0, 250, 250 ); // Creates circle at x = 125, y = 125, with radius 50 **var** circle = canvas .circle(125, 125, 50); // Sets the fill attribute of the circle to red (#f00) circle.attr(*"fill"*, *"#f00"*); // Sets the stroke attribute of the circle to white circle.attr(*"stroke"*, *"#fff"*);

