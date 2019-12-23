
+++
title = "gdal 2 on mac with homebrew"
date = "2018-02-13"
author = " "
cover = ""
description = ""
category = ["gdal","homebrew","mac","gis"]
+++

GDAL is one of the most frequently used utility in my toolkit. I am writing this post to make it easier for others to install it from scratch on their macs. 

 ### Setting up GDAL

 The traditional way has always been to visit the dear old [kyngchaos.com](http://www.kyngchaos.com/software/frameworks), and install “GDAL Complete” Framework vi deb installer. Do make sure that GDAL Framework is in your path otherwise something like this always helps

  echo 'export PATH=/Library/Frameworks/GDAL.framework/Programs:$PATH' >> ~/.bash\_profile  source ~/.bash\_profile  

  To test your installation, run the Terminal command gdalinfo --version. 

 ### VIA Homebrew

 Below is the recipe to upgrade via homebrew to latest GDAL 2.

 **Update** 

 
>  **gdal2** is now a proper formulae brew install gdal2 should work.  If you have already installed GDAL via gdal formula brew install gdal, then you need to do the following to upgrade.

  

```bash
brew unlink gdal
brew tap osgeo/osgeo4mac && brew tap --repair
brew install jasper netcdf # gdal dependencies
brew install gdal2 --with-armadillo \
--with-complete --with-libkml --with-unsupported
brew link --force gdal2

```
  Finally Verify

 ```bash
gdal-config --version
2.1.1
gdal-config --libs
-L/usr/local/Cellar/gdal2/2.1.1/lib -lgdal
gdal-config --cflags
-I/usr/local/Cellar/gdal2/2.1.1/include

```


