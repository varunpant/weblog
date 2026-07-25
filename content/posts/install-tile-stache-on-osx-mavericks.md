
+++
title = "Install tile-stache on OsX Mavericks"
date = "2014-07-08"
author = " "
cover = ""
description = ""
tags = ["utility"]
+++

This is quick tutorial about installing [Tilestache](http://tilestache.org/) library in OSX Mavericks.

 ### Step 1

 Make sure Developer tools are installed xcode-select --install

 Then add these flags to tell xcode to use python like rest of the world does

  export CFLAGS=-Qunused-arguments

  export CPPFLAGS=-Qunused-arguments

 Finally type in sudo easy\_install tilestache

 That’s it, all done. You might see some warnings, but that’s fine — ignore them.

 Read the introduction [here](http://mike.teczno.com/notes/tilestache.html) to get started

 Hope it helps.

 

