angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $window, $ionicHistory, $ionicPopover, $timeout,  $location, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
 


  $scope.logout = function(){
		  $window.localStorage.clear();
		    $ionicHistory.clearCache();
		    $ionicHistory.clearHistory();
		 }


})



