/// <reference path="../lib/angular/angular-1.0.d.ts" />
/// <reference path="../lib/angular/angular-resource-1.0.d.ts" />
/// <reference path="Models.ts" />


interface ICheckingAccountControllerScope extends ng.IScope {
    CheckingAccounts: CheckingAccount[];
    sum: Function;
}

function BalancesController($scope: ICheckingAccountControllerScope, CheckingAccount: ng.resource.IResourceClass) {
    $scope.CheckingAccounts = <any>CheckingAccount.query();

    $scope.sum = function () {
        var total = 0;
        angular.forEach($scope.CheckingAccounts, function (item) {
            total += item.Balance;
        });

        return total;
    };
}

interface ICheckDetailsRouteParams extends ng.IRouteParamsService {
    id: number;
}

interface ICheckDetailsControllerScope extends ng.IScope {
    CheckingAccount: CheckingAccount;
    changeDescription: Function;
}

function CheckDetailsController($scope: ICheckDetailsControllerScope, CheckingAccount: ng.resource.IResourceClass, $routeParams: ICheckDetailsRouteParams) {

    $scope.CheckingAccount = <any>CheckingAccount.get({ id: $routeParams.id });



    $scope.changeDescription = function (e) {
        $scope.CheckingAccount.$update({
            id: $scope.CheckingAccount.Id
        });
        e.preventDefault();
    };


}

interface ITransfersControllerScope extends ng.IScope {
    Sources: CheckingAccount[];
    Destinations: Function;
    Amount: number;
    SourceId: string;
    DestinationId: number;

    transferMoney : Function;
}

function TransfersController($scope: ITransfersControllerScope, CheckingAccount: ng.resource.IResourceClass, $http : ng.IHttpService) {
    var accounts = <any>CheckingAccount.query();

    $scope.Sources = accounts;
    $scope.Destinations = accounts;

    $scope.transferMoney = function (e) {
        e.preventDefault();

        var data = {
            amount: $scope.Amount,
            sourceId : $scope.SourceId,
            destinationId : $scope.DestinationId
        };

        $http.post("api/PerformTransfer", data);
    };
}
