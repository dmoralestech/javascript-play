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

let bake = () => console.log('baking');
let cool = () => console.log('cooling');

let makeBread = (...ingredients) => {
    mix(...ingredients);
    bake();
    cool();
}

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

let makeBread3 =  after(bakeBread, cool);

let beforeWith = (decoration) => rightApply(before, decoration);

let mixBefore = beforeWith(mix);

let bakeBread2 = mixBefore(bake);

let afterWith = (decoration) => rightApply(after, decoration);

let coolAfter = afterWith(after);

let makeBread2 = coolAfter(bake);
