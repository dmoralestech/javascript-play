/**
 * Created by dmorales on 23/05/2016.
 */
// sample code from this book..

const x = 5;
x = 3;


const eat = (food) => {} ;
const cook = (food) => {};
const compose = (a, b) => (c) => a(b(c));
const cookAndEat = (food) => eat(cook(food));
const cookAndEat2 = compose(eat, cook);

// const callFirst = (fn, larg) =>
//     function (...rest) {
//         return fn.call(this, larg, ...rest);
//     };
//
// const callLast = (fn, rarg) =>
//     function (...rest) {
//         return fn.call(this, rarg, ...rest);
//     };
//
// const greet = (me, you) => `Hello, ${you}, my name is ${me}`;
//
// const heliosSayHello = callFirst(greet, 'Helios');
// console.log(heliosSayHello('Darwin'));


function once(fn) {
    var done = false;

    return function()  {
        return done ? void 0 : ((done = true), fn.apply(this, arguments))
    }
}

var askedOnBlindDate = once( function() {
    return "sure why not?!"
});

console.log(askedOnBlindDate());
console.log(askedOnBlindDate());

function maybe(fn) {
    "use strict";
    return function(argument) {
        if (argument != null) {
            return fn.call(this, argument)
        }
    }
}

var someObject = {
    setSize: maybe(function () {
        "use strict";
        this.size = size;
        return this;
    })
}

var newList =  [1, 2, 3].map((x) => x + 2);
console.log(newList);
// let fibonacci = {
//    [Symbol.iterator]() {
//        let pre = 0, cur=1;
//        return {
//            next() {
//                [pre, cur] = [cur, pre + cur];
//                return {done: false, value: cur}
//            }
//        }
//    }
// };

// still doesn't work
// function mandatory() {
//     throw new Error("Missing Parameter");
// }
//
// function foo(mustBeProvided = mandatory()){
//     return mustBeProvided;
// }
//
// console.log(foo());
// console.log(foo(123));


const arr = ['a', 'b'];
arr.forEach(function(elem, index){
    console.log("index = " + index, "; elem = " + elem);
});