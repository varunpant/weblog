
+++
title = "Raphael-js-tutorial-part-II"
date = "2013-12-25"
author = " "
cover = ""
description = ""
category = ["how to","fun","javascript","programming","raphael js"]
+++

This is second part of the tutorial about getting started with [Raphael.js](http://raphaeljs.com/). To see this first part go [here](http://www.varunpant.com/posts/raphael-js-tutorial-part-i).

 #### Writing Text with Raphael

 Some code first ;) 
 ```javascript
var canvas = Raphael(0, 0, 250, 250 );

var t1 = canvas.text(50, 50, *"Some text Goes here"*);

var t2 = canvas.text(60,90,"First line \n Second Line \n Third line");

var t3 = canvas.text(214, 140, "1079").attr({"text-anchor":"middle",'font-size':16,"font-family":"arial","fill":"#fff"});
```
  In the above examples canvas.text will create a simple text element at 50,50. Strangely VML /SVG do not have Line breaks therefore the programmer is responsible for creating new lines,in most cases appending** '\n'** does the trick.

 While styling your text ,attribute text-anchor is quite important, it defaults to **'middle'** but can be changed to **start** and end as **well**.

 ### Default Attributes Styling and adding Custom Attributes

 Raphael honors [SVG Attribute](http://www.w3.org/TR/SVG/) Specification and lets the user customize them by [attr()](http://raphaeljs.com/reference.html#Element.attr) method.

 ```javascript
 canvas = Raphael(0, 0, 250, 250 );
// Creates circle at x = 125, y = 125, with radius 50
var circle = canvas.circle(125, 125, 50);
// Sets the fill attribute of the circle to red (#f00)
circle.**attr**("**fill**", "**blue**");
// Sets the stroke attribute of the circle to white
circle.**attr**("**stroke**", **"#fff**");
```
  #### Animation

 The library comes with an [animate](http://raphaeljs.com/reference.html#Element.animate) function which is perhaps one of my favorite implementation, its simple easy and packs a big punch.

 Animation is a basically a process of fiddling with the attributes of a vector in a timed routine, so lets say that we have a circle i.e

 ```javascript
 var circle = canvas.circle(125,125,50) 
 ```

 i.e. a circle with its center at 125,125 and radius 50 , so I want to animate the radius of the circle to say 25, I will simply do this

```javascript
var anim = Raphael.animation({r:25}, 1000);
circle.animate(anim);
```
 There are some helper methods built in like 

```javascript
 circle.animate(anim.delay(500)); // run the given animation after 500 ms
```
 **or** 
```javascript
circle.animate(anim.repeat(Infinity));
```

