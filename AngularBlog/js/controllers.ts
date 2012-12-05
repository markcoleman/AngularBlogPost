/// <reference path="../lib/angular/angular-1.0.d.ts" />
/// <reference path="../lib/angular/angular-resource-1.0.d.ts" />
/// <reference path="Models.ts" />

interface ILoginControllerScope extends ng.IScope {
    userName: string;
    password: string;
    login: Function;
    logOff: Function;
}
function LoginController($scope: ILoginControllerScope, $http:ng.IHttpService) {
    $scope.login = function (e) {
        var data = {
            userName: $scope.userName,
            password: $scope.password
        };
        $http.post("api/AuthenticateUser", data).success(function (result, status, headers) {
            window.location.reload(true);
        });
    };
    $scope.logOff = function (e) {
        $http.get("api/LogOff").success(function (result, status, headers) {
            window.location.reload(true);
        });
    };
}
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
    changeDescription(e: Event);
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
    Source: CheckingAccount;
    Destination: CheckingAccount;
    transferMoney : Function;

    pickSource(e: Event, account: CheckingAccount);
    pickDestination(e: Event, account: CheckingAccount);

    clearPick(e :Event, option: string);
}

function TransfersController($scope: ITransfersControllerScope, CheckingAccount: ng.resource.IResourceClass, $http : ng.IHttpService) {
    var accounts = <any>CheckingAccount.query();

    $scope.Sources = accounts;


    $scope.Destinations = function () {
        return $scope.Sources.filter(function (s, index) {
            if ($scope.Source) {
                return s.Id !== $scope.Source.Id;
            }
            else {
                return false;
            }
         });
    };

    $scope.pickSource = function (e, account) {
        $scope.Source = account;
    };

    $scope.pickDestination = function (e, account) {
        $scope.Destination = account;
    };

    $scope.clearPick = function (e, option) {
        e.preventDefault();
        if (option === 'destination') {
            $scope.Destination = null;
        }
        if (option === 'source') {
            $scope.Source = null;
            $scope.Destination = null;
        }
    };
    $scope.transferMoney = function (e) {
        e.preventDefault();

        var data = {
            amount: $scope.Amount,
            sourceId : $scope.Source.Id,
            destinationId : $scope.Destination.Id
        };

        $http.post("api/PerformTransfer", data).error(function (result, status, headers) {
            if (result.ErrorCode === 1234) {
                alert(result.ErrorMessage);
            }
        });
    };
}
