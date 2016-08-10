/**
 * Created by dmorales on 18/04/2016.
 */
/**
 * Created by dmorales on 18/04/2016.
 */

var _ = require("./underscore.js");
var concat = require("lodash/concat.js");
var floor = require("lodash/floor.js");

var xs = [1, 2, 3];
var ys = [7, 8];
var zs = [9];

//left identity
concat([], xs) === xs;

//right identity
concat(xs, []) === xs;

//associativity
concat(concat(xs, ys), zs) === concat(xs, concat(ys, zs));

console.log(floor(4.34));

var reduce = function (f, acc, xs) {
    "use strict";
    if (xs.length === 0) return acc;
    return reduce(f, f(acc, _.first(xs)), _.rest(xs));
}

var sum = function (xs) {
    "use strict";
    return reduce(function (acc, x) {
        return x + acc;
    }, 0, xs);
};

console.log(sum([1, 2, 3, 4]));

var reverse = function (xs) {
    "use strict";
    return reduce(function (acc, x) {
        return [x].concat(acc)
    }, [], xs);
};

var map = function (f, xs) {
    "use strict";
    return reduce(function (acc, x) {
        return acc.concat(f(x))
    }, [], xs);
};

var filter = function (f, xs) {
    "use strict";
    return reduce(function (acc, x) {
        return f(x) ? acc.concat(x) : acc
    }, [], xs);
};

console.log(reverse([1, 2, 3, 4]));

var unfold = function (f, seed) {
    "use strict";
    function go(f, seed, acc) {
        var res = f(seed);
        return res ? go(f, res[1], acc.concat([res[0]])) : acc;
    }

    return go(f, seed, []);
}

console.log(unfold(function (x) {
    "use strict";
    if (x < 26) return [String.fromCharCode(x + 65), x + 1]
}, 0));


var range = function (i, count) {
    "use strict";
    return unfold(function (x) {
        if (x <= count) return [x, x + 1]
    }, i);
}

console.log(range(5, 10));

var mapper = function (f, cnct) {
    "use strict";
    return function (acc, x) {
        return cnct(acc, f(x))
    };
};

var filterer = function (f, cnct) {
    "use strict";
    return function (acc, x) {
        return f(x) ? cnct(acc, x) : acc
    };
};

console.log(reduce(filterer(function (x) {
    return x > 1
}, concat), [], [1, 2, 3]));


console.log(reduce(mapper(function (x) {
    return x + 1
}, concat), [], [1, 2, 3])); // [2, 3, 4]


console.log(
    reduce(filterer(function (x) {
            return x > 1
        },
        mapper(function (x) {
            return x + 1
        }, concat)),
        [], [1, 2, 3])); //[3, 4]


var person1 = {
    "name": "Homer Simpson",
    "address": {
        "street": "123 Fake St.",
        "city": "Springfield"
    }
};

var Maybe = function (value) {
    var Nothing = {
        bind: function (fn) {
            return this;
        },
        isNothing: function () {
            return true;
        },
        val: function () {
            throw new Error("cannot call val() nothing");
        },
        maybe: function (def, fn) {
            return def;
        }
    };

    var Something = function (value) {
        return {
            bind: function (fn) {
                return Maybe(fn.call(this, value));
            },
            isNothing: function () {
                return false;
            },
            val: function () {
                return value;
            },
            maybe: function (def, fn) {
                return fn.call(this, value);
            }
        };
    };

    if (typeof value === 'undefined' || value === null)
        return Nothing;

    return Something(value);
};

var people = [person1];

console.log(Maybe(people)
    .bind(function (people) {
        return people[0]
    })
    .maybe("No person", function (person) {
        return person;
    })
);

function MONAD3(modifier) {
    var prototype = Object.create(null);

    function unit(value) {
        var monad = Object.create(prototype);
        monad.bind = function (func, args) {
            return func(value, args);
        };
        if (typeof modifier === 'function') {
            modifier(monad, value);
        }
        return monad;
    }

    return unit;
}

var maybe = MONAD3(function (monad, value) {
    if (value === null || value === undefined) {
        monad.is_null = true;
        monad.bind = function () {
            return monad;
        }
    }
});

var monad = maybe(null);
monad.bind(console.log);


function MONAD() {
    "use strict";

    return function unit(value) {
        var monad = Object.create(null);
        monad.bind = function (func) {
            return func(value);
        };
        return monad;
    }
}

var identity = MONAD();
var monad = identity("Hello World");
monad.bind(console.log);

function MONAD2() {
    "use strict";
    var prototype = Object.create(null);

    function unit(value) {
        var monad = Object.create(prototype);
        monad.bind = function (func, args) {
            return func(value, args);
        }
        return monad;
    }

    unit.lift = function (name, func) {
        prototype[name] = function (args) {
            return unit(this.bind(func, args));
        }
        return unit;
    };

    return unit;
}

var ajax = MONAD2().lift('log', console.log);
var monad = ajax("Hello world");

monad.log();


var sine = function (x) {
    return [Math.sin(x), 'sine  was called'];
};

var square = function (x) {
    return [x * x, 'sine  was called'];
};

var cube = function (x) {
    return [x * x * x, 'cube was called'];
};

var compose = function (f, g) {
    return function (x) {
        return f(g(x));
    };
};

// unit :: Number -> (Number,String)
var unit = function (x) {
    return [x, ''];
};

// bind :: (Number -> (Number,String)) -> ((Number,String) -> (Number,String))
var bind = function (f) {
    return function (tuple) {
        var x = tuple[0]
        var s = tuple[1]
        var fx = f(x)
        var y = fx[0]
        var t = fx[1];
        return [y, s + t];
    };
};

var sineBind = bind(sine);
var cubeBind = bind(cube);

var f = compose(sineBind, cubeBind);

console.log(f(unit(3)));

/*
 Axioms
 unit(value).bind(f) ==== bind(unit(value), f) ==== f(value)

 monad.bind(unit) ===== bind(monad, unit) ==== monad

 monad.bind(f).bind(g) ==== bind(bind(monad, f), g) ===== bind(monad, function(value) {
 return bind(f(value), g); })si


 */

