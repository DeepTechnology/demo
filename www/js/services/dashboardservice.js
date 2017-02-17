angular.module('starter.dashboardService', [])
   .service('dashboardService', ['$rootScope', '$q', '$http', 'swordfish_BASE_URL', dashboardService])
	
	function dashboardService($rootScope, $q, $http, swordfish_BASE_URL, $scope) {
		this.getAppointmentsList = function(data,actionType) {
		     var deferred = $q.defer();
		       $http({                           
		          method : 'GET',                
		          url : swordfish_BASE_URL.url + 'api/Event/GetAppointmentsList?agentEventData={UserId:'+data.UserId+',actionType:'+actionType+'}',
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
		         deferred.resolve(result);
		       })
		       return deferred.promise;
		   }
	}