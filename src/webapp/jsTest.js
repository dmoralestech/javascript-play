/**
 * Created by dmorales on 9/12/2015.
 */
//var _ = require('C:\\java\\simple-java\\underscore-min.js');
var _ = require("./underscore.js");
var curry = require('lodash.curry');

const p1 = new Person('Haskell', 'Curry', '111-11-1111');
p1.address = new Address('US');
p1.birthYear = 1900;

const name = p -> p.fullname;
console.log(name(p1));

function not(fn) {
    return function (argument) {
        return !fn(argument)
    }
}



//var arrayNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//arrayNums = arrayNums.map(
//    function (num) {
//        return Math.pow(num, 2);
//    });
//
//console.log(arrayNums);

console.log([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
    function (num) {
        return Math.pow(num, 2);
    }));


// just putting a comment to see if github works...
console.log(not(function () {
    "use strict";
    return true;
})());

function maybe1(fn) {
    "use strict";
    return function () {
        var i;

        if (arguments.length === 0) {
            return;
        } else {
            for (i = 0; i < arguments.length; ++i) {
                if (arguments[i] == null) {
                    return;
                }
                return fn.apply(this, arguments);
            }
        }
    }
}

var x23 = function (a, b, c) {
    "use strict";
    return a + b + c;
}

var x24 = maybe1(x23);
var x25 = x24(1, 2, 3);

console.log(x23(1, 2, 3));
console.log(maybe1(x23)(1, 2, 3)); //6
console.log(maybe1(x23)(1, null, 3)); //4


function lens(get, set) {
    "use strict";
    var f = function (a) {
        return get(a);
    };

    f.set = set;
    f.mod = function (f, a) {
        return set(a, f(get(a)));
    };

    return f;
}

var first = lens(
    function (a) {
        return a[0];
    },
    function (a, b) {
        return [b].concat(a.slice(1));
    }
);

console.log(first([1, 2, 3])); // 1
console.log(first.set([1, 2, 3], 5)); // [5, 2, 3]

function tenTimes(x) {
    return x * 10;
}

console.log(first.mod(tenTimes, [1, 2, 3])); // [10, 2, 3]

function convertToUpperCase(value) {
    "use strict";
    return value.toUpperCase();
}


function concatNames(first, last) {
    "use strict";
    return first.toUpperCase() + " " + last;
}

var concatBindFn = concatNames.bind(null, "darwin", "morales");

console.log(concatBindFn());
console.log(convertToUpperCase.bind(null, "darwin")());

var ancestry = [
    {name: "Darwin Morales"},
    {name: "Nova Morales"}
];
var theSet = ["Darwin Morales", "Nova Morales", "Daniel Morales", "Felicity Morales"];

function isInSet(set, person) {
    "use strict";
    return set.indexOf(person.name) > -1;
}

console.log(ancestry.filter(function (person) {
    "use strict";
    return isInSet(theSet, person);
}));

console.log(ancestry.filter(isInSet.bind(null, theSet)));
console.log(isInSet.bind(null, theSet, {name: "Darwin Morales"})());

var items = [1, 2, 3, 4];
var copy = items.slice();
copy.push(5);

console.log(items);
console.log(copy);

items = [1, 2, 3, 4];
copy = items.slice(0, 2);

console.log(copy); // [1, 2]

copy = items.slice(-2);
console.log(copy); // [1, 2]

var person = {
    name: 'darwin-morales'
};

//var filters = {
//    'deslugify': x => x.replace('-', ' '),
//    'uppercase': x => x.toUpperCase()
//};

//var input = 'name | deslugify | uppercase';

//var sections = input.split("|").map(x => x.trim());

//var ref = person[sections(0)];

//var output = sections
//                .slice(1)
//    .reduce((prev, next))

var darwin = {name: "Darwin"};
var nova = {name: "Nova"};
var daniel = {name: "Daniel"};
var sitti = {name: "Sitti"};

var family = [darwin, nova, daniel, sitti];

console.log(family.indexOf(sitti));

var people = [
    {name: 'Darwin'},
    {name: 'Nova'}
];
var people2 = [
    {name: 'Daniel'},
    {name: 'Sitti'}
];

people.concat(people2).forEach(function (person) {
    "use strict";
    console.log(person.name);
});

var names = ['Darwin', 'Joseph', 'Morales'];
console.log(names.join(' '));

var arr1 = [1, 2];
var newArray = arr1.concat([3, 4], [5, 6, 7]);
console.log(newArray); //[ 1, 2, 3, 4, 5, 6, 7 ]

var newArray2 = arr1.concat([3, 4], [5, [6, 7]]);
console.log(newArray2); //[ 1, 2, 3, 4, 5, [6, 7] ]

function squaresWithin(a, b) {
    "use strict";
    var result = [];
    for (var i = Math.ceil(Math.sqrt(a)); i <= Math.floor(Math.sqrt(b)); i++) {
        result.push(i * i);
    }
    return result;
}

console.log(squaresWithin(1, 1000));
console.log(squaresWithin(99000, 100000));


function sayHello(firstName, secondName, middleName) {
    console.log(this.sayHello(), firstName, middleName, secondName);
}

var context = {
    sayHello: function () {
        return 'Hello';
    }
}

const boundFunc = sayHello.bind(context, 'Darwin', 'Morales', 'Joseph');
boundFunc('Joseph 3');

var dissociativeIdentity = _.compose(_.identity, _.identity);

console.log(dissociativeIdentity(22) === _.identity(22));

function partial1(fun, arg1) {
    return function () {
        var args = construct(arg1, arguments);
        return fun.apply(fun, args);
    }
}

var rand = partial1(_.random, 1);

console.log(rand(10));
console.log(rand(10));
console.log(rand(10));

console.log(repeatedly(10, function () {
    return "a";
}));
console.log(repeatedly(10, partial1(rand, 10)));
console.log(_.take(repeatedly(100, partial1(rand, 10)), 5));

function randString(len) {
    var ascii = repeatedly(len, partial1(rand, 26));
    console.log('RANDSTRING: ', ascii)
    return _.map(ascii,function (n) {
        return n.toString(36);
    }).join('');
}

console.log(randString(0));
console.log(randString(1));
console.log(randString(20));

function generateRandomCharacter() {
    return rand(26).toString(36);
}

function generateString(charGen, len) {
    return repeatedly(len, charGen).join('');
}

console.log(generateString(generateRandomCharacter, 30));

var composedRandomString = partial1(generateString, generateRandomCharacter);

console.log(composedRandomString(15));

