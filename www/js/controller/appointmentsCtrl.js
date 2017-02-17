angular.module('starter.appointmentsCtrl', [])

.controller('appointmentsCtrl',function($scope, $state, $ionicNavBarDelegate , appointmentsService) {

    $scope.$on("$ionicView.enter", function(event, data){
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
})

.controller('thismonthCtrl',function($scope, $state, $ionicNavBarDelegate , appointmentsService) {

    $scope.$on("$ionicView.enter", function(event, data){
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

        $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
        $scope.UserId = $scope.userData.UserId;
        $scope.actionType = "CME" //ActionType Data Hardcoded Mention 
        $scope.Id  = "0"
        appointmentsService.GetAppointmentsList($scope.UserId, $scope.actionType, $scope.Id ).then(function(result) {
            $scope.GetAppointmentsList = angular.fromJson(result.replace( /\'/g, "\""));
            /*$scope.GetAppointmentsList = $scope.GetAppointmentsList[0].StartDate;*/
            /*console.log("$scope.GetAppointmentsList",$scope.GetAppointmentsList);*/
            console.log("$scope.GetAppointmentsList",$scope.GetAppointmentsList);
        })
    });
})

.controller('nextmonthCtrl',function($scope, $state, $ionicNavBarDelegate , appointmentsService) {

    $scope.$on("$ionicView.enter", function(event, data){
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
        $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
        $scope.UserId = $scope.userData.UserId;
        $scope.actionType = "NME" //ActionType Data Hardcoded Mention 
        $scope.Id  = "0"
        appointmentsService.GetAppointmentsList($scope.userData.UserId, $scope.actionType, $scope.Id ).then(function(result) {
            $scope.GetAppointmentsList = angular.fromJson(result.replace( /\'/g, "\""));
        })
    });
})

.controller('morningEventCtrl',function($scope, $state, $ionicNavBarDelegate , appointmentsService) {

    $scope.$on("$ionicView.enter", function(event, data){
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

        $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
        $scope.UserId = $scope.userData.UserId;
        $scope.actionType = "ME" //ActionType Data Hardcoded Mention 
        $scope.Id  = "0"
        appointmentsService.GetAppointmentsList($scope.userData.UserId, $scope.actionType, $scope.Id ).then(function(result) {
            $scope.GetAppointmentsList = angular.fromJson(result.replace( /\'/g, "\""));
        })
    });
})

.controller('afternoonEventCtrl',function($scope, $state, $ionicNavBarDelegate , appointmentsService) {

    $scope.$on("$ionicView.enter", function(event, data){
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
        $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
        $scope.UserId = $scope.userData.UserId;
        $scope.actionType = "AFE" //ActionType Data Hardcoded Mention 
        $scope.Id  = "0"
        appointmentsService.GetAppointmentsList($scope.userData.UserId, $scope.actionType, $scope.Id ).then(function(result) {
            $scope.GetAppointmentsList = angular.fromJson(result.replace( /\'/g, "\""));
        })
    });
})

.controller('nightEventCtrl',function($scope, $state, $ionicNavBarDelegate , appointmentsService) {

    $scope.$on("$ionicView.enter", function(event, data){
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
        $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
        $scope.UserId = $scope.userData.UserId;
        $scope.actionType = "NGE" //ActionType Data Hardcoded Mention 
        $scope.Id  = "0"
        appointmentsService.GetAppointmentsList($scope.userData.UserId, $scope.actionType, $scope.Id ).then(function(result) {
            $scope.GetAppointmentsList = angular.fromJson(result.replace( /\'/g, "\""));
        })
    });
})

.controller('eventTodayCtrl',function($scope, $state, $ionicNavBarDelegate , appointmentsService) {

})