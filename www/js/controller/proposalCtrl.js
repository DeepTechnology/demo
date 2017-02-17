angular.module('starter.proposalCtrl', [])

.controller('proposalCtrl', function($scope, $stateParams, $state, $cordovaCamera, $cordovaFile, $ionicPopup, proposalservice) {

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

		/****Toggle in proposal****/	
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

		$scope.proposalList = {};
		$scope.proposalList.ProposalState = 'PROP';
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.proposalList.UserId = $scope.userData.UserId;
		var data = JSON.stringify($scope.proposalList)
		proposalservice.getSalesProposalList(data).then(function(result) {
			$scope.getproposalList = angular.fromJson(result.replace( /\'/g, "\""));
			for(var i=0; i<$scope.getproposalList.length; i++){
				if($scope.getproposalList[i].ProposalStateDate){
					$scope.getproposalList[i].ProposalStateDate = new Date($scope.getproposalList[i].ProposalStateDate);
				}
				else{
					$scope.getproposalList[i].ProposalStateDate = new Date($scope.getproposalList[i].ProposalStateDate);
				}
			}
		});
	});
})