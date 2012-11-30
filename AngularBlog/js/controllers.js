function MyCtrl1($scope, CheckingAccount) {
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
            id: $scope.CheckingAccount.id
        });
        e.preventDefault();
    };
}
function MyCtrl2($scope) {
}
