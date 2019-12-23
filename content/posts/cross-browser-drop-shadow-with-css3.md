
+++
title = "Cross browser drop shadow with CSS3"
date = "2013-01-23"
author = " "
cover = ""
description = ""
category = ["how to","util","css"]
+++

When **css3** arrived, one of the goodies that I found was, the inclusion of **Drop Shadow effect**, namely **Box Shadow **and **Text Shadow**. 

 Here I present a cross browser utility css class which can be used for a drop shadow effect, without any image. 

 .shadow { /* For IE 8 */ -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000')"; /* For IE 5.5 - 7 */ filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000'); -moz-box-shadow: 3px 3px 4px #000; -webkit-box-shadow: 3px 3px 4px #000; box-shadow: 3px 3px 4px #000; } For cross browser **text shadow** effect ,I found a nice article [here](http://www.workingwith.me.uk/examples/css-drop-shadows.html#final_example). * default setup that everything sees */ .shadow { /* needed for Internet explorer */ height: 1em; filter: Shadow(Color=#666666, Direction=135, Strength=5); /* Needed for Gecko */ line-height: 2em; white-space: nowrap; } /* * used by browsers which know about * :before to create the shadow */ .shadow:before { display: block; margin: 0 0 -2.12em 0.15em; padding: 0; color: #666666; } #shadow\_1:before { content: 'In shadow'; } #second\_2:before { content: 'Happy Shadowing!'; } /*\*/ html*.shadow { [color:red;/* required by Safari * so that [] is correctly * begun. associated with * the property, yet hiding * it. Seen by IE6 */ /* * seen by IE6 and Safari, but hidden * from Gecko */ text-shadow: #666666 5px 5px 5px; ]color:auto; /* resets color for IE6 */ }/**/ /* * end hack using dummy attribute selector * for IE5 mac */ .dummyend[id]{clear: both;} /*\*/ html*.shadow:before { [color:red;/* required by Safari. seen by IE6 */ /* * seen by IE6 and Safari, but hidden * from Gecko */ display: none; ]color:auto; /* resets color for IE6 */ }/**/ /* * end hack using dummy attribute selector * for IE5 mac */ .dummyend[id]{clear: both;} Hope this helps. 



