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

console.log(pluckFrom(artists)('name'));

console.log('Hello');
//console.log(pluck(artists, 'name'));