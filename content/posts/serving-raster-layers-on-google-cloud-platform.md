
+++
title = "Serving raster layers on Google Cloud Platform"
date = "2015-09-21"
author = " "
cover = ""
description = ""
tags = ["google","gis","google cloud storage"]
+++

In this blog post, I will write about using [Google cloud storage](https://cloud.google.com/storage/) as a Raster Tile Server for static imagery.

 In the GIS domain, various techniques are used to add custom raster overlay on top of a base maps, or to even use custom imagery, as a base map itself.

 This approach is also useful if you have a large quantity of satellite or aerial imagery, that you need to serve at scale onto a Google map or any other GIS tool.

 There are various clients out there for web as well as android or IOS, which provide an ability to add overlays while pointing to an external service for the image source.

 [Google Cloud Storage](https://cloud.google.com/storage/) serves as a perfect online, static imagery severing service.

 The general idea is to save map tiles, which are usually 256 x 256 sized images in the cloud and then point the client to the base url .

 Map tiles
---------

 Map tiles can have various naming standards and can vary based on map projection. 

 This article focuses on map tiles in a **z/x/y.png** naming standard, where **Z** is the current zoom level, and **X** is the **X coordinate** and **Y** is the **Y coordinate**, measured from the top left of the map for each zoom level.

 Google Maps, ESRI, Bing, Open Street Map, and others use this top left “standard.” However, the OGC standard, called TMS, starts from the bottom left.

 You can see the differences in the two examples below, which show a typical tiles file structure (**Z/X/Y.png**), where, in the 4th X column of zoom level 4, there are two images for the Y coordinates. 

 [![image](http://varunpant.com/static/resources/image_thumb.png "image")](http://varunpant.com/static/resources/image_2.png)

 Note that their names are different based on whether counting began at the **top left** or **bottom left**.

 The file structure in which your software exported the tiles will determine the logic you need to use in your application when you want to load a specific tile. 

 However, the file structure doesn’t impact the actual upload process.

 Generating Map Tiles
--------------------

 There are various open source tools , which can directly generate map tiles from a vector or raster data source. There is a great example [here](http://blog.cartodb.com/tiles-on-gcs/) from CartoDB, which shows how to generate raster tiles from geotiff or shape files (Any OGC data Source supported by GDAL tools)

 In this article , I will present an alternative way to do so, by using a python library called [Tilestache](http://tilestache.org/) .

 Tilestache is a map tiles server which seamlessly integrates with Google maps tiling scheme. It also provides a [seeding script](https://github.com/TileStache/TileStache/blob/master/scripts/tilestache-seed.py) which can generate tiles on the disk and has plugins to directly add those tiles in the google cloud. 

 I prefer [Tilestache](http://tilestache.org/) for various reasons, but most importantly because it is based on [Mapnik](http://mapnik.org/), therefore, one can use open source tools like [Tilemill](https://www.mapbox.com/tilemill/) by [mapbox](https://www.mapbox.com/) to style the maps and later export the [mapnik xml](https://www.mapbox.com/tilemill/docs/manual/exporting/) directly, which in-turn, can later be configured in [Tilestache](http://tilestache.org/) for generating highly styled images.

 Here is a quick example of styling states of America, the style used in TileMill is below

 ```#ne110madmin1statespr {
  line-color:#fff;
  line-width:1;
  polygon-opacity:0.5;
  text-name: "[name]";
  text-face-name: "Arial Bold";
}
#ne110madmin1statespr { polygon-fill: #FFFFCC; }
#ne110madmin1statespr[name\_len >= 4 ] { polygon-fill: #D9F0A3; }
#ne110madmin1statespr[name\_len >= 7] { polygon-fill: #ADDD8E; }
#ne110madmin1statespr[name\_len >= 10] { polygon-fill: #78C679; }
#ne110madmin1statespr[name\_len >= 13] { polygon-fill: #41AB5D; }
#ne110madmin1statespr[name\_len >= 15] { polygon-fill: #238443; }
#ne110madmin1statespr[name\_len >= 20] { polygon-fill: #005A32; }
```
 Here is how it looks. 

 [![image](http://varunpant.com/static/resources/image_thumb_1.png "image")](http://varunpant.com/static/resources/image_4.png)

 Now we can easily extract the mapnik xml from the tilemill. 

 Next step is to configure a tilestache config file which is essentially a json document which is used by rendering engine to draw tiles. Here is a sample configuration

 ```javascript
 {
  "cache":
  {
    "name": "Disk",
    "path": "tiles",
    "dirs": "portable",
    "umask": "0000"
  },
  "layers":
  {
    "NE":
    {
        "provider": {"name": "mapnik", "mapfile": "C:\\Users\\Varun Pant\\Desktop\\NE\\NE.xml"},
        "projection": "spherical mercator"
    }
  }
}
```
 Few things to note in the above configuration is the attribute **cache **and attribute **layers**. [Cache](http://tilestache.org/doc/TileStache.Caches.html) instructs the library to save the files onto the disk, the **dirs** attribute instructs the file structure to be of portable type which essentially means to save is **X/Y/Z.png** format on the disk.

 Now to start the webserver, one can simply type in tilestache-server.py -c ne.cfg 

 I have also added a quick javascript below, which shows ,how to add a custom overlay on google maps and point it to our raster service.

 ```javascript
 function CustomOverlay(tileSize) {
    this.tileSize = tileSize;
}
CustomOverlay.prototype.getTile = function(coord, zoom, ownerDocument) {
    var img = ownerDocument.createElement('img');
    img.src = "http://localhost:8080/NE/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
    img.style.width = this.tileSize.width + 'px';
    img.style.height = this.tileSize.height + 'px';
    return img;
};

var map;

function initialize() {
    map = new google.maps.Map(
        document.getElementById("map-canvas"), {
            center: new google.maps.LatLng(42.660851192127, -96.5624457296875),
            zoom: 4
        });

    map.overlayMapTypes.insertAt(0, new CustomOverlay(new google.maps.Size(256, 256)));
}

google.maps.event.addDomListener(window, 'load', initialize);
```
 If all goes well, then this is how the end result will look like.

 [![image](http://varunpant.com/static/resources/image_thumb_2.png "image")](http://varunpant.com/static/resources/image_6.png)

 Here is a [gist](https://gist.github.com/varunpant/aad7e87ea1c8af8a673a) with complete html mark-up.

 As stated above, tilestache also allows to just create static images on the disk instead of serving them, which is very usefull if one wants to serve these tiles fronted by a proxy or load it to cloud like Google or amazon data storage.

 The Command to do so is tilestache-seed.py –**c** <config name>.cfg –**l** <layername> –**b** <bounding box> **-e** png <list of zoom levels to render>

 In my case,I will use the bounding box of my shapefile and the command goes like this tilestache-seed.py -c ne.cfg -l NE -b 18.9161900000001420 -171.7911106028911700 71.3577635769417500 -66.9646599999999810 -e png 1 2 3 4 5 6 7 8 

 This is how the folders are created in my **cache directory**, which is configured in the **ne.cfg** shown above.

 [![image](http://varunpant.com/static/resources/image_thumb_3.png "image")](http://varunpant.com/static/resources/image_8.png)

  

 Uploading data to the cloud
---------------------------

 So now that we have our tiles generated, the next task is to upload them to the cloud.

 1. Sign in to the [Google Developers Console](https://console.developers.google.com/) and click Create Project. 

 [![image](http://varunpant.com/static/resources/image_thumb_4.png "image")](http://varunpant.com/static/resources/image_10.png)

 2.Enable billing. 

 3. Create a Google Cloud storage bucket, choose the appropriate location and storage class.

 [![image](http://varunpant.com/static/resources/image_thumb_5.png "image")](http://varunpant.com/static/resources/image_12.png)

 And that's it you are all set. Finally click the bucket name and you will have the following options 

 [![image](http://varunpant.com/static/resources/image_thumb_6.png "image")](http://varunpant.com/static/resources/image_14.png)

 The easiest way to upload folders and tiles here is to click upload folder button and point to the folders on the disk. This is by far the easiest method, however in our case we have only generated tiles for first 8 zoom levels, so they are not much in number and using a web UI upload mechanism will work.

 If we choose to generate large number of tiles and cover more than few countries we are possibly looking at millions to tiles specially around the street level (zoom 19 to 22), to cover such a scenario, I will recommend using another option in tilestache ,which directly allows saving the tiles in Google cloud storage. Tilestache, has a [plugin](http://tilestache.org/doc/TileStache.Goodies.Caches.GoogleCloud.html) which can be used instead of a disk based cache. here is how to configure it

 ```javascript
 {
  "cache":
  {
    "class": "TileStache.Goodies.Caches.GoogleCloud:Cache",
    "kwargs": {
      "bucket":  "daa-transfers-static",
      "access": "accesstoken",
      "secret": "clientsecret""
    }
  },
  "layers":
  {
    "NE":
    {
        "provider": {"name": "mapnik", "mapfile": "C:\\Users\\Varun Pant\\Desktop\\NE\\NE.xml"},
        "projection": "spherical mercator"
    }
  }
}
```
 You will notice that to work with this plugin,one needs to have **access token** and** client secret**. This can be easily generated using the [developer console](https://console.developers.google.com/). 

 To setup, follow these steps

 GS Security Credentials:

 
 2. Select the project for Google cloud storage [Google APIs Console] 
 4. Select Google Cloud Storage 
 6. Select Make this my default project for interoperable storage access. 
 8. Select Interoperable Access. 
 10. You can find **gs\_access\_key\_id** ,**gs\_secret\_access\_key** for your project. 
 
 [![image](http://varunpant.com/static/resources/image_thumb_7.png "image")](http://varunpant.com/static/resources/image_16.png)

 Once configured run the tile seed command again and now, the tiles would be directly stored in the bucket, to access them use the following format <http://storage.googleapis.com/><bucket\_name>/<path>/<tile.png>.

 In our case we can access the tiles like this.

 [http://storage.googleapis.com/states-demo/NE/8/68/103.png](http://storage.googleapis.com/states-demo/NE/8/68/103.png "http://storage.googleapis.com/states-demo/NE/8/68/103.png") , in the Html code given above, one can easily change the url from img.src = "http://localhost:8080/NE/" + zoom + "/" + coord.x + "/" + coord.y + ".png"; to img.src = "

 ```javascript
 [http://storage.googleapis.com/states-demo](http://storage.googleapis.com/states-demo/NE/)/NE/
```


