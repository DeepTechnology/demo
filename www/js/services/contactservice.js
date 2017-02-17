angular.module('starter.contactservice', [])
   .service('contactservice', ['$rootScope', '$q', '$http', 'swordfish_BASE_URL', contactservice])
	
	function contactservice($rootScope, $q, $http, swordfish_BASE_URL, $scope) {
		this.contactList = function(data) {
		     var deferred = $q.defer();
		       $http({                           
		          method : 'GET',                
		          url : swordfish_BASE_URL.url + 'api/Contact/GetContactList?contactData={UserId:"'+data.UserId+'"}',
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
			   deferred.resolve(result);
		       })
		       return deferred.promise;
		}

		this.getContactList = function(data,leadno,id) {
		     var deferred = $q.defer();
		       $http({                           
		          method : 'GET',                
		          url : swordfish_BASE_URL.url + 'api/Contact/GetContactList?contactData={UserId:"'+data.UserId+'",Leadno:"'+leadno+'",Id:"'+id+'"}',
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
			   deferred.resolve(result);
		       })
		       return deferred.promise;
		}

		this.saveContact = function(data) {
			console.log("dataservice",data);
		     var deferred = $q.defer();
		       $http({                           
		          method : 'POST',                
		          url : swordfish_BASE_URL.url + 'api/Contact/SaveContact?contactData='+data,
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		            })
		       .success(function(result) {
			    deferred.resolve(result);
		       })
		       return deferred.promise;
		}

		this.saveContactProfileImage = function(data, leadno) {   
		     var deferred = $q.defer();
		       $http({                           
		          method : 'POST',                
		          url : swordfish_BASE_URL.url + 'api/Contact/SaveContactProfileImage?contactImageData='+data,
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
		         deferred.resolve(result);
		       })
		       return deferred.promise;
		  }

	}	

