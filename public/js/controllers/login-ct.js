var app = angular.module('angular-app');


app.controller('login-ct', ['$scope','$rootScope','$location','user_service','account_service', function($scope, $rootScope, $location, user_service, account_service) {
  //Controller Starts
//  user_service.ifCompany().then(function() {$scope.isCompany = true}, function() {$scope.isCompany = false});
  $scope.login = true;
  $scope.activeUser = false;
  $scope.login = function(user) {
    account_service.login(user).then(function(resp) {
      if(resp.data) {
        $scope.loginErr = false;
        user_service.setnewUser(user.username);
        $scope.activeUser = user_service.getnewUser();
        $location.path('/home/' + $scope.activeUser)
      } else {
        $scope.loginErr = true;
      }
    })
  };

  $scope.logout = function() {
    user_service.logout();
  }

//Controller Ends
}])
