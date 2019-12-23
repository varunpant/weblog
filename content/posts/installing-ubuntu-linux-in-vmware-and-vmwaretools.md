
+++
title = "Installing Ubuntu Linux in VMware and VMwareTools"
date = "2012-01-09"
author = " "
cover = ""
description = ""
category = ["linux","ubuntu","general"]
+++

I have been using Ubuntu for last two years as a deployment environment for my pet projects, however recently, after having installed “Natty Narwhal” on one of my old ‘HP’ laptop I moved into using Ubuntu as a full time development environment.

 There are times when I need more than one deployment units and since I use [Linode](http://www.linode.com/)as my primary deployment VPS host, I sometime need to test the perf of my software locally thus there came a need of replicating an exact or close to exact “Deployment Environment”

 Enter [VmWare](http://www.vmware.com/), as most of you folks know, there is nothing like a quick and dirty VM Image boot, and [VmWare](http://www.vmware.com/)is one of the best in the market although “ [Oracle’s Virtual box](https://www.virtualbox.org/)” and [“Parallels for mac](http://www.parallels.com/uk/products/desktop/)” are pretty awesome too, there also is a repository for pre-installed vanilla images for most of the popular flavours of Linux [here](http://www.thoughtpolice.co.uk/vmware/#ubuntu11.04).

 The cheapest version of Linode is 512MB RAM and 20GB HD and this is exactly what you get when you download the image from above link, although you can tweak and configure it to you likings at all times.

 Another important step to remember is installing VMware Tools .

   

 With the VMware Tools SVGA driver installed, Workstation supports significantly faster graphics performance. The VMware Tools package provides support required for shared folders and for drag and drop operations. Other tools in the package support synchronization of time in the guest operating system with time on the host, automatic grabbing and releasing of the mouse cursor, copying and pasting between guest and host, and improved mouse performance in some guest operating systems. To install choose **VM **>** Install VMware Tools** from the VMware Workstation menu, although you will be automatically prompted when you boot you Image for the first time.

 If this is your first time dealing with this stuff then you may need a little help installing the script written in pearl, If GNOME has been your baby for a while, then the installed location and booting your image is not so obvious for the command line server interface.

 ```

  #install kernel headers so modules will work
  #needed this on a 10.04 guest running in a Fusion 3 host
  apt-get install linux-headers-virtual

  # install kernel modules
  apt-get install --no-install-recommends open-vm-dkms

  # EITHER: install tools for an xorg install
  apt-get install open-vm-tools
  # OR: a headless install
  apt-get install --no-install-recommends open-vm-tools

 
```
 
> Start up a terminal window and do the following to ensure that you have the required packages for building VMware Tools or your kernel.  sudo apt-get install build-essential linux-headers-`uname -r` psmisc  If the cdrom was not automatically mounted, mount the cdrom (in your guest OS) by doing

 ```

	# make a mount point if needed :
	sudo mkdir /media/cdrom

	# Mount the CD
	sudo mount /dev/cdrom /media/cdrom

	# Copy and extract VMWareTools

	sudo cp /media/cdrom/VMwareTools*.tar.gz /tmp

	# You can extract with archive manager, right click on the archive and extract ... or

	cd tmp

	tar xvf VMwareTools*.tar.gz

	cd vmware-tools-distrib
	sudo ./vmware-install.pl

	#You can configure the tools as root
	sudo vmware-toolbox


```
 Once you are done installing you can simply issue sudo shutdown –P or sudo init 0 and shutdown the VM safely. Have fun Vm-innnng :)

 

