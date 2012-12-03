angular.module('myApp', [
    'myApp.filters', 
    'myApp.services', 
    'myApp.directives'
]).config([
    '$routeProvider', 
    function ($routeProvider) {
        $routeProvider.when('/balances', {
            templateUrl: 'partials/balances.html',
            controller: MyCtrl1
        });
        $routeProvider.when('/transfers', {
            templateUrl: 'partials/transfers.html',
            controller: MyCtrl2
        });
        $routeProvider.when('/balances/detail/:id', {
            templateUrl: 'partials/details.html',
            controller: CheckDetailsController
        });
        $routeProvider.otherwise({
            redirectTo: '/balances'
        });
    }]);
