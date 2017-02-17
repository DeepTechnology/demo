angular.module('starter.eNewsCtrl', [])

.controller('eNewsCtrl', function($scope, $state, $ionicNavBarDelegate,eNewsservice, $ionicModal, $stateParams ) {

	eNewsservice.GetNewsList().then(function(result) {
		$scope.newsList = angular.fromJson( result.replace( /\'/g, "\""));
	})
})