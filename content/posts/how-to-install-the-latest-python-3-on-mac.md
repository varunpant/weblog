
+++
title = "how to install the latest python 3 on mac"
date = "2019-09-09"
author = " "
cover = ""
description = ""
category = ["python"]
+++

Here is a quick guide on installing Python3 on a mac

 ### Installation

```bash
brew update
brew upgrade
sudo mkdir -p /usr/local/Frameworks
sudo chown -R $(whoami) /usr/local/* 
brew install python3
brew link python3
brew doctor
```

I hope this is useful



