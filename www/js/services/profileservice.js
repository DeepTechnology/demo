angular.module('starter.profileService', [])
   .service('profileService', ['$rootScope', '$q', '$http', 'swordfish_BASE_URL',  profileService])

	
	function profileService($rootScope, $q, $http, swordfish_BASE_URL) {
		this.getProfileList = function(data,UserId) {   
		     var deferred = $q.defer();
		       $http({                           
		          method : 'GET',                
		          url : swordfish_BASE_URL.url + 'api/User/GetUserProfile?userInfo={UserId:"'+UserId+'"}',
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
		         deferred.resolve(result);
		       })
		       return deferred.promise;
		}

		this.saveContactProfileImage = function(data,UserId) { 
		     var deferred = $q.defer();
		       $http({                           
		          method : 'POST',
				  data : {UserID:UserId,Leadno:data.Leadno,ActionDate:data.ActionDate,Leadimage:data.Leadimage},                
		          url : swordfish_BASE_URL.url + "api/Contact/PostContactProfileImage",
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
		         deferred.resolve(result);
		       })
		       return deferred.promise;
		}
		
		this.getContactList = function(data,UserId) {
		     var deferred = $q.defer();
		       $http({                           
		          method : 'GET',                
		          url : swordfish_BASE_URL.url + 'api/Contact/GetContactList?contactData={UserId:"'+UserId+'"}',
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
			   deferred.resolve(result);
		       })
		       return deferred.promise;
		 }
		
	}


