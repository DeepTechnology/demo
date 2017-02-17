angular.module('starter.eNewsservice', [])
   .service('eNewsservice', ['$rootScope', '$q', '$http', 'swordfish_BASE_URL', eNewsservice])
	
	function eNewsservice($rootScope, $q, $http, swordfish_BASE_URL, $scope) {
		this.GetNewsList = function(newsList, actionType ) {
		     var deferred = $q.defer();
		       $http({                           
		          method : 'GET',                
		          url : swordfish_BASE_URL.url + "api/News/GetNewsList?newsData={ActionType:'"+actionType+"'}",
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
		         deferred.resolve(result);
		       })
		       return deferred.promise;
		   }

		this.SalesQuote = function() {
		     var deferred = $q.defer();
		       $http({                           
		          method : 'GET',                
		          url : "http://ewtchd.zapto.org:2650/SalesQuote/GetBasicPlans?loginId={loginId:'0005991.6'}",
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
		         deferred.resolve(result);
		       })
		       return deferred.promise;
		   }



		
	}