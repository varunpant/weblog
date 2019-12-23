
+++
title = "Classes and Inheritance in EcmaScript 6 (ES6 Harmony)"
date = "2014-11-30"
author = " "
cover = ""
description = ""
category = ["javascript"]
+++

 So if you are a JavaScript geek and haven't yet heard,(if every one is listening to ECMA announcements, who's gonna drink beer :) ) ECMA 6 feature set has been drafted,its [feature set ](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts) is frozen, it is mostly being refined now. You can already program in it and compile it to current JavaScript . The JavaScript frameworks AngularJS and Ember.js will be based on it (with ways to opt out). Again, via cross-compilation.

  As you may already know JavaScript is being used both client side i.e. in the browser and also on server side eg:Node.js. To check which features are currently supported in your browser visit [here ](http://kangax.github.io/compat-table/es6/) 

  For me , the most exciting feature has been Classes. We all know that JavaScript needs this soo badly, even though JavaScript, has always been referred to as an OOP language, and arguments have been made by many that as long as you can implement a class like encapsulation and inheritance like functionality, the language must be regarded as an OOP language(I know, there is much more to this as well), now I being, a humble developer, in most cases just agreed to all that mumbo-jumbo, but there has always been a secret fire burning all along. The desire to actually have a **Class** keyword and **extend** keyword, so that my brain finds symmetry in the world

  Well somebody must have been listening up there, I mean in the ECMA world, and eventually these babies are here, hence this amazing posts to share the joy :). 

 So before these keywords were present, a class like construct was generally created like the snippet below ### Class

  function Employee( name,age, salary ) { //approximate a class/constructor this.name = name; this.age= age; this.salary = salary; this.printEmployeeDetails = function(){ //expose a function console.log(this.name + ' is ' + this.age + ' years old, and earns ' + this.salary); } } // Instantiate a new Employee var smith = new Employee( "Smith",35,100000); smith.printEmployeeDetails(); //Smith is 35 years old, and earns 100000  In ECMA6 this can be done as follows  class Employee { constructor(name,age, salary ) { //constructors! this.name = name; this.age= age; this.salary = salary; } printEmployeeDetails(){ console.log(this.name + ' is ' + this.age + ' years old, and earns ' + this.salary); } }  ### Inheritance

  In current JavaScript, Inheritance is prototypical, which to laymen is a keyword and also lets you override the constructer. Inheritance can be defined like this ChildClassName.prototype = new ParentClass(); To Illustrate, consider this example  function Janitor(name) { this.name = name; //These values are not passed in by constructor and are local to class Janitor this.age = 66; this.salary = 5000; } Janitor.prototype = new Employee();// Here's where the inheritance occurs Janitor.prototype.constructor=Janitor;// Override the Employee (super) constructor, real confusing, I know //Define new Janitor Instance var bob = new Janitor('Bob'); //note: bob has printEmployeeDetails method inherited from Employee class bob.printEmployeeDetails() // Bob is 66 years old, and earns 5000  

  In ECMA6 this can be done as follows  class Janitor extends Employee { //inheritance constructor(name) { super(name); //call the parent constructor with super this.age = 66; this.salary = 5000; } } let bob = new Janitor('Bob'); bob.printEmployeeDetails() // Bob is 66 years old, and earns 5000  Unfortunately Chrome, which is my browser of choice does not support classes, so you can't run this code in console, but I am sure, I will strike out this line soon :) 

 B.T.W check these projects out too [Microsoft’s TypeScript](http://www.typescriptlang.org/),[ Facebook’s Flow](http://flowtype.org/) and [Google’s AtScript.](https://docs.google.com/document/d/11YUzC-1d0V1-Q3V0fQ7KSit97HnZoKVygDxpWzEYW0U/edit?pli=1)

 

 



