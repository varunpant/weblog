
+++
title = "minimum insertions to form a palindrome"
date = "2017-10-15"
author = " "
cover = ""
description = ""
tags = ["python","algorithm"]
+++

### Brute-force approach

 Here I present a few approaches to deduce "minimum insertions" required to convert a string into a palindrome.

 The basic brute force approach is quite simple, given a string with length L, start comparing, the first character from left and the last character while scanning inwards.

  Here is a basic test for a palindrome.

 ```def ispalindrome(s):
    L = len(s) 
    for i in range(L):
        if s[i] != s[L - i - 1]:
            return False,i,L-i -1
    return True,0,0

```
 The above code returns **True** if the string is a palindrome or returns **False** with **mismatching** indices.

  result,left,right = ispalindrome("aba") will return True,0,0 while result,left,right = ispalindrome("abc") will return False,0,2 indicating the characters at 0th position, **a**, does not match with character at 2nd position, **c** 

  Once the indices are found a basic recursive solution can be written to **reflect** the missing strings from the mismatching indices. 

```def to\_palendrome\_left\_reflect(s):
    p,l,r = ispalindrome(s)
    if not p: 
        if l == 0:
            s = s[r] + s
        else:
            s = s[0:l]+ s[r] + s[l:]
        return to\_palendrome\_left\_reflect(s)
    else: 
        return s
        
def to\_Palendrome\_rigth\_reflect(s):
    p,l,r = ispalindrome(s)
    if not p: 
        if l == 0:
            s =  s + s[l]
        else:
            s = s[0:r+1] + s[l] + s[r+1:]
        return to\_Palendrome\_rigth\_reflect(s)
    else: 
        return s

```
  Some tests are as follows. 

```print to\_palendrome\_left\_reflect("ab") #bab
print to\_palendrome\_left\_reflect("abc")#cbabc

print to\_Palendrome\_rigth\_reflect("ab") #aba
print to\_Palendrome\_rigth\_reflect("abc")#abcba


```
 To find which is smaller we write a quick function as shown below.

 ```def find\_Minimum\_Insertions(s):
    L = len(s)
    left\_insertion = to\_palendrome\_left\_reflect(s)
    right\_insertion = to\_Palendrome\_rigth\_reflect(s)
    delta\_l = len(left\_insertion) - L
    delta\_r = len(right\_insertion) - L

    print "LEFT:",left\_insertion
    print "RIGHT:",right\_insertion
    if delta\_l < delta\_r:
        print "MIN-LEFT",delta\_l
    else:
        print "MIN-RIGHT",delta\_r

```
 Its important to consider that above mentioned techniques ignores **deletion** or **susbtitution**.

 ### Another approach which only calculates count, while considering all possible operations.

 ```def findMinInsertions(s,start,end):
    
    if start == end:
        return 0
    if start == end -1:
        if s[start] == s[end]:
            return 0
        return 1
    if s[start] == s[end]:
        return findMinInsertions(s,start+1,end - 1)
    else:
        a = findMinInsertions(s,start,end - 1)
        b = findMinInsertions(s,start+1,end) 
        return min(a,b)+1

```
 ### Dynamic Programming approach (fastest)

 ```def findMin\_Insertions\_count\_Dynamicly(s):
    n = len(s)
    table = [[0 for i in range(n)]  for j in range(n)]
    start = 0
    end = 0 
    for y in range(0,n-1):
        a = 0
        for  x in range(n):
            if x>y-1:
                table[y][x] = a
                a+=1
                 
    return table[0][n-1]

```
 This, by far is the fastest of all methods, but only works for string which are not already a**palindrome** , the trick is to have a n x n  matrices and then fill in a particual order from left to right, increasing the gaps per row as shown below, for string **abcde** 

  

```a b c d e
----------
0 1 2 3 4
0 0 1 2 3 
0 0 0 1 2 
0 0 0 0 1 
0 0 0 0 0

```
 The M[0][n-1] is **3**

 Hope this helps.



