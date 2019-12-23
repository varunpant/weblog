
+++
title = "Importing CSV File Into SQL SERVER  Database using BULK INSERT"
date = "2013-03-11"
author = " "
cover = ""
description = ""
category = ["sqlserver","database","general"]
+++

 Importing data into a database from a delimited file is perhaps one of the most common tasks that one might have to perform. SQL server gives us an import utility which supports various data sources and has an intutive interface as well,however there is another way which can be utilized to quickly get the job done, its called [BULK INSERT](http://msdn.microsoft.com/en-us/library/aa225968(v=sql.80).aspx) 

  BULK INSERT is a SQL command which can be typed in management console,takes various parameters to control the import and is very simple to use. 

  A typical use would look like this:  GO BULK INSERT  from 'C:\sourceFile.csv' WITH ( FIELDTERMINATOR =',', ROWTERMINATOR ='\n' )  and that's it, the command will automatically read csv file, try to do any default type conversion(determined by the TargetTables colum types) and will fail if there are any errors. 

  There are many other properties which can be set to make import easy ti handle, the ones I typically use are  GO BULK INSERT  from 'C:\sourceFile.csv' WITH ( FIELDTERMINATOR =',', ROWTERMINATOR ='\n', CODEPAGE='RAW',--Helps in Determining the source/destination Encoding (UTF8 etc) MaxErrors = 999999-- This will allow 999999 errors to be ignored before the whole import fails. This is a workaround as its not possible to tell the importer to ignore errors completely. )  Here is a full syntax and supported properties, for their explanation, please visit < href="http://msdn.microsoft.com/en-us/library/aa225968(v=sql.80).aspx" >this 



