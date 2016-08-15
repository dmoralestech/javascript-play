// prototype mechanism

// every single object  is built by a constructor function

// each time a constructor is called  a new object is created

// A constructor makes an object linked to its own prototype

function Foo(who) {
    this.me = who;
}

Foo.prototype.identify = function() {
    return "I am " + this.me;
};

var a1 = new Foo("a1");
var a2 = new Foo("a2");

a2.speak = function() {
    console.log("Hello " + this.identify());
}

console.log(a1.constructor === Foo);  //true
console.log(a1.constructor === a2.constructor); //true
console.log(a1.__proto__ === Foo.prototype); //true
console.log(a1.__proto__ === a2.__proto__); //true

console.log(a1.me);
console.log(a2.me);

