
+++
title = "Binary Search Tree in python"
date = "2016-08-01"
author = " "
cover = ""
description = ""
category = ["python","algorithms"]
+++

BST data structure supports many dynamic-set operations including

 
 2. Search
 4. Minimum
 6. Maximum
 8. Predecessor
 10. Successor
 12. Insert
 14. Delete
 
 These basic operations allow us to treat this data structure both as a dictionary and as a priority queue. 

 Basic operations on a binary tree takes time proportional to the height of the tree, O(lg n) [worst case] and even O(n) if the tree is a linear chain. 

 If you want to learn more about practical application of these trees check [this](https://stackoverflow.com/questions/2130416/what-are-the-applications-of-binary-trees) post out. 

 Here I present a very basic version of binary tree written in python

  

```class Node:
    def \_\_init\_\_(self,left=None,right=None,parent=None,key=None):
        self.left = left
        self.right = right
        self.parent = parent
        self.key = key
    
class BinaryTree:
    
    def \_\_init\_\_(self): 
        self.root = None

    def inorderWalk(self,node):
        if node is not None:
            self.inorderWalk(node.left)
            print node.key
            self.inorderWalk(node.right)

    def treeSearch(self,node,key):
        if node is None or key == node.key:
            return node
        if key < node.key:
            return self.treeSearch(node.left,key)
        else:
            return self.treeSearch(node.right,key)

    def iterativeTreeSearch(self,node,key):
        while node is not None and key != node.key:
            if key < node.key:
                node = node.left
            else:
                node = node.right

        return node

    def treeMinimum(self,node):
        while node.left is not None:
            node = node.left

        return node

    def treeMaximum(self,node):
        while node.right is not None:
            node = node.right

        return node

    def treeSuccessor(self,node):
        if node.right is not None:
            return self.treeMinimum(node.right)
        y = node.parent
        while y is not None and node == y.right:
            node = y
            y = y.parent
        return y

    def treePredecessor(self,node):
        if node.left is not None:
            return self.treeMaximum(node.left)
        y = node.parent
        while y is not None and node == y.left:
            node = y
            y = y.parent
        return y

    def insert(self,node):
        y = None
        x = self.root
        while x is not None:
            y = x
            if node.key < x.key:
                x = x.left
            else:
                x = x.right
        node.parent = y
        if y == None:
            self.root = node #Tree was empty
        elif node.key < y.key:
            y.left = node
        else:
            y.right = node

    def transplant(self,u,v):
        if u.parent is None:
            self.root = v
        elif u == u.parent.left:
            u.parent.left = v
        else:
            u.parent.right = v
        if v is not None:
            v.parent = u.parent

    def delete(self,node):
        if node.left is None:
            self.transplant(node,node.right)
        elif node.right is None:
            self.transplant(node,node.left)
        else:
            y = self.treeMinimum(node.right)
            if y.parent is not node:
                self.transplant(y,y.right)
                y.right = node.right
                y.right.parent = y
            self.transplant(node,y)
            y.left = node.left
            y.left.parent = y



A = [12,5,2,9,18,15,19,13,17]

T = BinaryTree()

for \_key in A:
    N = Node(key = \_key)
    T.insert(N)

T.inorderWalk(T.root)

print "Max: " + str(T.treeMaximum(T.root).key)
print "Min: " + str(T.treeMinimum(T.root).key)

sn = T.treeSearch(T.root,17)

print T.treeSuccessor(sn).key
print T.treePredecessor(sn).key

# for k in A:
#     print "-"*10
#     f = T.treeSearch(T.root,k)
#     print "deleting", f.key
#     T.delete(f) 
#     T.inorderWalk(T.root)


```
 

