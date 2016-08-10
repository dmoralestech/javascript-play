/**
 * Created by dmorales on 23/02/2016.
 */


var _ = require('ramda');
var R = require('ramda');
var curry = require('lodash.curry');

var Container = function(x) {
    return new _Container(x);
};

var _Container = function(val) {
    this.val = val;
};

var Maybe = function(x) {
    this.__value = x;
};

Maybe.of = function(x) {
    return new Maybe(x);
};

Maybe.prototype.isNothing = function() {
    return (this.__value === null || this.__value === undefined);
};

Maybe.prototype.map = function(f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
};

var match = curry(function(what, str) {
    return str.match(what);
});

console.log(Maybe.of('Malkovich Malkovich').map(match(/a/ig)));

//var add =  function(x) {
//    return function(y) {
//        return x + y;
//    };
//};

var add =  curry(function(x, y) {
    return x + y;
});

function add1(x) { return x + 1;}
//function add(x) { return x + 1;}

console.log( Maybe.of({name: 'Darwin', age: 33}).map(_.prop('age')).map(add(10)));

_Container.prototype.map = function(f) {
    return Container(f(this.val));
};

var map = _.curry(function(f, obj) {
    return obj.map(f);
});


var map = curry(function(f, functor) {
    return functor.map(f);
});


var safeHead = function(xs) {
    return Maybe.of(xs[0]);
};

function compose(a, b) {
    return function(c) {
        return a(b(c)); //split('a b c d')
    }
}

var streetName = compose(map(_.prop('street')), safeHead, _.prop('addresses'));

var objAddresses = {
    addresses: [{
        street: 'Shady Ln.',
        number: 4201
    }]
};
console.log(_.prop('addresses')(objAddresses));

var res2 = streetName({
    addresses: [{
        street: 'Shady Ln.',
        number: 4201
    }]
});

console.log(res2);
//console.log( map(add1(1), Container(3)));


var withdraw = curry(function(amount, account) {
    return account.balance >= amount ?
        Maybe.of({
            balance: account.balance - amount
        }) :
        Maybe.of(null);
});

//var finishTransaction = compose(remaingBalance, updateLedger);
//
//var getTwenty = compose(map(finishTransaction), withdraw(20));
//
//var getTwentyRes = getTwenty({
//    balance: 200.00
//});
//// Maybe("Your balance is $180.00")
//
//getTwentyRes =getTwenty({
//    balance: 10.00
//});
//// Maybe(null)


console.log(Container("flame").map(_.toUpper).map(_.toLower));


var Left = function(value) {
    this.__value = value;
};

Left.of = function(x) {
    return new Left(x);
};

Left.prototype.map = function(f) {
    return this;
};


var Right = function(value) {
    this.__value = value;
};

Right.of = function(x) {
    return new Right(x);
};

Right.prototype.map = function(f) {
    return Right.of(f(this.__value));
};

var rightRes =  Right.of('rain').map(function(str) {
    return 'b' + str;
})

rightRes = Right.of({
    host: 'localhost',
    port: 80
}).map(_.prop('host'));

var leftRes = Left.of('rain').map(function(str) {
    return 'b' + str;
});

leftRes = Left.of('rolls eyes...').map(_.prop('host'));

var IO = function(f) {
    this.__value = f;
};

IO.of = function(x) {
    return new IO(function() {
        return x;
    });
};

IO.prototype.map = function(f) {
    return new IO(_.compose(f, this.__value));
};


var addOne = function(x) {
    return x + 1;
}

console.log(Container(3));
console.log(Container(3).map(add1));
console.log(Container(3).map(addOne).map(addOne));
console.log(Container([1,2,5]).map(_.reverse).map(_.head));
console.log(Container("darwinmorales").map(_.length).map(addOne));

var trace = _.curry(function(tag, x) {
    console.log(tag, x);
    return x;
});

var darwinTrace = trace('darwin');
darwinTrace('morales');


var idR = R.prop('id', {id: 'foo'});
var idR = R.prop('name', {id: 'foo'});
console.log(idR);

var isOne = function(n) {
    return n === '1';
};

var getFirstChar = function(s) {
    return s.charAt(0);
};

console.log(R.map(getFirstChar,['22','12','15','text']));

var composed = R.compose(R.append('A'),
                            R.filter(isOne),
                            R.map(getFirstChar));
console.log(composed(['22','12','15','text']));

usersArray = [{id: '1', name: 'darwin'}, {id: '5', name: 'nova'}, {id: 'id33', name: 'daniel'}];
usersArray2 = [{id: '1x', name: 'darwinx'}, {id: '5x', name: 'novax'}, {id: 'id33x', name: 'danielx'}];
var layerMap = R.zipObj(R.pluck('id', usersArray), usersArray);
console.log(layerMap);

var createKeysWithId = R.compose(R.zipObj, R.pluck('id'));
var zipObjWith = createKeysWithId(usersArray2)
console.log(zipObjWith(usersArray));

var idWithNum1 = R.compose(R.filter(isOne), R.pluck('id'));
console.log(idWithNum1(usersArray));
console.log( R.filter(isOne)(['a', '1', '2', '1']));

var add1ToItems = R.map(R.add(1));

console.log(add1ToItems([1, 2, 3]));



var prop = _.curry(function(property, object) {
    return object[property];
});

var Maybe = function(x) {
    this.__value = x;
}

Maybe.of = function (x) {
    return new Maybe(x);
}


Maybe.prototype.isNothing = function() {
    return (this.__value === null || this.__value === undefined);
}

Maybe.prototype.map = function(f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}

var maybe1 = Maybe.of('DaM DaM').map(match(/a/ig));





var borisMaybe = Maybe.of({
    name: 'Boris',
}).map(_.prop('age')).map(add(10));

var maybeDinah1 = Maybe.of({
    name: 'Dinah',
    age: 14,
}).map(_.prop('age'));

var maybeDinah = Maybe.of({
    name: 'Dinah',
    age: 14,
}).map(_.prop('age')).map(add(10));

var map = curry(function(f, any_functor_at_all) {
    return any_functor_at_all.map(f);
});

var safeHead = function(xs) {
    return Maybe.of(xs[0]);
};

var addresses = _.prop('addresses', {
    addresses: [{
        street: 'Shady Ln.',
        number: 4201,
    }]
});

var safeHeadObj =  safeHead(addresses);
console.log(safeHeadObj);
console.log(_.prop('street', safeHeadObj));
console.log(safeHeadObj.map(_.prop('street')));

var streetName = compose(map(_.prop('street')), safeHead, addresses);

console.log(
    streetName({
        addresses: [{
            street: 'Shady Ln.',
            number: 4201
        }]
    })
);


var Container = function(x) {
    this.__value = x;
}

Container.of = function(x) {
    return new Container(x);
};

console.log(Container.of("darwin"));
console.log(Container.of({name: "darwin", address: "Sydney"}));


Container.prototype.map = function(f) {
    return Container.of(f(this.__value))
};

console.log(
    Container.of(2).map(function (two) {
        return two + 2;
    }));

console.log(
    Container.of("flame").map(function (s) {
        return s.toUpperCase()
    })
);

console.log(
    Container.of({name: "darwin", address: "Sydney"}).map(function (obj) {
        //obj.address = obj.address.toUpperCase();
        //return obj;
        return {newAddress: obj.address.toUpperCase()};
    })
);
