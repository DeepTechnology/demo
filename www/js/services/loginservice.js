 angular.module('starter.loginService', [])
   .service('loginService', ['$rootScope', '$q', '$http', 'swordfish_BASE_URL',  loginService])
	
	function loginService($rootScope, $q, $http, swordfish_BASE_URL) {
		this.login = function(data) {  
		     var deferred = $q.defer();
		       $http({                           
		          method : 'POST',                
		          url : swordfish_BASE_URL.url + 'api/User/AuthUserLogin?userLoginInfo={UserId:"'+data.username+'",Password: "'+data.password+'"}',
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
		         deferred.resolve(result);
		       })
		       return deferred.promise;
		   }

		this.SaveAuthUserLoginHistoryRecord = function(data) {  
		     var deferred = $q.defer();
		       $http({                           
		          method : 'POST',                
		          url : swordfish_BASE_URL.url + 'api/User/SaveAuthUserLoginHistoryRecord?userLoginHistoryInfo='+data,
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
		         deferred.resolve(result);
		       })
		       return deferred.promise;
		   }
	}
