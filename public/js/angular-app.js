var app = angular.module('angular-app', ['ngRoute']);

app.config(function($routeProvider) {

// config starts

  $routeProvider.when('/', {
    templateUrl: '../views/landing.html',
    controller: 'landing-ct'
  })

  .when('/login', {
    templateUrl: '../views/login.html',
    controller: 'login-ct'
  })

  .when('/reg', {
    templateUrl: '../views/reg.html',
    controller: 'reg-ct'
  })

  .when('/home/:username', {
    templateUrl: '../views/home.html',
    controller: 'home-ct',
    resolve: ['user_service', function(user_service) {
      return user_service.checkSession();
    }]
  })

  .when('/home/:username/postjob', {
    templateUrl: '../views/post-job.html',
    controller: 'post-job-ct',
    resolve: ['user_service', function(user_service) {
      return user_service.ifCompany();
    }]
  })

  .when('/home/:username/searchjob', {
    templateUrl: '../views/search-job.html',
    controller: 'search-job-ct',
    resolve: ['user_service', function(user_service) {
      return user_service.checkSession();
    }]
  })

  .when('/home/:username/searchjob/results', {
    templateUrl: '../views/jobslist.html',
    controller: 'jobslist-ct',
    resolve: ['user_service', function(user_service) {
      return user_service.checkSession();
    }]
  })

  .when('/home/:username/savedjobs', {
    templateUrl: '../views/savedjobslist.html',
    controller: 'savedjobslist-ct',
    resolve: ['user_service', function(user_service) {
      return user_service.checkSession();
    }]
  })

  .otherwise({redirectTo:'/'});

// config ends
})
