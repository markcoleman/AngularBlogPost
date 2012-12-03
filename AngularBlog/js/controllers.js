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
    $scope.Destinations = accounts;
    $scope.transferMoney = function (e) {
        e.preventDefault();
        var data = {
            amount: $scope.Amount,
            sourceId: $scope.SourceId,
            destinationId: $scope.DestinationId
        };
        $http.post("api/PerformTransfer", data);
    };
}
