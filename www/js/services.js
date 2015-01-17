angular.module('starter.services', [])

.factory('PlaylistCtrl', function($firebase, $rootScope) {

  
  var ref = new Firebase('https://p2pdelivery.firebaseio.com');  
  var refArray = $firebase(ref.child('users')).$asArray();   
  
  console.log(refArray);

  var Playlist = {
    ref: function() {
      return refArray;
    },  
      
    all: function() {
      return refArray;
    };
    get: function(id) {
      var userid = $firebase(ref.child('users').child(id)).$asObject();      
      return userid;
        console.log(userid);
    }
  };

  return Playlist; 



})