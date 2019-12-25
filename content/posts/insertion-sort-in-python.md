
+++
title = "Insertion sort in python"
date = "2016-07-22"
author = " "
cover = ""
description = ""
tags = ["python","algorithms"]
+++

Insertion sort, is an efficient algorithm for sorting a small number of elements.

  Insertion sort works the way many people sort a hand of playing cards. We start with an empty left hand and the cards face down on the table. We then remove one card at a time from the table and insert it into the correct position in the left hand.

 ![](/media/Insertion-Sort.jpg)

  To find the correct position for a card, we compare it with each of the cards already in the hand, from right to left.

 Here is the pseudocode for it.

 ![](/media/insertion sort.png)

 Here is the python version of it

  ![](https://upload.wikimedia.org/wikipedia/commons/9/9c/Insertion-sort-example.gif)   
  ```def insertionSort(a):
    for j in range(1, len(a)):  
        key = a[j]
        i = j - 1
        while (i > -1 and a[i] > key): 
            a[i + 1] = a[i]
            i = i - 1
        a[i + 1] = key
       

    return a


a = [6, 5, 3, 1, 8, 7, 2, 4] 
print insertionSort(a)
```
 Hope this helps :)

    
 



