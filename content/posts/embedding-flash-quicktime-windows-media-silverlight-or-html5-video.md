
+++
title = "Embedding Flash,Quicktime,Windows Media,Silverlight or HTML5 Video"
date = "2013-10-01"
author = " "
cover = ""
description = ""
category = ["snippet","utility"]
+++

### Flash Object

 This is quick Snippet which demonstrate how to embed flash object in a web page.

 ```html
 <object type="application/x-shockwave-flash"
  data="path-to-my-flash-file.swf"
  width="0" height="0">
  <param name="movie" value="your-flash-file.swf" />
  <param name="quality" value="high"/>
</object>
```
 ### Quicktime

 This is quick Snippet which demonstrate how to embed quicktime object in a web page

 ```html
 <object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B"
       codebase="http://www.apple.com/qtactivex/qtplugin.cab"
       width="200" height="16">
 <param name="src" value="pathToMyMovie.mov" />
 <param name="autoplay" value="true" />
 <param name="pluginspage" value="http://www.apple.com/quicktime/download/" />
 <param name="controller" value="true" />
 <!--[if !IE]> <-->
   <object data="movie.mov" width="200" height="16" type="video/quicktime">
     <param name="pluginurl" value="http://www.apple.com/quicktime/download/" />
     <param name="controller" value="true" />
   </object>
 <!--> <![endif]-->
</object>
```
 ### Windows Media

 This is quick Snippet which demonstrate how to embed Windows Media object in a web page.

 ```html
 <object type="video/x-ms-wmv"
  data="pathToMyMovie.wmv"
  width="320" height="260">
  <param name="src"
    value="pathToMyMovie.wmv" />
  <param name="autostart" value="true" />
  <param name="controller" value="true" />
</object>
```
 ### Silver Light

 This is quick Snippet which demonstrate how to embed Silverlight object in a web page.

 ```html
 <object width="300" height="300"
    data="data:application/x-silverlight-2,"
    type="application/x-silverlight-2" >
    <param name="source" value="SilverlightApplication1.xap"/>
</object>
```
 ### HTML5 Video

 ```html
 <video width="300" height="300" controls>
  <source src="pathToMyMovie.mp4" type="video/mp4">
  <source src="pathToMyMovie.ogg" type="video/ogg">
Your browser does not support the video tag.
</video>
```
  #### Supported Videoformats

   Browser MP4 WebM Ogg   Internet Explorer YES NO NO   Chrome YES YES YES   Firefox YES YES YES   Safari YES NO NO   Opera NO YES YES  



