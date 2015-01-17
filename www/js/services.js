angular.module('starter.services', [])

.factory('PlaylistCtrl', function($firebase, $rootScope) {

  
  var ref = new Firebase('https://p2pdelivery.firebaseio.com');  
  var refArray = $firebase(ref.child('User')).$asObject();   
  
  console.log(refArray);

  var Playlist = {
    ref: function() {
      return refArray;
    },  
      
    all: function() {
      return refArray;
    },
  };

  return [Playlist]; 



})