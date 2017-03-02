var R = require('ramda');

let pluck = (collection, property) => collection.map((obj) => obj[property]);

var artists = [
    {name: 'Darwin', occupation: 'painter'},
    {name: 'Nova', occupation: 'baker'},
    {name: 'Daniel', occupation: 'architect'},
    {name: 'Sitti', occupation: 'doctor'}
];

let pluckFrom = (collection)=>
    (property) => pluck(collection, property);

let pluckWith = (property) =>
    (collection) => pluck(collection, property);

let leftApply = (fn, a) =>
    (b) => fn(a, b);

let rightApply = (fn, b) => (a) => fn(a, b);

let pluckFrom2 = (collection)=> leftApply(pluck, collection);
let pluckFrom3 = leftApply(leftApply, leftApply)(pluck);

let pluckWith2 = leftApply(rightApply, pluck);
let pluckWith3 = leftApply(leftApply, rightApply)(pluck);

let Istarstar = (a) => (b) => (c) => a(b, c);

let pluckFrom4 = Istarstar(pluck);

let C = (a) => (b) => (c) => a(c, b);

let pluckWith4 = C(pluck);

let getStuff = (object, prop) => object[prop];

let getWith = C(getStuff);
let nameOf = getWith('name');

console.log(nameOf({name: 'Darkwing'}));


//console.log(pluckFrom2(artists)('name'));
console.log(pluckFrom3(artists)('name'));

console.log('Hello');
//console.log(pluck(artists, 'name'));

let mix = (...ingredients) => console.log('mixing', ...ingredients);
let bake = (...ingredients) => console.log('baking', ...ingredients);
let cool = (...ingredients) => console.log('cooling', ...ingredients);

let makeBread = (...ingredients) => {
    mix(...ingredients);
    bake(...ingredients);
    cool(...ingredients);
};

let dmBake = R.compose(cool, bake, mix);

console.log('dmbake');
dmBake('flour', 'eggs');
console.log('dmbake - done');

console.log('make bread orig');
makeBread('flour', 'sugar', 'water');
console.log('make bread orig - done');

let before = (fn, decoration) => (...args) => {
    decoration(...args);
    return fn(...args);
};

let after = (fn, decoration) => (...args) => {
    let returnValue = fn(...args);
    decoration(...args);
    return returnValue;
};

let bakeBread = before(bake, mix);

// let makeBread2 = (...ingredients) => {
//     bakeBread();
//     cool();
// }

let makeBread3 = after(bakeBread, cool);

//console.log('makeBread3');
//console.log(makeBread3('flour', 'sugar', 'water'));

let beforeWith = (decoration) => rightApply(before, decoration);

let mixBefore = beforeWith(mix);

let bakeBread2 = mixBefore(bake);

//console.log('bakeBread2');
//console.log(bakeBread2('flour', 'sugar', 'water'));

let afterWith = (decoration) => rightApply(after, decoration);

let coolAfter = afterWith(after);

let makeBread2 = coolAfter(bake);
//console.log('makeBread2');
//console.log(makeBread2('flour', 'sugar', 'water'));


var pickIndexes = R.compose(R.values, R.pick);
console.log(pickIndexes([0, 2], ['a', 'b', 'c'])); // => ['a', 'c']

let add = (x, y) => {
    return x + y;
}

let addPartial = (x) => (y) => {
    return x + y;
}

let add8 = addPartial(8);


let add3 = (a, b, c) => {
    return a + b + c;
}

let add3Curry = (a) => (b) => (c) => {
    return a + b + c;
}

let g = add3Curry(1); // This returns a function with 2 parameters
//
//	(b) => (c) => { return 1 + b + c; }
//


let h = g(2); // This returns a function with 1 parameter
//
//	(2) => (c) => { return 1 + b + c; }
//	       (c) => { return 1 + 2 + c; }
//





