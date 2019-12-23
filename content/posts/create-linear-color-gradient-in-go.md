
+++
title = "Create linear color gradient in go "
date = "2017-08-28"
author = " "
cover = ""
description = ""
category = ["golang"]
+++

Go doesn't have any builtin gradient functions to paint/fill the background of a raster, however it has all the required primitives one needs to create a very basic linear gradient.

 Here is a basic code which defines a 256 x 256 image, then calculates the value of each pixel in the raster based on a linear interpolation formula.

  

```package main

import (
	"image"
	"image/color"
	"image/png"
	"log"
	"os"
	"os/exec"

)
var(
	colorB = [3]float64{248, 54, 0}
	colorA = [3]float64{254, 140, 0}
)

var(
	width = 256
	height = 256
	max = float64(width)
)

func linearGradient(x, y float64) (uint8, uint8, uint8) {
	d := x/max
	r := colorA[0] + d * (colorB[0] - colorA[0])
	g :=  colorA[1] + d * (colorB[1] - colorA[1])
	b :=  colorA[2] + d * (colorB[2] - colorA[2])
	return uint8(r), uint8(g), uint8(b)
}

func main() {

	var w, h int = width, height
	dst := image.NewRGBA(image.Rect(0, 0, w, h)) //*NRGBA (image.Image interface)

	for x := 0; x < w; x++ {
		for y := 0; y < h; y++ {
			r, g, b := linearGradient(float64(x), float64(y))
			c := color.RGBA{

				r,
				g,
				b,
				255,
			}
			dst.Set(x, y, c)
		}
	}

	img, \_ := os.Create("new.png")
	defer img.Close()
	png.Encode(img, dst) //Encode writes the Image m to w in PNG format.

	Show(img.Name())

}

// show  a specified file by Preview.app for OS X(darwin)
func Show(name string) {
	command := "open"
	arg1 := "-a"
	arg2 := "/Applications/Preview.app"
	cmd := exec.Command(command, arg1, arg2, name)
	err := cmd.Run()
	if err != nil {
		log.Fatal(err)
	}
}



```
 Here is how the generated image looks like

  ![](/media/new.png) 

  Function linearGradient is where all the magic happens, this method takes in x and y pixel locations and then calculates the appropriate gradient value based on the maximum width (256) to produce a horizontal gradient, now if one was to change the the d := x/max to d := y/max, this now becomes a top down-gradient instead of left-right (our image is 256x256 hence max of both width and height is 256) like so 

 ![](/media/linear-gradient-vertical.png)

 or swap colors arrays to get a differrent affect. ### Circular Gradient

 To get something like a circular gradient replace linearGradient function with circularRadient

  

```func circularGradient(x, y float64) (uint8, uint8, uint8) {
	var dx, dy float64 = cenX - x, cenY - y
	d:= math.Sqrt(dx*dx+dy*dy)
	p := d/255
	 
		r := colorA[0] + p*(colorB[0]-colorA[0])
		g := colorA[1] + p*(colorB[1]-colorA[1])
		b := colorA[2] + p*(colorB[2]-colorA[2])
		return uint8(r), uint8(g), uint8(b)
	 
}

```
  This should result in an image like below 

 ![](/media/circular-gradient.png)

 or if you want to confine it to the circle try this  

```func circularGradient(x, y float64) (uint8, uint8, uint8) {
	var dx, dy float64 = cenX - x, cenY - y
	d:= math.Sqrt(dx*dx+dy*dy)
	p := d/255
	if d < 128 {
		r := colorA[0] + p*(colorB[0]-colorA[0])
		g := colorA[1] + p*(colorB[1]-colorA[1])
		b := colorA[2] + p*(colorB[2]-colorA[2])
		return uint8(r), uint8(g), uint8(b)
	}

	return 0,0,0

}


```
  ![](/media/circular-gradient-2.png)

 Hope this helps.



