angular.module('starter.salesQuoteService', [])
   .service('salesQuoteService', ['$rootScope', '$q', '$http', 'swordfish_BASE_URL', salesQuoteService ])
	
	function salesQuoteService($rootScope, $q, $http, swordfish_BASE_URL, $scope) {
		
		this.getsalesQuoteList = function(data) {
			var newData = angular.fromJson(data.replace( /\'/g, "\""));
		     var deferred = $q.defer();
		       $http({                           
		          method : 'GET',                
		          url : swordfish_BASE_URL.url + "api/SalesQuote/GetSalesProposalList?salesProPosalData={UserId:'"+newData.UserId+"',ProposalState:'"+newData.ProposalState+"'}",
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
			   deferred.resolve(result);
		       })
		       return deferred.promise;
		 }
	}

