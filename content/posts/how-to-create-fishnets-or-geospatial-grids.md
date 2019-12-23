
+++
title = "How to create fishnets or geospatial grids"
date = "2016-12-11"
author = " "
cover = ""
description = ""
category = ["gis","python","osgeo","gdal"]
+++

There are many use cases in GIS world, where the information has to be aggregated, an easy way to achieve this is via gridding or binning, where the area of interest is divided into small sections called grids or bins. 

 These sections are mostly of rectangular form (which can be easily converted into geotiffs), but in some cases even circles or hexagons are also used.

 ![](/media/image_963791002841481453621913.png)   
 

 You can read a good tutorial from [mapbox](https://www.mapbox.com/) using [Qgis](http://www.qgis.org/en/site/) with a [mmqgis](http://michaelminn.com/linux/mmqgis/) plugin [here](https://www.mapbox.com/blog/binning-alternative-point-maps/).

 While MMQGIS is a good enough for most use cases, I was looking for a way to create fishnets or grids by giving the bbox of the region and width/height in meters, which would then make it easy to script the process for any dynamic use.

 Luckily there is a "recipe" available which takes input in <EPSG:3857> projections and hence takes the width/height of grid cell in meter, [here](https://pcjericks.github.io/py-gdalogr-cookbook/vector_layers.html#create).

 The code is pretty easy to comprehend and creates simple polygons for each computed cell in the layer.

 import os, sys import ogr from math import ceil def main(outputGridfn,xmin,xmax,ymin,ymax,gridHeight,gridWidth): # convert sys.argv to float xmin = float(xmin) xmax = float(xmax) ymin = float(ymin) ymax = float(ymax) gridWidth = float(gridWidth) gridHeight = float(gridHeight) # get rows rows = ceil((ymax-ymin)/gridHeight) # get columns cols = ceil((xmax-xmin)/gridWidth) # start grid cell envelope ringXleftOrigin = xmin ringXrightOrigin = xmin + gridWidth ringYtopOrigin = ymax ringYbottomOrigin = ymax-gridHeight # create output file outDriver = ogr.GetDriverByName('ESRI Shapefile') if os.path.exists(outputGridfn): os.remove(outputGridfn) outDataSource = outDriver.CreateDataSource(outputGridfn) outLayer = outDataSource.CreateLayer(outputGridfn,geom\_type=ogr.wkbPolygon ) featureDefn = outLayer.GetLayerDefn() # create grid cells countcols = 0 while countcols < cols: countcols += 1 # reset envelope for rows ringYtop = ringYtopOrigin ringYbottom =ringYbottomOrigin countrows = 0 while countrows < rows: countrows += 1 ring = ogr.Geometry(ogr.wkbLinearRing) ring.AddPoint(ringXleftOrigin, ringYtop) ring.AddPoint(ringXrightOrigin, ringYtop) ring.AddPoint(ringXrightOrigin, ringYbottom) ring.AddPoint(ringXleftOrigin, ringYbottom) ring.AddPoint(ringXleftOrigin, ringYtop) poly = ogr.Geometry(ogr.wkbPolygon) poly.AddGeometry(ring) # add new geom to layer outFeature = ogr.Feature(featureDefn) outFeature.SetGeometry(poly) outLayer.CreateFeature(outFeature) outFeature.Destroy # new envelope for next poly ringYtop = ringYtop - gridHeight ringYbottom = ringYbottom - gridHeight # new envelope for next poly ringXleftOrigin = ringXleftOrigin + gridWidth ringXrightOrigin = ringXrightOrigin + gridWidth # Close DataSources outDataSource.Destroy() if \_\_name\_\_ == "\_\_main\_\_": # # example run : $ python grid.py <full-path><output-shapefile-name>.shp xmin xmax ymin ymax gridHeight gridWidth # if len( sys.argv ) != 8: print "[ ERROR ] you must supply seven arguments: output-shapefile-name.shp xmin xmax ymin ymax gridHeight gridWidth" sys.exit( 1 ) main( sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6], sys.argv[7] ) Here is an example usage: python grid.py grid.shp 992325.66 1484723.41 494849.32 781786.14 10000 10000

 Here is an example of a 10km/10 km grid

 ![](/media/image_1504214621671481454352189.png)

  Python scripts are generally usable in most use cases, how ever incase one needs a Postgis alternative, i.e a function which runs in Postgis database and creates a fishnet in a table, then It might be useful to use a query which I found [here](http://gis.stackexchange.com/questions/16374/how-to-create-a-regular-polygon-grid-in-postgis).

 CREATE OR REPLACE FUNCTION public.makegrid\_2d ( bound\_polygon public.geometry, grid\_step integer, metric\_srid integer = 3857 --metric SRID ) RETURNS public.geometry AS $body$ DECLARE BoundM public.geometry; --Bound polygon transformed to the metric projection (with metric\_srid SRID) Xmin DOUBLE PRECISION; Xmax DOUBLE PRECISION; Ymax DOUBLE PRECISION; X DOUBLE PRECISION; Y DOUBLE PRECISION; sectors public.geometry[]; i INTEGER; BEGIN BoundM := ST\_Transform($1, $3); --From WGS84 (SRID 4326) to the metric projection, to operate with step in meters Xmin := ST\_XMin(BoundM); Xmax := ST\_XMax(BoundM); Ymax := ST\_YMax(BoundM); Y := ST\_YMin(BoundM); --current sector's corner coordinate i := -1; <> LOOP IF (Y > Ymax) THEN --Better if generating polygons exceeds the bound for one step. You always can crop the result. But if not you may get not quite correct data for outbound polygons (e.g. if you calculate frequency per sector) EXIT; END IF; X := Xmin; <> LOOP IF (X > Xmax) THEN EXIT; END IF; i := i + 1; sectors[i] := ST\_GeomFromText('POLYGON(('||X||' '||Y||', '||(X+$2)||' '||Y||', '||(X+$2)||' '||(Y+$2)||', '||X||' '||(Y+$2)||', '||X||' '||Y||'))', $3); X := X + $2; END LOOP xloop; Y := Y + $2; END LOOP yloop; RETURN ST\_Transform(ST\_Collect(sectors), ST\_SRID($1)); END; $body$ LANGUAGE 'plpgsql';  I hope this helps.



