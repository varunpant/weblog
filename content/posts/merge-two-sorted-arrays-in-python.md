
+++
title = "merge two sorted arrays in python"
date = "2014-10-11"
author = " "
cover = ""
description = ""
tags = ["python","algorithm"]
+++

Here is a quick code snippet to merge two sorted arrays in python

  

```def merge(a,b):
        merged = []
        l = 0
        r = 0
        for i in range(len(a)+len(b) ):
                lval = None
                rval = None

                if l < len(a):
                        lval = a[l]
                if r < len(b):
                        rval = b[r]
                
                if (lval < rval and rval and lval)  or rval == None:
                        merged.append(lval)
                        l+=1
                elif (lval >= rval and rval and lval)or lval == None:
                        merged.append(rval)
                        r+=1

        return merged


```
 print merge([3,5],[2,4])



