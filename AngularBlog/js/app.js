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
    }]).config(function ($httpProvider) {
    function exampleInterceptor($q, $log) {
        function success(response) {
            return response;
        }
        function error(response) {
            if(response.status === 401) {
                var deferred = $q.defer();
                $('#myModal').modal();
                return deferred.promise;
            }
            return $q.reject(response);
        }
        return function (promise) {
            return promise.then(success, error);
        }
    }
    ; ;
    $httpProvider.responseInterceptors.push(exampleInterceptor);
});
; ;
