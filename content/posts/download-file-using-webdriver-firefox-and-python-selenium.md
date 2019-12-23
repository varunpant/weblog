
+++
title = "download file using webdriver firefox and python selenium"
date = "2019-02-24"
author = " "
cover = ""
description = ""
category = ["docker","python"]
+++

Selenium is one of my favourite tool for automation.

In this post, I will demonstrate some basic code to download a file from a website in a headless mode , and also provide a docker file to make things simpler.

### Python Code

Here is some basic code which will make an attempt to download a **7zip exe. **

```python
from pyvirtualdisplay import Display
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import os
import time

print("******************************** STARTING ********************************")

display = Display(visible=0, size=(1024, 768))
display.start()

# To prevent download dialog
profile = webdriver.FirefoxProfile()
profile.set_preference('browser.download.folderList', 2) # custom location
profile.set_preference('browser.download.manager.showWhenStarting', False)
profile.set_preference('browser.download.dir', '/srv/download')
profile.set_preference("browser.download.manager.alertOnEXEOpen", False)
profile.set_preference("browser.download.manager.closeWhenDone", False)
profile.set_preference("browser.download.manager.focusWhenStarting", False)
#application/octet-stream,application/vnd.ms-excel 
profile.set_preference('browser.helperApps.neverAsk.saveToDisk', 'application/x-msdownload,application/octet-stream')
try:
    browser = webdriver.Firefox(profile)
    browser.get('https://www.7-zip.org/')
    download_button = WebDriverWait(browser, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'td.Item a')))
    download_button.click()
    print("clicked...")
    time.sleep(10) 
    print (os.listdir("/srv/download"))
except Exception as ex:
    print(ex)
 
browser.close()
display.stop()


print("******************************** FINITO ********************************")
``` 


The code is fairly simple , we need

1. pyvirtualdisplay, to support the webdriver .
2. FirefoxProfile, to auto accept the firefox download model screen.
3. The code sets /srv/download as the download location, more details in Makefile shown in the end of this post.
4. Finally, we set 'application/x-msdownload,application/octet-stream' as our allowed file mime type.
### Python dependencies

1. selenium
2. pyvirtualdisplay
```bash
pip install selenium pyvirtualdisplay ### DockerFile
```
```python
FROM python:2.7-stretch


RUN apt-get update && apt-get install -yq \
    firefox-esr \
    chromium \
    git-core \
    xvfb \
    xsel \
    unzip \
    python-pytest \
    libgconf2-4 \
    libncurses5 \
    libxml2-dev \
    libxslt-dev \
    libz-dev \
    xclip=0.12+svn84-4+b1


# GeckoDriver v0.19.1
RUN wget -q "https://github.com/mozilla/geckodriver/releases/download/v0.19.1/geckodriver-v0.19.1-linux64.tar.gz" -O /tmp/geckodriver.tgz \
    && tar zxf /tmp/geckodriver.tgz -C /usr/bin/ \
    && rm /tmp/geckodriver.tgz


# chromeDriver v2.35
RUN wget -q "https://chromedriver.storage.googleapis.com/2.35/chromedriver_linux64.zip" -O /tmp/chromedriver.zip \
    && unzip /tmp/chromedriver.zip -d /usr/bin/ \
    && rm /tmp/chromedriver.zip


# create symlinks to chromedriver and geckodriver (to the PATH)
RUN ln -s /usr/bin/geckodriver /usr/bin/chromium-browser \
    && chmod 777 /usr/bin/geckodriver \
    && chmod 777 /usr/bin/chromium-browser


RUN pip install selenium pyvirtualdisplay
``` 

A simple command as shown below will execute the script in docker, which will create a folder locally called download and download the 7zip.exe into it.

```python
#Build image from Dockerfile
docker build -t docker-selenium
#Run image after mounting the folder at "${PWD}:/srv" and mapping it with /srv in docker container.
docker run -v "${PWD}:/srv"  -w /srv --name img -d docker-selenium tail -f /dev/null
# I have used a make file locally to execute python command python run main.py
docker exec img make run
docker stop img
docker rm img

```

Here is the make file which will makes things easier.

```bash
img_name := docker-selenium


deps:
	pip install selenium pyvirtualdisplay


run:
	python main.py


docker-run:
	docker run -v "${PWD}:/srv"  -w /srv --name img -d $(img_name) tail -f /dev/null
	docker exec img make run
	docker stop img
	docker rm img


build:
	docker build -t $(img_name) .
```


### Chorme in UI Mode

```python
from selenium import webdriver
import os
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


browser = webdriver.Chrome()
browser.get('https://www.7-zip.org/')
download_button = WebDriverWait(browser, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'td.Item a')))
download_button.click()
time.sleep(10) 


```


The Code above is just a snippet if someone needs to quickly download any file from web url using selenium.

Hope this helps.



