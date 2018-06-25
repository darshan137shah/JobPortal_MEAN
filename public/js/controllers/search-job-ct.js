var app = angular.module('angular-app');

app.controller('search-job-ct', ['$scope', '$rootScope','$location','user_service','account_service', 'job_service', function($scope, $rootScope, $location, user_service, account_service, job_service) {
  //Controller Starts
  $scope.activeUser = user_service.getnewUser();
  $scope.search = {};
  $scope.search.searchby = 'jobtitle';

  $scope.find = function(keyval) {
    $scope.keyval = {}
    $scope.keyval[$scope.search.searchby] = $scope.search.keyword;
    job_service.findjobs($scope.keyval).then(function(res) {
      if(res.data) {
          job_service.setjobs(res.data);
          $location.path('/home/' + $scope.activeUser + '/searchjob/results');
        }
    })
  }

  $scope.logout = function() {
    user_service.logout();
  }

//Controller Ends
}])
