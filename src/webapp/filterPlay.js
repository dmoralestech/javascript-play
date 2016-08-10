var app = angular.module('myApp', ['ui.bootstrap']);

//app.filter('startFrom', function () {
//    return function (input, start) {
//        if (input) {
//            start = +start; //parse to int
//            return input.slice(start);
//        }
//        return [];
//    }
//});

app.filter('startFrom', function () {
    return function (input, start) {
        console.log("input: " + input);
        console.log("start: " + start);
        if (input) {
            start = +start; //parse to int
            console.log("start b : " + start);
            return input.slice(start);
        }
        console.log("input is empty...")
        return [];
    }
});

app.directive('isolatedScopeWithController', function () {
    return {
        restrict: 'EA',
        scope: {
            datasource: '=',
            add: '&',
            showMessage: '&',
            darwinMorales: '&'
        },
        controller: function ($scope) {
            $scope.addCustomer = function () {
                //Call external scope's function
                var name = 'New Customer Added by Directive';
                $scope.add();

                //Add new customer to directive scope
                $scope.customers.push({
                    name: name
                });
            };
        },
        //template: '<button ng-click="showMessage()">Show me my message</button><button ng-click="addCustomer()">Change Data</button><ul> <li ng-repeat="cust in customers">{{ cust.name }}</li></ul>'
        template: '<button ng-click="addCustomer()">Change Data</button><ul>'
    };
});

app.controller('CustomersController', ['$scope', function ($scope) {
    var counter = 0;
    $scope.customer = {
        name: 'David',
        street: '1234 Anywhere St.'
    };

    $scope.customers = [];

    $scope.addCustomer = function (name) {
        counter++;
        $scope.customers.push({
            name: (name) ? name : 'New Customer' + counter,
            street: counter + ' Cedar Point St.'
        });
        $scope.showMessage('message from add customer');
        $scope.dmFunction();
    };

    $scope.dmFunction = function() {
        alert('darwin morales message');
    }

    $scope.showMessage = function(msg) {
        alert(msg);
    }

    $scope.changeData = function () {
        counter++;
        $scope.customer = {
            name: 'James',
            street: counter + ' Cedar Point St.'
        };
    };
}]);

function pageCtrl($scope, filterFilter) {
    $scope.list = [{
        "name": "name 1"
    }, {
        "name": "name 2"
    }, {
        "name": "name 3"
    }, {
        "name": "name 4"
    }, {
        "name": "name 5"
    }, {
        "name": "name 6"
    }, {
        "name": "name 7"
    }, {
        "name": "name 8"
    }, {
        "name": "name 9"
    }, {
        "name": "name 10"
    }, {
        "name": "name 11"
    }, {
        "name": "name 12"
    }, {
        "name": "name 13"
    }, {
        "name": "name 14"
    }, {
        "name": "name 15"
    }, {
        "name": "name 16"
    }, {
        "name": "name 17"
    }, {
        "name": "name 18"
    }, {
        "name": "name 19"
    }, {
        "name": "name 20"
    }, {
        "name": "Peter"
    }, {
        "name": "Frank"
    }, {
        "name": "Joe"
    }, {
        "name": "Ralph"
    }, {
        "name": "Gina"
    }, {
        "name": "Sam"
    }, {
        "name": "Britney"
    }];

    $scope.currentPage = 1; //current page
    $scope.maxSize = 5; //pagination max size
    $scope.entryLimit = 8; //max rows for data table

    /* init pagination with $scope.list */
    $scope.noOfPages = Math.ceil($scope.list.length / $scope.entryLimit);

    $scope.$watch('search', function (term) {
        console.log(term);
        // Create $scope.filtered and then calculat $scope.noOfPages, no racing!
        $scope.filtered = filterFilter($scope.list, term);
        $scope.noOfPages = Math.ceil($scope.filtered.length / $scope.entryLimit);
    });

    var before = 4;
    var after = 8;


    $scope.foo = function (newValue, oldValue) {
        console.log('Value changed: ' + oldValue + ' to ' + newValue);
        $scope.callback({
            newValue: after,
            oldValue: before
        });
    }

};