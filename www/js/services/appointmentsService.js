angular.module('starter.appointmentsService', [])
   .service('appointmentsService', ['$rootScope', '$q', '$http', 'swordfish_BASE_URL', appointmentsService])
	
	function appointmentsService($rootScope, $q, $http, swordfish_BASE_URL, $scope) {
		
		var thisMonth;
		var nextMonth;
		var todayMonth;
		
		this.GetAppointmentsList = function(UserId, actionType , Id) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',                
				url : swordfish_BASE_URL.url + 'api/Event/GetAppointmentsList?agentEventData={UserId:"'+UserId+'",actionType:"'+actionType+'", Id:"'+Id+'"}',
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.thisMonth = function(data) {
			 thisMonth = data;
		}
		
		this.getThisMonth = function() {
			return thisMonth;
		}

		this.nextMonth = function(data) {
			 nextMonth = data;
		}
		
		this.getNextMonth = function() {
			return nextMonth;
		}

		this.todayEvent = function(data) {
			 todayMonth = data;
		}
		
		this.getTodayEvent = function() {
			return  todayMonth;
		}
	}