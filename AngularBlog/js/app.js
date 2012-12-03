angular.module('myApp', [
    'myApp.filters', 
    'myApp.services', 
    'myApp.directives'
]).config([
    '$routeProvider', 
    function ($routeProvider) {
        $routeProvider.when('/balances', {
            templateUrl: 'partials/balances.html',
            controller: BalancesController
        });
        $routeProvider.when('/transfers', {
            templateUrl: 'partials/transfers.html',
            controller: TransfersController
        });
        $routeProvider.when('/balances/detail/:id', {
            templateUrl: 'partials/details.html',
            controller: CheckDetailsController
        });
        $routeProvider.otherwise({
            redirectTo: '/balances'
        });
    }]);
