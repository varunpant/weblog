
+++
title = "Importing Exporting CSV Files in PostgreSQL Databases via COPY"
date = "2013-03-11"
author = " "
cover = ""
description = ""
tags = ["database","utility","how to","postgres"]
+++

This is going to be a short article which will illustrate importing and exporting a table from or to a csv file using PostgreSQL [COPY](http://www.postgresql.org/docs/9.1/static/sql-copy.html) command.

 #### Importing a table from CSV

 Assuming you already have a table in place with the right columns, the command is as follows

 COPY <TargetTableName> **FROM** '/path/to/csv/SourceCSVFile.csv' DELIMITERS '**,**' CSV;

 #### Exporting a CSV from a table.

 COPY <SourceTableName> **TO** '/path/to/csv/TargetCSVFile' DELIMITERS '**,**' CSV;

 Its important to mention here that generally if your data is in unicode or need strict Encoding, then Always set client\_encoding before running any of the above mentioned commands.

 #### To set CLIENT\_ENCODING parameter in PostgreSQL

 set client\_encoding to **'UTF8'**

 or set client\_encoding to **'latin1'**

 Another thing to guard against is nulls, while exporting , if some fields are null then PostgreSQL will add **'/N'** to represent a null field, this is fine but may cause issues if you are trying to import that data in say SQL server.

 A quick fix is modify the export command by specifying what would you prefer as a null placeholder in exported CSV

 COPY <SourceTableName> TO '/path/to/csv/TargetCSVFile' DELIMITERS ',' **NULL as E''**;

 Another common requirement is import or export with the header.

 #### Import CSV to table with Header for columns present in first row of csv file.

 COPY <TargetTableName> **FROM** '/path/to/csv/SourceCSVFile.csv' DELIMITERS ',' CSV **HEADER**

 #### Export a table to CSV with Headers present in the first row.

 COPY <SourceTableName> **TO** '/path/to/csv/TargetCSVFile' DELIMITERS ',' CSV **HEADER**;

 A complete list of all supported settings can be found [here](http://www.postgresql.org/docs/9.1/static/sql-copy.html)

 ```COPY table\_name [ ( column [, ...] ) ]
    FROM { 'filename' | STDIN }
    [ [ WITH ] ( option [, ...] ) ]

COPY { table\_name [ ( column [, ...] ) ] | ( query ) }
    TO { 'filename' | STDOUT }
    [ [ WITH ] ( option [, ...] ) ]

where option can be one of:

    FORMAT format\_name
    OIDS [ boolean ]
    DELIMITER 'delimiter\_character'
    NULL 'null\_string'
    HEADER [ boolean ]
    QUOTE 'quote\_character'
    ESCAPE 'escape\_character'
    FORCE\_QUOTE { ( column [, ...] ) | * }
    FORCE\_NOT\_NULL ( column [, ...] ) |
    ENCODING 'encoding\_name'
```


