var app = angular.module('angular-app');

//Landing Page Controller
app.controller('landing-ct', ['$scope','$rootScope','$location', function($scope, $rootScope, $location) {

  $scope.landing = true;
  $scope.activeUser = false;
  localStorage.removeItem('user');
  $scope.login = function() {
    $location.path('/login')
  };

  $scope.signup = function() {
    $location.path('/reg')
  }

  $scope.logout = function() {
    user_service.logout();
  }

}]);
