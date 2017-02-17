angular.module('starter.previewCtrl', [])

.controller('previewCtrl', function($scope, $state,$stateParams, $ionicScrollDelegate, $ionicNavBarDelegate, previewService, $ionicModal) {
	
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

		/****Toggle content in preview****/
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

		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
	    var userId = $scope.userData.UserId;
	    previewService.getSalesProposalListByContact(userId, $stateParams.leadno).then(function(result) {
	  		$scope.previewList = angular.fromJson(result.replace( /\'/g, "\""));
	  		$scope.quo=[];
	    	$scope.prop=[];
	  		for(var i=0; i<$scope.previewList.length; i++){
				if($scope.previewList[i].ProposalState == "QUO"){
					$scope.previewList[i].ProposalStateDate = new Date($scope.previewList[i].ProposalStateDate);
					$scope.quo.push($scope.previewList[i]);
				}else{
					$scope.previewList[i].ProposalStateDate = new Date($scope.previewList[i].ProposalStateDate);
					$scope.prop.push($scope.previewList[i]);
				}
			}
	  	
	  	});
	});
})

