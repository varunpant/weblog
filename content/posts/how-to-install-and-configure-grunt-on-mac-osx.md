
+++
title = "How to install and configure grunt on mac Osx"
date = "2014-07-12"
author = " "
cover = ""
description = ""
category = ["how to","utility","programming"]
+++

This post is intended to assist folks who are trying to install and work with grunt on mac osx

 ### Install Node.js and npm with Homebrew

 First, install Homebrew by typing in the following command ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

Then, type in brew update to ensure your Homebrew is up to date.

```bash
brew update
```
Run  
```bash
brew doctor 
``` 
to make sure your system is all good.

Follow any other recommendations from brew doctor.

Next, add the Homebrew location to your $PATH and source your bash profile

```bash
export PATH="/usr/local/bin:$PATH"
```
### Install Node with NPM

```bash
brew install node
```

To test out your Node and npm install, try installing Grunt (you might be asked to run with sudo)

```bash
sudo npm install -g grunt-cli
```

Add the path from the grunt installer to your bash profile by typing in export PATH=/usr/local/lib/node_modules/grunt/bin:$PATH

Made the profile an executable source ~/.bash_profile

this should do the trick




