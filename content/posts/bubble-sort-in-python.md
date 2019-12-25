
+++
title = "Bubble-sort in python"
date = "2015-07-23"
author = " "
cover = ""
description = ""
tags = ["python","algorithms"]
+++

Bubble sort is a sorting algo that repeatedly steps through the list to be sorted, compares each pair of adjacent items and [swaps](https://en.wikipedia.org/wiki/Swap_(computer_science) "Swap (computer science)") them if they are in the wrong order. 

 It is a popular, but inefficient sorting algo, it has worst-case and average complexity both *[О](https://en.wikipedia.org/wiki/Big_o_notation "Big o notation")*(*n*2), where *n* is the number of items being sorted.

 Here is an implementation in python

 ![](https://upload.wikimedia.org/wikipedia/commons/0/06/Bubble-sort.gif)   
 

 ```def bubbleSort(B):
    count = len(B)
    for i in xrange(count): 
        for j in xrange(count-1,i,-1): 
            #print "compairing %i with %i"%(B[j],B[j-1])
            if B[j] < B[j - 1]:
                temp = B[j]
                B[j] = B[j - 1]
                B[j - 1] = temp
                #print "Swapping  %i with %i"%(B[j],B[j-1])
        #print "Transformed Array: " , B
            

B = [6,5,3,1,8,7,2,4]
print "Unsorted: ", B 
bubbleSort(B)
print "Bubble Sorted: ", B 
 


```
 Hope this helps



