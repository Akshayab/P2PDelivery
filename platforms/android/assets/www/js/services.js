angular.module('starter.services', [])

.factory('myfactory', function($firebase, $rootScope) {
    var newUsers = new Firebase('https://p2pdelivery.firebaseio.com');  
    var newUsersArray = $firebase(newUsers.child('users')).$asArray();   

    return {
      getArray: function () {
        return newUsersArray;
      }
    }
})
