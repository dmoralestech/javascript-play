var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })

        .state('dm', {
            url: '/dm',
            views: {
                '': { templateUrl: 'dm.html' },
                'section1@dm': { template: '<h2>space for section 1<\h2>' },
                'section2@dm': { template: '<h3>space for section 2<\h3>' },
                'section3@dm': { template: '<h4>space for section 3<\h4>' },
                'section4@dm': { template: '<h5>space for section 4<\h5>' }
            }
        })

        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })

        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: '<h2>I could sure use a drink right now.</h2>'

        })

        .state('home.nested', {
            url: '/nested',
            template: '<h2>Nested</h2><a ui-sref=".title" class="btn btn-primary">Nested</a><div ui-view></div>'
        })

        .state('home.nested.title', {
            url: '/title',
            template: '<h2>Hopefully this should work work work</h2>'
        })

        // nested list with just some random string data
        .state('home.footer', {
            url: '/footer',
            controller: 'scotchController',
            templateUrl: 'table-data.html'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'columnOne@about': { template: '<h2>Look I am a column!, Just a text here<\h2>' },
                'columnTwo@about': { 
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                },
                'columnThree@about': { template: '<h2>Fresh from the bakery...</h2>' },
                'columnFour@about': { 
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                },
                'dm@about': {
                    templateUrl: 'dm.html'
                }

            }
        });
});

routerApp.controller('scotchController', function($scope) {
    
    $scope.message = 'This is a message from our sponsors';
    
    $scope.message2 = 'Brought to you by our sponsors';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});