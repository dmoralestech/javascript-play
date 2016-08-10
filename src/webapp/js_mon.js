/**
 * Created by dmorales on 18/04/2016.
 */
var sine = function (x) {
    return [Math.sin(x), 'sine  was calles'];
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
        var x = tuple[0], s = tuple[1], fx = f(x), y = fx[0], t = fx[1];
        return [y, s + t];
    };
};
var f = compose(bind(sine), bind(cube));
console.log(f(unit(3)));
function Identity(value) {
    this.value = value;
}
Identity.prototype.bind = function (transform) {
    return transform(this.value);
};
Identity.prototype.toString = function () {
    return 'Identity(' + this.value + ')';
};
var result = new Identity(5).bind(function (value) {
    return new Identity(6).bind(function (value2) {
        return new Identity(value + value2);
    });
});
console.log(result);
//# sourceMappingURL=js_mon.js.map