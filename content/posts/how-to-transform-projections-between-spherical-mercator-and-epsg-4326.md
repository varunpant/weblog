
+++
title = "How to transform projections between Spherical Mercator and EPSG 4326"
date = "2016-12-10"
author = " "
cover = ""
description = ""
tags = ["gis","python","osgeo","gdal"]
+++

 Projections in GIS are commonly referred to by their “EPSG” codes, these are identifiers managed by the European Petroleum Survey Group. 

 One common identifier is “<EPSG:4326>”, which describes maps where latitude and longitude are treated as X/Y values. 

 Spherical Mercator has an official designation of <EPSG:3857.> However, before this was established, a large amount of software used the identifier <EPSG:900913.> This is an unofficial code, but is still the commonly usedin many GIS systems.

  Any time you see the string “<EPSG:4326>”, you can assume it describes latitude/longitude coordinates.

  Any time you see the string “<EPSG:900913>”, it will be describing coordinates in meters in x/y.

 In python its quite easy to transform coordinates using [OGR](http://gdal.org/1.11/ogr/) and OSR tools with their python wrapper.

```def transform(pointX, pointY):  
    # Spatial Reference System  
    inputEPSG = 4326  
    outputEPSG = 3857  
  
    # create a geometry from coordinates  
    point = ogr.Geometry(ogr.wkbPoint)  
    point.AddPoint(pointX, pointY)  
  
    # create coordinate transformation  
    inSpatialRef = osr.SpatialReference()  
    inSpatialRef.ImportFromEPSG(inputEPSG)  
  
    outSpatialRef = osr.SpatialReference()  
    outSpatialRef.ImportFromEPSG(outputEPSG)  
  
    coordTransform = osr.CoordinateTransformation(inSpatialRef, outSpatialRef)  
  
    # transform point  
    point.Transform(coordTransform)  
  
    # return point in EPSG 3857  
    return point.GetX(), point.GetY()  

```
    
 

  Basically you can use coordTransform to transform any geometry (point,polygon,line e.t.c) between any osr supported projections.

 Hope this helps



