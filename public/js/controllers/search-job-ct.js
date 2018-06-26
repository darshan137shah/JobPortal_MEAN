var app = angular.module('angular-app');

app.controller('search-job-ct', ['$scope', '$rootScope','$location','user_service','account_service', 'job_service', function($scope, $rootScope, $location, user_service, account_service, job_service) {
  //Controller Starts
  $scope.activeUser = user_service.getnewUser();
  $scope.search = {};
  $scope.search.searchby = 'jobtitle';
 user_service.ifCompany().then(function() {$scope.isCompany = true}, function() {$scope.isCompany = false});

  account_service.getAccount({'username': $scope.activeUser}).then(function(res) {
    $scope.savedjobscount = res.data[0]['savedjobs'].length;
  })

  $scope.findavailable = function(keyval) {
    $scope.keyval = {}
    $scope.keyval[$scope.search.searchby] = $scope.search.keyword;
    job_service.findjobs($scope.keyval).then(function(res) {
      if(res.data) {
          job_service.setjobs(res.data);
          $location.path('/home/' + $scope.activeUser + '/searchjob/results');
        }
    })
  }

  $scope.findsaved = function() {
    job_service.listsavedjobs({'username': $scope.activeUser}).then(function(res) {
      if(res) {
        job_service.setjobs(res.data[0]['jobs']);
        $location.path('/home/' + $scope.activeUser + '/savedjobs');
      }
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
