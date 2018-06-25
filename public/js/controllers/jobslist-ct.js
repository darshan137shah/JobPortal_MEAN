var app = angular.module('angular-app');

app.controller('jobslist-ct', ['$scope', '$rootScope','$location','user_service','account_service', 'job_service', function($scope, $rootScope, $location, user_service, account_service, job_service) {

  $scope.activeUser = user_service.getnewUser();
  $scope.availableList = job_service.getjobs();

}])
