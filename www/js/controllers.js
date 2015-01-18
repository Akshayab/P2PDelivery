angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', ["$scope", "$rootScope", "$ionicModal", "$firebaseAuth", function($scope, $rootScope, $ionicModal, $timeout, $firebaseAuth, $firebase, myfactory, $document) {

  $rootScope.currentUser = {};
  $rootScope.imageUrl = "";

  // Users Array on Firebase
  var usersArray = new Firebase("https://p2pdelivery.firebaseio.com");


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

  $scope.logout = function () {
    var user = new Firebase("https://p2pdelivery.firebaseio.com");
    user.unauth();
  }

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
          location: {"lat":42.2814,"lng":-83.7483},
          points: 500,
          rating: 5,
          venmo_token: 0,
          do_not_disturb: false
        })
        $scope.modal.hide();
        window.location.href = "#/app/userRequestView.html";
      }
      else{
        console.log(error);
      }
    })
    }
  })

  };

  // $scope.currentUser = function(userid) {
  //   var theUser = myfactory.getArray();
  //   console.log(theUser);


  // } 

          $scope.currentUser = {
              "id": 0,
              "name": "John Doe",
              "email": "johndoe@acme.com",
              "phone": "123-456-7890",
              "points": 500,
              "rating": 4              
          };  

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    usersArray.authWithPassword({
      email : $scope.loginData.email,
      password : $scope.loginData.password
    }, function (error, authData) {
        if (error) {
          console.log("Login Failed!");
          alert("Login Failed!");
        }
        else {
          console.log("Authentication successful with payload: ", authData);
          $scope.modal.hide();
          window.location.href = "#/app/userRequestView.html";

          var useridData = authData.uid.split(":");
          var userid = useridData[1];

          $scope.currentUser(userid);
          
          //var userimg = usersArray.child('users').child(userid).image;
          
          // $scope.currentUser = {
          //     "id": userid,
          //     "name": "John Doe",
          //     "email": authData.password.email,
              
          // };

          //$rootScope.currentUser = $firebase(usersArray.child('users').child(userid)).$asObject();

          // console.log($rootScope.currentUser);
        }
    });
    
  };



  $scope.centerMap = {
    lat: 50,
    lng: 50,
    zoom: 5
  }  
  
}])

  

.controller('MapCtrl', function($scope, $firebase, $document) {
  var usersArray = new Firebase("https://p2pdelivery.firebaseio.com/users");

    mapMarkersObjects = {};

    var mapMarkers = $firebase(usersArray).$asArray();


    usersArray.on("value", function(data){
      data.forEach(function(childSnapshot) {
        var key = childSnapshot.key();  
        var location = childSnapshot.val().location;      
        //console.log(location);

        if (location != "nil") {
          var locname = "location" + key;
          mapMarkersObjects[locname] = location;
        }
      });   
      console.log(mapMarkersObjects);
    })

    console.log(mapMarkers);

  $scope.markers =  mapMarkersObjects;
  

  // Filepicker img for profile

  $scope.uploadImg = function(file) {
    //$('.js-profile').attr('src')
    console.log(file);
  }


})

.controller('PlaylistsCtrl', function($scope, $firebase) {
  var usersArray = new Firebase("https://p2pdelivery.firebaseio.com/users");

  var test = usersArray.once("value", function (value){
    $scope.playlists = value.val();
    
  });
})

.controller('PlaylistCtrl', function($scope, $stateParams, $firebase) {
   var usersArray = new Firebase("https://p2pdelivery.firebaseio.com/users");
   
   var userid = usersArray.child($stateParams.id).once("value", function (value){
     $scope.playlist = value.val();
    
   })

})


.directive("filepicker", function(){
  return {
    scope: {
      callback: '&',
      'pickerclass': '@'
    },
    transclude: true,
    restrict: "A",

    template: "<button href='javascript:;' class='{{pickerclass}} button button-clear button-assertive' ng-click='pickFiles()' ng-transclude>Upload Picture...</button>",

    link: function($scope, element, attrs) {
      $scope.pickFiles = function () {
        var picker_options = {
          container: 'modal',
          mimetypes: "image/*",
          services: ['COMPUTER','FACEBOOK','WEBCAM', 'DROPBOX', 'FLICKR']
          };

        var path = attrs.path ? attrs.path : '/uploads/',
          container = attrs.container ? attrs.container : 'documents.e-freightliner.com';

        var store_options = {
          location: 'S3',
          path: path,
          container: container
        };
        filepicker.setKey("AucuSEbFQdWQGPMB4huCgz");

        filepicker.pickAndStore(picker_options, store_options, function (fpfile) {            
            console.log(JSON.stringify(fpfile));
            var filep = JSON.stringify(fpfile);
            //$scope.uploadImg(JSON.stringify(fpfile));
            //$document.getElementbyId('#profileimg').setAttribute('src', filep[0].url);
            //$('#profileimg').attr('src') = filep[0].url);

        });
      };
    }
  };
});
