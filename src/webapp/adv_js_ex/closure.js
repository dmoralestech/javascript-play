/**
 * Created by darwinmorales on 13/08/2016.
 */

//Closure exercises
/*
 closure is when a function remember its lexical scope even when the function is executed outside that lexical scope
 */

function foo() {
    var bar = "bar";


    function baz() {
        /*
         Here baz knows by lexical scope, ie it will find first in the current scope, if it doesn't find it,
         it will look at the outer scope. In this case it's in the scope of foo().
         */
        console.log(bar);
    }

    bam(baz); // bam is called in a separate function scope but with a reference to baz
}


function bam(baz) { // baz still here has a reference to the function foo() which has var bar
            /*
            It's not a copy of the lexical scope. It's a reference to the baz lexical scope.
             */
    baz(); // returns "bar".. this is where the closure is happening
}

foo();

// By definition this is not a closure because it doesn't return a function, and there's no function
// being transported outside the scope.
var foo1 = (function() {
    var o = {bar: "bar"};

    return {obj: o};

})();

console.log(foo1.obj.bar); // bar

// classic  module pattern
// 1) there must be an outer wrapping function that gets executed (normally an iife)
// 2) one or more function calls that are being returned from the inner functions that has closure in the private scope.
//      ex. the bar function inside foo has references to the o object.

var foo2 = (function() {
    var o = {bar: "bar"};

    return { bar: function() {
        console.log(o.bar);
    }};
})();

foo2.bar();