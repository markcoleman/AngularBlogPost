angular.module('myApp', [
    'myApp.filters', 
    'myApp.services', 
    'myApp.directives'
]).config([
    '$routeProvider', 
    function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'partials/partial1.html',
            controller: MyCtrl1
        });
        $routeProvider.when('/view2', {
            templateUrl: 'partials/partial2.html',
            controller: MyCtrl2
        });
        $routeProvider.when('/checkingaccounts/:id', {
            templateUrl: 'partials/checkingaccountdetails.html',
            controller: CheckDetailsController
        });
        $routeProvider.otherwise({
            redirectTo: '/view1'
        });
    }]);
