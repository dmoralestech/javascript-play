/**
 * Created by darwinmorales on 13/08/2016.
 */

/*
4 things that happens when you use a "new" keyword in a function
1) creates a brand new empty object
2) this empty object links to another object
3) this gets bound to the object.
4) if the function doesn't return anything it returns a this keyword.
 */
// new keyword
function foo() {
    this.baz = "baz";
    var a = "hi";
    console.log(a);
    console.log(this.bar + " " + baz);
}

var bar = "bar";
var baz = new foo(); //undefined undefined

// baz returns an object and it has a baz property because new foo() returns "this".

console.log(baz.baz); //baz


