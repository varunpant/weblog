
+++
title = "web crawling or scraping using scrapy in python"
date = "2018-12-02"
author = " "
cover = ""
description = ""
category = ["python"]
+++

 Scrapy is a very popular web scraping/crawling framework, I have been using it for quite some time now.

 In this post, I will demonstrate creating a very basic web crawler.

 ### Install Scrapy

 Installation is via pip pip install scrapy

 ### Minimalistic Code

 A very simple scraper is created like this

 ```import scrapy class MySpider(scrapy.Spider): name = "MySpider" start\_urls = ['https://varunpant.com'] def parse(self, response): # Get page title using xpath. page\_title = response.xpath('//title/text()').extract\_first() print(page\_title) 
```
 To **Run**  , simply type scrapy runspider scraper.py

 Running, above code will output something like below

 ```bash
 2018-12-02 14:01:18 [scrapy.utils.log] INFO: Scrapy 1.5.1 started (bot: scrapybot) 2018-12-02 14:01:18 [scrapy.utils.log] INFO: Versions: lxml 4.2.5.0, libxml2 2.9.8, cssselect 1.0.3, parsel 1.5.1, w3lib 1.19.0, Twisted 18.9.0, Python 2.7.15 (default, Oct 2 2018, 11:42:04) - [GCC 4.2.1 Compatible Apple LLVM 10.0.0 (clang-1000.11.45.2)], pyOpenSSL 18.0.0 (OpenSSL 1.1.0j 20 Nov 2018), cryptography 2.4.2, Platform Darwin-18.2.0-x86\_64-i386-64bit 2018-12-02 14:01:18 [scrapy.crawler] INFO: Overridden settings: {'SPIDER\_LOADER\_WARN\_ONLY': True} 2018-12-02 14:01:18 [scrapy.middleware] INFO: Enabled extensions: ['scrapy.extensions.memusage.MemoryUsage', 'scrapy.extensions.logstats.LogStats', 'scrapy.extensions.telnet.TelnetConsole', 'scrapy.extensions.corestats.CoreStats'] 2018-12-02 14:01:18 [scrapy.middleware] INFO: Enabled downloader middlewares: ['scrapy.downloadermiddlewares.httpauth.HttpAuthMiddleware', 'scrapy.downloadermiddlewares.downloadtimeout.DownloadTimeoutMiddleware', 'scrapy.downloadermiddlewares.defaultheaders.DefaultHeadersMiddleware', 'scrapy.downloadermiddlewares.useragent.UserAgentMiddleware', 'scrapy.downloadermiddlewares.retry.RetryMiddleware', 'scrapy.downloadermiddlewares.redirect.MetaRefreshMiddleware', 'scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware', 'scrapy.downloadermiddlewares.redirect.RedirectMiddleware', 'scrapy.downloadermiddlewares.cookies.CookiesMiddleware', 'scrapy.downloadermiddlewares.httpproxy.HttpProxyMiddleware', 'scrapy.downloadermiddlewares.stats.DownloaderStats'] 2018-12-02 14:01:18 [scrapy.middleware] INFO: Enabled spider middlewares: ['scrapy.spidermiddlewares.httperror.HttpErrorMiddleware', 'scrapy.spidermiddlewares.offsite.OffsiteMiddleware', 'scrapy.spidermiddlewares.referer.RefererMiddleware', 'scrapy.spidermiddlewares.urllength.UrlLengthMiddleware', 'scrapy.spidermiddlewares.depth.DepthMiddleware'] 2018-12-02 14:01:18 [scrapy.middleware] INFO: Enabled item pipelines: [] 2018-12-02 14:01:18 [scrapy.core.engine] INFO: Spider opened 2018-12-02 14:01:18 [scrapy.extensions.logstats] INFO: Crawled 0 pages (at 0 pages/min), scraped 0 items (at 0 items/min) 2018-12-02 14:01:18 [scrapy.extensions.telnet] DEBUG: Telnet console listening on 127.0.0.1:6023 2018-12-02 14:01:18 [scrapy.core.engine] DEBUG: Crawled (200) <get https:="" varunpant.com=""> (referer: None) 2018-12-02 14:01:18 [scrapy.core.engine] INFO: Closing spider (finished) 2018-12-02 14:01:18 [scrapy.statscollectors] INFO: Dumping Scrapy stats: {'downloader/request\_bytes': 212, 'downloader/request\_count': 1, 'downloader/request\_method\_count/GET': 1, 'downloader/response\_bytes': 12403, 'downloader/response\_count': 1, 'downloader/response\_status\_count/200': 1, 'finish\_reason': 'finished', 'finish\_time': datetime.datetime(2018, 12, 2, 14, 1, 18, 850998), 'log\_count/DEBUG': 2, 'log\_count/INFO': 7, 'memusage/max': 50581504, 'memusage/startup': 50577408, 'response\_received\_count': 1, 'scheduler/dequeued': 1, 'scheduler/dequeued/memory': 1, 'scheduler/enqueued': 1, 'scheduler/enqueued/memory': 1, 'start\_time': datetime.datetime(2018, 12, 2, 14, 1, 18, 570736)} 2018-12-02 14:01:18 [scrapy.core.engine] INFO: Spider closed (finished) Varun Pant Blog | Index
```
 In the last line, one can see that the page title **Varun Pant Blog | Index** was printed.

 The principle of a web scraper is generally quite simple,

 
 2. Start from a seed url and extract all hyperlinks.
 4. Then crawl each of them, further extracting links until all of them have been visited.
 
 In  Scrapy start\_urls  is the list of seed urls to begin scraping.

 One can also provide another varibale to add domain constraint. allowed\_domains = ["varunpant.com"] so that links which lead out of the principal domain are rejected.

 Scrappy takes care of ensuring that links which have already been visited are not visited again.

 ### Extracting Links

 In the simple example above, the code does not extract hyperlinks from the response body, lets modify it to do so.

 ```
 import scrapy class MySpider(scrapy.Spider): name = "MySpider" start\_urls = ['https://varunpant.com'] def parse(self, response): all\_links = response.xpath('*//a/@href').extract() for link in all\_links: print(link)
```
   Line  all\_links = response.xpath('*//a/@href').extract()   ,  uses xpath and extracts all hyperlinks in the page.

 ```/ /contact /archives /feed /posts/integration-testing-with-apache-beam-using-pubsub-and-bigtable-emulators-and-direct-runner http://varunpant.com/posts/integration-testing-with-apache-beam-using-pubsub-and-bigtable-emulators-and-direct-runner#disqus\_thread /posts/gdal-2-on-mac-with-homebrew http://varunpant.com/posts/gdal-2-on-mac-with-homebrew#disqus\_thread /posts/how-to-print-bar-chart-in-chrome-browser-console http://varunpant.com/posts/how-to-print-bar-chart-in-chrome-browser-console#disqus\_thread /posts/how-to-make-https-requests-with-python-httplib2-ssl http://varunpant.com/posts/how-to-make-https-requests-with-python-httplib2-ssl#disqus\_thread /posts/how-to-read-json-from-web-http-request-of-url-via-python-urllib http://varunpant.com/posts/how-to-read-json-from-web-http-request-of-url-via-python-urllib#disqus\_thread /posts/minimum-insertions-to-form-a-palindrome http://varunpant.com/posts/minimum-insertions-to-form-a-palindrome#disqus\_thread /posts/inverse-weighted-distance-interpolation-in-golang http://varunpant.com/posts/inverse-weighted-distance-interpolation-in-golang#disqus\_thread /posts/basic-sorting-algorithms-implemented-in-golang http://varunpant.com/posts/basic-sorting-algorithms-implemented-in-golang#disqus\_thread /posts/reading-and-writing-binary-files-in-go-lang http://varunpant.com/posts/reading-and-writing-binary-files-in-go-lang#disqus\_thread /posts/create-linear-color-gradient-in-go http://varunpant.com/posts/create-linear-color-gradient-in-go#disqus\_thread /?page=2 http://stackoverflow.com/users/95967 https://www.linkedin.com/in/varunpant mailto:varun@varunpant.com https://github.com/varunpant
```
 The final step is to make the parse generator method yield response like so

 ```import scrapy class MySpider(scrapy.Spider): name = "MySpider" start\_urls = ['https://varunpant.com'] allowed\_domains = ["varunpant.com"] def parse(self, response): page\_title = response.xpath('//title/text()').extract\_first() print(page\_title) all\_links = response.xpath('*//a/@href').extract() for link in all\_links: yield scrapy.Request( response.urljoin(link), callback=self.parse )
```
 This should crawl all hyperlinks found with each page.

 ### Save all crawlled pages to link

 Here is a minimalistic code snippet, which saves all crawlled pages to the disk.

 ```import scrapy import unicodedata import re from pprint import pprint class MySpider(scrapy.Spider): name = "MySpider" allowed\_domains = ["varunpant.com"] start\_urls = ['https://varunpant.com'] def slugify(self,value): value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore') value = unicode(re.sub('[^\w\s-]', '', value).strip().lower()) value = unicode(re.sub('[-\s]+', '-', value)) return value def save(self,name,content): #save to html in the pages folder p = "pages/%s.html" fn = self.slugify(name) with open(p%name,"w") as f: f.write(content.encode("utf-8")) def parse(self, response): page\_title = response.xpath('//title/text()').extract\_first() page\_body = response.body.decode("utf-8") self.save(page\_title,page\_body) all\_links = response.xpath('*//a/@href').extract() for link in all\_links: yield scrapy.Request( response.urljoin(link), callback=self.parse )
```


