
+++
title = "Start Stop Restart Apache 2 Web Server"
date = "2013-01-19"
author = " "
cover = ""
description = ""
category = ["utility","how to"]
+++

 I have been using Linux environment a lot lately, particularly for hosting my web experiments and other application. One of the biggest and most searched question for newbies have been 
> How do I restart Apache 2 Web Server under Debian / Ubuntu Linux or UNIX operating systems? 

 In this post I simply attempt to lay this down for my and their benifit.

  **Start Apache2** # sudo /etc/init.d/apache2 start 

  **Stop Apache2** # sudo /etc/init.d/apache2 stop 

  **Restart Apache2** # sudo /etc/init.d/apache2 restart 

  **Graceful** # sudo /etc/init.d/apache2 graceful or # sudo /etc/init.d/apache2 reload 

 There are other less verbose ways as well. If using apache2ctl (If its not on your path generally apche2ctl can be found here /usr/sbin/apache2ctl

  **Restart Apache2 gracefully** sudo apache2ctl graceful **Stop Apache2 gracefully** sudo apache2ctl graceful-stop 



