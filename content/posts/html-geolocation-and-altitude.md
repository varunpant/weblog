
+++
title = "HTML Geolocation and Altitude"
date = "2014-12-21"
author = " "
cover = ""
description = ""
category = ["html5","maps","javascript"]
+++

HTML5 Geolocation is a feature which allows the browser on a computer or a mobile phone, to acquire the position from the wifi,2g/3g/4g network or GPS.

 The HTML Geolocation API is used to get the geographical position of a user. Since this can compromise user privacy, the position is not available unless the user approves it. The simplest way to use it through navigator.geolocation object  if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(showPosition); function showPosition(position) { alert(position.coords.latitude + " , " + position.coords.longitude); }  

  The latitude and longitude are available to JavaScript on the page, which in turn can send it back to the remote web server and do fancy location-aware things like finding local businesses or showing your location on a map, geofencing and a lot more. 

 The position object contains few more intresting parameters, but are generally available only when in use in smart phones as those devices are equipped with supporting hardware. Here is a table with detailed information.  Position Object PropertyTypeNotes coords.latitudedoubledecimal degrees coords.longitudedoubledecimal degrees coords.altitudedouble or nullmeters above the [reference ellipsoid](http://en.wikipedia.org/wiki/Reference_ellipsoid) coords.accuracydoublemeters coords.altitudeAccuracydouble or nullmeters coords.headingdouble or nulldegrees clockwise from [true north](http://en.wikipedia.org/wiki/True_north) coords.speeddouble or nullmeters/second timestampDOMTimeStamplike a Date() object  

 ### Handling Errors and Rejections

  The second parameter of the getCurrentPosition() method is used to handle errors. It specifies a function to run if it fails to get the user's location.  function showError(error) { switch(error.code) { case error.PERMISSION\_DENIED: x.innerHTML = "User denied the request for Geolocation." break; case error.POSITION\_UNAVAILABLE: x.innerHTML = "Location information is unavailable." break; case error.TIMEOUT: x.innerHTML = "The request to get user location timed out." break; case error.UNKNOWN\_ERROR: x.innerHTML = "An unknown error occurred." break; } }  

  Some popular mobile devices — like the iPhone and Android phones — support two methods of figuring out where you are. The first method triangulates your position based on your relative proximity to different cellular towers operated by your phone carrier. This method is fast and doesn’t require any dedicated GPS hardware, but it only gives you a rough idea of where you are. Depending on how many cell towers are in your area, “a rough idea” could be as little as one city block or as much as a kilometer in every direction. The second method actually uses dedicated GPS hardware on your device to talk to dedicated GPS positioning satellites that are orbiting the Earth. GPS can usually pinpoint your location within a few meters. The downside is that the dedicated GPS chip on your device draws a lot of power, so phones and other general purpose mobile devices usually turn off the chip until it’s needed. That means there will be a startup delay while the chip is initializing its connection with the GPS satellites in the sky. If you’ve ever used Google Maps on an iPhone or other smartphone, you’ve seen both methods in action. First you see a large circle that approximates your position (finding the nearest cell tower), then a smaller circle (triangulating with other cell towers), then a single dot with an exaction position (given by GPS satellites). 

  The getCurrentPosition() function has an optional third argument, a PositionOptions object. There are three properties you can set in a PositionOptions object. All the properties are optional. You can set any or all or none of them.  navigator.geolocation.getCurrentPosition(showPosition,{enableHighAccuracy:true, maximumAge:30000, timeout:27000});  

  Generally one would constantly need to acquire the current position of the device, for such a usecase there is another built in method called watchPosition The sinature will remind you of setTimeout and clearTimeout built in methods.  //This will start calling showPosition in a timedout manner where variable wpid acts as a reference. var wpid=navigator.geolocation.watchPosition(showPosition, geo\_error, {enableHighAccuracy:true, maximumAge:30000, timeout:27000}); //If you wanna stop the loop. //navigator.geolocation.clearWatch(wpid); // wpid=false;  Finally there is a full working example [here](http://www.varunpant.com/static/resources/google/geolocation.html). 

 





