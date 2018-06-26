var app = angular.module('angular-app');

app.factory('user_service', function($http, $q, $rootScope, $location) {
//Manages the current user
  return {
    setnewUser: function(user) {
      localStorage.user = user;
      $rootScope.$broadcast('currentUserEvent', user);
    },

    getnewUser: function() {
      return localStorage.user;
    },

    checkSession: function() {
      var defer = $q.defer();
      if(localStorage.user) {
        defer.resolve()
      } else {
        $location.path('/');
        defer.reject();
      }
      return defer.promise;
    },

    ifCompany: function() {
      var defer = $q.defer();

      if(localStorage.user) {
        $http.post('http://localhost:3000/getAccount', {'username': localStorage.user}).then(function(res) {
          if(res) {
            var account = res.data[0];
            var accountType = account.usertype;
            if(accountType == 'c') {
              defer.resolve();
            } else {
              defer.reject();
            }
          }
        });
      } else {
        $location.path('/');
        defer.reject();
      }
      return defer.promise;
    },

    logout: function() {
      localStorage.removeItem('user');
      $rootScope.$broadcast('currentUserEvent', false);
      $location.path('/');
    }

  }

});


app.factory('account_service', function($http, $rootScope, $q, $location) {
//Manages the current account opertaions

  return {
    checkUsername: function(username) {
      var defer = $q.defer();
        $http.post('http://localhost:3000/checkUsername', username).then(function(resp) {
          defer.resolve(resp)
        })
      return defer.promise;
    },

    newAccount: function(account) {
      var defer = $q.defer();
      $http.post('http://localhost:3000/newAccount', account).then(function(resp) {
        defer.resolve(resp)
      })
      return defer.promise;
    },

    login: function(account) {
      var defer = $q.defer();
      $http.post('http://localhost:3000/login', account).then(function(resp) {
        defer.resolve(resp)
      })
      return defer.promise;
    },

    getAccount: function(user) {
      var defer = $q.defer();
      $http.post('http://localhost:3000/getAccount', user).then(function(resp) {
        defer.resolve(resp)
      })
      return defer.promise;
    },

    savejob: function(userwithjobid) {
      var defer = $q.defer();
      $http.post('http://localhost:3000/savejob', userwithjobid).then(function(resp) {
        defer.resolve(resp)
      })
      return defer.promise;
    }

  }

});


app.factory('job_service', function($http, $rootScope, $q, $location) {
//Manages the current account opertaions

  return {
    postjob: function(job) {
      var defer = $q.defer();
        $http.post('http://localhost:3000/postjob', job).then(function(resp) {
          defer.resolve(resp)
        })
      return defer.promise;
    },

    findjobslength: function(account) {
      var defer = $q.defer();
      $http.get('http://localhost:3000/findjobslength').then(function(resp) {
        defer.resolve(resp)
      })
      return defer.promise;
    },

    findjobs: function(keyval) {
      var defer = $q.defer();
      $http.post('http://localhost:3000/findjobs', keyval).then(function(resp) {
        defer.resolve(resp)
      })
      return defer.promise;
    },

    listsavedjobs: function(username) {
      var defer = $q.defer();
      $http.post('http://localhost:3000/listjobs', username).then(function(resp) {
        defer.resolve(resp)
      })
      return defer.promise;
    },

    setjobs: function(data) {
      jobslist = data;
      console.log(jobslist);
      $rootScope.$broadcast('BOOM!', jobslist)
    },

    getjobs: function() {
      if(localStorage.user && jobslist) {
        return jobslist;
      } else if(!jobslist || jobslist == undefined) {
        $location.path('/')
        return false;
      }
    }

    // getAccount: function(user) {
    //   var defer = $q.defer();
    //   $http.post('http://localhost:3000/getAccount', user).then(function(resp) {
    //     defer.resolve(resp)
    //   })
    //   return defer.promise;
    // }

  }

});
