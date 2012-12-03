angular.module('myApp', [
    'myApp.filters', 
    'myApp.services', 
    'myApp.directives'
]).config([
    '$routeProvider', 
    function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'partials/balances.html',
            controller: MyCtrl1
        });
        $routeProvider.when('/view2', {
            templateUrl: 'partials/transfers.html',
            controller: MyCtrl2
        });
        $routeProvider.when('/checkingaccounts/:id', {
            templateUrl: 'partials/details.html',
            controller: CheckDetailsController
        });
        $routeProvider.otherwise({
            redirectTo: '/view1'
        });
    }]);
