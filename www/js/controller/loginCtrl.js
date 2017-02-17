angular.module('starter.login', [])

.controller('loginCtrl', function($scope, $ionicLoading, $state, loginService, $ionicPopup, $rootScope) {
	$scope.show = function() {
		$ionicLoading.show({
			template: '<p>Loading...</p><ion-spinner icon="ripple" ></ion-spinner>'
		});
	};
	$scope.hide = function(){
		$ionicLoading.hide();
	};
	$scope.user = {};
	$scope.login = function(){
		$scope.show($ionicLoading);
		loginService.login($scope.user).then(function(result) {
			var loginResponse = angular.fromJson( result.replace( /\'/g, "\""));
			var time = new Date();
			if (loginResponse.ExceptionModel.MessageCode === '005') {
				$scope.hide($ionicLoading);
				window.localStorage.setItem("loginTime", time);
				window.localStorage.setItem("loginResponse",JSON.stringify(loginResponse));
				window.localStorage.setItem("loginStatus", true);
				$state.go('app.dashboard');
			} 
			else {
				$scope.hide($ionicLoading);
				var alertPopup = $ionicPopup.alert({
					title: 'Login failed!',
					template: 'Please check your credentials!'

				})
			}

		})
	}
	   
});