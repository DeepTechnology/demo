angular.module('starter.salesCtrl',[])

.controller('salesCtrl', function($scope, $stateParams, $ionicScrollDelegate, $state, $cordovaFile, $ionicLoading, $ionicPopup, salesQuoteService) {

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

		/****Toggle content in sales****/
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

		$scope.salesQuoteList = {};
		$scope.salesQuoteList.ProposalState = 'Quo';
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.salesQuoteList.UserId = $scope.userData.UserId;
		var data = JSON.stringify($scope.salesQuoteList)
		salesQuoteService.getsalesQuoteList(data).then(function(salesQuoteResult) {
			$scope.salesQuote = angular.fromJson(salesQuoteResult.replace( /\'/g, "\""));
			for(var i=0; i<$scope.salesQuote.length; i++){
				if($scope.salesQuote[i].ProposalStateDate){
					$scope.salesQuote[i].ProposalStateDate = new Date($scope.salesQuote[i].ProposalStateDate);
				}else{
					$scope.salesQuote[i].ProposalStateDate = new Date($scope.salesQuote[i].ProposalStateDate);
				}
			}
		});
	});
})

