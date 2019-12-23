from xml.dom import minidom
from markdownify import markdownify as md

xmldoc = minidom.parse('feed.xml')

enteries = xmldoc.getElementsByTagName('entry')

print(len(enteries))

T ="""
+++
title = "{title}"
date = "{dt}"
author = " "
cover = ""
description = ""
category = [{category}]
+++

{content}

"""
def getC(a):
	l = []
	for x in a:
		l.append( "\"{x}\"".format(x=x))
	return ",".join(l)

for entry in enteries:
	id = entry.getElementsByTagName("id")[0].firstChild.data.replace("http://www.varunpant.com/posts/","")
	title = entry.getElementsByTagName("title")[0].firstChild.data
	published = entry.getElementsByTagName("published")[0].firstChild.data
	updated = entry.getElementsByTagName("updated")[0].firstChild.data
	content = entry.getElementsByTagName("content")[0].firstChild.data
	categories = [x.getAttribute("label") for x in entry.getElementsByTagName("category")]
	m = md(content)

	post = T.format(title=title,
		updated=updated,
		dt = updated.split("T")[0], 
		category = getC(categories),
		content = m
		)
	target = "content/posts/{id}.md".format(id=id)
	import os
	if os.path.exists(target):
	  os.remove(target)
	 
	with open(target,"w") as outf:
		outf.write(post)