var dataObjs = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5}
];

console.log(_.zip(['a', 'b', 'c'], [1, 2, 3]));
console.log(_.zip(['a', 'b', 'c'], [1, 2, 3, 4]));

function isIndexed(data) {
    return _.isArray(data) || _.isString(data);
}

function fail(msg) {
    throw new Error(msg);
}

function nth(a, index) {
    if (!_.isNumber(index)) fail("Expected a number as the index");
    if (!isIndexed(a)) fail("Not supported on non-indexed type");
    if ((index < 0) || (index > a.length - 1))
        fail("Index value is out of bounds");
    return a[index];
}

function second(a) {
    return nth(a, 1);
}

function constructPair(pair, rests) {
    return [construct(_.first(pair), _.first(rests)),
        construct(second(pair), second(rests))];
}

function unzip(pairs) {
    if (_.isEmpty(pairs)) {
        return [
            [],
            []
        ];
    }

    return constructPair(_.first(pairs), unzip(_.rest(pairs)))
}

console.log(_.unzip(_.zip([1, 2, 3], [4, 5, 6])));

function cycle(times, ary) {
    if (times <= 0) {
        return [];
    } else {
        return cat(ary, cycle(times - 1, ary));
    }
}

console.log(cycle(2, [1, 2, 3]));
console.log(_.first(cycle(20, [1, 2, 3]), 11));

function myLength(ary) {
    if (_.isEmpty(ary)) {
        return 0;
    } else {
        return 1 + myLength(_.rest(ary));
    }

}


console.log(myLength(_.range(10)));
console.log(myLength(_.range(10000)));


var get = curry(function (prop, obj) {
    return obj[prop];
});

var map = curry(function (fn, value) {
    return value.map(fn);
})

var getIds = map(get('id'));

console.log(getIds(dataObjs));

console.log(dataObjs.map(get('id')));

var __slice = Array.prototype.slice;

function callFirst(fn, larg) {
    return function () {
        var _args = __slice.call(arguments, 0);

        return fn.apply(this, [larg].concat(_args));
    }
}

function callLast(fn, rarg) {
    return function () {
        var _args = __slice.call(arguments, 0);

        return fn.apply(this, [rarg].concat(_args));
    }
}

function greet(me, you) {
    return "Hello " + you + " my name is " + me;
}

var heliosSaysHello = callFirst(greet, 'Helios');

console.log(heliosSaysHello('Eartha'));

var sayHelloToCeline = callLast(greet, "Celine");

console.log(sayHelloToCeline('Eartha'));

function MONAD() {
    return function unit(value) {
        var monad = Object.create(null);
        monad.bind = function (func) {
            return func(value);
        };
        return monad;
    };
}

//function MONADv2() {
//    var prototype = Object.create(null);
//    function unit(value) {
//        var monad = Object.create(prototype);
//        monad.bind = function (func, args){
//            return func.apply(undefined, [value].concat(Array.prototype.slice.apply(args || [])));
//        };
//        return monad;
//    }
//    unit.method = function(name, func) {
//        prototype[name] = func;
//        return unit;
//    }
//    unit.lift = function(name, func) {
//        prototype[name] = function (... args) {
//            return unit(this.bind(func, args));
//        };
//        return unit;
//    }
//
//    return unit;
//}

var plus1 = function (x) {
    return x + 1;
};

var identity = MONAD();
var monad = identity("Hello");
monad.bind(console.log);

monad = identity(3);
console.log(monad.bind(plus1));

/*
 function autoCurry(fn, numArgs) {
 numArgs = numArgs || fn.length;
 function f() {
 if (arguments.length < numArgs)
 {
 return numArgs - arguments.length > 0 ?
 autoCurry(curry.apply(this, [fn].concat(toArray(arguments))),
 numArgs - arguments.length) :
 curry.apply(this, [fn].concat(toArray(arguments)));
 }
 else
 {
 return fn.apply(this, arguments);
 }
 }
 f.toString = function() { return fn.toString(); };
 f.curried = true;
 return f;
 }

 Function.prototype.autoCurry = function(n) { return autoCurry(this, n); }



 var dot = function(prop, obj) {
 return obj[prop];
 }.autoCurry();

 var userPhone = dot('phone');

 console.log(userPhone({name: 'darwin', phone:'9929299'}));

 */


console.log(_.myMap(plus1, [3]));
var arrayPlus1 = _.myMap(plus1, Array(3));

console.log(_.myMap(function (x) {
    return "I am " + x
}, ['yo']));
console.log(_.myMap(function (x) {
    return "I am " + x.id
}, [
    {id: 3}
]));

function truthy(x) {
    return (x !== false) && existy(x)
};

var length = function (x) {
    return x.length;
}

var split = function (x) {
    return x.split(' ');
}
_.split
var wordCount = compose(length, split);
console.log(wordCount('a b c  d e'));


function doWhen(cond, action) {
    if (truthy(cond))
        return action();
    else
        return undefined;
}

function invoker(NAME, METHOD) {
    return function (target) {
        if (!existy(target)) console.log("Must provide a target");
        var targetMethod = target[NAME];
        var args = _.rest(arguments);
        return doWhen((existy(targetMethod) && METHOD === targetMethod), function () {
            return targetMethod.apply(target, args);
        });
    };
};

var dmRev = invoker('keys', Array.prototype.reverse);
console.log(_.map([
    [1, 2, 3],
    [4, 5, 6]
], dmRev));

function dispatch() {
    var funs = _.toArray(arguments);
    var size = funs.lenght;

    return function (target) {
        var ret = undefined;
        var args = _.rest(arguments);

        for (var i = 0; i < size; i++) {
            var fun = funs[i];
            ret = fun.apply(fun, construct(target, args));

            if (existy(ret)) return ret;
        }

        return ret;
    };
}


function stringReverse(s) {
    if (!_.isString(s)) return undefined;
    return s.split('').reverse().join('');
}
console.log(stringReverse('abc'));
console.log(stringReverse(1));


var rev = dispatch(invoker('reverse', Array.prototype.reverse), stringReverse);
console.log(rev([1, 2, 3]));
console.log(rev('abc'));

function always(VALUE) {
    return function () {
        return VALUE;
    }
}

var sillyReverse = dispatch(rev, always(42));
console.log(sillyReverse([1, 2, 3]));
console.log(sillyReverse('abc'));

var str = dispatch(invoker('toString', Array.prototype.toString), invoker('toString', String.prototype.toString));

console.log(str('a'));
console.log(_.range(10));

