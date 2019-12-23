
+++
title = "Tilestache on google maps"
date = "2014-12-26"
author = " "
cover = ""
description = ""
category = ["tilestache"]
+++

### Introduction

  In this post I will demonstrate how to add custom TileStache map tiles on google maps, using google maps JavaScript API V3. TileStache has emerged as one of the easiest way to render your own map .There are many examples out there on creating basic tiles and then adding them on top of Leaftlet or Openlayers. In this post I will add them as an overlay on Google Maps. 

 ### Overlays

  In Google’s terminology, adding a map layer basically means adding an overlay. Here is an example on adding a [Ground Overlay.](https://developers.google.com/maps/documentation/javascript/examples/groundoverlay-simple) Here is another one called [Custom overlay.](https://developers.google.com/maps/documentation/javascript/examples/overlay-simple) Basically there is a concept of map types and is documented [here](https://developers.google.com/maps/documentation/javascript/maptypes) in great detail, just skip past the Standard map types and scroll to Custom Map Types. This example, of a [Basic Map Type](https://developers.google.com/maps/documentation/javascript/examples/maptype-base) proved to be most helpful. In case you are after adding your own Base Map, instead of an Overlay, then take a look at this [example](https://developers.google.com/maps/documentation/javascript/examples/maptype-image). 

 ### TileMill and TileStache

  Ok, so now lets quickly create a map server side. In my Map I have a Uk District polygon layer which have been computed to get a count score with UK Crime DataSet November 2014, I simply used Point inside a polygon feature in Qgis to get a score. Then I styled the data using Carto Css in TileMill to a get a Heat Map Like effect. ![](http://www.varunpant.com/static/resources/tilestachedemo/image00.png) 

 Here is the Carto Css if you are wondering.

  ```css
/* Color variables */
@r1:#28ee00;
@r2:#4fee00;
@r3:#77ee00;
@r4:#9fee00;
@r5:#c6ee00;
@r6:#eec600;
@r7:#ee9f00;
@r8:#ee7700;
@r9:#ee4f00;
@r10:#ee2800;
/* Layers */
#sectors {
  [zoom<8]
  {
    line-width:0.2;
    polygon-opacity:0.9;
  }
  [zoom>=8]
  {
  line-width:0.8;
   polygon-opacity:0.7;
  }

  [zoom>=12]
  {
  line-width:1;
   polygon-opacity:0.6;
  }
  [zoom>20]
  {
    line-width:1.2;
    polygon-opacity:0.4;
  }

  line-opacity: 1;
  [PNTCNT=0]{polygon-opacity:0;line-opacity:0;}
  [PNTCNT > 0][PNTCNT <= 24]{polygon-fill:@r1;line-color:#FFF;}
  [PNTCNT > 24][PNTCNT <= 48]{polygon-fill:@r2;line-color:#FFF;}
  [PNTCNT > 48][PNTCNT <= 72]{polygon-fill:@r3;line-color:#FFF;}
  [PNTCNT > 72][PNTCNT <= 96]{polygon-fill:@r4;line-color:#FFF;}
  [PNTCNT > 96][PNTCNT <= 120]{polygon-fill:@r5;line-color:#FFF;}
  [PNTCNT > 120][PNTCNT <= 144]{polygon-fill:@r6;line-color:#FFF;}
  [PNTCNT > 144][PNTCNT <= 168]{polygon-fill:@r7;line-color:#FFF;}
  [PNTCNT > 168][PNTCNT <= 192]{polygon-fill:@r8;line-color:#FFF;}
  [PNTCNT > 192][PNTCNT <= 216]{polygon-fill:@r9;line-color:#FFF;}
  [PNTCNT > 216]{polygon-fill:@r10;line-color:#FFF;}
}


```
 

  Its very easy to export Mapnik Configuration xml of your TileMill Project. ![](http://www.varunpant.com/static/resources/tilestachedemo/image02.png) 

  This is my Map configuration for TileStache. 
  ```javascript
{
  "cache":
  {
    "name": "Test",
    "path": "/tmp/stache",
    "umask": "0000"
  },
  "layers":
  {
     "sectors":
     {
         "provider": {"name": "mapnik", "mapfile": "crime.xml"},
         "projection": "spherical mercator"
     }
  }
}


```
 

  Finally start the server . TileStache-master/scripts/tilestache-server.py -c /path/to/my/configuration/tiles.cfg 

  ### Creating a Custom Overlay for Google Maps

 Its quite easy to add a TileStache Overlay on top of google maps. TileStache URLs are already based on a Google Maps-like scheme: /{layer name}/{zoom}/{column}/{row}.{extension} So we create a CoordMapType overlay. 
 ```javascript
 /** @constructor */
  function CoordMapType(tileSize) {
    this.tileSize = tileSize;
  }
  CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
    var img = ownerDocument.createElement('img');
    img.src="http://localhost:8080/sectors/"+ zoom+"/"+coord.x+"/"+ coord.y+".png";
    img.style.width = this.tileSize.width + 'px';
    img.style.height = this.tileSize.height + 'px';
    return img;
  };

```javascript
 and then we simply add this overlay to map to overlayMapTypes . ```
map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
    map.overlayMapTypes.insertAt(
      0, new CoordMapType(new google.maps.Size(256, 256)));

```
 and thats it, we are done. Here is a screenshot of how the map looks. 

  ![](http://www.varunpant.com/static/resources/tilestachedemo/image01.png) 

  I have added a working sample [here ](http://www.varunpant.com/static/resources/tilestachedemo/distribution.zip), incase you wanna check out the full source code. Hope this helps. 

 

