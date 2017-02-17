angular.module('starter.services', [])

/*.factory('Profiles', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var swz = "{'UserStatus':null}"; 
   var s = angular.fromJson( swz.replace( /\'/g, "\""));
   console.log("s",s.UserStatus);
});*/

.factory('Camera', function($q) {

   return {
      getPicture: function(options) {
         var q = $q.defer();

         navigator.camera.getPicture(function(result) {
            q.resolve(result);
         }, function(err) {
            q.reject(err);
         }, options);

         return q.promise;
      }
   }

});
