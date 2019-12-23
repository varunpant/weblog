
+++
title = "CCS3 only Loading Icon"
date = "2014-07-13"
author = " "
cover = ""
description = ""
category = ["css","html5","web"]
+++

I generally have been using loading gifs in my work most of the time to inform the user that the resources are being fetched asynchronously from the server.

  [Ajaxload](http://www.ajaxload.info/) website is perhaps one of the most used site to download a suitable gif.

 In this post I will demonstrate a css3 only way to create a nice loading simulation 

 ### Basic Code

 We will use nested divs to create the loading animation control  <div class="wrap"> <div class='circle'> <div class="clockNeedle"></div> </div> </div>    
 and css looks like this  body{ background-color: #fff; text-align: center; height: 100%; } html { height: 100%; overflow: hidden; } .wrap{ position: absolute; top:0; left:0; bottom:0; right:0; margin: auto; width: 150px; height: 150px; border: 1px solid transparent; } .circle{ width: 80%; height: 80%; border: 5px solid black; border-radius: 50%; position: absolute; bottom:0; margin-left: auto; margin-right: auto; left:0; right:0; } .clockNeedle{ width: 50px; height: 5px; background: black; position: absolute; top: 50%; left: 10px; transform-origin:100% 50%; -webkit-transform-origin:100% 50%; -webkit-animation: needleAnimation 3s linear 0s infinite; animation: needleAnimation 3s linear 0s infinite; } /* Chrome, Safari, Opera */ @-webkit-keyframes needleAnimation { from { } to { -ms-transform:rotate(360deg); -moz-transform:rotate(360deg); -webkit-transform:rotate(360deg); } } @keyframes needleAnimation { from { } to { -ms-transform:rotate(360deg); -moz-transform:rotate(360deg); -webkit-transform:rotate(360deg); } }  

 ### Explanation

 Basically to form the outer circle we simply use a div and make it circular by applying **border-radius **property to **50%**  border-radius: 50%;

 Needle div is styled to have the same background as the wrap, then the width is made 50% and height is 5 px so it looks like a line. Later the a transform origin is applied to make it look like a clock needle and position it adjacent to the circle centre.

  Css line  animation: needleAnimation 3s linear 0s infinite; makes it rotate for infinite time.(it takes 3s for the animation to finish and repeat it self) 

 Hope you find this useful.

 ### Live

 See the Pen [bwnaL](http://codepen.io/varunpant/pen/bwnaL/) by Varun ([@varunpant](http://codepen.io/varunpant)) on [CodePen](http://codepen.io).

  [Here](http://codepen.io/varunpant/pen/bwnaL?editors=110) is a link to the actual demonstration

 ### Edit

 I also found another traditonal icon done in css3 [here](http://codepen.io/emgerold/pen/EwCxi) 

 See the Pen [Clean simple Ajax Spinner](http://codepen.io/emgerold/pen/EwCxi/) by emgerold ([@emgerold](http://codepen.io/emgerold)) on [CodePen](http://codepen.io).

 

