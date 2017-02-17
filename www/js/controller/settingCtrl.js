angular.module('starter.setting', [])

.controller('settingCtrl', function($scope, $state, $translate) {
	
	if(localStorage.getItem('language') == null){
		$scope.language = "locale-en";
	}
	else{
		$scope.language = localStorage.getItem('language');
	}

	$scope.languageChange = function(languageID){
		$translate.use(languageID)
		localStorage.setItem('language', languageID);
	}
});