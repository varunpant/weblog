
+++
title = "Notepad++ with Python"
date = "2010-06-15"
author = " "
cover = ""
description = ""
tags = ["general","fun","python","notepad++"]
+++

After reading an excellent article by [Kazi Manzur Rashid](http://weblogs.asp.net/rashid/)on setting up a development environment for Iron Ruby using [Notepad++](http://notepad-plus-plus.org/), I was immediately struck with an idea of using the same excellent tool with Python 2.6.

 Now don’t get me wrong here, theoretically there is nothing wrong with IDLE, but having a light weight IDE for those who don’t want to use [Pydev](http://pydev.org/)plugin for [Aptana](http://www.aptana.com/)or [Eclipse](http://www.eclipse.org/), I think Notepad++ is indeed a nice little dev tool.

 One of the amazing capabilities in Notepad++ is that one can assign shortcuts like(Cntrl + F5) and debug/interpret python script with python interpreter.

 In order to Run python script from Run menu in Notepad++ you must Open Run > Run (or simply press F5), in the window that opens

  [ ![notepad_Run](http://www.varunpant.com/static/resources/notepad_Run_thumb.png "notepad_Run") ](http://www.varunpant.com/static/resources/notepad_Run.png) 

  cmd /K "$(FULL\_CURRENT\_PATH)"  this command assumes that Python path i.e.

  c:/PythonXX/Python.exe  or

  c:/PythonXX/Pythonw.exe  (If you don’t like console) is added in your Environment variables , if not you couldeither go to:

  My Computer -> Properties -> Advanced -> Environment Variables -> System Variables -> PATH –> Edit  and add this path there or use

  cmd /k C:\Python26\python.exe  then press save after putting in a friendly name and assigning a key board shortcut for example CNTRL + F5.

 You could now see your entry in Run drop down menu at the last, incase you want to edit or remove this go to Settings>Shortcut mapper and press Run Commands tab and then right click to choose options from context menu and your all set.

 Hope this helps :)



