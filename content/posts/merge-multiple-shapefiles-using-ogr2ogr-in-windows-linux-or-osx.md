
+++
title = "Merge multiple Shapefiles using OGR2OGR in windows Linux or OSX"
date = "2014-12-22"
author = " "
cover = ""
description = ""
category = ["gdal","qgis"]
+++

### Introduction

 This post is aimed at providing assistance to folks who are trying to merge many shapefiles into one single file in either windows or linux environment. Stuff like this may seem obvious to power users of GDAL/OGR, but not to those that are just new to using these great free tools.

 ### Merging Shape (*.shp) Files on Windows

 Essentially, these commands will grab every shapefile in a directory, and merge them into a single file called “merged.shp”.

 ```for %f in (*.shp) do (
if not exist merged.shp (
ogr2ogr -f “esri shapefile” merged.shp %f) else (
ogr2ogr -f “esri shapefile” -update -append merged.shp %f -nln Merged )
)

```
### Merging Shape (*.shp) Files on OSX or Linux

 In Linux like environment it's even easier than one would imagine. Infact I am quite sure it should be a one liner for windows enviroment as well, will have to try one day :)

 ```for f in *.shp; do ogr2ogr -update -append merged.shp $f -f "ESRI Shapefile"; done;

```
### Merging Shape (*.shp) Files using QGIS

 Quite frankley I found this method to be the most slow of all, however this has GUI and should be fine for moderate size files.

 Open Qgis and click **Vector** on menu bar, then click on **Data Management Tools** and finally on **Merge shapefiles to one**

 ![](http://www.varunpant.com/static/resources/QgisMerge.png)

 This will open a dialog, which will ask for the input source folder and the destination file name , and thats it, click **OK**to begin the process.

 ![](http://www.varunpant.com/static/resources/qgismergeD.png)

 ### Creating Index using shapeindex

  After merging shapefiles , its most likely that one would like to create a spatial index. Here is how to do it. Migrate to the folder and execute shapeindex myShapeFileName.shp 

 ### Copying Ordinance Survey Vector Map shape files into singular folders

 Incase you are looking at a help full script to copy all similar named shape files from grid folders into dedicated layer named folders using python then I have a goodie for you ```
import fnmatch
import os
import shutil
import glob
from collections import defaultdict

groups = defaultdict(list)

basedir ='/Users/varunpant/Desktop/O vectormap'
mergeddir = os.path.join(basedir, 'merged')

def copyFiles(src,desti):

    files = glob.glob(src.replace('shp','*'))
    for f in files:
        shutil.copy(f, desti)


for root, dirnames, filenames in os.walk(basedir):
  for filename in fnmatch.filter(filenames, '*.shp'):
      basename, extension = os.path.splitext(filename)
      name = basename.split('\_')[1]
      groups[name].append(os.path.join(root, filename))

for group in groups:
    g = groups[group]

    directory = os.path.join(mergeddir, group)
    if not os.path.exists(directory):
       os.makedirs(directory)

    for n in g:
        copyFiles(n,directory)
        #print n


```
 

 

