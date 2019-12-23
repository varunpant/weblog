
+++
title = "Water Simulation"
date = "2010-09-25"
author = " "
cover = ""
description = ""
category = ["programming","silverlight","animation","simulation","water"]
+++

Its been a while since my last post, had been busy with office work…sigh!!!

 Anyways, I was poking around web to come up with interesting water simulation techniques, as you could see in many games these days, so I did find a reference to an old C-based technique, after little refinement, what I have is a water simulation which uses a very old algorithm based on two [heightmaps](http://en.wikipedia.org/wiki/Heightmap).

 As always it’s a grid based animation which divides the screen into a mesh(more slices better this simulation looks), I use a jagged array in c# to do this (load it with a texture of 640 X 480 dimension ), to animate I use another array of same dimensions, now to make every thing move I kinda do something like this

  for (int y = 1; y < 479; y++) { for (int x = 1; x < 639; x++) { this.currentState[x, y] = ((this.oldState[(x - 1), y] + this.oldState[(x + 1), y] + this.oldState[x, (y + 1)] + this.oldState[x, (y - 1)] >> 1) - this.currentState[x, y]); this.currentState[x, y] -= (this.currentState[x, y] >> 7); int data = (short)(1024 - this.currentState[x, y]); int a = (x - 640) * data / 1024 + 640; int b = (y - 480) * data / 1024 + 480; if (a >= 640) a = 639; if (a < 0) a = 0; if (b >= 480) b = 479; if (b < 0) b = 0; int textOffset = x + y * 640; bmp.Pixels[textOffset] = texture[(a + b * 640)]; } }  The choice of display entity(acting as viewport and display canvas) is [WritableBitmap](http://msdn.microsoft.com/en-us/library/system.windows.media.imaging.writeablebitmap.aspx), and rest is pretty much fun to play.

 [Click here to watch demo ](http://varunpant.com/static/resources/Silverlight/water.html) 

