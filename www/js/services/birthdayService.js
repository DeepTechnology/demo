angular.module('starter.birthdayService', [])
   .service('birthdayService', ['$rootScope', '$q', '$http', 'swordfish_BASE_URL', birthdayService])
	
	function birthdayService($rootScope, $q, $http, swordfish_BASE_URL, $scope) {
		
		this.contactBirthdayList = function(data) {
			var newData = angular.fromJson( data.replace( /\'/g, "\""));
		     var deferred = $q.defer();
		       $http({                           
		          method : 'GET',                
		          url : swordfish_BASE_URL.url + "api/Contact/ContactBirthdayList?contactBirthData={UserId:'"+newData.UserId+"',MonthVal:'"+newData.MonthVal+"'}",
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
			   deferred.resolve(result);
		       })
		       return deferred.promise;
		 }

		
	}