
+++
title = "sqlite3 Bulk Import CSV from command line"
date = "2013-01-29"
author = " "
cover = ""
description = ""
tags = ["general","database","sqlite"]
+++

I absolutely love [SQLite](http://www.sqlite.org/), be it windows, linux or mac, this light weight database never stops to amaze me.

 Few days ago I wanted to import a chunk of CSV data, which was 4 GB in size into a table in SQLite.

 I generally use Firefox 's [sqlite-manager](https://addons.mozilla.org/en-us/firefox/addon/sqlite-manager/) plug-in for usual tasks with SQLite database ,hence decided to use the import interface .

 I have had a very good experience with this GUI tool and it has rarely failed me, but this time I was disappointed. 

 The import process started normally, but my RAM started increasing rapidly till it was 60% and after 20 minutes I was presented with some kind of a stack overflow/out of memory exception,luckily SQLite website is also one of the best documented ones, a quick search brought me to the command line utility [page](http://www.sqlite.org/sqlite.html), which has a .import command which I was looking for.

 Before importing a CSV, you may want to have a well defined database structure,although this is not compulsory but I would highly recommend that you do that, once done then simply open the SQLite shell by typing **sqlite3** followed by the **database** file name, if you are in windows then you can download the command line utility packaged as an exe and open that via shell by typing in sqlite3 <filename> , the default separator is '**,**' , to change use .separator command in shell sqlite> .separator '**|**' 

 The next step is to let the utility know that you intend to use a CSV, by typing in sqlite> .mode csv and finally the import command 

 sqlite> .import <filename> <tablename> That should do it, there are more commands to configure the delimiter and the escape characters which can be found [here](http://www.sqlite.org/sqlite.html). 

 The entire import of 28122486 was finished in less than 6 minutes and surprisingly the SQLite file database took less space than the original CSV, the original file was 4.2 GB where as the SQLite file database file was only 3.13 GB, that's a whopping gig difference.

 I hope you find this useful and use SQLite more than you already do.



