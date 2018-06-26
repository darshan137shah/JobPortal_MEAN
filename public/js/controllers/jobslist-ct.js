var app = angular.module('angular-app');

app.controller('jobslist-ct', ['$scope', '$rootScope','$location','user_service','account_service', 'job_service', function($scope, $rootScope, $location, user_service, account_service, job_service) {

  user_service.ifCompany().then(function() {$scope.isCompany = true}, function() {$scope.isCompany = false});
  $scope.activeUser = user_service.getnewUser();
  $scope.availableList = job_service.getjobs();

  $scope.nojobs = false;
  $scope.saved=false;
  if($scope.availableList.length == 0) {
    $scope.nojobs = true;
  }

  $scope.savejob = function(id) {
    $scope.userwithjobid = {
      username: $scope.activeUser,
      jobid: id
    };

    console.log('It is triggering here');
    account_service.savejob($scope.userwithjobid).then(function(res) {
      if(res) {
        $scope.saved=true;
      }
    }, function(err) {
      console.log(err);
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
}])
