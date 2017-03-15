/**
 * Created by darwinmorales on 15/03/2017.
 */


var sine = function (x) {
    return [Math.sin(x), 'sine was called.'];
};

var cube = function (x) {
    return [x * x * x, 'cube was called.'];
};

var compose = function (f, g) {
    return function (x) {
        return f(g(x));
    };
};

//console.log(compose(sine, cube)(3));

var composeDebuggable = function (f, g) {
    return function (x) {
        var gx = g(x),
            y = gx[0],
            s = gx[1],
            fy = f(y),
            z = fy[0],
            t = fy[1];

        return [z, s + t];
    };
};

//console.log(composeDebuggable(sine, cube)(3));

var bind = function (f) {
    return function (tuple) {
        var x = tuple[0],
            s = tuple[1],
            fx = f(x),
            y = fx[0],
            t = fx[1];

        return [y, s + t];
    };
};

var f = compose(bind(sine), bind(cube));
var unit = function (x) {
    return [x, '']
};

// console.log(f(unit(3)));
//console.log(compose(f, unit)(3));

var round = function (x) {
    return Math.round(x)
};

var roundDebug = function (x) {
    var temp = unit(round(x));
    temp[1] = 'round debug was called.';
    console.log(temp);
    return temp;
};

var lift = function (f) {
    return function (x) {
        return unit(f(x));
    };
};

var lift2 = function (f) {
    return compose(unit, f)
};

var g = compose(bind(sine), bind(roundDebug));

console.log(g(unit(27)));


