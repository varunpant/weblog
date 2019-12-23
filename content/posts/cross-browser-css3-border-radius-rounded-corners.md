
+++
title = "Cross browser CSS3 border-radius (rounded corners)"
date = "2013-01-22"
author = " "
cover = ""
description = ""
category = ["css","how to","util"]
+++

When I started programming and had to begin designing my first user interface in HTML, I was always puzzled as to why are all visual elements in HTML rectangular. I soon learned that in those days if one would want a circle to be drawn on a page, then the only way possible was using an image, the same was true for drawing elements with rounded corners.

 Thankfully HTML5/CSS3 guys were listening and the latest css3 standard supports defining the corner radius of a circle, this can be used to make an element look like a circle too if you want.

  Here I present a cross browser css3 class which will introduce a curve on otherwise rectangular elements. #### **Border-radius for modern browsers including IE9 **

  .curve{ -webkit-border-radius: 10px; /* Safari, Chrome */ -moz-border-radius: 10px; /* Firefox */ border-radius: 10px; /* CSS3 */ }  #### **Border-radius for IE (version < 9)**

 Download the [border-radius.htc](http://curved-corner.googlecode.com/files/border-radius.htc) file,and put it on the website.

  .curve{ behavior: url(http://mywebsite.com/border-radius.htc); }  If you would like to convert your rectangular element to circle the trick is to make your corner radius half the width/height of your shape and make sure that the shape is originally a square,i.e. height and width of the shape should be same.  #circular { height: 100px; width: 100px; -webkit-border-radius: 50px; -moz-border-radius: 50px; border-radius: 50px; }  In above example, a div of id *circular* with height and width of **100px** will look circular as the border radius is 100 / 2 = 50px . Hope this helps ;) 



