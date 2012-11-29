angular.module('myApp.services', [
    'ngResource'
]).factory('CheckingAccount', function ($resource) {
    var queryDescriptor;
    queryDescriptor = {
        method: 'GET',
        params: {
            id: ''
        },
        isArray: true
    };
    var putDes;
    putDes = {
        method: 'PUT'
    };
    var share = $resource('api/checkingaccounts/:id', {
    }, {
        query: queryDescriptor
    });
    return share;
});
