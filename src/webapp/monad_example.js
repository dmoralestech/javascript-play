/**
 * Created by darwinmorales on 15/03/2017.
 */


var sine = function(x) {
    return [Math.sin(x), 'sine was called.'];
};

var cube = function(x) {
    return [x * x * x, 'cube was called.'];
};

var compose = function(f, g) {
    return function(x) {
        return f(g(x));
    };
};

//console.log(compose(sine, cube)(3));

var composeDebuggable = function(f, g) {
    return function(x) {
        var gx = g(x),
            y  = gx[0],
            s  = gx[1],
            fy = f(y),
            z  = fy[0],
            t  = fy[1];

        return [z, s + t];
    };
};

console.log(composeDebuggable(sine, cube)(3));