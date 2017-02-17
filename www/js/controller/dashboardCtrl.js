
angular.module('starter.dashboard', [])

.controller('dashboardCtrl', function($scope, $state, $ionicNavBarDelegate , dashboardService, $cordovaCalendar) {
	$ionicNavBarDelegate.showBackButton(false);
	/*$scope.actionType = 'CME,NME,ME,AFE,NGE';
	$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		dashboardService.getAppointmentsList($scope.userData, $scope.actionType).then(function(result) {
			console.log("result-1",result);
	})*/
    $scope.actionType = 'CME,NME,ME,AFE,NGE';
	$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
	var data = JSON.stringify($scope.userData);		
	dashboardService.getAppointmentsList(data,$scope.actionType).then(function(result) {
	})
	
})


.controller('activityCtrl', function($scope, $state, $ionicNavBarDelegate , dashboardService, $cordovaCalendar) {
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
        
});


