// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var studApp = angular.module('starter', ['ionic','ionic.cloud'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicCloudProvider) {

  $ionicCloudProvider.init({
      "core": {
        "app_id": "36f04528"
      }
    });
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
  url: '/login',
  templateUrl: 'js/login.html',
  controller: 'loginCtrl'
  })

  .state('register', {
  url: '/register',
  templateUrl: 'js/register.html',
  controller: 'registerCtrl'
  })


  .state('rentList', {
  url: '/rentList',
  templateUrl: 'js/rent_list.html',
  controller: 'rentListCtrl',
  params: {accParam: null, filterParam: null}

  })

  .state('filter', {
  url: '/filter',
  templateUrl: 'js/filter.html',
  controller: 'filterCtrl',
  params: {filterParam: null}
  })

  .state('detail', {
  url: '/detail',
  templateUrl: 'js/detail.html',
  controller: 'detailCtrl',
  params: {accParam: null}
  })
  .state('menu', {
      url: '/menu',
      templateUrl: 'js/menu.html',
      controller: 'menuCtrl'
    })

    .state('landlordprofile', {
        url: '/landlordprofile',
        templateUrl: 'js/landlordprofile.html',
      })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
