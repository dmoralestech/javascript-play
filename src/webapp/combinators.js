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



//console.log(pluckFrom2(artists)('name'));
console.log(pluckFrom3(artists)('name'));

console.log('Hello');
//console.log(pluck(artists, 'name'));