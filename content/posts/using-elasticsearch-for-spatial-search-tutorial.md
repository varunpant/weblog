
+++
title = "Using ElasticSearch for Spatial Search tutorial"
date = "2014-07-20"
author = " "
cover = ""
description = ""
category = ["elasticsearch","geo_point","geo_distance","search","web"]
+++

In this post I will demonstrate using [ElasticSearch](http://www.elasticsearch.org/) to spatially query records and filter them by attributes.

 [ElasticSearch](http://www.elasticsearch.org/) is built on top of [Lucence](http://lucene.apache.org/) which in version 4.0 supports Spatial query features, for those interested here is an [example](http://svn.apache.org/viewvc/lucene/dev/branches/branch_4x/lucene/spatial/src/test/org/apache/lucene/spatial/SpatialExample.java?view=markup) and [link](http://lucene.apache.org/core/4_0_0/spatial/index.html) to javadocs.

 You will need to install [ElasticSearch](http://www.elasticsearch.org/), read about installing it [here](http://www.elasticsearch.org/guide/en/elasticsearch/guide/current/_installing_elasticsearch.html), also install [marvel](http://www.elasticsearch.org/guide/en/marvel/current/) plugin for configuration and testing.

 For this demonstration I have used data from [Geofabrik](http://download.geofabrik.de/). I have used **point.shp** file from [Great Britan](http://download.geofabrik.de/europe/great-britain.html) but you can use data from any other country as well.

 To extract the data,I wrote a quick python script using [pyshp](https://code.google.com/p/pyshp/) library

 One can easily install it by typing sudo easy\_install pyshp in shell

 ### Mapping type setup

 Before uploading the records we need to create an Index in elasticsearch and apply schema mapping where we will instruct elasticsearch to create a geo index on location attribute.

 We can do this easily by issuing a curl request

  curl -XPUT http://localhost:9200/places -d ' { "mappings": { "place": { "properties": { "id": {"type": "double"}, "name": {"type": "string"}, "type": {"type": "string"}, "location": {"type": "geo\_point"} } } } }  Once the schema for index places has been set up, its now time to add records to the index.

 In the python script below modify the name of the shape file path and execute.

  import shapefile import urllib2 import json sf = shapefile.Reader("points") sr = sf.shapeRecords() for r in sr: try : if r.record[2].strip() and r.record[3].strip(): req = urllib2.Request('http://localhost:9200/places/place/') req.add\_header('Content-Type', 'application/json') data = {'id': r.record[0].strip(),'name':r.record[2].strip(),'type':r.record[3].strip(),'location':{'lat':r.shape.points[0][1],'lon':r.shape.points[0][0]}} response = urllib2.urlopen(req, json.dumps(data)) print r.record[2] except Exception,e: print e #print "ERROR ",r.record[0],r.record[2],r.record[3] , r.shape.points[0][0], r.shape.points[0][1] pass  The script inserts all records which have a valid **name** and **type** column into index.

 ### Verify

 Once complete we can quickly verify the number of records in the index by issuing.

 GET places/\_count from **marvel** or from a browser http://localhost:9200/places/\_count

 ### Spatial Search

 In **Marvel/Sense**

  GET places/\_search { "sort" : [ { "\_geo\_distance" : { "location" : { "lat": 51.5286416, "lon": -0.10159870000006777 }, "order" : "asc", "unit" : "km" } } ], "query": { "filtered" : { "query" : { "match\_all" : {} }, "filter" : { "geo\_distance" : { "distance" : "20km", "location" : { "lat": 51.5286416, "lon": -0.10159870000006777 } } } } } }  or by **curl**

  curl -XGET 'http://localhost:9200/places/place/\_search?pretty=true' -d ' { "sort" : [ { "\_geo\_distance" : { "location" : { "lat": 51.5286416, "lon": -0.10159870000006777 }, "order" : "asc", "unit" : "km" } } ], "query": { "filtered" : { "query" : { "match\_all" : {} }, "filter" : { "geo\_distance" : { "distance" : "20km", "location" : { "lat": 51.5286416, "lon": -0.10159870000006777 } } } } } }'  To search by **Geodistance** as well as a **term filter**, modify the query to.

  GET places / \_search ? size = 100 & from = 0 { "sort": [{ "\_geo\_distance": { "location": { "lat": 51.5286416, "lon": -0.10159870000006777 }, "order": "asc", "unit": "km" } }], "query": { "filtered": { "query": { "bool": { "should": [{ "term": { "type": "pub" } }] } }, "filter": { "geo\_distance": { "distance": "1km", "location": { "lat": 51.5286416, "lon": -0.10159870000006777 } } } } } }  For better visualisation I have created a nice webapp [here](https://github.com/varunpant/AroundMe).

 ![Web App](https://raw.githubusercontent.com/varunpant/AroundMe/master/screenshot.png)

 Hope this helps

 

