
+++
title = "longest palindrome in a string"
date = "2014-10-15"
author = " "
cover = ""
description = ""
tags = ["python","algorithms"]
+++

 

```python
def isPailenDrome(s):
        if len(s)==1:
                return False
        L = len(s)
        for i in range(L):
                if s[i] != s[L-1-i]:
                return False
        return True
                

def longestPalindrome(s):
        L = len(s)
        if len(s)<=1:
                return s
        if  isPailenDrome(s):
                return s
        p = {}
        for u in range(L):
                for v in range(u+1,L+1):  
                        k = s[u:v]
                        # print k,isPailenDrome(k)
                        if isPailenDrome(k):
                                p[len(k)] = k
        
        if len(p) > 0:
                return p[sorted(p,reverse = True)[0]]
        return s[0]
  
```
 

