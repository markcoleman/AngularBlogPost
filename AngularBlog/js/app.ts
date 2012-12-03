/// <reference path="../lib/angular/angular-1.0.d.ts" />
/// <reference path="../lib/angular/angular-resource-1.0.d.ts" />
/// <reference path="controllers.ts" />


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).

  config(['$routeProvider', function($routeProvider : ng.IRouteProviderProvider) {
    $routeProvider.when('/balances', {templateUrl: 'partials/balances.html', controller: BalancesController});
    $routeProvider.when('/transfers', {templateUrl: 'partials/transfers.html', controller: TransfersController});
    $routeProvider.when('/balances/detail/:id', {templateUrl: 'partials/details.html', controller: CheckDetailsController});
    $routeProvider.otherwise({redirectTo: '/balances'});
  }]);
