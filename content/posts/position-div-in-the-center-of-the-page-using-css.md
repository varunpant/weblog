
+++
title = "Position div in the center of the page using css"
date = "2013-01-27"
author = " "
cover = ""
description = ""
tags = ["css","how to","programming","utility","web"]
+++

When I first started web programming, creating a center aligned div was one of the most common task that I saw myself doing. 

 since div is a block element, i.e. it takes up the full width available, and has a line break before and after it, it can easily be centered using relative styling 

 ```.center
{
 margin-left:auto;
 margin-right:auto;
 width:70%;
 background-color:#b0e0e6;
}
```
 However lately I have preferred using absolute positioning technique over relative, this works for all browsers and is best for login screens or alert messages over a translucent shim.

 ```.center{
    position: absolute;
    top: 50%;
    left: 50%;
    height: 200px;
    width: 200px;
    margin-left: -100px
    margin-top: -100px;
}
```
  In case yer wondering what is happening above, then here is a quick explanation.

 Absolute positioning works by treating the browser view port as a drawing board and top left and bottom right as axis-es. In the code above any element with center class will have top and left corners aligned to the center of the page, however since I need to align the center of the element with the page, I push them halfway to the right and half way to the top by applying negative margins.

 **Here is how the div would look inside view port without margins**   


 [![image center align top](http://varunpant.com/static/resources/imgalign2_2.png "image center align top")](http://varunpant.com/static/resources/imgalign2_2.png)

 **This is how it looks with them (Properly aligned to the center)** [![image center align ](http://varunpant.com/static/resources/divalighn1_4.png "image center align")](http://varunpant.com/static/resources/divalighn1_4.png)



