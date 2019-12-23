
+++
title = "How to Query a Shape file for Point inside a polygon using ogr python"
date = "2016-09-01"
author = " "
cover = ""
description = ""
category = ["gdal","ogr","how to","python","gis"]
+++

Recently I was trying to build a quick geo lookup service in python, which could be used like an "info tool" in QGIS. This task is trivial in almost all geospatial databases, however I wasn't able to find much online around querying a shape file.

 In this post I will demonstrate a simple python code to query a shape file which contains world countries. The file can be downloaded from [here](https://github.com/RandomEtc/shapefile-js/tree/master/thematicmapping).

 ![](/media/image_367885381841472742976614.png)

 Here is the code

  You will need python-gdal bindings. sudo apt-get install python-gdal 

from osgeo import ogr ogr.UseExceptions() from pprint import pprint path = "TM\_WORLD\_BORDERS\_SIMPL-0.3.shp" drv = ogr.GetDriverByName("ESRI Shapefile") ds = drv.Open(path, 0) result = ds.ExecuteSQL("select name from 'TM\_WORLD\_BORDERS\_SIMPL-0.3' where ST\_Intersects('TM\_WORLD\_BORDERS\_SIMPL-0.3'.geometry,makePoint(-0.2225382,51.5253007) )",dialect="SQLITE") c = result.GetFeatureCount() for i in range(c): print result.GetFeature(i).GetField(0) ds.ReleaseResultSet(result)   Hope this helps. 



