angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', ["$scope", "$ionicModal", "$firebaseAuth", function($scope, $ionicModal, $timeout, $firebaseAuth) {

  // Users Array on Firebase
  var usersArray = new Firebase("https://p2pdelivery.firebaseio.com");
  var testArray = [];

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

  $scope.goToSignUpPage = function () {
    $scope.modal.remove();
    $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });
  }

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
    var newUser = usersArray.createUser({
      email: $scope.createUser.email,
      password: $scope.createUser.password
  }, function(error, user) {
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
      console.log("User account created successfully! " + user);
      usersArray.authWithPassword({
      email: $scope.createUser.email,
      password: $scope.createUser.password
    }, function (error, authData) {
      if(!error){
        usersArray.child("authentication").child(authData.uid).set(authData);
        var userid_array = authData.uid.split(":");
        var userid = userid_array[1];
        usersArray.child("users").child(userid).set({
          id: userid,
          name: $scope.createUser.userName,
          email: $scope.createUser.email,
          image: "nil",
          isNinja: true,
          location: "nil",
          points: 500,
          rating: 5,
          venmo_token: 0,
          do_not_disturb: false
        })
      }
      else{
        console.log(error);
      }
    })
    }
  })

  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    usersArray.authWithPassword({
      email : $scope.loginData.email,
      password : $scope.loginData.password
    }, function (error, authData) {
        if (error) {
          console.log("Login Failed!");
        }
        else {
          console.log("Authentication successful with payload: ", authData);
        }
    })
  };

  $scope.ninjas = [];

  // Ninjas array to populate the map
  

  var ninjas = usersArray.child('users').on("value", function (ninjas) {

    for (var key in ninjas.val()) {
       if (ninjas.val()[key].location != "nil" && ninjas.val()[key].isNinja) {
          $scope.ninjas.push(ninjas.val()[key].location);
       }
    }
  })  
    
    

  
    //console.log($scope.ninjas);
  angular.extend($scope, {
    center: {
        lat: $scope.lat,
        lng: $scope.lng,
        zoom: 5
    },
    //markers: JSON.stringify($scope.ninjas)
    markers: {
      mainMarker: {
        lat: 50,
        lng: -1.0
      }
    }
    
  }); 

}])

  // Show users on the map


  
  // var map = L.map('mapBox');

  // for (var i = 0; i < $scope.ninjas.length; i++) {
  //  marker = new L.marker([$scope.ninjas[i][1],$scope.ninjas[i][2]])
  //   .bindPopup($scope.ninjas[i][0])
  //   .addTo(map);
  // } 
  



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
