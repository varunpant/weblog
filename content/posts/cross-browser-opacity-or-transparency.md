
+++
title = "Cross Browser Opacity or Transparency"
date = "2013-01-22"
author = " "
cover = ""
description = ""
category = ["css","how to"]
+++

Css has a very useful property called Opacity, which basically is a measure of transparency of an element.

 All modern browsers *Yes yes even **IE*** has support for it. 

  In most browsers the value is between **0** *minimum [transparent] i.e not visible* to **1** *maximum [opaque] i.e. completely visible* 

  In **IE** the value is between 0 and 100 *,don't ask why they just like to make us unhappy.* 

  Here I present a helper css class which will work in all browsers. 
  ```css
.transparent {
 /* IE 5-7 */
  filter: alpha(opacity=50);

  /* IE 8 */
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";

  /* FF/Netscape */
  -moz-opacity: 0.5;

  /* Safari 1.x */
  -khtml-opacity: 0.5;

  /* Good browsers  (aka chrome ;) ) */
  opacity: 0.5;
}

```
 I hope you find this use full 