function rightAwayInvoker() {
    var args = _.toArray(arguments);
    var method = args.shift();
    var target = args.shift();
    var blah = args.shift();
    return method.apply(target, args);
}

console.log(rightAwayInvoker(Array.prototype.reverse, [1, 2, 3], 'blah'));
var shifty = Array.prototype.shift.apply() ['1', '2', '3'].shift();
var shifty2 = ['1', '2', '3'].shift();
console.log(shifty);
console.log(shifty2);


var toUpperCase = function (x) {
    return x.toUpperCase();
};
var exclaim = function (x) {
    return x + '!';
};

function compose(a, b) {
    return function (c) {
        return a(b(c)); //split('a b c d')
    }
}

var shout = compose(exclaim, toUpperCase);

console.log(shout("send in the clowns"));

var findCurry = curry(function (coll, pred) {
    return _.find(coll, pred);
})

var findSomething = findCurry(['a', 'b', 'c']);
var findSomethingA = findSomething(function (e) {
    return e === 'a';
});


console.log(_.find(['a', 'b', 'c'], function (e) {
        return e === 'a'
    }
));


var newVals = _.map(['a', 'b', 'c'], function (e, i) {
    return e + e + i;
})

var filterMap = curry(function (coll, fun) {
    return _.map(coll, fun)
})


var filterMapHolder = filterMap(['a', 'b']);

var filterMapHolderFun = filterMapHolder(function (e) {
    return e + e;
})

function match2(what, str) {
    console.log('WHAT: ' + what);
    console.log('STR: ' + str);
    return str.match(what);
}

var replace = curry(function (what, replacement, str) {
    return str.replace(what, replacement);
});

var filter = curry(function (f, ary) {
    return ary.filter(f);
});

var map = curry(function (f, ary) {
    return ary.map(f);
});

var resMatch = match2('ell', "hello world");

var hasSpaces = match(/\s+/g);

console.log(hasSpaces("hello world"));

console.log(filter(hasSpaces, ['darwin_morales', 'darwin morales']));

var findWithSpaces = filter(hasSpaces);

console.log(findWithSpaces(['darwin_morales', 'darwin morales']));

console.log(resMatch);
console.log(match(/\s+/g, "hello world"));
console.log(match(/\s+/g)("hello world"));
console.log(replace("hello")("wazzup")("hello world"));

var abc = function (a, b, c) {
    return [a, b, c];
};

var curried = curry(abc);

console.log(curried(1)(2)(3));
console.log(curried(1, 2)(3));
console.log(curried(1, 2, 3));


var memoize = function (f) {
    var cache = {};

    return function () {
        var arg_str = JSON.stringify(arguments);
        cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
        return cache[arg_str];
    };
};

var squareNumber = memoize(function (x) {
    return x * x;
});

console.log(squareNumber(4));
console.log(squareNumber(5));
console.log(squareNumber(4));

var myClosureExample = function (A, B, C, D) {
    return function (x, y) {
        console.log(A + "," + B + "," + C + "," + D);
        return (A + B + C + D) * x * y;
    };
};

var func = myClosureExample(10, 20, 30, 40);
var func2 = myClosureExample(1, 20, 30, 50);

console.log(func(2, 3));
console.log(func2(5, 10));


var addClass = function (className, element) {
    element.className += ' ' + className;
    return element;
};

var addTweedleClass = function (el) {
    return addClass('tweedle', el);
};

var addBoyClass = function (el) {
    return addClass('boy', el);
};

var ids = ['DEE', 'DUM'];
var elements = _.map(ids, document.getElementById);
elements = _.map(elements, addTweedleClass);

var partialFirstOfTwo = function (fn, param1) {
    return function (param2) {
        return fn(param1, param2);
    }
}

addTweedleClass = partialFirstOfTwo(addClass, 'tweedle');
addBoyClass = partialFirstOfTwo(addClass, 'boy');

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

var array5x5 = createArray(5, 5);
array5x5[0] = [1, 0, 0, 0, 1];

array5x5[1][0] = 1;
array5x5[1][1] = 1;
array5x5[1][2] = 0;
array5x5[1][3] = 0;
array5x5[1][4] = 0;

array5x5[2][0] = 1;
array5x5[2][1] = 1;
array5x5[2][2] = 1;
array5x5[2][3] = 0;
array5x5[2][4] = 0;

array5x5[3][0] = 1;
array5x5[3][1] = 1;
array5x5[3][2] = 1;
array5x5[3][3] = 1;
array5x5[3][4] = 0;

array5x5[4][0] = 1;
array5x5[4][1] = 1;
array5x5[4][2] = 1;
array5x5[4][3] = 1;
array5x5[4][4] = 1;

console.log(array5x5);
console.log(array5x5[0]);
console.log(array5x5[4]);

//this function setups up which tabs will be disabled depending on the current step.
function setUpTabUI(stepNum) { //stepNum is based-1.
    //get the appropriate array for that particular step
    console.log('setting page :' + stepNum);
    var row = array5x5[stepNum - 1];

    _.map(row, function (value, index) {
        console.log('setting page: ' + index + ' to ' + value);
    });
}

setUpTabUI(1);

function hasKeys() {
    var KEYS = _.toArray(arguments);

    var fun = function (obj) {
        return _.every(KEYS, function (k) {
            return _.has(obj, k);
        });
    };

    fun.message = cat(["Must have values for keys:"], KEYS).join(" ");
    return fun;
}

function getAttribute(attr) {
    return typeof this.getAttribute(attr) != 'undefined';
}

var accessors = {
    sortable: {
        get: function () {
            return getAttribute('sortable');
        }
    },
    droppable: {
        get: function () {
            return getAttribute('droppable');
        }
    }
};

function generateGetMethod(attr) {
    return function () {
        return typeof this.getAttribute(attr) != 'undefined';
    };
}
var accessors2 = {
    sortable: {
        get: generateGetMethod('sortable')
    },
    droppable: {
        get: generateGetMethod('droppable')
    }
};

var funcSamp = function (a, b) {
    //console.log(arguments.length);
//    console.log(arguments[0]);
//    console.log(arguments[1]);
//    console.log(arguments[2]);
//    console.log(arguments[3]);
    return a + b;
};

console.log(_.reduce([1, 2, 3, 4, 5], funcSamp));

function fnull(FUN) {
    var DEFAULTS = _.rest(arguments);
    console.log("defaults: " + DEFAULTS);

    return function subFunction(aa, bb, cc, dd, ee) {
        var args = _.map(arguments, function (e, i, p, y) {
            console.log("e: " + e);
            console.log("i: " + i);
            console.log("");
            return existy(e) ? e : DEFAULTS[i];
        });
        return FUN.apply(null, args);
    };
};

