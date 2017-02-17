angular.module('starter.proposalservice', [])
   .service('proposalservice', ['$rootScope', '$q', '$http', 'swordfish_BASE_URL', proposalservice])
	
	function proposalservice($rootScope, $q, $http, swordfish_BASE_URL, $scope) {
		
		this.getSalesProposalList = function(data) {
			var proposalData = angular.fromJson( data.replace( /\'/g, "\""));
		     var deferred = $q.defer();
		       $http({                           
		          method : 'GET',                
		          url : swordfish_BASE_URL.url + "api/SalesQuote/GetSalesProposalList?salesProPosalData={UserId:'"+proposalData.UserId+"',ProposalState:'"+proposalData.ProposalState+"'}",
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
			   deferred.resolve(result);
		       })
		       return deferred.promise;
		 }
	}