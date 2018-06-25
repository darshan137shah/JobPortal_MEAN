var app = angular.module('angular-app');

app.controller('home-ct', ['$scope', '$rootScope','$location','user_service','account_service', function($scope, $rootScope, $location, user_service,  account_service){
  $scope.home = true;
  $scope.activeUser = user_service.getnewUser();
  account_service.getAccount({'username': $scope.activeUser}).then(function(res) {
    $scope.account = res.data[0];
    $scope.accountType = $scope.account.usertype;
    if($scope.accountType == 'c') {
      $scope.isCompany = true;
    }
  });

  $scope.go = function() {
    console.log("Triggering")
    $location.path('/home/' + $scope.activeUser + '/postjob');
  }

  $scope.goSearch = function() {
    console.log("Triggering")
    $location.path('/home/' + $scope.activeUser + '/searchjob');
  }

  $scope.logout = function() {
    user_service.logout();
  }

}])
