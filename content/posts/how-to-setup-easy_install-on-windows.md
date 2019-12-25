
+++
title = "How to setup easy_install on Windows"
date = "2012-05-06"
author = " "
cover = ""
description = ""
tags = ["general","python","programming","utility","how to","web"]
+++

 If one has been using python, then installing various libraries and modules is basically a breeze using easy\_install utility, however for folks using windows, easy\_install utility has to be setup properly before using it. 

  First lets make sure that python is properly installed and PYTHON\_HOME environment variable is configured: 

 #### Install Python on Windows

  If not already installed download python installer from [here.](http://python.org/download/) 

  After it's done downloading, double click to run the installer, and select default options (unless you have other custom needs of course ). 

  Once done lets quickly setup a **PYTHON\_HOME** environment variable which points to the python directory which contains python exe, in my case its c:/Python27, to set up environment variable right click "My Computer select properties Advanced Tab Environment Variables Button , add new environment variable and call it “PYTHON\_HOME” and set path to whatever is in your case, to make sure every thing is proper ,open NEW dos prompt and type echo %PYTHON\_HOME% and you should see the path you have entered. 

  Next open you environment variables GUI again as instructed above and this time locate your path variable, once found append %PTHON\_HOME% at the end by separating it with a semicolon. To check everything is setup properly open NEW command line and enterecho %PATH%, and you should see your entry at the end of the string. 

 Setup Easy\_Install
-------------------

  First we'll need to download [setuptools](http://pypi.python.org/pypi/setuptools).Download the exe and run it. 

  The directory that contains easy\_install is by defaultc:\<pythonfolder>\Scripts 

  All you need to do now is append %PYTHON\_HOME%\Scripts , separated by a semicolon ; at the end of path variable in your environment settings as instructed above, as usual enterecho %PATH% to confirm change, then open command promt and type easy\_install and you should see a warning (its ok we havent passed in a package name or url ) 

 
>   error: No urls, filenames, or requirements specified (see --help)   
>  
> 
>    And that’s it folks. Happy easy\_installing. 



