
+++
title = "how to print bar chart in chrome browser console"
date = "2018-02-05"
author = " "
cover = ""
description = ""
tags = ["fun","javascript"]
+++

This post doesn't really have anything valuable to contribute, just some cool console trick.

 Have you ever wanted to plot out a chart, very quickly ? Did you ever had an urge to visualise a bunch of numbers without having to use a charting api or copy pasting the data in a spreadsheet ? If you did then you might even learn something today :)

 Here is a simple , yet neat way to plot out bunch of numbers in chrome console as a** horizontal bar chart.**

 ```javasript
 for(i = 5;i<20;i++){console.log(`%c ${Array(Math.round(i*2)).join('█')}`, 'color: crimson');}

 ```
  ![](/media/image.png)

    
 

 Hope you like it as much as I do as well :)



