angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', ["$scope", "$ionicModal", "$firebaseAuth", function($scope, $ionicModal, $timeout, $firebaseAuth) {

  // Users Array on Firebase
  var usersArray = new Firebase("https://p2pdelivery.firebaseio.com/users");

  // Form data for the login modal
  $scope.loginData = {
    email: $scope.email,
    password: $scope.password
  };

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

  // Create a user
  $scope.createUser = function() {
    usersArray.createUser({
      email: $scope.loginData.email,
      password: $scope.loginData.password
  }, function(error) {
    if (error) {
      switch (error.code) {
        case "EMAIL_TAKEN":
          console.log("The new user account cannot be created because the email is already in use.");
          break;
        case "INVALID_EMAIL":
          console.log("The specified email is not a valid email.");
          break;
        default:
          console.log("Error creating user:", error);
      }
    } else {
      console.log("User account created successfully!");
    }
  })};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
}])

.controller('PlaylistsCtrl', function($scope, $firebase) {
  var usersArray = new Firebase("https://p2pdelivery.firebaseio.com/users");

  var test = usersArray.once("value", function (value){
    $scope.playlists = value.val();
    
  })
})

.controller('PlaylistCtrl', function($scope, $stateParams, $firebase) {
   var usersArray = new Firebase("https://p2pdelivery.firebaseio.com/users");
   
   var userid = usersArray.child($stateParams.id).once("value", function (value){
     $scope.playlist = value.val();
    
   })

});