var numArr = [2, null, 3, null, 4, undefined, 5];
var funcParam = function (total, n) {
    return total * n;
};
var safeMult = fnull(funcParam, 100, 1000);

console.log(_.reduce(numArr, safeMult));

function makeUniqueStringFunction(start) {
    var counter = start;

    return function (prefix) {
        return [prefix, counter++].join('');
    }
}

var uniqueString = makeUniqueStringFunction(0);

console.log(uniqueString('dar'));
console.log(uniqueString('nov'));

function repeatedly(times, fun) {
    return _.map(_.range(times, 7), fun);
}

console.log(repeatedly(3, function (x) {
    console.log(x);
    return x + 1;
}));
console.log(repeat(3, "Hello World"));
console.log(repeatedly(3, function () {
    return "Hello World";
}));


function finder3(fun, coll) {
    return _.reduce(coll, function (x, y) {
        return fun(x, y) ? x : y;
    });
}

function finder2(valueFun, bestFun, coll) {
    return _.reduce(coll, function (best, current) {
        var bestValue = valueFun(best);
        var currentValue = valueFun(current);

        return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
    });
}

console.log(_.max([12, 34, 45, 43, 2]));
console.log(finder2(_.identity, Math.max, [12, 34, 45, 43, 2]));
console.log(finder3(function (x, y) {
    return x > y
}, [12, 34, 45, 43, 2]));


function plucker(FIELD) {
    return function (obj) {
        return (obj && obj[FIELD]);
    };
}

var getTitle = plucker("title");

console.log(getTitle({title: 'aaa', author: 'JFK'}));

function complement(PRED) {
    return function () {
        return !PRED.apply(null, _.toArray(arguments));
    };
}

function isEven(n) {
    return (n % 2) === 0;
}

var isOdd = complement(isEven);

console.log(isOdd(2, 3, 4, 5));

function foofoo(x) {
    var tmp = 3;

    return function (y) {
        console.log(x + y + tmp);
        x.memb = x.memb ? x.memb + 1 : 1;
        console.log(x.memb);
    }
}

var ageage = new Number(2);
var barbar = foofoo(ageage); // bar is now a closure referencing age.
barbar(10);

function makeKitchen() {
    var trashBags = ['A', 'B', 'C']; // only 3 at first

    return {
        getTrashBag: function () {
            return trashBags.pop();
        },
        putTrashInBin: function () {
            trashBags.push('D');
        }
    };
}

var kitchen = makeKitchen();

console.log(kitchen.getTrashBag());
console.log(kitchen.getTrashBag());
console.log(kitchen.getTrashBag());
kitchen.putTrashInBin();
console.log(kitchen.getTrashBag());

function makeAdder(CAPTURED) {
    return function (free) {
        return free + CAPTURED;
    };
}

var add10 = makeAdder(10);
console.log(add10(33));
console.log(makeAdder(10)(33));

function average(array) {
    var sum = _.reduce(array, function (a, b) {
        return a + b
    });
    return sum / _.size(array);
}

function averageDamp(FUN) {
    return function (n) {
        return average([n, FUN(n)]);
    }
}

function averageDamp2(FUN) {
    return function (a, b) {
        return average([a, b, FUN(a, b)]);
    }
}

var averageSquare = averageDamp(function (n) {
    return n * n;
})
var randomFunction = averageDamp2(function (a, b) {
    return a * b;
})
console.log(averageDamp2(function (a, b) {
    return a * b;
})(10, 20));

console.log(randomFunction(10, 20));
console.log(averageSquare(5));
console.log(averageDamp(function (n) {
    return n * n;
})(5));

function doSomething1() {
    console.log("a");
    console.log("b");
}

function seeIfReturnWithAFunctionWillWork() {
    console.log("0");
    if (true) {
        return doSomething1();
    }
    console.log("1"); // it shouldn't print this..
}

seeIfReturnWithAFunctionWillWork();

function createScaleFunction(FACTOR) {
    return function (v) {
        return _.map(v, function (n) {
            return (n * FACTOR);
        });
    };
}

var scale7 = createScaleFunction(7);

console.log(scale7([9, 3, 6]));

function f() {
    this.a = 200;
    return this.a + this.b;
}

var globals = {b: 2};

var qq = f.call(_.clone(globals));


function strangerIdentity(n) {
    for (this.i = 0; this.i < n; this.i++);
    return this.i;
}

var identityVal = strangerIdentity(108);
identityVal = strangerIdentity.call({}, 108);

console.log(identityVal);

var funcky = function (greeting) {
    console.log(greeting + ": " + this.name);
};

func = _.bind(funcky, {name: 'darwin'}, 'hello');
func('hi');

function globalThis() {
    return this;
}

var whatResult = globalThis.call('hello');
var whatResult3 = globalThis.call({name: 'darwin'});
var whatResult2 = globalThis.apply('hello too', []);

var funcs = [];

function createfunc(i) {
    return function () {
        console.log("My value: " + i);
    };
};

for (var i = 0; i < 3; i++) {
    funcs[i] = function (i) {
        console.log("My value: " + i);
    };
}

for (var j = 0; j < 3; j++) {
    funcs[j](j);                        // and now let's run each one to see
}


for (var i = 0; i < 3; i++) {
    (function (index) {
        console.log('iterator: ' + index);
        //now you can also loop an ajax call here
        //without losing track of the iterator value: $.ajax({});
    })(i);
}

console.log(_.range(2));
console.log(_.map(_.range(2), function (number) {
    return 'number: ' + number
}));

function existy(x) {
    return x != null
}

function cat() {
    var head = _.first(arguments);
    if (existy(head))
        return head.concat.apply(head, _.rest(arguments));
    else
        return [];
}

function cat2() {
    var head = _.first(arguments);
    if (existy(head))
        return head.concat(_.rest(arguments));
    else
        return [];
}

console.log(['a'].concat(['3', '4'], ['x', 'y', 'z']));
console.log([].concat.apply(['a'], [
    ['3', '4'],
    ['x', 'y', 'z']
]));
console.log([].concat.apply(['z'], ['y', ['t'], ['q'], ['a', 'b'], ['3', '4'], ['w'], ['x', 'y', 'z']]));

console.log(_.first(['a', 'b', 'c']));
console.log(_.rest(['a', 'b', 'c']));
console.log(cat(['3', '4', '5'], ['a', 'b'], ['q', 'r']));
console.log(cat2(['a'], ['3', '4'], ['x', 'y', 'z']));


