
+++
title = "Read GAE Admin Backups fromLevelDB format and export GAE Entities using bulkloader"
date = "2016-01-11"
author = " "
cover = ""
description = ""
tags = ["gae","appengine","python"]
+++

Google datastore is pretty awesome when one needs a quick no-sql data storage. However recently I have experienced a problem in exporting my GAE Datastore as csv and in certain cases as a line delimited Json file. Its not very hard to do so and perhaps the easiest way to handle such thing is to write an export handler in you web app, however, there are alternative ways which I have highlighted below. 
 2. One of the easiest alternative is by using [ Datastore Admin .](https://console.cloud.google.com/project/_/datastore/settings?_ga=1.52544424.12031260.1450181862) This tool will easily let you backup you GAE DataStore Entities to google cloud storage in the same project which can later be downloaded locally, by using cloud console or gsutil like this gsutil cp -R /gs/your\_bucket\_name/your\_path /local\_target
 4. Then there is [Remote API for python and Java](https://cloud.google.com/appengine/docs/python/tools/remoteapi), which perhaps was created to modify the datastore directly via code from your local machine
 6. Finally there is a python utility called bulkloader.py which is coupled with **remote\_api**i , this utility does require python sdk to be installed and added to your system path.
 
 ### Using the Bulk Loader Tool

 To quickly verify if **bulkloader** is correctly installed simply type bulkloader.py 
> If you have a Python application, you can use the appcfg.py upload\_data and appcfg.py download\_data commands to do data uploads and downloads. These are equivalent to bulkloader.py, but can also derive the application ID and the remote API URL from your app.yaml file. (Future releases may make more bulkloader features available via appcfg.py; check the App Engine website for the latest.) f you have a Java application, you just run the bulkloader.py tool, specifying the application ID and remote API URL as command-line arguments: bulkloader.py --app*id=app-id --url=http://app-id.appspot.com/remote*api The loader tool keeps track of its progress during an upload or download in a data file and can begin from where it last left incase the process is interrupted, this feature requires sqlite3 installed though which can be verified by typing squlite3 in the shell. One of the easiest features of the bulk loader to use is the backup and restore feature. The bulk loader can download every entity of a given kind to a data file, and can upload that data file back to the app to restore those entities. #### To Download all entities

  bulkloader.py --dump --app*id=app-id --url=http://app-id.appspot.com/remote*api --kind=kind --filename=backup.dat #### To Upload all entitites

  bulkloader.py --restore --app*id=app-id --url=http://app-id.appspot.com/remote*api --kind=kind --filename=backup.dat  
> When using --dump and --restore, entities are not validated using the app’s model classes. They are dumped and restored directly as they appear in the datastore. Entity keys are preserved, including system-assigned numeric IDs. Properties with key values will remain valid as long as the entities they are referring to are in the app, or are part of the dump being restored. Restoring an entity with the same key as an existing entity will replace the existing entity. There are clever ways to read csv and upload data into appengine datastore using bulkloader which I will explain in another post, however for those who have been taking dumps using the admin tool, here is quick python code to read entities from the backup files which are in Googles [level DB format](https://github.com/google/leveldb) ```
import sys,datetime
sys.path.append('/usr/local/google\_appengine/')
sys.path.append('/usr/local/google\_appengine/lib/yaml/lib/')
if 'google' in sys.modules:
    del sys.modules['google']

from google.appengine.api.files import records
from google.appengine.datastore import entity\_pb
from google.appengine.api import datastore
import unicodecsv as csv
from pprint import pprint

toCSV = []

def getKeyName(r):
    entity\_proto = entity\_pb.EntityProto(contents=r)
    for element in entity\_proto.key().path().element\_list():
        if element.has\_name():
            return element.name()

def getProto(r):
    entity\_proto = entity\_pb.EntityProto(contents=r)
    return datastore.Entity.FromPb(entity\_proto)

fls = ['output-0','output-1','output-2','output-3','output-4']
for f in fls:
    raw = open(f, 'r')
    reader = records.RecordsReader(raw)

    for record in reader:
            entity = getProto(record)
            entity[u"name"] = getKeyName(record)
            # pprint(entity)

            toCSV.append(entity)
            print "-"*50

            # pprint(entity)

            # for key in entity.keys():
            #     print key + " - " + str(type(entity[key]))

keys = toCSV[0].keys()
with open('settings.csv', 'wb') as output\_file:
    dict\_writer = csv.DictWriter(output\_file, keys,encoding='utf-8')
    dict\_writer.writeheader()
    dict\_writer.writerows(toCSV)

```


