var app = angular.module('angular-app');

app.controller('reg-ct', ['$scope', '$rootScope','$location','user_service','account_service', function($scope, $rootScope, $location, user_service, account_service) {
  //Controller Starts
  $scope.reg = true;
  $scope.user = {};
  $scope.user.usertype = 'c';
  $scope.activeUser = user_service.getnewUser();
  $rootScope.$on('currentUserEvent', function(event, data) {
    $scope.activeUser = data;
  })
//  user_service.ifCompany().then(function() {$scope.isCompany = true}, function() {$scope.isCompany = false});

  $scope.reg = function(user) {

    //Check the username availablity
    account_service.checkUsername({'username': user.username}).then(function(resp) {
      if(resp.data) {
        $scope.userErr = false;
        account_service.newAccount(user).then(function(resp) { //Creating a new account
          user_service.setnewUser(resp.data.username); //Broadcast and set activeUser
          $location.path('/home/'+$scope.activeUser);
        })
      } else { //Change the username err
          $scope.userErr = true;
      }
    })
  }

  $scope.logout = function() {
    user_service.logout();
  }

//Controller Ends
}])
