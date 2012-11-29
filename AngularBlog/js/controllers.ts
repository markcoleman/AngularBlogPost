/// <reference path="../lib/angular/angular-1.0.d.ts" />
/// <reference path="../lib/angular/angular-resource-1.0.d.ts" />
/// <reference path="Models.ts" />


interface ICheckingAccountControllerScope extends ng.IScope {
    CheckingAccounts: CheckingAccount[];
}

function MyCtrl1($scope : ICheckingAccountControllerScope, CheckingAccount: ng.resource.IResourceClass) {
    $scope.CheckingAccounts = <any>CheckingAccount.query();
}

interface ICheckDetailsRouteParams extends ng.IRouteParamsService {
    id: number;
}

interface ICheckDetailsControllerScope extends ng.IScope {
    CheckingAccount: CheckingAccount;
    changeDescription: Function;
}

function CheckDetailsController($scope : ICheckDetailsControllerScope, CheckingAccount: ng.resource.IResourceClass, $routeParams : ICheckDetailsRouteParams) {

    $scope.CheckingAccount = <any>CheckingAccount.get({id: $routeParams.id});



    $scope.changeDescription = function (e) {
        $scope.CheckingAccount.$update({
            id: $scope.CheckingAccount.id
        });
        e.preventDefault();
    };


}


function MyCtrl2($scope : ng.IScope) {

}