function construct(head, tail) {
    return cat([head], _.toArray(tail));
}

console.log(_.toArray({a: '1', b: '2', c: ['a']}))
console.log(construct(['z'], {a: '1', b: '2', c: ['a']}))
console.log(construct({a: '1', b: '2', c: ['a']}))
console.log([].concat.apply(['z'], construct([], {a: '1', b: '2', c: ['a']})));

function project(table, keys) {
    return _.map(table, function (obj) {
        return _.pick.apply(null, construct(obj, keys));
    });
}


var library = [
    {title: "SICP", isbn: "0262010771", ed: 1},
    {title: "SICP", isbn: "0262510871", ed: 2},
    {title: "Joy of Clojure", isbn: "1935182641", ed: 1}
];

var editionResults = project(library, ['title', 'isbn']);
var editionTitle = project(library, ['title']);
var editionTitlePluck = _.pluck(library, 'title');

var zombie = {name: "Bub", film: "Evil Dead"};

console.log(_.keys(zombie));
console.log(_.pairs(zombie));
var objj = _.object(_.map(_.pairs(zombie), function (pair) {
    return [pair[0].toUpperCase(), pair[1]]
}));

var list = [
    {user_id: 301, alert_id: 199, deal_id: 32243},
    {user_id: 301, alert_id: 200, deal_id: 32243},
    {user_id: 301, alert_id: 200, deal_id: 107293},
    {user_id: 301, alert_id: 200, deal_id: 277470}
];

var list2 = [
    {family: 'a', child: '1a', name: 'a'},
    {family: 'b', child: 'asd', name: 'a'},
    {family: 'c', child: 'cs', name: 'a'},
    {family: 'a', child: 'vcv', name: 'a'},
    {family: 'b', child: 'yu', name: 'a'},
    {family: 'a', child: 'ikl', name: 'a'}
];


var groups = _.groupBy(list, function (value) {
    return value.user_id + '#' + value.alert_id;
});

var groups2 = _.groupBy(list2, function (value) {
    return value.family;
});


var groupData = _.map(groups, function (group) {
    return {
        user_id: group[0].user_id,
        alert_id: group[0].alert_id,
        deals: _.pluck(group, 'deal_id')
    }
});

var groupData2 = _.map(groups2, function (group) {
    console.log("group family: " + group[0].family);
    console.log("group child: " + group[0].child);
    console.log("group name: " + group[0].name);
    return {
        user_id: group[0].family,
        children: group
    }
});

console.log(groupData2);

var testObj = {a: 1, b: 2, c: 3};

console.log(_.map(testObj, function (v, k) {
    return k
}));
console.log(_.map(testObj, function (v, k) {
    return [v, k]
}));
console.log(_.keys(testObj));
console.log(_.values(testObj));
console.log(_.map(testObj, _.identity));

var numReduceExample = [100, 25, 2];

console.log(_.reduce(numReduceExample, function (x, y) {
    return x / y
}));
console.log(_.reduceRight(numReduceExample, function (x, y) {
    return x / y
}));


var uniqueId = (function () {
    var count = 0;
    return function () {
        ++count;
        return 'id_' + count;
    };
})();

console.log(uniqueId()); // "id_1"
console.log(uniqueId()); // "id_2"
console.log(uniqueId()); // "id_3"

function digitSumReport(x) {
    if (typeof x !== "number") {
        return "non-number, sum undefined";
    } else if (Math.floor(x) < x) {
        return "non-integer, sum undefined";
    } else if (x < 0) {
        return "negative number, sum undefined";
    }

    var s = String(x);
    var sum = 0;
    for (var i = 0; i < s.length; i++) {
        sum += parseInt(s.charAt(i));
    }

    return "sum " + sum;
};

var result1 = digitSumReport(23432);

digitSumReport1 = function (x) {
    var typeError = function (x) {
        if (typeof x !== "number") {
            return "non-number";
        } else if (Math.floor(x) < x) {
            return "non-integer";
        } else if (x < 0) {
            return "negative number";
        }
        return null;
    };
    var sum = function (x) {
        var s = String(x);
        var i, sum = 0;
        for (i = 0; i < s.length; i++) {
            sum += parseInt(s.charAt(i));
        }
        return sum;
    };

    var error = typeError(x);
    if (error !== null) {
        return error + ", sum undefined";
    }
    return "sum " + sum(x);
};

console.log(digitSumReport1(345345435));


digitSumReport2 = function (x) {
    var
        typeError = (typeof x !== "number" ? "non-number" :
            (Math.floor(x) < x) ? "non-integer" :
                (x < 0) ? "negative number" :
                    null),
        sum = function (x) {
            var
                s = String(x),
                sum = 0,
                i = 0;
            for (; i < s.length; i++) {
                sum += parseInt(s.charAt(i));
            }
            return sum;
        };
    return typeError !== null ? typeError + ", sum undefined" :
        "sum " + sum(x);
};

console.log(digitSumReport2(434343));

function qq() {
    console.log('A');
    var sum;
    sum = 3 + 6;
    console.log(sum);
}

var q1 = qq(); //prints 'A'
// prints 9

function d() {
    function e() {
        console.log('E');
    }

    return e;
}
d()(); //prints 'E'

var e = d;
e()();

function a() {

    console.log('A!');

    function b() {
        console.log('B!');
    }

    return b;
}

var s = a(); //prints 'A'
console.log('break'); //prints 'break'
s(); // prints 'B'


//object constructors are just functions!
function makePersonObject(name, age) {
    return new (function () {  //notice the "new" keyword here!!
        this._name = name;
        this._age = age;
    })();
}

var myPersonObject = makePersonObject('DJ', 66);
var myPersonObject2 = makePersonObject('NN', 88);

console.log(myPersonObject._name);
console.log(myPersonObject._age);

console.log(myPersonObject2._name);
console.log(myPersonObject2._age);


function makePersonObject2() {
    return new (function (name, age) {
        this.name = name;
        this.age = age;
    });
}

var myPersonObject3 = makePersonObject2();
myPersonObject3.name = "SSD";
myPersonObject3.age = 3434;
console.log(myPersonObject3.name);
console.log(myPersonObject3.age);


function NewPersonObject(name, age) {
    this.name = name;
    this.age = age;
}

var personObject = new NewPersonObject('darwin', 34);
console.log(personObject.name);
console.log(personObject.age);

