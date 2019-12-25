
+++
title = "Gheat Java – Heat maps"
date = "2014-01-24"
author = " "
cover = ""
description = ""
tags = ["utility","gis","general","java"]
+++

[![heat_map](http://varunpant.com/static/resources/heat_map_thumb.jpg "heat_map")](http://varunpant.com/static/resources/heat_map_2.jpg) 

 A **heat map** is a graphical representation of data where the individual values contained in a [matrix](http://en.wikipedia.org/wiki/Matrix_(mathematics)) are represented as colors.

 This article will attempt to explain the process or creating and using [GHEAT-JAVA](https://github.com/varunpant/GHEAT-JAVA), which is a port of famous aspen based [gheat](https://code.google.com/p/gheat/) and took great inspiration from [Gheat.net](http://www.codeproject.com/Articles/88956/GHeat-NET)

 Writing a service which would serve heat map tiles is a bit tricky,there are three major components involved

 
 2. The client part i.e. some kind of mapping library which has a concept of layer, I chose Google maps. 
 4. The data source part, i.e. a spatially aware database or an in memory data structure, I have used postgres ,an in memory quad tree and a flat file as data sources. 
 6. The renderer part or basically the code which excepts requests , parses tile bounds, fetches data and then renders gradients on the tile and later colorizes them. 
 
  

 ### The Tiling layer (Client part)

 Google maps allows developers to add a custom layer , the code looks like this

 ```function getHeatMapObject(colorScheme) {
            var heatMapOptions = {
                getTileUrl:function (tile, zoom) {

                    return 'http://localhost:8080?colorScheme=' + colorScheme + '&zoom=' +
                            zoom +
                            '&x=' + tile.x +
                            '&y=' + tile.y; //+
                    //remove this bit if browser caching is desired
                    '&rand=' + Math.random();
                },
                tileSize:new google.maps.Size(256, 256),
                isPng:true,
                releaseTile:function (tile, zoom) {
                    //Called when a tile is out of view
                },
                name:colorScheme + "Heat Map"
            };
            return new google.maps.ImageMapType(heatMapOptions);
        }
```
 I have left the bit which deals with different color schemes out as its trivial. 

 ### The Data Source

 The service can query a spatial database, I have included a data provider for postgres. Here is the sample query which the application executes

 ```SELECT ST\_X(geom) as longitude,ST\_Y(geom) as latitude, weight as weight from mySpatialTable where geom @ ST\_MakeEnvelope(?,?,?,?,4326)"
```
 As its evident that a table is needed with x, y and weight columns, where x and y are the coordinates of datum in EPSG:4326 projection and weight is an integer between1 and 5

 I have also included an in-memory spatial data structure called [Quadtree](http://en.wikipedia.org/wiki/Quadtree) which is pretty ideal for fast spatial look up, look in App.java to see how to populate this data source.

 Finally there is a file data source which is pretty slow for large data lookup but is included anyways ;/

 ### The Renderer

 The rendering algorithm is as follows

 
 2. Parse the request and get tile bounds. 
 4. Use the bounds to query data source for points. 
 6. if the data source returns empty, return empty tile, 
 8. Otherwise 

	 2. Expand the height and width of tile by one dot width.(Apply padding) 
	 4. Generate a blank image of desired dimensions (256 x 256) 
	 6. Add gradient depending on the zoom level and weight for each point on the blank image. 
	 8. To the gray scale gradient map we add color pixel by pixel by mapping them to the color scheme which is 255 pixels high. 
	 10. Finally the tile is trimmed due to it having to be larger to accommodate points on the edges of a tile. 
	 
 
 10. Return heat map tile. 
 


