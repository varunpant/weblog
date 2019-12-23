
+++
title = "print two-dimensional array in spiral order"
date = "2014-10-15"
author = " "
cover = ""
description = ""
category = ["algorithm","python"]
+++

So I saw this problem in a book today about printing a 2d matrix in spiral order

 Here are two solutions to it

 ### Solution one.

```python
def printSpiralTL(m,x1,y1,x2,y2):
    for i in range(x1,x2):
        print m[y1][i]
    for j in range(y1+1,y2+1):
        print m[j][x2-1]

    if x2-x1 > 0:
        printSpiralBL(m, x1, y1 + 1, x2-1, y2)
    

def printSpiralBL(m,x1,y1,x2,y2):
    for i in range(x2-1,x1-1,-1):
        print m[y2][i]
    for j in range(y2-1,y1-1,-1):
        print m[j][x1]
    if x2-x1 > 0:
        printSpiralTL(m, x1+1, y1, x2, y2-1)
    
m = [
    
    [1, 2, 3, 4], 
    [5, 6, 7, 8],
    [9, 0, 1, 2],   
    [3, 4, 5, 6], 
    [7, 8, 9, 1]
        
    ]
```

 Output:

 ```bash
1
2
3
4
8
2
6
1
9
8
7
3
9
5
6
7
1
5
4
0

```
 Here is another way

 ### Solution two (print - pop -Transpose).

 ```python
 m = [
    
    [1, 2, 3, 4], 
    [5, 6, 7, 8],
    [9, 0, 1, 2],   
    [3, 4, 5, 6], 
    [7, 8, 9, 1]
        
    ]

def spiral(arr):
    while arr:
        for a in arr[0]:
            print a
        arr = list(reversed(zip(*arr[1:])))

spiral(m)

```
 Hope this helps.



