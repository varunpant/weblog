
+++
title = "Factorial in python"
date = "2012-08-14"
author = " "
cover = ""
description = ""
category = ["python","algorithms"]
+++

 Mathematically, the formula for the factorial is as follows. If n is an integer greater than or equal to 1, then n ! = n ( n - 1)( n - 2)( n - 3) ... (3)(2)(1) If p = 0, then p ! = 1 by convention. 

 ```python
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

```
 Hope this helps



