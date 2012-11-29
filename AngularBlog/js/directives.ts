/// <reference path="../lib/angular/angular-1.0.d.ts" />
/// <reference path="../lib/angular/angular-resource-1.0.d.ts" />
/* Directives */

angular.module('myApp.directives', []).
  directive('appVersion', [<any>'version', <any>function (version) {
      return function (scope, elm, attrs) {
          elm.text(version);
      };
  }]);