const maybe = function (fn) {
    return function (input) {
        if (!input) return;
        return fn.call(this, input);
    };
}

//const impl1 =  function(input) {
//    return input.toLowerCase();
//};
//impl1(void 0); //it won't compile

const impl2 = maybe(function (input) {
    return input.toLowerCase();
});
impl2(void 0);
console.log(impl2('DARWIN'));


arr2 = [
    {x: 1},
    {x: 2},
    {x: 3}
];
console.log(_.reduce(arr2, function (a, b) {
    return {x: a.x + b.x}
}, {x: 10}));

function Point2D(x, y) {
    this._x = x;
    this._y = y;
}

function Point3D(x, y, z) {
    Point2D.call(this, x, y);
    this._z = z;
}

var pt3D = new Point3D(3, 4, 5);


function PersonSample(name, age) {
    this._name = name;
    this._age = age;
}

function EmployeeSample(name, age, company) {
    var person = new PersonSample(name, age);
    this._name = person._name;
    this._age = person._age;
    this._company = company;
}

EmployeeSample.prototype.sayName = function () {
    console.log(this._name);
}

EmployeeSample.prototype.printAge = function () {
    console.log(this._age);
}


EmployeeSample.prototype.printCompany = function () {
    console.log(this._company);
}

var employee = new EmployeeSample('sitti', 3, 'ballet co');
employee.sayName(); // not sure how to print this??
employee.printAge();
employee.printCompany();

var rangeTest = _.range(4, 10, 2);

var fortytwo = function () {
    return 42
};

var fortytwos = [42, function () {
    return 42
}];

var fortytwos2 = {
    number: 42, fun: function () {
        return 42
    }
};

console.log(42 + (function () {
    return 42
})());

function weirdAdd(n, f) {
    return n + f()
}

console.log(weirdAdd(42, function () {
    return 42
}))

function lyricSegment(n) {
    return _.chain([])
        .push(n + ' bottles')
        .tap(function (lyrics) {
            if (n > 1) {
                lyrics.push((n - 1) + ' bottles of beer on the wall.');
            } else {
                lyrics.push('No more bottles of beer on the wall.');
            }
        })
        .value();
}

function lyricSegment2(n) {
    return _.chain([])
        .push(n + ' wheels on the bus')
        .push(n + ' wiggles')
        .tap(function (lyrics) {
            if (n > 1) {
                lyrics.push((n - 1) + ' Not yet finished.');
            } else {
                lyrics.push('Good bye.');
            }
        })
        .value();
}

var acc = function (acc, n) {
    return acc.concat(lyricSegment(n));
};

function song(start, end, lyricGenerator) {
    return _.reduce(_.range(start, end, -1),
        function (arrayAccumulator, n) {
            return arrayAccumulator.concat(lyricGenerator(n)); //lyricGenerator(n)- returns a String array
        }, []);
}
var songBeer = song(2, 0, lyricSegment2);


var w = _.map([1, 2, 3], function (num) {
    return num * 3;
});

var globals = {};

function makeBindFun(resolver) {
    var x = function (key, val) {
        var stack = globals[key] || [];
        globals[key] = resolver(stack, val);
        return globals;
    };
    return x;
}

var stackBinder = makeBindFun(function (stack, val) {
    stack.push(val);
    return stack;
});

var stackUnBinder = makeBindFun(function (stack, val) {
    stack.pop(val);
    return stack;
});

var dynamicLookup = function (k) {
    var slot = globals[k] || [];
    return _.last(slot);
};

var aa = stackBinder('a', 1);
var aa = stackBinder('a', 2);
var aa = stackBinder('b', 5);
var aa = stackBinder('b', 6);
var bb = stackBinder('b', 100);

var dl = dynamicLookup('a');

function finder(valueFun, bestFun, coll) {
    return _.reduce(coll, function (best, current) {
        var bestValue = valueFun(best);
        var currentValue = valueFun(current);

        return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
    });
}

function doSomething(callback) {
    var data = 0;
    callback(data);
}

function domSomethingAgain(callback) {
    doSomething(function (data) {
        callback(data);
    });
}

function callBackTest() {
    domSomethingAgain(function functionName(data) {
        console.log(data);
    });
}


callBackTest();

var obj1 = {status: 'sad'};

if (!obj1.name) {
    obj1.name = 'darwin';
}

if (!obj1.address) {
    obj1.address = 'oz';
}

if (!obj1.status) {
    obj1.status = 'happy';
}


console.log(obj1.name); //darwin
console.log(obj1.address); //oz
console.log(obj1.status); //sad

function sandwichMaker(ingredient) {
    return function (filling) {
        return ingredient + " and " + filling;
    };
}

var hamAnd = sandwichMaker("ham");
console.log(hamAnd("cheese"));
console.log(hamAnd("bacon"));

var burgerAnd = sandwichMaker("burger");
console.log(burgerAnd("lettuce"));
console.log(burgerAnd("egg"));


console.log(new Object() === new Object()); // false. this creates 2 unique objects.
console.log((new Object()).constructor === (new Object()).constructor); // true
console.log((new Object()).__proto__ === (new Object()).__proto__); // true

function EventTarget() {
}

EventTarget.prototype = {
    constuctor: EventTarget,
    addListener: function (type, listener) {
        if (!this.hasOwnProperty("_listeners")) {
            this._listeners = [];
        }

        if (typeof this._listeners[type] == 'undefined') {
            this._listeners[type] = [];
        }

        this._listeners[type].push(listener);

    },
    fire: function (event) {
        if (!event.target) {
            event.target = this;
        }

        if (!event.type) {
            throw new Error("Event object missing 'type' property");
        }

        if (this._listeners && this._listeners[event.type] instanceof Array) {
            var listeners = tis._listeners[event.type];
            for (var i = 0, len = listeners.length; i < len; i++) {
                listeners[i].call(this, event);
            }
        }
    },
    removeListener: function (type, listener) {

    }
};

function PersonE(name) {
    this.name = name;
}

PersonE.prototype = Object.create(EventTarget.prototype);
PersonE.prototype.constructor = PersonE;

PersonE.prototype.sayName = function () {
    console.log(this.sayName);
    this.fire({type: "namesaid", name: name});
};

var personE = new PersonE("Darwin");

console.log(personE instanceof PersonE); //true
console.log(personE instanceof EventTarget); //true

function mixin(receiver, supplier) {
    for (var property in supplier) {
        if (supplier.hasOwnProperty(property)) {
            receiver[property] = supplier[property];
        }
    }

    return receiver;
}

