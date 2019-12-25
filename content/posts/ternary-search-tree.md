
+++
title = "Ternary search tree"
date = "2014-01-26"
author = " "
cover = ""
description = ""
tags = [".net","datastructure"]
+++

In [computer science](http://en.wikipedia.org/wiki/Computer_science), a **ternary search tree** is a type of [prefix tree](http://en.wikipedia.org/wiki/Trie) where nodes are arranged as a [binary search tree](http://en.wikipedia.org/wiki/Binary_search_tree). Like other prefix trees, a ternary search tree can be used as an [associative map](http://en.wikipedia.org/wiki/Associative_map) structure with the ability for incremental [string search](http://en.wikipedia.org/wiki/String_search). However, ternary search trees are more space efficient compared to standard prefix trees, at the cost of speed. Common applications for ternary search trees include [spell-checking](http://en.wikipedia.org/wiki/Spell-check) and [auto-completion](http://en.wikipedia.org/wiki/Auto-completion).

 As with other trie data structures, each node in a ternary search tree represents a prefix of the stored strings. All strings in the middle subtree of a node start with that prefix.

 In this blog post I present a c# version of Ternary Search Tree.

 ### The interface

 ```csharp
 interface ITernaryTree<T>
    {
        void Add(string key, T value);
        bool Contains(string key);
        System.Collections.Generic.IEnumerable<string> Keys { get; }
        int Length { get; }
        System.Collections.Generic.IEnumerable<T> NearSearch(string query, int distance);
        System.Collections.Generic.IEnumerable<string> PrefixMatch(string prefix);
        System.Collections.Generic.IEnumerable<T> Search(string prefix);
        T this[string key] { get; }
        System.Collections.Generic.IEnumerable<string> WildcardMatch(string pat);
    }
```
 The interface above defines the API for the data structure. Lets take a deeper look.

   void Add(string key, T value) Add a key value pair in the tree.   bool Contains(string key) Check whether a key is in tree.   IEnumerable<string> <string> Keys  Return all keys in the tree.   int Length Returns the length of the tree.   IEnumerable<T> NearSearch(string query, int distance) Returns all values for keys in the dictionary that are within a given Hamming distance of a query.   IEnumerable<string> PrefixMatch(string prefix) Returns all keys starting with a given prefix.   IEnumerable<T> Search(string prefix) Searches all values of keys starting with given prefix.   T  this[string key] Gets the node value with the specified key   IEnumerable<string> WildcardMatch(string pat) Returns all keys matching given wilcard pattern.    

 ### The Trie Node

 ```csharp
 class Node
        {
            /// <summary>
            /// character
            /// </summary>
            internal char c;

            /// <summary>
            /// The left, middle, and right subtries.
            /// </summary>
            internal Node left, mid, right;

            /// <summary>
            /// The value associated .
            /// </summary>
            internal T value;
        }
```
 The Class is mostly self explanatory, but the key points to note is that it contains three internal node(sub-tries) unlike a traditional trie node. 

 Adding node in the data structure

 ```  csharp
       /// <summary>
        /// Adds the specified key.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <param name="value">The value.</param>
        public void Add(string key, T value)
        {
            if (string.IsNullOrEmpty(key)) { throw new InvalidOperationException("Keys cannot be null or empty."); }
            if (!Contains(key)) N++;
            root = Add(root, key, value, 0);
        }

        /// <summary>
        /// Adds the specified node in the tree.
        /// </summary>
        /// <param name="node">The Node.</param>
        /// <param name="key">The key.</param>
        /// <param name="value">The val.</param>
        /// <param name="charIndex">The d.</param>
        /// <returns></returns>
        Node Add(Node node, string key, T value, int charIndex)
        {
            char charAtIndex = key[charIndex];
            if (node == null) { node = new Node(); node.c = charAtIndex; }
            if (charAtIndex < node.c) node.left = Add(node.left, key, value, charIndex);
            else if (charAtIndex > node.c) node.right = Add(node.right, key, value, charIndex);
            else if (charIndex < key.Length - 1)
                node.mid = Add(node.mid, key, value, charIndex + 1);
            else node.value = value;
            return node;
        }
```
 ### Get

 ```csharp
        /// <summary>
        /// Gets the specified x.
        /// </summary>
        /// <param name="node">The x.</param>
        /// <param name="key">The key.</param>
        /// <param name="charIndex">The d.</param>
        /// <returns></returns>
        Node Get(Node node, string key, int charIndex)
        {
            if (node == null) return null;
            char c = key[charIndex];
            if (c < node.c) return Get(node.left, key, charIndex);
            else if (c > node.c) return Get(node.right, key, charIndex);
            else if (charIndex < key.Length - 1)
                return Get(node.mid, key, charIndex + 1);
            else return node;
        }
```
 and finally

 ### PrefixMatch

 ```csharp   
        /// <summary>
        /// Returns all keys starting with a given prefix.
        /// </summary>
        /// <param name="prefix">The prefix.</param>
        /// <returns></returns>
        public IEnumerable<string> PrefixMatch(string prefix)
        {
            Queue<string> queue = new Queue<string>();
            Node node = Get(root, prefix, 0);
            if (node == null) return queue;
            if (node.value != null) queue.Enqueue(prefix);
            Collect(node.mid, prefix, queue);
            return queue;
        }
```
 To see a complete working example check out the Github page [here](https://github.com/varunpant/TernaryTree/blob/master/TernaryTree/TernarySearchTree/TernaryTree.cs).

 Full repo can be found [here](https://github.com/varunpant/TernaryTree). There is a test web application demonstrating auto suggest included in the project, I will write more about it in a later post.



