
+++
title = "Normalizing Ranges of Numbers"
date = "2014-07-09"
author = " "
cover = ""
description = ""
category = ["utility","general","how to","python"]
+++

Range Normalization is a [normalization](http://www.heatonresearch.com/wiki/Normalization) technique that allows you to map a number to a specific range.

 Lets say that we have a data set where the values are in a range of 1 to 10, however we wish to normalise it to a range between 0 and 5

 Mathematically speaking the equation comes down to

  

 [![eq1](http://varunpant.com/static/resources/eq1_thumb.png "eq1")](http://varunpant.com/static/resources/eq1_2.png)

 [![eq2](http://varunpant.com/static/resources/eq2_thumb.png "eq2")](http://varunpant.com/static/resources/eq2_2.png)

 translated to Python 

 ```from \_\_future\_\_ import division
class Normaliser:

    def \_\_init\_\_(self,dH,dL,nH,nL):
        self.dH = dH
        self.dL = dL
        self.nH = nH
        self.nL = nL

    def normalize(self,x):
        return ((x - self.dL) / (self.dH - self.dL))  * (self.nH - self.nL) + self.nL

    def denormalize(self,x):
        return ((self.dL - self.dH) * x - self.nH * self.dL + self.dH * self.nL) / (self.nL - self.nH)

if \_\_name\_\_ == "\_\_main\_\_":
    norm = Normaliser(10,1,5,0);

    for a in range(1,11):
        x = norm.normalize(a);
        y = norm.denormalize(x);
        print str(a) + " : " + str(x) + " : " + str(y)
```
 The results

 ```1 : 0.0 : 1.0
2 : 0.555555555556 : 2.0
3 : 1.11111111111 : 3.0
4 : 1.66666666667 : 4.0
5 : 2.22222222222 : 5.0
6 : 2.77777777778 : 6.0
7 : 3.33333333333 : 7.0
8 : 3.88888888889 : 8.0
9 : 4.44444444444 : 9.0
10 : 5.0 : 10.0
```
  

 Hope this helps.