function PersonF(name) {
    this.name = name;
}
mixin(PersonF.prototype, new EventTarget());
mixin(PersonF.prototype, {
    constructor: PersonF,
    sayName: function () {
        console.log(this.name);
        this.fire({type: "namesaid", name: name});
    }
});

var personF = new PersonF("nova");
console.log(personF instanceof PersonF); //true
console.log(personF instanceof EventTarget); //false

for (prp in personE) {
    console.log(prp);
}


function People() {
    var i = 1;
    console.log('i = ' + ++i);
}
var people1 = new People();
var people2 = new People();

console.log(people1.constructor === People); //true
console.log(people1.constructor === people2.constructor); //true
console.log(people1 instanceof People); //true

var peopleConsturctor = people1.constructor;
peopleConsturctor();

var objectTemp = {
    value1: 2,
    value2: 5
};

console.log(objectTemp.constructor === Object); // for all Object literal this is tru

function myConstructor() {
}

myConstructor.prototype = Object.create(Object.prototype, {
    constructor: {
        configurable: true,
        enumerable: true,
        value: myConstructor,
        writable: true
    }
});

function Rectangle(width, length) {
    this.length = length;
    this.width = width;
}

Rectangle.prototype.getArea = function () {
    return this.length * this.width;
}

Rectangle.prototype.toString = function () {
    return "[Rectangle: " + this.length + " x " + this.width + "]";
}


function Square(size) {
    this.length = size;
    this.width = size;
}

console.log(Square.prototype); // empty object
Square.prototype = new Rectangle();
console.log(Square.prototype);

console.log(Square.prototype.constructor === Rectangle.prototype.constructor); //true
console.log(Square.prototype === Rectangle.prototype); //false
console.log(Square.prototype == new Rectangle()); //false.. because this creates another new Rectangle object?

Square.prototype = Rectangle.prototype;
console.log(Square.prototype === Rectangle.prototype); //true
console.log(Square.prototype);

Square.prototype.constructor = Square; //not sure why Rectangle.prototype = Square after this??

Square.prototype.toString = function () {
    return "[Square: " + this.length + " x " + this.width + "]";
}

function CustomShape(size) {
    Rectangle.call(this, size, size);
}

CustomShape.prototype = Object.create(Rectangle.prototype, {
        constructor: {
            configurable: true,
            enumerable: true,
            value: CustomShape,
            writable: true
        }
    }
);

console.log(CustomShape.prototype.toString());

square2 = new Square2(7);

console.log(square2.length);
console.log(square2.width);
console.log(square2.getArea());

var rect = new Rectangle(5, 10);
var square = new Square(7);

console.log(rect.getArea());
console.log(square.getArea());

console.log(rect.toString());
console.log(square.toString());

console.log(rect instanceof Rectangle);
console.log(rect instanceof Object);

console.log(square instanceof Square);
console.log(square instanceof Rectangle);
console.log(square instanceof Object);

var personA = {
    name: "darwin",
    sayName: function () {
        console.log(this.name);
    },
    sayWhat: function () {
        var what = "what " + this.name;
        console.log(what);
        // var what = "what " + this.name; //won't work if it's declared here..
    }
};

var personB = Object.create(personA, {
    name: {
        value: "nova"
    }
});

personA.sayWhat();
personB.sayWhat();

personA.sayName();
personB.sayName();
console.log(personB.__proto__ === personA); //true
console.log(personA.__proto__ == Object.prototype); //true
console.log(personA.__proto__ == personB.__proto__); //false


console.log(personA.hasOwnProperty("sayName")); //true
console.log(personB.hasOwnProperty("sayName")); //false
console.log(personA.isPrototypeOf(personB)); //true
console.log(Object.isPrototypeOf(personA)); //false
console.log(Object.isPrototypeOf(personB)); //false

console.log(personB.prototype.sayName());

console.log(personB.prototype); // undefined  because personB is not a function.
//Functions in JavaScript are first-class objects, which means you can add members to them and treat them just like ordinary objects:

//personB.prototype.sayHello = function() { //Error! you can't set a function to an undefined object
//    console.log('Hello ' + this.name);
//}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.substring(1);
};

console.log("darwin morales".capitalize());
console.log("darwin morales".toString() === "darwin morales".valueOf()); //true
console.log("darwin morales".valueOf());
console.log("darwin morales".hasOwnProperty("capitalize")); //false

var book = {
    title: "The Bible", sayHi: function () {
    }
};

console.log("title" in book); //true
console.log(book.hasOwnProperty("title")); //true
console.log("hasOwnProperty" in book); //true
console.log(book.hasOwnProperty("hasOwnProperty")); //false
console.log(Object.prototype.hasOwnProperty("hasOwnProperty")); //true
console.log(book.isPrototypeOf(book.prototype)); //true
console.log(book.isPrototypeOf(Object.prototype)); //false

function hasPrototypeProperty(object, name) {
    return name in object && !object.hasOwnProperty(name);
}

var object = {}; //creates an empty object but there's a hidden property [[Prototype]] that points to the Object.prototype object
var prototype = Object.getPrototypeOf(object);
console.log(prototype === Object.prototype); // true
console.log(object.__proto__ === Object.prototype); //true

for (var prop in Object) { //no output
    console.log(prop);
}

console.log(Object.keys(Object));


function PersonObj2(name) {
    Object.defineProperty(this, "name", {
        get: function () {
            return name;
        },
        set: function (value) {
            name = value;
        },
        enumerable: true,
        configurable: true
    });
    this.sayName = function () {
        console.log('Hello ' + this.name);
    }

}
//test comment
PersonObj2.prototype.favorites = [];
PersonObj2.prototype.counter = 0;

PersonObj2.prototype.addOneToCounter = function () {
    PersonObj2.prototype.counter += 1;
}

console.log(PersonObj2.prototype.__proto__ === Object.prototype); // if my understanding is correct then this should be true!
// the prototype property of PersonObj2.prototype should point to Object.prototype

var personObj2 = new PersonObj2("Nova");
var personObj3 = new PersonObj2("Daniel");

personObj2.favorites.push("pizza");
personObj3.favorites.push("pasta");
personObj2.favorites.push("steak");

personObj2.addOneToCounter();
personObj3.addOneToCounter();
personObj3.addOneToCounter();
personObj3.addOneToCounter();
personObj2.addOneToCounter();

console.log(personObj2.counter);
console.log(personObj3.counter);

console.log(personObj2.name);
personObj2.sayName();

console.log(personObj2.favorites); //outputs 5
console.log(personObj3.favorites); //outputs 5

