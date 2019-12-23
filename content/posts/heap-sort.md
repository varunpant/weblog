
+++
title = "Heap Sort in python"
date = "2016-07-25"
author = " "
cover = ""
description = ""
category = ["python","algorithms"]
+++

The (binary) heap data structure is an array object that we can view as a nearly complete binary tree.    
  Each node of the tree corresponds to an element of the array.     
  The tree is completely filled on all levels except possibly the lowest, which is filled from the left up to a point.    
  An array A that represents a heap is an object with two attributes:   
 * length, which (as usual) gives the number of elements in the array.
 
   
 * heap-size, which represents how many elements in the heap are stored within array A.
 
  Here is the implementation in python.

  

```python
//not used
def parent(i):
    return int(i/2)

def left(i):
    return 2 * i

def right(i):
    return left(i) + 1

def maxHeapify(A,i,sz):
    l = left(i)
    r = right(i)
    largest = None
    if l <= sz and A[l] > A[i]:
        largest = l
    else:
        largest = i

    if r <= sz and A[r] > A[largest]:
        largest = r

    if largest != i:
        temp = A[i]
        A[i] = A[largest]
        A[largest] = temp 
        maxHeapify(A,largest,sz)

def heapsort(A):
    heap\_size = len(A)
    middle = int(heap\_size/2)
    for i in xrange(middle,0,-1):
        maxHeapify(A,i,heap\_size - 1)

    m = heap\_size - 1
    for i in xrange(m,-1,-1): 
        temp = A[0]
        A[0] = A[i]
        A[i] = temp 
        m = m-1 
        maxHeapify(A,0,m)




A = [16,4,10,14,8,7,9,3,2,4,1]

print "Unsorted: ", A 
heapsort(A)
print "Heap Sorted: ", A

```
 

