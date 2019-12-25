
+++
title = "How to use Google Appengine Remote API for Java"
date = "2016-03-22"
author = " "
cover = ""
description = ""
tags = ["appengine"]
+++

 

 Google App Engine Remote API enables programmers to access Google DataStore remotely from any python script or a Java Program.

 Remote api essentially is a generic web service, which allows datastore to be accessed from outside the app engine's environment therefore using this mechanism, users can either bulk insert data or modify existing data from their servers.

 With the help of remote api, data from one datastore can be copied to data on another app engine instance as well.

 ### Configuring Remote api on server - Java

 Configuring remote api on an app engine - java web application simply requires addition of a servlet in the web.xml.

 To install the Remote API servlet, add the following to your **web.xml**

 ```<servlet>
<display-name>Remote API Servlet</display-name>
<servlet-name>RemoteApiServlet</servlet-name>
<servlet-class>com.google.apphosting.utils.remoteapi.RemoteApiServlet</servlet-class>
<load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
<servlet-name>RemoteApiServlet</servlet-name>
<url-pattern>/remote\_api</url-pattern>
</servlet-mapping>  


```
 Class com.google.apphosting.utils.remoteapi.RemoteApiServlet is already bundled with the GAE SDK so thats all which needs to be done to get it up and running, also the security is already handled and only the user with admin privilege can access this handler .

 For you client Java Program (which is not you regular app engine project), you would need to include these two dependencies in your pom.xml

 ```<dependency>
<groupId>com.google.appengine.tools</groupId>
<artifactId>appengine-gcs-client</artifactId>
<version>0.5</version>
</dependency>  
<dependency>  
<groupId>com.google.appengine</groupId>  
<artifactId>appengine-remote-api</artifactId>  
<version>1.9.32</version>  
</dependency>  
  


```
 Then install remote api in your standalone(non appengine) project

 ```RemoteApiOptions options\_local = new RemoteApiOptions()
.server("localhost", 8080)
.useDevelopmentServerCredential();
or  
RemoteApiOptions options\_remote = new RemoteApiOptions()  
.server("your\_app\_id.appspot.com", 443)  
.useApplicationDefaultCredential();RemoteApiInstaller installer = new RemoteApiInstaller();
installer.install(options\_local);

```
 The Remote API client will rely on Application Default Credentials that use OAuth 2.0.

 Finally create an instance of datastore factory after installing the API

final DatastoreService ds = DatastoreServiceFactory.getDatastoreService(); For example if one needs to delete all entities in the local or remote datastore via code, then

 ```String[] entities = "Entity1,Entity2,Entity".split(",");
for (String \_e : entities) {
Query query = new Query(\_e);
for (Entity entity : ds.prepare(query).asIterable()) {
ds.delete(entity.getKey());
}
}

```
 Or here is another example where we create some entity on a remote server

 ```Entity e = new Entity("SomeEntity");
e.setProperty("prop1","blah");
e.setProperty("prop2","blah blah ?");
e.setProperty("prop3","blah blah blah ??");

```
 Basically , as it should'd have been clear by now,after the step involving installation of Remote API, all datastore operations occur in the remote server.

 Finally , while performing operations on remote server via remote api, always prefer to do operations on batch, read more [here ](https://cloud.google.com/appengine/docs/java/datastore/entities#Java_Batch_operations) about Java DataStore API Batch Operations.

 Hope this helps.



