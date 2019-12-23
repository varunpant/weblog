
+++
title = "Installing Redis on Ubuntu"
date = "2013-01-20"
author = " "
cover = ""
description = ""
category = ["redis","ubuntu","how to","utility"]
+++

[Redis](http://redis.io/) is an open source, advanced key-value store. Installing it on Linux debian platforms is pretty easy.

 There are two ways of getting this done, one is perhaps an easy and less verbose method and it involves using an alternative repository [Dotdeb.](http://www.dotdeb.org/) 

 A while ago I had posted a [tutorial](http://www.varunpant.com/posts/how-to-set-up-redis-in-ubuntu-linux) about installing redis from the [googlecode](http://redis.googlecode.com/files/redis-2.2.4.tar.gz) repo, but things have changed since then and here I post a fairly latest way of installing it.

 #### Install using aptitude and Dotdeb repo

 My experience with [Dotdeb](http://www.dotdeb.org/) has been pretty nice,it has a bunch of nice packages, always up to date with the very latest version.

 Begin by adding Dotdeb repositories to your APT sources. Create a new list file in /etc/apt/sources.list.d/ and fill it with the following content. 

 # /etc/apt/sources.list.d/dotdeb.org.list deb http://packages.dotdeb.org squeeze all deb-src http://packages.dotdeb.org squeeze all Then you need to authenticate these repositories using their public key. wget -q -O - http://www.dotdeb.org/dotdeb.gpg | sudo apt-key add - Finally update the apt-cache and install $ sudo aptitude update $ sudo aptitude install redis-server #### Manual Install

 The other way is downloading the source, building it and then installing it

 Download redis from its git repo. git clone https://github.com/antirez/redis.git Change directory to the redis folder and type make, for 32 bits typemake 32bit and then test make test To run redis with default configuration change directory to src cd src and then type ./redis-server If you want to provide your custom conf, then simply pass it in as an arg ./redis-server /path/to/redis.conf To install Redis here /usr/local/bin type make install , this however simply copies the binaries at the said location. Redis provides a proper script to install it properly in Ubuntu and Debian systems. change directory to Utils cd utils and then execute./install\_server use commands below to start stop the server 

 $ sudo start redis-server $ sudo restart redis-server $ sudo stop redis-server

