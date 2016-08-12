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

/*
this binding rules precedence.
1) Was the function created with "new", if so use that object.
2) Was the function called with call or apply  specifying an explicit "this"?.. means that "new" keyword can override hard-binding
3) Was the function called via a owning object (context)?
4) Default global object (except in strict mode)
 */

function something() {
    this.hello = "hello";
    console.log(this.hello, this.who, who);
}

var who = "global", foobar, bazbam,
    obj1 = {who: "obj1", something: something},
    obj2 = {who: "obj2"};

something(); //hello undefined global
console.log(hello); //hello - because it was created in the the global scope

obj1.something(); // hello obj1 global
console.log(obj1.hello);  //hello

obj1.something.call(obj2); //hello obj2 global
console.log(obj2.hello);

foobar = something.bind(obj2); // foobar - binding obj2 to the something function
foobar(); //hello obj2 global
foobar.call(obj1); ////hello obj2 global - hard bind

bazbam = new something(); //hello undefined global
console.log(bazbam.hello); //hello

bazbam = new obj1.something(); //hello undefined global
bazbam = new foobar(); //hello undefined global


//Closure exercises
/*
closure is when a function remember its lexical scope even when the function is executed outside that lexical scope
 */

function foo() {
    var bar = "bar";

    function baz() {
        console.log(bar);
    }

    bam(baz);
}

function bam(baz) {
    baz();
}

foo();

