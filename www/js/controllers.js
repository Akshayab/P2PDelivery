angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $firebase) {
  var usersArray = new Firebase("https://p2pdelivery.firebaseio.com/users");

  var test = usersArray.once("value", function (value){
    $scope.playlists = value.val();
    console.log($scope.playlists);
  })
})

.controller('PlaylistCtrl', function($scope, $stateParams, $firebase) {
   var usersArray = new Firebase("https://p2pdelivery.firebaseio.com/users");
   var id = $stateParams.id;
   console.log($stateParams);
   var userid = usersArray.child(id).once("value", function (value){
     $scope.playlist = value.val();
    
   })

  //$scope.playlist = Playlist.get($stateParams.id);

  //console.log(userid); 
  //$scope.playlist = userid;
});
