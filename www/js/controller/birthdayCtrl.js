angular.module('starter.birthdayCtrl', [])

.controller('birthdayCtrl', function($scope, $state, $ionicScrollDelegate, $ionicNavBarDelegate, birthdayService, $ionicModal) {
		  	
	$scope.$on("$ionicView.enter", function(event, data){
		/****search filter code start****/
		$scope.hasFilter = false;
		$scope.openFilters = function(hasFilter){

			if(hasFilter){
				$scope.searchProduct = "";
				$scope.hasFilter = false;
			}
			else{
				$scope.hasFilter = true;
			}
		}
		$scope.filterProduct = function(searchText){
			$scope.searchProduct = searchText;
		}

		/****Toggle in birthday****/	
		$scope.toggleGroup = function(index) {
			if ($scope.isGroupShown(index)) {
				$scope.shownGroup = null;
			} else {
				$scope.shownGroup = index;
			}
		};
		$scope.isGroupShown = function(index) {
			return $scope.shownGroup === index;
		};

		$scope.brithdayContactList = {};
		var CurrentDate = new Date();
		$scope.brithdayContactList.MonthVal = CurrentDate.getMonth() + 1;
		$scope.month = $scope.brithdayContactList.MonthVal;
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
	    $scope.brithdayContactList.UserId = $scope.userData.UserId;
	    var data = JSON.stringify($scope.brithdayContactList)

	    birthdayService.contactBirthdayList(data).then(function(result,month) {
	  		$scope.birthdayList = angular.fromJson(result.replace( /\'/g, "\""));
	  		console.log("$scope.birthdayList",$scope.birthdayList);
	  	});
	    
	    $scope.monthChange = function(month) {
	    	$scope.brithdayContactList.MonthVal = month;
			$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
	    	$scope.brithdayContactList.UserId = $scope.userData.UserId;
	    	var data = JSON.stringify($scope.brithdayContactList)
			birthdayService.contactBirthdayList(data).then(function(result) {
		  		$scope.birthdayList = angular.fromJson(result.replace( /\'/g, "\""));
		  	});
		}
	});
})