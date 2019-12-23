
+++
title = "Using Geotiff as datasource via gdal "
date = "2016-12-21"
author = " "
cover = ""
description = ""
category = ["python","gdal","osgeo","geotiff"]
+++

![](/media/image_377996742841482328085822.png)

 Recently, I have been working on algorithms which needs elevation data as well as Land Cover data, with world coverage. Google has an excellent elevation API however free usage comes with a limit. 

 While searching, I came across a dataset in [geotiff](https://en.wikipedia.org/wiki/GeoTIFF) format for [landcover](http://landcover.usgs.gov/global_climatology.php) as well as a [processed version](http://www.cgiar-csi.org/data/srtm-90m-digital-elevation-database-v4-1) of [world elevation](https://drive.google.com/drive/folders/0B_J08t5spvd8VWJPbTB3anNHamc). Elevation data comes in various resolution (250m,500m,1km), landcover is 500m .

 So how do we read it ? In python its quite easy to use[ osgo/gdal](https://pypi.python.org/pypi/GDAL/) library and read all bands. Geotiff is a rster file and values can be packed in every band (which is basically a 2d array).

 landUsageLookup = [ "Water", # 1 "Evergreen Needle leaf Forest", # 2 "Evergreen Broadleaf Forest", # 3 "Deciduous Needle leaf Forest", # 4 "Deciduous Broadleaf Forest", # 5 "Mixed Forests", # 6 "Closed Shrublands", # 7 "Open Shrublands", # 8 "Woody Savannas", # 9 "Savannas", # 10 "Grasslands", # 11 "Permanent Wetland", # 12 "Croplands", # 13 "Urban and Built-Up", # 14 "Cropland/Natural Vegetation Mosaic", # 15 "Snow and Ice", # 16 "Barren or Sparsely Vegetated" # 17 ] def getLandUsage(latitude, longitude): ds = gdal.Open("data/LCType.tif") gt = ds.GetGeoTransform() band = ds.GetRasterBand(1) px = int((longitude - gt[0]) / gt[1]) # x pixel py = int((latitude - gt[3]) / gt[5]) # y pixel structval = band.ReadRaster(px, py, 1, 1, buf\_type=gdal.GDT\_UInt16) lc = struct.unpack('h', structval)[0] return lc, landUsageLookup[lc]  The code sample above takes in Lat/Lng in wgs84 and convert them into 2d index.

 Hope this helps :)



