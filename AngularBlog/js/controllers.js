function MyCtrl1($scope, CheckingAccount) {
    $scope.CheckingAccounts = CheckingAccount.query();
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
