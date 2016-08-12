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