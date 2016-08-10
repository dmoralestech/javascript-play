var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Thing = (function () {
    function Thing(x, y) {
        this.x = x;
        this.y = y;
    }
    Thing.prototype.f = function () { };
    Thing.prototype.g = function () { };
    return Thing;
})();
var lessons = [
    {
        title: 'Javascript Arrays in Depth - join',
        views: 960,
        tags: ['array', 'join']
    },
    {
        title: 'Javascript Arrays in Depth - concat',
        views: 1050,
        tags: ['array', 'concat']
    },
    {
        title: 'Javascript Arrays in Depth - slice',
        views: 2503,
        tags: ['array', 'slice']
    },
    {
        title: 'Javascript Functions in Depth - bind',
        views: 2500,
        tags: ['functions', 'bind']
    }
];
var minViews = 1000;
var searchTerm = 'array';
var filtered = lessons
    .filter(function (x) { return x.tags.indexOf(searchTerm) > -1; })
    .filter(function (x) { return x.views > minViews; })
    .sort(function (a, b) { return b.views - a.views; })
    .map(function (x) { return '  <li>' + x.title + '</li>'; })
    .join('\n');
console.log('<ul>' + filtered + '</ul>');
var HelloWorld = (function () {
    function HelloWorld(message) {
        this.message = message;
    }
    return HelloWorld;
})();
var hello = new HelloWorld('Hello Typescript');
console.log(hello.message);
var add1 = function (a) { return a + 1; };
var times2 = function (a) { return a * 2; };
var compose = function (a, b) { return function (c) { return a(b(c)); }; };
var add10Times2 = compose(add1, times2);
console.log(add10Times2(5));
var startTimer = function () {
};
var pauseTimer = function () {
};
var clearTimer = function () {
};
var init = function (startButton, pauseButton, clearButton) {
    document.getElementById(startButton).addEventListener("click", startTimer, false);
    document.getElementById(pauseButton).addEventListener("click", pauseTimer, false);
    document.getElementById(clearButton).addEventListener("click", clearTimer, false);
};
init('startButton', 'pauseButton', 'clearButton');
var demo;
(function (demo) {
    var person;
    person = 'Darwin Morales';
    console.log(person);
    var person2 = {
        name: 'Darwin',
        age: 22
    };
    console.log(person2.name.substring(1, 4));
})(demo || (demo = {}));
var names = ['Darwin', 'Nova', 'Daniel', 'Sitti'];
var demoPrimitives;
(function (demoPrimitives) {
    var data;
    var doSomething = function (args) {
        return args;
    };
    var age = 32;
    var price = 1.99;
    var hasData = true;
    var hasMoney = true;
    var birthDate = null;
})(demoPrimitives || (demoPrimitives = {}));
var demoObjects;
(function (demoObjects) {
    var points1 = { x: 10, y: 15 };
    var coordX = points1.x;
    var rectangle = {
        h: 10,
        w: 20,
        calcArea: function () {
            return this.h * this.w;
        }
    };
    var squareIt = function (rect) {
        if (rect.w === undefined) {
            return rect.h * rect.h;
        }
        return rect.h * rect.w;
    };
    var sq1 = squareIt({ h: 10 });
    console.log('area of sq1 ', sq1);
})(demoObjects || (demoObjects = {}));
var myFunc = function (h, w) { return h * w; };
var helloWorld = function (name) {
    console.log('Hello ' + (name || 'unknown person'));
};
var squareIt;
squareIt = function (rect) {
    if (rect.w === undefined) {
        return rect.h * rect.h;
    }
    return rect.w * rect.h;
};
var rectA = { h: 7 };
var rectB = { h: 7, w: 10 };
console.log(squareIt(rectA));
console.log(squareIt(rectB));
var demoInterface;
(function (demoInterface) {
    var squareItBasic = function (num) { return num * num; };
    var squareIt; //OLD WAY: var squareIt: (rect: {h: number, w?: number}) => number;
    var p = {
        //favoriteMovie: 'NBA Jordan', // This should work
        name: 'Darwin',
        age: 33,
        kids: 2,
        calcPets: function () {
            return this.kids * 2;
        },
        makeYounger: function (years) {
            this.age -= years;
        },
        greet: function (msg) {
            return msg + ',' + this.name;
        }
    };
    function getPerson() {
        var _this = this;
        return {
            name: 'Darwin',
            age: 2,
            kids: 2,
            calcPets: function () {
                return 1;
            },
            makeYounger: function (years) {
                _this.age -= years;
            },
            greet: function (msg) {
                return msg + ',' + _this.name;
            }
        };
    }
    function sessionEvaluator() {
        var ratings = [];
        var addRating = function (rating) {
            if (rating === void 0) { rating = 5; }
            ratings.push(rating);
        };
        var calcRating = function () {
            var sum = 0;
            ratings.forEach(function (score) {
                sum += score;
            });
            return sum / ratings.length;
        };
        return {
            addRating: addRating,
            calcRating: calcRating
        };
    }
})(demoInterface || (demoInterface = {}));
var demoClasses;
(function (demoClasses) {
    var Car = (function () {
        function Car(engine) {
            this.engine = engine;
        }
        return Car;
    })();
    //class Car2 {
    //    private _engine: string;
    //
    //    constructor(engine: string) {
    //        this.engine = engine;
    //    }
    //
    //    start() {
    //        return "Started " + this._engine;
    //    }
    //
    //    stop() {
    //        return "Stopped " + this._engine;
    //    }
    //
    //    get engine(): string {
    //        return this._engine;
    //    }
    //
    //    set engine(value: string) {
    //        if (value === undefined) throw 'Supply an engine'
    //        this._engine = value;
    //    }
    //}
    var Engine = (function () {
        function Engine(horsePower, engineType) {
            this.horsePower = horsePower;
            this.engineType = engineType;
        }
        return Engine;
    })();
    var Car3 = (function () {
        function Car3(engine) {
            this._engine = engine;
        }
        return Car3;
    })();
})(demoClasses || (demoClasses = {}));
var demoCastingTypes;
(function (demoCastingTypes) {
    //var table:HTMLTableElement = document.createElement('table');
    var table = document.createElement('table');
    var Calculator = (function () {
        function Calculator(xId, yId, outputId) {
            this.x = document.getElementById(xId);
            this.y = document.getElementById(yId);
            this.output = document.getElementById(outputId);
            this.wireEvents();
        }
        Calculator.prototype.wireEvents = function () {
        };
        Calculator.prototype.add = function (x, y) {
            return x + y;
        };
        Calculator.prototype.subtract = function (x, y) {
            return x - y;
        };
        return Calculator;
    })();
})(demoCastingTypes || (demoCastingTypes = {}));
var demoExtends;
(function (demoExtends) {
    var ParentClass = (function () {
        function ParentClass() {
        }
        return ParentClass;
    })();
    var ChildClass = (function (_super) {
        __extends(ChildClass, _super);
        function ChildClass() {
            _super.call(this);
        }
        return ChildClass;
    })(ParentClass);
    var Engine = (function () {
        function Engine(horsePower, engineType) {
            this.horsePower = horsePower;
            this.engineType = engineType;
        }
        Engine.prototype.start = function (callback) {
            var _this = this;
            window.setTimeout(function () {
                callback(true, _this.engineType);
            }, 1000);
        };
        Engine.prototype.stop = function (callback) {
            var _this = this;
            window.setTimeout(function () {
                callback(true, _this.engineType);
            }, 1000);
        };
        return Engine;
    })();
    var Auto = (function () {
        function Auto(engine) {
            this.engine = engine;
        }
        return Auto;
    })();
    var Truck = (function (_super) {
        __extends(Truck, _super);
        function Truck(engine, fourByFour) {
            _super.call(this, engine);
            this.fourByFour = fourByFour;
        }
        return Truck;
    })(Auto);
})(demoExtends || (demoExtends = {}));
var demoInterface2;
(function (demoInterface2) {
    var Engine = (function () {
        function Engine() {
        }
        Engine.prototype.start = function (callback) { };
        ;
        Engine.prototype.stop = function (callback) { };
        ;
        return Engine;
    })();
    var Auto = (function () {
        function Auto(options) {
            this.options = options;
        }
        return Auto;
    })();
    var Truck = (function (_super) {
        __extends(Truck, _super);
        function Truck(options) {
            _super.call(this, options);
            this.bedLength = options.bedLength;
            this.fourByFour = options.fourByFour;
        }
        return Truck;
    })(Auto);
})(demoInterface2 || (demoInterface2 = {}));
var Shapes;
(function (Shapes) {
    var Rectangle = (function () {
        function Rectangle(height, width) {
            this.height = height;
            this.width = width;
        }
        Rectangle.prototype.getArea = function () {
            return this.height * this.width;
        };
        return Rectangle;
    })();
    Shapes.Rectangle = Rectangle;
    var rect = new Rectangle(10, 4);
})(Shapes || (Shapes = {}));
var myRectangle = new Shapes.Rectangle(2, 4);
var LoggerMode = {
    Console: 1,
    Alert: 2
};
var App;
(function (App) {
    var Tools;
    (function (Tools) {
        var Utils;
        (function (Utils) {
            var Logger = (function () {
                function Logger() {
                }
                Logger.prototype.write = function (msg) {
                };
                return Logger;
            })();
            Utils.Logger = Logger;
        })(Utils = Tools.Utils || (Tools.Utils = {}));
    })(Tools = App.Tools || (App.Tools = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Tools;
    (function (Tools) {
        var Shapes;
        (function (Shapes) {
            var Point = (function () {
                function Point() {
                }
                return Point;
            })();
            Shapes.Point = Point;
        })(Shapes = Tools.Shapes || (Tools.Shapes = {}));
    })(Tools = App.Tools || (App.Tools = {}));
})(App || (App = {}));
var Tools = App.Tools;
var log = new Tools.Utils.Logger();
//# sourceMappingURL=hello_world_ts.js.map