angular.module('starter.previewService', [])
   .service('previewService', ['$rootScope', '$q', '$http', 'swordfish_BASE_URL', previewService])
	
	function previewService($rootScope, $q, $http, swordfish_BASE_URL, $scope) {
		
		this.getSalesProposalListByContact = function(userId,leadno) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',                
				url : swordfish_BASE_URL.url + "api/SalesQuote/GetSalesProposalListByContact?salesProposalContactData={UserId:'"+userId+"',Leadno:'"+leadno+"'}",
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
				return deferred.promise;
			}
}