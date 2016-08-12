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
        console.log(bar);
    }

    bam(baz);
}

function bam(baz) {
    baz();
}

foo();