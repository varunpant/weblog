
+++
title = "A guide to hosting in Red Hats OpenShift PaaS"
date = "2013-01-25"
author = " "
cover = ""
description = ""
category = ["how to","general","linux","web","ubuntu"]
+++

In this post,I am going to write about [OpenShift](https://openshift.redhat.com/app/), which is Red hat's free, auto-scaling Platform as a Service ([PaaS](http://en.wikipedia.org/wiki/Platform_as_a_service)) for applications.

 OpenShift to me is very similar to [Google's app engine](https://developers.google.com/appengine/) in some ways,but openshift's offerings are quite diverse, for instance support for ruby, php, Perl, node.js, etc.. 

 Openshift is not like a traditional VPS hosting , although once registered with them, user does get a shell access,but its quite limited , instead OpenShift has a concept of gears and cartridges.

 A Cartridge is a like a capability which an application can use, for eg: mysql,mongodb,phpmyadmin etc. There are some officially supported ones available for quick inclusion otherwise users can [create](https://openshift.redhat.com/community/wiki/introduction-to-cartridge-building) their own as well,even though thats a tricky task.

 [![](http://www.varunpant.com/static/resources/image_4.png)]($image6.png)

 I also like the [pricing structure](https://openshift.redhat.com/community/developers/pricing) of OpenShift (Developers Preview), which may be what many developers are looking for,however the web site says right at the top that it may change in future.

 So basically to use,[Redhat's](http://gb.redhat.com/) [PaaS](http://en.wikipedia.org/wiki/Platform_as_a_service) hosting, one needs to   
1. Quickly [sign up](https://openshift.redhat.com/app/account/new?then=/community/get-started) for an account.

 2.Use web interface to create an application (good for rapid kick start),or use a ruby command line client tool(good for coding/debugging/app-management) or even use tools integrated in IDE (Eclipse)

 3.OpenShift follows a code check-in model,where a git repository is created and associated with the application created in above step, every check in in that folder structure will cause a rebuild of environment and will reboot the web server.

 To download the repo simply type git clone ssh://...rhcloud.com/~/git/myapp.git/

 When changes have been made then type 

 $ cd myapp $ vim php/index.php (Make a change... :wq) $ git commit -a -m "My first change" $ git push To get you up and running quickly OpenShift has a bunch of quick starts [here](https://openshift.redhat.com/community/developers/get-started), there is also a getting started [guide](https://openshift.redhat.com/community/developers/get-involved/creating-quickstarts). 

 OpenShift also has a well maintained [blog](https://openshift.redhat.com/community/blogs) , a [FAQ](https://openshift.redhat.com/community/faq) and even [videos](https://openshift.redhat.com/community/videos).

 I must say that the companion [rhc command line utility](https://openshift.redhat.com/community/developers/install-the-client-tools#windows) is very helpful, it can be installed in all popular operating systems.

 I also like their [github page](https://github.com/openshift) where they have many examples (see the bottom of list).

 There is a concept of gear in openshift, which to me is very similar to what a compute instance is in Amazon.

 This is what guys at OpenShift say about it

 
> A gear is a resource constrained container that runs one or more user-specified software stacks, also known as cartridges. Each gear has a limited amount of RAM and disk space. If an application needs more resources, it can use multiple gears. Gears come in multiple sizes to suit the needs of various software stacks. If you would like to read more about their architecture, here is a [link](https://openshift.redhat.com/community/wiki/architecture-overview), the best part is that every bit is [open sourced](https://openshift.redhat.com/community/open-source/download-origin).



