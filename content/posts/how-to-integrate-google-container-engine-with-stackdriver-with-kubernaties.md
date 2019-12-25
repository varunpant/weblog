
+++
title = "How to integrate Google container engine with Stackdriver with kubernaties"
date = "2016-08-04"
author = " "
cover = ""
description = ""
tags = ["google container engine","kubernaties","cloud","google"]
+++

Most folks have been using [Grafana](http://grafana.org/) or something [similar](http://kubernetes.io/docs/user-guide/monitoring/) to monitor [Kubernaties](http://kubernetes.io/) cluster.

 If you are using [Google cloud container engine](https://cloud.google.com/container-engine/) , then the standard unified place to monitor all your application and services is [Slackdriver](https://cloud.google.com/monitoring/).

 According to googles documentation, when you create a new container cluster using GUI or gcloud, [Slackdriver](https://app.google.stackdriver.com/) is automatically configured with a sink, however It did not work out of the box for me hence this post :)

 Well, the easiest way to check if [Slackdriver](https://app.google.stackdriver.com/) is configured is to issue a command

 gcloud container clusters describe <cluster-name> If the response contains something like monitoringService: monitoring.googleapis.com  then yer all good and you can simply go and visit <https://app.google.stackdriver.com/gke> link which should point you to you cluster.

 ![](/media/image_6619659342091470328330123.png)   
 

 other wise issue this command to register sinks with monitoring.googleapis.com

 gcloud alpha container clusters update <clustername> --monitoring-service=monitoring.googleapis.com

 Hope this helps



