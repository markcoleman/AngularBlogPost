/// <reference path="../lib/angular/angular-1.0.d.ts" />
/// <reference path="../lib/angular/angular-resource-1.0.d.ts" />
/// <reference path="models.ts" />

angular.module('myApp.services', ['ngResource'])
    .factory('CheckingAccount', function ($resource: ng.resource.IResourceService) {

        var queryDescriptor: ng.resource.IActionDescriptor;

        queryDescriptor = {
            method: 'GET',
            params: {
                id: '',

            },
            isArray: true
        };

        var share = <checkingAccountResource> $resource('api/checkingaccounts/:id', {}, {
            query : queryDescriptor

        });
        return share;
    });

