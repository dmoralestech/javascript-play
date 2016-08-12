/**
 * Created by darwinmorales on 20/12/2015.
 */


var foo = "bar";
function bar() {
    var foo = "baz";

    function baz(foo) {
        foo = "bam";
        bam = "yay";
    }

    baz();
}

bar();
console.log(foo);
console.log(bam);
//baz();


function foo2(str) {
    eval(str);
    console.log(bar);
}

foo2("var bar = 42;");


var Person = {
    firstName: "Darwin",
    lastName: "Morales",
    birthDate: new Date('1955-9-23'),
    gender: "male",
    getAge: function () {
        var today = new Date();
        var diff = today.getTime() - this.birthDate.getTime();
        var year = 1000 * 60 * 60 * 24 * 365.25;
        return Math.floor(diff / year);
    },
    extend: function (config) {
        var tmp = Object.create(this);
        for (var key in config) {
            if (config.hasOwnProperty(key)) {
                tmp[key] = config[key];
            }
        }
        return tmp;
    }
};

var bob = Object.create(Person);
console.log(bob.firstName);
console.log(bob.lastName);

var bob2 = Person.extend({firstName: "bob", lastName: "Sacamanto"});

console.log(bob2.__proto__ == Person);
console.log(Person.isPrototypeOf(bob));
console.log(Object.getPrototypeOf(bob));
console.log(Object.getPrototypeOf(bob2));

var FOO = {};

FOO.x = 10;

FOO.addEmUp = function (x, y) {
    return x + y;
};


console.log(FOO.addEmUp(5, 10));


function getModule() {

    var FOO = {};

    FOO.x = 10;

    FOO.addEmUp = function (x, y) {
        return x + y;
    };

    var events = []; //private variable
    FOO.adEvent = function (eventName, target, fn) {
        events.push({eventName: eventName, target: target, fn: fn});
    };

    return FOO;
}

var myNamespace = getModule();

console.log(myNamespace.addEmUp(3, 4));

console.log((function get2and3() {
    return 2 + 3
}()));

var myModule = (function () {
    var events = [];

    return {
        x: 10,
        addEmUp: function (x, y) {
            return x + y;
        },
        addEvent: function (eventName, target, fn) {
            events.push({eventName: eventName, target: target, fn: fn});
        }

    };
})();

console.log(myModule.addEmUp(56, 4));

var i = function() {return 10;}();

function Student() {}

Student.prototype.name = "Darwin";
Student.prototype.age = "20";
Student.prototype.school = "DB";

var myStudent = new Student();
console.log(myStudent.name);
console.log(myStudent.age);
console.log(myStudent.school);
console.log( myStudent.constructor );

var keys = Object.keys(Student.prototype);


function foo4() {
    console.log("bar4: " + bar4); //won't find
}
function baz4() {
    var bar4 = "bar4";
    foo4();
}
baz4();