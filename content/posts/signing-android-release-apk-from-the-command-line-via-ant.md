
+++
title = "Signing android release apk from the command line (via ant)"
date = "2013-08-25"
author = " "
cover = ""
description = ""
category = ["android","how to","programming","utility"]
+++

This post is probably out too late ,as almost all IDE's these days (which support android development) ,probably have an Integrated **release signing** or **debug signing** utility/wizard built in, but if somebody is using an old IDE or perhaps want to integrate release in a CI(continues integration) environment , this tutorial might come in handy.

 Basically one has to sign an apk either with a debug key (which is generally present in your .android folder) or a create a fresh application specific keystore , to know more go [here](http://developer.android.com/tools/publishing/app-signing.html)

 Assuming you have setup android SDK properly in a Windows /Mac or Linux environment and all paths etc. are configured properly, lets begin by opening a command shell and navigating to the root of the android project,If the project is setup properly then a basic build command using ant ant clean debug should trigger a build

 In order to sign an application we need to make a keystore that we use for the lifetime of this application. It's important to note that this keystore should be backed up in a secure place, losing it means you cannot install any updates on devices that have this app already installed. We are going to use the "keytool" program to create a keystore.

 keytool -genkey -v -keystore release.keystore -alias mykey -keyalg RSA -keysize 2048 -validity 10000 This command will invoke a console wizard which will eventually create a keystore in the "release.keystore" file in the local directory with a key in it called mykey that will have 2048 size to it as well as be valid for 10,000 days. I generally include this file in my project version control and keep it in the same level as my ant.properties file

 The next step is to modify your ant properties file and add these (I have store and alisa password same) key.store=release.keystore key.alias=mykey key.store.password=secret key.alias.password=secret and thats it, finall step is to issue a command ant clean release

 If everything was successful it will say "BUILD SUCCESSFUL" and put an apk named something like "MyProject-release.apk" in the /bin directory.