personObj2.name = 'Sitti';
console.log(personObj2.name);

var PersonObj = {
    firstName: 'Darwin',
    lastName: 'Morales',
    birthDate: new Date('1900-01-01'),
    gender: 'male',
    getAge: function () {
        var today = new Date();
        var diff = today.getTime() - this.birthDate.getTime();
        var year = 1000 * 60 * 60 * 24 * 365.25;
        return Math.floor(diff / year);
    }
};


console.log(PersonObj['firstName']);
console.log(PersonObj['getAge']());

var bob = Object.create(PersonObj);
bob.firstName = 'Bob';
bob.lastName = 'Sacamato';
bob.birthDate = new Date('1990-8-9');

console.log(bob.firstName);
console.log(bob.lastName);
console.log(bob.getAge());


var sayHi = new Function("console.log('Hi')");
sayHi();

var reflect = function () { //you can create a function with empty paramaters but you can still capture it inside the function
    return arguments[1];
}

console.log(reflect("Hi"));
console.log(reflect("Hi", "Hello", "good"));
console.log(reflect.length);

var sayMessage = new Function("message", "console.log('message');");
sayMessage('Hello world');

var person = {
    name: "Daniel",
    sayName: function () {
        console.log(person.name); // This is bad because it makes a tight coupling between the method and the object.. "this.name" is better.
    }
};

var person2 = {
    name: "Darwin",
    sayName: function () {
        console.log(this.name); // This is bad because it makes a tight coupling between the method and the object.. "this.name" is better.
    }
};

person2.sayName()

function sayNameForAll() {
    console.log(this.name);
}

for (prop in person2) {
    console.log(prop);
    console.log(person2[prop]);
}

var properties = Object.keys(person2);

for (prop in properties) {
    console.log(prop);
    console.log(properties[prop]);
    console.log(person2[properties[prop]]);
}

console.log(person.propertyIsEnumerable('name'));
console.log(Object.keys(person).length);

Object.defineProperty(person, 'name', {enumerable: false});

console.log(person.propertyIsEnumerable('name'));
console.log(Object.keys(person).length);

var person2 = {
    _name: "",
    _age: 0,
    _address: "",

    get name() {
        return this._name;
    },

    set name(value) {
        this._name = value;
    },

    get age() {
        return this._age;
    },

    set age(value) {
        this._age = value;
    },

    get address() {
        return this._address;
    },

    set address(value) {
        this._address = value;
    }

};

person2.name = "Darwin";
person2.age = 20;
person2.address = "Manila";

console.log(person2.name);
console.log(person2.age);
console.log(person2.address);


var person4 = {
    _name: "Darwin"
};

Object.defineProperty(person4, "name", {
    get: function () {
        console.log("Reading name");
        return this._name;
    },
    set: function (value) {
        this._name = value;
    },
    enumerable: true,
    configurable: true
})

var descriptor = Object.getOwnPropertyDescriptor(person4, "name");
console.log(descriptor.propertyIsEnumerable);
console.log(descriptor.configurable);
console.log(descriptor.writable);
console.log(descriptor.value);

Object.preventExtensions(person4);
console.log(Object.isExtensible(person4));

//
//person4.sayName() = function () {
//    console.log(this._name);
//};

console.log("sayName" in person4);

var i;

i = 2 + 3;

console.log("sum is:  " + i);

var proto = {
    hello: function hello() {
        return "Hello, my name is " + this.name;
    },
    sayBye: function () {
        return "Bye " + this.name;
    }
};


var george = Object.create(proto);
george.name = "George";
var message = george.hello();
var message2 = george.sayBye();

var myObj = {
    key: "value"
};

myObj = new Object();
myObj.key = "value";


function assert(value, desc) {
    console.log(value ? "pass: " + desc : "fail: " + desc);
    //var li = document.createElement("li");
    //li.className = value ? "pass" : "fail";
    //li.appendChild(document.createTextNode(desc));
    //document.getElementById("results").appendChild(li);
}


function Ninja() {
}

Ninja.prototype.swingSword = function () {
    return true;
};

var ninja1 = Ninja();
assert(ninja1 === undefined, "No instance of Ninja created.");

var ninja2 = new Ninja();
assert(ninja2 && ninja2.swingSword && ninja2.swingSword());

//assert (typeof ninja == "object", "The type of the instance is object");
//assert (ninja instanceof Ninja, "instanceof identifies the constructor");
//assert (ninja.constructor == Ninja, "The ninja object was created by the Ninja function");

function Ninja2() {
    this.swung = false;
    this.swingSword = function () {
        return !this.swung;
    };
}

Ninja2.prototype.swingSword = function () {
    return this.swung;
};

var ninja = new Ninja2();
assert(ninja.swingSword(), "Called the instance method, not the prototype method.");

function Person() {
};

Person.prototype.dance = function () {
};

function Ninja3() {
};

Ninja3.prototype = {dance: Person.prototype.dance};

var ninja3 = new Ninja3();
assert(ninja3 instanceof Ninja3, "ninja3 receives functionality from Ninja3");
assert(ninja3 instanceof Person, "also Person");
assert(ninja3 instanceof Object, "and Object");

Object.prototype.keys = function () {
    var keys = [];
    for (var p in this) {
        if (this.hasOwnProperty(p))
            keys.push(p);
    }
    return keys;
};

var obj = {a: 1, b: 2, c: 3};
assert(obj.keys().length == 3, "there are 3 properties in the object.");

function User(first, last) {
    this.name = first + " " + last;
    console.log("Name: " + this.name);
}

var name = "Nova Morales";
var user = new User("Darwin", "Morales");
console.log("Name: " + this.name);

function foo() {
    console.log(this.bar);
}

var bar = "bar1";
var o2 = {bar: "bar2", foo: foo};

foo();
o2.foo();

function newUser() {
};

newUser.prototype = {
    first: "darwin", last: "morales",
    fullName: function () {
        return this.first + " " + this.last;
    }
};

var newUser1 = new newUser();

console.log(newUser1.fullName());

assert({} == {}, "Yes, they are not the same.");
assert({}.toString() === {}.toString(), "Yes, they are the same.");

var dog = {
    bark: function (count) {
    }
};

//dog.bark.call(cat, 1);
//dog.bark.apply(cat, [1]);

var foo1 = "bar1"; //global scope

function bar() {
    var foo1 = "baz"; //local scope under bar()
}

function baz(foo1) {
    foo1 = "bam"; // local scope under baz (paramter)
    bam = "yay"; // if not in strict mode it would create it
}









