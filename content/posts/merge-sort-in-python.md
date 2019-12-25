
+++
title = "merge sort in python"
date = "2017-07-23"
author = " "
cover = ""
description = ""
tags = ["python","algorithms"]
+++

Many useful algorithms are recursive in structure: to solve a given problem, they call themselves recursively one or more times to deal with closely related subproblems.    
  These algorithms typically follow a divide-and-conquer approach: they break the problem into several subproblems that are similar to the original problem but smaller in size, solve the subproblems recursively, and then combine these solutions to create a solution to the original problem.    
  
 The divide-and-conquer paradigm involves three steps at each level of the recursion:    
  * Divide the problem into a number of subproblems that are smaller instances of the same problem.
 * Conquer the subproblems by solving them recursively. If the subproblem sizes are small enough, however, just solve the subproblems in a straightforward manner.
 * Combine the solutions to the subproblems into the solution for the original problem.
 
   
 The merge sort algorithm closely follows the divide-and-conquer paradigm. Intuitively, it operates as follows.    
  
 * Divide: Divide the n-element sequence to be sorted into two subsequences of n=2 elements each.
 * Conquer: Sort the two subsequences recursively using merge sort.
 * Combine: Merge the two sorted subsequences to produce the sorted answer.
 
    
 

 here is a basic code in python

    
 

 ```from \_\_future\_\_ import division
import sys
SENTINEL = sys.maxint

def merge(input\_array,first,middle,last):
    n1 = middle - first + 1
    n2 = last - middle

    L = [None for t in range(n1+1)]
    R = [None for t in range(n2+1)]

    
    for i in range(n1):
        L[i] = input\_array[first + i - 1]
        
    for j in range(n2):
        R[j] =input\_array[middle + j]
         

    L[n1] = SENTINEL
     
    R[n2] = SENTINEL
     

    i = 0
    j = 0 
    for k in range(first-1,last): 
        if L[i] <= R[j]:
            input\_array[k] = L[i]
            i = i + 1
        else:
            input\_array[k] = R[j]
            j = j + 1



def mergeSort(input\_array,first,last):
    if first < last:
        middle =  int((first + last)/2) 
        mergeSort(input\_array,first,middle)
        mergeSort(input\_array,middle + 1,last)
        
        merge(input\_array,first,middle,last)


arr = [5,2,4,7,1,3,2,6]
 
mergeSort(arr,1,len(arr))
print arr
```
 Hope this helps ;)



