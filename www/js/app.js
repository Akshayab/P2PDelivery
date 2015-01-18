// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers', 'firebase', 'leaflet-directive'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  .state('app.login', {
    url: "/login",
    views: {
      'menuContent': {
        templateUrl: "templates/login.html"
      }
    }
  })  
  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "templates/profile.html"
      }
    }
  })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.userRequestView', {
      url: "/userRequestView",
      views: {
        'menuContent': {
          templateUrl: "templates/userRequestView.html",
          controller: 'MapCtrl'
        }
      }
    })
    .state('app.ninjaDeliveryView', {
      url: "/ninjaDeliveryView",
      views: {
        'menuContent': {
          templateUrl: "templates/ninjaDeliveryView.html",
        }
      }
    })        
  .state('app.single', {
    url: "/playlists/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });

  var usersArray = new Firebase("https://p2pdelivery.firebaseio.com");
  var auth = usersArray.getAuth();
  // if none of the above states are matched, use this as the fallback
  if(auth) {
    $urlRouterProvider.otherwise('/app/userRequestView');
  } else {
    $urlRouterProvider.otherwise('/app/login');
  }
  
});
