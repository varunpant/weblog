
+++
title = "Inverse weighted distance interpolation in golang"
date = "2017-09-07"
author = " "
cover = ""
description = ""
tags = ["golang","algorithms"]
+++

**Inverse distance weighting** (IDW) is a type of deterministic method for multivariate **interpolation** with a known scattered set of points. The assigned values to unknown points are calculated with a **weighted** average of the values available at the known points.

 This technique, explicitly makes the assumption that things that are close to one another are more alike than those that are farther apart. To predict a value for any unmeasured location, IDW uses the measured values surrounding the prediction location. The measured values closest to the prediction location have more influence on the predicted value than those farther away. IDW assumes that each measured point has a local influence that diminishes with distance. It gives greater weights to points closest to the prediction location, and the weights diminish as a function of distance, hence the name inverse distance weighted.

 Here is an implementation in golang. The code reads from shapefile and then interpolates a 100 x 100 grid.

 ```package main

import (
	"fmt"

	"github.com/lukeroth/gdal"
	"math"
	"image"
	"image/color"
	"os"
	"image/png"
)

type point struct {
	x      int
	y      int
	weight float64
}

func readShapeFile(path string, rows int, cols int) ([]point, [6]float64) {

	dataset := gdal.OpenDataSource(path, 0)
	defer dataset.Release()

	layer := dataset.LayerByIndex(0)

	extent, \_ := layer.Extent(true)
	geotransform := [6]float64{}
	geotransform[0] = extent.MinX()
	geotransform[1] = (extent.MaxX() - extent.MinX()) / float64(cols)
	geotransform[2] = 0
	geotransform[3] = extent.MaxY()
	geotransform[4] = 0
	geotransform[5] = (extent.MinY() - extent.MaxY()) / float64(rows)

	fc, \_ := layer.FeatureCount(true)

	var points []point = make([]point, fc)
	for i := 0; i < fc; i++ {
		feature := layer.Feature(i)
		x, y, \_ := feature.Geometry().Point(0)
		X := int((x - geotransform[0]) / geotransform[1])
		Y := int((y - geotransform[3]) / geotransform[5])
		points[i] = point{X, Y, feature.FieldAsFloat64(1)}

	}
	return points, geotransform

}

func iwdistance(x int, y int, points []point, power float64, smoothing int) float64 {
	L := len(points)
	nominator := 0.0
	denominator := 0.0
	for i := 0; i < L; i++ {
		pt := points[i]
		dist := math.Sqrt(float64((x-pt.x)*(x-pt.x) + (y-pt.y)*(y-pt.y) + smoothing*smoothing));
		if dist < 0.0000000001 {
			return pt.weight
		}
		nominator = nominator + (pt.weight / math.Pow(dist, power))
		denominator = denominator + (1 / math.Pow(dist, power))
	}

	value := 0.0
	if denominator > 0 {
		value = nominator / denominator
	} else {
		value = -9999
	}
	return value
}

func drawGeoTiff(points []float32, cols int, rows int, geotransform [6]float64) {

	driver, err := gdal.GetDriverByName("GTiff")
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	dataset := driver.Create("idw.tif", cols, rows, 1, gdal.Float32, nil)
	defer dataset.Close()

	spatialRef := gdal.CreateSpatialReference("")
	spatialRef.FromEPSG(4326)
	srString, err := spatialRef.ToWKT()
	dataset.SetProjection(srString)
	dataset.SetGeoTransform(geotransform)
	raster := dataset.RasterBand(1)
	raster.SetNoDataValue(-1)
	raster.IO(gdal.Write, 0, 0, cols, rows, points, cols, rows, 0, 0)

}

func HSVtoRGB(h float64, s float64, v float64) (uint8, uint8, uint8) {

	i := math.Floor(h * 6);
	f := h*6 - i;
	p := v * (1 - s);
	q := v * (1 - f*s);
	t := v * (1 - (1-f)*s);
	r := 0.0
	g := 0.0
	b := 0.0
	switch int(i) % 6 {
	case 0:
		{
			r = v
			g = t
			b = p
		}
	case 1:
		{
			r = q
			g = v
			b = p
		}
	case 2:
		{
			r = p
			g = v
			b = t
		}
	case 3:
		{
			r = p
			g = q
			b = v
		}
	case 4:
		{
			r = t
			g = p
			b = v
		}
	case 5:
		{
			r = v
			g = p
			b = q
		}
	}
	return uint8(math.Floor(r * 255)), uint8(math.Floor(g * 255)), uint8(math.Floor(b * 255))
}

func getRGB(value float64) (uint8, uint8, uint8) {

	h := 10 - value/9;
	return HSVtoRGB(h, 1, 1)
}
func drawRaster(points []float32, cols int, rows int, name string) {
	dst := image.NewRGBA(image.Rect(0, 0, cols, rows))

	for x := 0; x < cols; x++ {
		for y := 0; y < rows; y++ {
			pw := float64(points[x+y*cols])
			r, g, b := getRGB(pw)

			c := color.RGBA{

				r,
				g,
				b,
				255,
			}

			dst.Set(x, y, c)
		}
	}

	img, \_ := os.Create(name)
	defer img.Close()
	png.Encode(img, dst)
}

func main() {

	w, h := 100, 100
	points, geotransform := readShapeFile("shp/points.shp", w, h)

	var power float64 = 2
	var smoothing int = 0

	buffer := make([]float32, w*h)
	for x := 0; x < w; x++ {
		for y := 0; y < h; y++ {
			pw := iwdistance(x, y, points, power, smoothing)
			buffer[x+y*w] = float32(pw)
		}
	}

	drawGeoTiff(buffer, w, h, geotransform)
	drawRaster(buffer, w, h, "idw.png")

}


```
  The results looks like this

  

 Geotiff

 ![](/media/idw-tiff.jpg)   

 coloured png

 ![](/media/idw.png) 

