
+++
title = "Mod Proxy equivalent in IIS using ARR and URL Rewrite Module"
date = "2013-08-25"
author = " "
cover = ""
description = ""
category = [".net","utility","web","how to","iis"]
+++

IIS7 is quite modular, it is [shipped](http://blogs.iis.net/bills/archive/2008/06/02/how-iis-ships-software.aspx) with lots of goodies as separate modules and together it is now one of the most powerful and flexible web server.

 In this post I intent to cover how we can easily configure [ARR](http://www.iis.net/downloads/microsoft/application-request-routing) and [URL Rewrite Module](http://www.microsoft.com/en-gb/download/details.aspx?id=7435) to get a similar functionality as of [Mod Proxy](http://httpd.apache.org/docs/2.2/mod/mod_proxy.html) in Apache.

 Here I will demonstrate configuration of a reverse proxy which according to the [definition](http://en.wikipedia.org/wiki/Reverse_proxy) is 

 
> **Reverse proxy** is a type of [proxy server](http://en.wikipedia.org/wiki/Proxy_server) that retrieves resources on behalf of a [client](http://en.wikipedia.org/wiki/Client_(computing)) from one or more [servers](http://en.wikipedia.org/wiki/Server_(computing)).  A general use case to configure such proxies could be to handle cross domain Ajax requests, so basically if I would like to call a service hosted as <http://anotherdomain.com/service> from <http://localdomain/service> I would need to configure a proxy which will request resources from anotherdomain.com/service on behalf of localdomain ### Configuration

 **STEP 1:** To set up a rule click on the web application from the sites tree on the left and then click on the URL Rewrite module, then form the command pallete on the right hand click on Add Rule as shown in image below.   
[![add_rule](http://varunpant.com/static/resources/add_rule_thumb_8.png "add_rule")](http://varunpant.com/static/resources/add_rule_18.png)   
**STEP 2:** From the add rule dialog choose reverse proxy template   
[![reverse_proxy_template](http://varunpant.com/static/resources/reverse_proxy_template_12.png "reverse_proxy_template")](http://varunpant.com/static/resources/reverse_proxy_template_12.png)

 Configure Inbound Rules window and provide server name as shown in screen shot below

 [![](http://varunpant.com/static/resources/image_configureproxyurl.png)](http://varunpant.com/static/resources/image_2.png)

 Finally configure the last form, this is where one can specify cache parameters and override server header variables, such as basic authentication (http\_authorisation) etc.

 [![image](http://varunpant.com/static/resources/last_page_proxy.png)](http://varunpant.com/static/resources/image_4.png)

 In the patterns text box entering something like ^/service(.*) will trap all requests going to <http://localdomain/service> and they will be proxyed as if the requests were made like <http://anotherdomain.com/service> , The query strings if present are also carried forward, all these settings and modification are preserved in web.config of the web application, under tag. The rules after configuration look like 

 ```
<rewrite>
    <rules>
        <rule stopprocessing="true" name="ReverseProxyInboundRule1">
            <match url="^service/(.*)" />
            <action url="http://anotherdomain.com/service{R:1}" type="Rewrite" />
            <servervariables />
        </rule>
    </rules>
</rewrite>

```


