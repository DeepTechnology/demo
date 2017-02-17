angular.module('starter.calendarservice', [])
   .service('calendarservice', ['$rootScope', '$q', '$http', 'swordfish_BASE_URL', calendarservice])
	
	function calendarservice($rootScope, $q, $http, swordfish_BASE_URL, $scope) {
		
		this.AgentEventCalendarList = function(data) {
		     var deferred = $q.defer();
		       $http({                           
		          method : 'GET',                
		          url : swordfish_BASE_URL.url + 'api/Event/AgentEventCalendarList?agentEventData={UserId:"'+data.UserId+'"}',
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
		         deferred.resolve(result);
		       })
		       return deferred.promise;
		}

		this.SaveAgentEvent = function(data) {
		     var deferred = $q.defer();
		       $http({                           
		          method : 'POST',                
		          url : swordfish_BASE_URL.url + 'api/Event/SaveAgentEvent?eventDataVal='+data,
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
		         deferred.resolve(result);
		       })
		       return deferred.promise;
		}

		this.GetAgentEventCalendarList = function(data) {
		     var deferred = $q.defer();
		       $http({                           
		          method : 'GET',                
		          url : swordfish_BASE_URL.url + 'api/Event/GetAgentEventCalendarList?eventData={UserID:"'+data.UserId+'"}',
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
		         deferred.resolve(result);
		       })
		       return deferred.promise;
		}

		this.DeleteEvent = function(id) {
		     var deferred = $q.defer();
		       $http({                           
		          method : 'POST',                
		          url : swordfish_BASE_URL.url + 'api/Event/DeleteEvent?eventId={Id:"'+id+'"}',
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
		         deferred.resolve(result);
		       })
		       return deferred.promise;
		}

		this.EventDetail = function(data) {
		     var deferred = $q.defer();
		       $http({                           
		          method : 'GET',                
		          url : swordfish_BASE_URL.url + 'api/Event/EventDetail?eventId={Id:"'+data+'"}',
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
		         deferred.resolve(result);
		       })
		       return deferred.promise;
		}
	}