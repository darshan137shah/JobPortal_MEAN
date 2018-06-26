var app = angular.module('angular-app');

app.controller('post-job-ct', ['$scope', '$rootScope','$location','user_service','account_service', 'job_service', function($scope, $rootScope, $location, user_service, account_service, job_service) {
  //Controller Starts
  $scope.postjob = true;
  $scope.activeUser = user_service.getnewUser();
  $scope.job = {};
 user_service.ifCompany().then(function() {$scope.isCompany = true}, function() {$scope.isCompany = false});

  $scope.postSuccess = false;
  $scope.postjob = function(post) {
    job_service.findjobslength().then(function(res) {
      $scope.job['jobid'] = (res.data.length + 1).toString();
      job_service.postjob($scope.job).then(function(res) {
        $scope.postSuccess = true;
        $scope.job = {};
      })
    })
  }

  $scope.go = function() {
    $location.path('/home/' + $scope.activeUser + '/postjob');
  }

  $scope.goSearch = function() {
    $location.path('/home/' + $scope.activeUser + '/searchjob');
  }

  $scope.logout = function() {
    user_service.logout();
  }
//Controller Ends
}])
