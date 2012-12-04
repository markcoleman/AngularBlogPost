function LoginController($scope, $http) {
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
function BalancesController($scope, CheckingAccount) {
    $scope.CheckingAccounts = CheckingAccount.query();
    $scope.sum = function () {
        var total = 0;
        angular.forEach($scope.CheckingAccounts, function (item) {
            total += item.Balance;
        });
        return total;
    };
}
function CheckDetailsController($scope, CheckingAccount, $routeParams) {
    $scope.CheckingAccount = CheckingAccount.get({
        id: $routeParams.id
    });
    $scope.changeDescription = function (e) {
        $scope.CheckingAccount.$update({
            id: $scope.CheckingAccount.Id
        });
        e.preventDefault();
    };
}
function TransfersController($scope, CheckingAccount, $http) {
    var accounts = CheckingAccount.query();
    $scope.Sources = accounts;
    $scope.Destinations = function () {
        return $scope.Sources.filter(function (s, index) {
            if($scope.Source) {
                return s.Id !== $scope.Source.Id;
            } else {
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
        if(option === 'destination') {
            $scope.Destination = null;
        }
        if(option === 'source') {
            $scope.Source = null;
            $scope.Destination = null;
        }
    };
    $scope.transferMoney = function (e) {
        e.preventDefault();
        var data = {
            amount: $scope.Amount,
            sourceId: $scope.Source.Id,
            destinationId: $scope.Destination.Id
        };
        $http.post("api/PerformTransfer", data).error(function (result, status, headers) {
            if(result.ErrorCode === 1234) {
                alert(result.ErrorMessage);
            }
        });
    };
}
