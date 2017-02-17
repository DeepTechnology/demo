angular.module('starter.fnaCtrl', [])

.controller('fnaCtrl', function($scope, $state, $ionicNavBarDelegate,fnaservice, $ionicModal, $stateParams) {

	$scope.$on("$ionicView.enter", function(event, data){
		
	 	$scope.fnaPrior = [];         
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));

		for(var i=1; i<=4; i++){
			fnaservice.GetFNAPriority($scope.userData, $stateParams.leadno, i).then(function(result) {
				if(result != 'null'){
					$scope.fnaPrior.push(angular.fromJson( result.replace( /\'/g, "\"")));
				}
			})
		}

		fnaservice.GetContactList($scope.userData, $stateParams.leadno).then(function(result) {
			if(result != null){
				$scope.ContactList = angular.fromJson( result.replace( /\'/g, "\""));	
				for(var i =0;i<$scope.ContactList.length;i++){
					if($scope.ContactList[i].Leadimage == null){
						$scope.ContactList[i].Leadimage = "img/placeholder-male.jpg";
					} else {
						$scope.ContactList[i].Leadimage = "data:image/jpeg;base64," + $scope.ContactList[i].Leadimage;
					}
				}
			}
		})

		$scope.changeState = function(state, pror){
			if($scope.fnaPrior[0] != undefined){
				if ($scope.fnaPrior[0].ConCode === "EDU") {
					$scope.fnaPrior[0].ConCode = 1;
				}else if ($scope.fnaPrior[0].ConCode === "INV") {
					$scope.fnaPrior[0].ConCode = 2;
				}else if ($scope.fnaPrior[0].ConCode === "PRO") {
					$scope.fnaPrior[0].ConCode = 3;
				}else{
					$scope.fnaPrior[0].ConCode = 4;
				}
				pror = $scope.fnaPrior[0].ConCode;
			}

			if($scope.fnaPrior[1] != undefined){
				if ($scope.fnaPrior[1].ConCode === "EDU") {
					$scope.fnaPrior[1].ConCode = 1;
				}else if ($scope.fnaPrior[1].ConCode === "INV") {
					$scope.fnaPrior[1].ConCode = 2;
				}else if ($scope.fnaPrior[1].ConCode === "PRO") {
					$scope.fnaPrior[1].ConCode = 3;
				}else{
					$scope.fnaPrior[1].ConCode = 4;
				}
				pror = $scope.fnaPrior[1].ConCode;
			}

			if($scope.fnaPrior[2] != undefined){
				if ($scope.fnaPrior[2].ConCode === "EDU") {
					$scope.fnaPrior[2].ConCode = 1;
				}else if ($scope.fnaPrior[2].ConCode === "INV") {
					$scope.fnaPrior[2].ConCode = 2;
				}else if ($scope.fnaPrior[2].ConCode === "PRO") {
					$scope.fnaPrior[2].ConCode = 3;
				}else{
					$scope.fnaPrior[2].ConCode = 4;
				}
				pror = $scope.fnaPrior[2].ConCode;
			}

			if($scope.fnaPrior[3] != undefined){
				if ($scope.fnaPrior[3].ConCode === "EDU") {
					$scope.fnaPrior[3].ConCode = 1;
				}else if ($scope.fnaPrior[3].ConCode === "INV") {
					$scope.fnaPrior[3].ConCode = 2;
				}else if ($scope.fnaPrior[3].ConCode === "PRO") {
					$scope.fnaPrior[3].ConCode = 3;
				}else{
					$scope.fnaPrior[3].ConCode = 4;
				}
				pror = $scope.fnaPrior[3].ConCode;

			}

			$state.go("app."+state+"",{'leadno': $stateParams.leadno, 'PriorVal': pror});
		}
	});
})

.controller('eduCtrl', function($scope, $state, $ionicHistory, $ionicNavBarDelegate, $ionicModal, $stateParams,fnaservice){

		var CurrentDate = new Date();
		var setDate = CurrentDate.setMonth(CurrentDate.getMonth());
		var date = new Date(setDate).getMonth()+1;
		$scope.eduGraph = [];
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.eduData = {};
		$scope.data = {};
		$scope.saveFnaEdu = {};
	 	$scope.data.ActionDate = CurrentDate.getFullYear()  + '/' + date + '/' + CurrentDate.getDate();
		$scope.data.ProcessDate = $scope.data.ActionDate;
		$scope.data.Leadno = $stateParams.leadno;
		$scope.data.LevelNo = '1';

		$scope.saveFna = function(){
			$scope.saveFnaEdu.ActionDate = $scope.data.ActionDate;
			$scope.saveFnaEdu.Leadno = $stateParams.leadno;
			$scope.saveFnaEdu.ConCode = 'EDU';
			$scope.saveFnaEdu.PriorVal = $stateParams.PriorVal;
			$scope.saveFnaEdu.UserId = $scope.userData.UserId; 
			fnaservice.SaveFNAPriority($scope.saveFnaEdu).then(function(result) {
				$state.go("app.fna",{'leadno': $stateParams.leadno});
			})
		}

		$scope.calculateEdu = function(){

			fnaservice.InitGraph();
			$scope.eduData = {};
			$scope.eduData.Rate = $scope.data.InflationRate;
			$scope.eduData.Amt = $scope.data.AnnualCost * $scope.data.NoofYearInEducation;
			$scope.eduData.NPer = $scope.data.EductionEntryAge - $scope.data.ChildAge;
			fnaservice.TotalFutureCost($scope.eduData).then(function(result) {
				$scope.tFC =  Math.ceil(result);
				$scope.eduData = {};
				$scope.eduData.Rate = $scope.data.AnnualAverageRoi;
				$scope.eduData.Amt = $scope.data.AmountInvested;
				$scope.eduData.NPer = $scope.data.EductionEntryAge - $scope.data.ChildAge;

				  fnaservice.AmountSumAssured($scope.eduData).then(function(result) {
				  	if (result != null) {
				  		$scope.currentValueInFuture = Math.ceil(result);
						$scope.AgeChild = $scope.data.EductionEntryAge - $scope.data.ChildAge
					    var ciAC = 0;
					    var ciCVF = 0;
					    var FBAL = 0;
					    $scope.eduGraph = [];
					    for (i = 1; i <= $scope.data.NoofYearInEducation; i++)
					    {	
					        ciAC = Math.ceil(($scope.data.AnnualCost * i) * Math.pow((1 + ($scope.data.InflationRate / 100)), $scope.AgeChild));
					        FBAL = ciAC - $scope.currentValueInFuture;
					        $scope.eduGraph.push(Math.ceil(FBAL));
					    }

					    var status = fnaservice.SaveGraph($scope.eduGraph, $scope.currentValueInFuture, $scope.tFC );
					    if(status == 'success'){
							$state.go("app.eduGraph",{'leadno': $stateParams.leadno, 'PriorVal': $stateParams.PriorVal});	
					    }
				  	}
					
				})
			})
		}
		$scope.myGoBack = function() {
	   		$ionicHistory.goBack();
	  	}
})

.controller('invCtrl', function($scope, $state, $rootScope, $ionicHistory, $ionicHistory, $ionicNavBarDelegate, fnaservice, $ionicModal, $stateParams){

		var CurrentDate = new Date();
		var setDate = CurrentDate.setMonth(CurrentDate.getMonth());
		var date = new Date(setDate).getMonth()+1;
		$scope.data= {};
		$scope.saveFnaInv = {};
		$scope.invData = {};
	 	$scope.data.ActionDate = CurrentDate.getFullYear()  + '/' + date + '/' + CurrentDate.getDate();
		$scope.data.ProcessDate = $scope.data.ActionDate;
		$scope.data.Leadno = $stateParams.leadno;
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.saveInv = function(){
			$scope.saveFnaInv.ActionDate = $scope.data.ActionDate;
			$scope.saveFnaInv.Leadno = $stateParams.leadno;
			$scope.saveFnaInv.ConCode = 'INV';
			$scope.saveFnaInv.PriorVal = $stateParams.PriorVal;
			$scope.saveFnaInv.UserId = $scope.userData.UserId; 
			fnaservice.SaveFNAPriority($scope.saveFnaInv).then(function(result) {
				$state.go("app.fna",{'leadno': $stateParams.leadno});
			})
		}

		$scope.calculateInv = function(){

			$scope.invData = {};
			$scope.invGraphChart = [];
			$scope.invData.Rate = $scope.data.InflationRate;
			$scope.invData.Amt = $scope.data.PresentAmount;
			$scope.invData.NPer = $scope.data.AttainAge - $scope.data.Age;
			fnaservice.TotalFutureCost($scope.invData).then(function(result) {
				if (result != null) {
					$scope.tFC =  Math.ceil(result);
					$scope.invData = {};
					$scope.invData.Rate = $scope.data.AnnualAverageRoi;
					$scope.invData.Amt = $scope.data.AmountInvested;
					$scope.invData.NPer = $scope.data.AttainAge - $scope.data.Age;
					fnaservice.AmountSumAssured($scope.invData).then(function(result) {
						$scope.currentValueInFuture = Math.ceil(result);
						$scope.age = $scope.data.AttainAge - $scope.data.Age;
					    var ciAC = 0;
					    var FBAL = 0;
					    $scope.invGraphChart = [];
					    for (i = 1; i <= $scope.age; i++) {
							ciAC = Math.ceil(($scope.data.PresentAmount * i) * Math.pow((1 + ($scope.data.InflationRate / 100)), i));
					        FBAL = ciAC - $scope.currentValueInFuture;
					        $scope.invGraphChart.push(Math.ceil(FBAL));
					    }
					    var status = fnaservice.SaveInvGraph($scope.invGraphChart, $scope.tFC, $scope.currentValueInFuture);
						if(status == 'success'){
							$state.go("app.invGraph",{'leadno': $stateParams.leadno, 'PriorVal': $stateParams.PriorVal});
						}
					})
				}
				
			})
		}
		$scope.myGoBack = function() {
	   		$ionicHistory.goBack();
	  	}
})

.controller('proCtrl', function($scope, $state, $ionicHistory, $rootScope, $ionicNavBarDelegate, fnaservice, $ionicModal, $stateParams){


		var CurrentDate = new Date();
		var setDate = CurrentDate.setMonth(CurrentDate.getMonth());
		var date = new Date(setDate).getMonth()+1;
	 	$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.data= {};
		$scope.proData = {};
		$scope.proDataGraph = [];
		$scope.saveFnaPro = {};
	 	$scope.data.ActionDate = CurrentDate.getFullYear()  + '/' + date + '/' + CurrentDate.getDate();
		$scope.data.ProcessDate = $scope.data.ActionDate;
		$scope.data.Leadno = $stateParams.leadno;
		$scope.data.UserID = $scope.userData.UserId;

		$scope.savePro = function(){ 
			$scope.saveFnaPro.ActionDate = $scope.data.ActionDate;
			$scope.saveFnaPro.Leadno = $stateParams.leadno;
			$scope.saveFnaPro.ConCode = 'PRO';
			$scope.saveFnaPro.PriorVal = $stateParams.PriorVal;
			$scope.saveFnaPro.UserId = $scope.userData.UserId; 
			fnaservice.SaveFNAPriority($scope.saveFnaPro).then(function(result) {
				$state.go("app.fna",{'leadno': $stateParams.leadno});
			})
		}

		$scope.proCalculate = function(){

			$scope.proData = {};
			$scope.proData.Rate = $scope.data.AnnualAverageRoi;
			$scope.proData.Amt = $scope.data.AmountPercentageFamilyIncome;
			$scope.proData.NPer = $scope.data.ComfortYears;
			fnaservice.proAmountSumAssured($scope.proData).then(function(result) {
				if (result != null) {
					$scope.sumAssured = Math.ceil(result);
					$scope.inflation = ($scope.data.AnnualAverageRoi / 100);
				    var CI = 0;
				    var FBAL = 0;
				    $scope.proDataGraph = [];
				    for (i = 1; i <= $scope.data.ComfortYears; i++) {
				        CI = (1 / parseFloat(Math.pow((1 + parseFloat($scope.inflation)), i)));
				        CI = ((1 - CI) / $scope.inflation);
				        FBAL = $scope.data.AmountPercentageFamilyIncome * CI  * (1 + parseFloat($scope.inflation));
				        $scope.proDataGraph.push(Math.ceil(FBAL));
					}
					var status = fnaservice.SaveProGraph($scope.proDataGraph, $scope.sumAssured);
					if(status == 'success'){
						$state.go("app.proGraph",{'leadno': $stateParams.leadno, 'PriorVal': $stateParams.PriorVal});

				   }
				}
				
			})	
		}
		$scope.myGoBack = function() {
	   		$ionicHistory.goBack();
	  	}
})

.controller('retCtrl', function($scope, $state, $ionicHistory, $rootScope, $ionicNavBarDelegate, fnaservice, $ionicModal, $stateParams){
		
		var CurrentDate = new Date();
		var setDate = CurrentDate.setMonth(CurrentDate.getMonth());
		var date = new Date(setDate).getMonth()+1;
		$scope.leadNo = $stateParams.leadno; 	
	 	$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.data= {};
		$scope.retData = {};
	 	$scope.data.ActionDate = CurrentDate.getFullYear()  + '/' + date + '/' + CurrentDate.getDate();
		$scope.data.ProcessDate = $scope.data.ActionDate;
		$scope.data.Leadno = $stateParams.leadno;
		$scope.data.UserID = $scope.userData.UserId;
		$scope.saveFnaRet ={};
		$scope.saveRet = function(){  
			$scope.saveFnaRet.ActionDate = $scope.data.ActionDate;
			$scope.saveFnaRet.Leadno = $stateParams.leadno;
			$scope.saveFnaRet.ConCode = 'RET';
			$scope.saveFnaRet.PriorVal = $stateParams.PriorVal;
			$scope.saveFnaRet.UserId = $scope.userData.UserId; 
			fnaservice.SaveFNAPriority($scope.saveFnaRet).then(function(result) {
				$state.go("app.fna",{'leadno': $stateParams.leadno});
			})
		}
		
		$scope.retCalculate = function(){
			$scope.retData = {};
			$scope.retData.Rate = $scope.data.InflationRate;
			$scope.retData.Amt = $scope.data.CurrentAnnualIncome;
			$scope.retData.NPer = $scope.data.RetirementAge - $scope.data.Age;
			fnaservice.AmountSumAssured($scope.retData).then(function(result) {
				$scope.retData = {};
				$scope.retData.Rate = $scope.data.AnnualAverageRoi;
				$scope.retData.Amt = result;
				$scope.retData.NPer = $scope.data.LifeExpentancy - $scope.data.RetirementAge;
				fnaservice.proAmountSumAssured($scope.retData).then(function(result) {
					if (result != null) {
						$scope.sumAssured = Math.ceil(result);
						$scope.retGraphData = []
						$scope.dA = $scope.data.RetirementAge - $scope.data.Age
						$scope.calc2;
						$scope.DifAge2 = $scope.data.LifeExpentancy - $scope.data.RetirementAge;
						$scope.DifAge = $scope.data.RetirementAge - $scope.data.Age;
						$scope.EARINV = ($scope.data.AnnualAverageRoi / 100);
						var calc1 = (1 / parseFloat(Math.pow((1 + parseFloat($scope.EARINV)), $scope.DifAge2)));
						var calc2 = ((1 - calc1) / $scope.EARINV);

						var CI = 0;
						var FBAL = 0;
						$scope.retGraphData = [];
						for (i = 1; i <= $scope.dA; i++) {

							CI = Math.ceil($scope.data.CurrentAnnualIncome * Math.pow((1 + ($scope.data.InflationRate / 100)), i));
							FBAL = CI  *calc2 * (1 + parseFloat($scope.EARINV));
							$scope.retGraphData.push(Math.ceil(FBAL));
						}
						var status = fnaservice.SaveRetGraph($scope.retGraphData, $scope.sumAssured);
						if(status == 'success'){
							$state.go("app.retGraph",{'leadno': $stateParams.leadno, 'PriorVal': $stateParams.PriorVal});	
					   }
					}
					
				})
			})	
		}
		$scope.myGoBack = function() {
	   		$ionicHistory.goBack();
	  	}
})

.controller('GraphCtrl', function($scope, $state, $rootScope, $ionicNavBarDelegate, fnaservice, $ionicModal, $stateParams) { // Add a simple controller

		var CurrentDate = new Date();
		var setDate = CurrentDate.setMonth(CurrentDate.getMonth());
		var date = new Date(setDate).getMonth()+1;
		$scope.eduGraph = [];
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.eduData = {};
		$scope.data = {};
		$scope.saveFnaEdu = {};
	 	$scope.data.ActionDate = CurrentDate.getFullYear()  + '/' + date + '/' + CurrentDate.getDate();
		$scope.data.ProcessDate = $scope.data.ActionDate;
		$scope.data.Leadno = $stateParams.leadno;
		$scope.data.LevelNo = '1';

		$scope.saveFna = function(){
			var CurrentDate = new Date();
			var setDate = CurrentDate.setMonth(CurrentDate.getMonth());
			var date = new Date(setDate).getMonth()+1;
			$scope.saveFnaEdu.ActionDate = CurrentDate.getFullYear()  + '/' + date + '/' + CurrentDate.getDate();
			$scope.saveFnaEdu.Leadno = $stateParams.leadno;
			$scope.saveFnaEdu.ConCode = 'EDU';
			$scope.saveFnaEdu.PriorVal = $stateParams.PriorVal;
			$scope.saveFnaEdu.UserId = $scope.userData.UserId; 
			fnaservice.SaveFNAPriority($scope.saveFnaEdu).then(function(result) {
				$state.go("app.fna",{'leadno': $stateParams.leadno, 'PriorVal': $stateParams.PriorVal});
			})
		}

		$scope.labels = [];
		$scope.leadNo = $stateParams.leadno;
		$scope.graphData = fnaservice.GetGraph();
		if($scope.graphData){
			$scope.fundBalance = $scope.graphData.tFC - $scope.graphData.graphCVF; 
			for(i = 1;i<=$scope.graphData.mem.length;i++){
				$scope.labels.push(i);
			}
			$scope.labels = $scope.labels;
			$scope.series = ['Series A'];

			$scope.data = [$scope.graphData.mem];	
		}
})


.controller('proGraphCtrl', function($scope, $state,$ionicHistory, $rootScope, $ionicNavBarDelegate, fnaservice, $ionicModal, $stateParams) { // Add a simple controller
		
		var CurrentDate = new Date();
		var setDate = CurrentDate.setMonth(CurrentDate.getMonth());
		var date = new Date(setDate).getMonth()+1;
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.data= {};
		$scope.proGraphData={};
		$scope.proData = {};
		$scope.proDataGraph = [];
		$scope.saveFnaPro = {};
		$scope.labels =[];
	 	$scope.data.ActionDate = CurrentDate.getFullYear()  + '/' + date + '/' + CurrentDate.getDate();
		$scope.data.ProcessDate = $scope.data.ActionDate;
		$scope.data.Leadno = $stateParams.leadno;
		$scope.data.UserID = $scope.userData.UserId;
		$scope.savePro = function(){ 

			var CurrentDate = new Date();
			var setDate = CurrentDate.setMonth(CurrentDate.getMonth());
			var date = new Date(setDate).getMonth()+1;
			$scope.saveFnaPro.ActionDate = CurrentDate.getFullYear()  + '/' + date + '/' + CurrentDate.getDate();
			$scope.saveFnaPro.Leadno = $stateParams.leadno;
			$scope.saveFnaPro.ConCode = 'PRO';
			$scope.saveFnaPro.PriorVal = $stateParams.PriorVal;
			$scope.saveFnaPro.UserId = $scope.userData.UserId; 
			fnaservice.SaveFNAPriority($scope.saveFnaPro).then(function(result) {
				$state.go("app.fna",{'leadno': $stateParams.leadno, 'PriorVal': $stateParams.PriorVal});
			})
		}
	
		
		// $scope.proGraphData.proGraph.clear();
		$scope.leadNo = $stateParams.leadno;
		$scope.proGraphData = fnaservice.GetProGraph();
		if($scope.proGraphData){

			$scope.sumAssured = $scope.proGraphData.proSumAssured;
			for(var i=1;i<=$scope.proGraphData.proGraph.length; i++){
				$scope.labels.push(i);
			}
			$scope.labels = $scope.labels;
			$scope.series = ['Series A'];
			$scope.data = [$scope.proGraphData.proGraph];	
		}
})

.controller('retGraphCtrl', function($scope, $state, $rootScope, $ionicNavBarDelegate, fnaservice, $ionicModal, $stateParams) { // Add a simple controller
		
		var CurrentDate = new Date();
		var setDate = CurrentDate.setMonth(CurrentDate.getMonth());
		var date = new Date(setDate).getMonth()+1;
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.data= {};
		$scope.retData = {};
	 	$scope.data.ActionDate = CurrentDate.getFullYear()  + '/' + date + '/' + CurrentDate.getDate();
		$scope.data.ProcessDate = $scope.data.ActionDate;
		$scope.data.Leadno = $stateParams.leadno;
		$scope.data.UserID = $scope.userData.UserId;
		$scope.saveFnaRet ={};

		$scope.saveRet = function(){  

			var CurrentDate = new Date();
			var setDate = CurrentDate.setMonth(CurrentDate.getMonth());
			var date = new Date(setDate).getMonth()+1;
			$scope.saveFnaRet.ActionDate = CurrentDate.getFullYear()  + '/' + date + '/' + CurrentDate.getDate();
			$scope.saveFnaRet.Leadno = $stateParams.leadno;
			$scope.saveFnaRet.ConCode = 'RET';
			$scope.saveFnaRet.PriorVal = $stateParams.PriorVal;
			$scope.saveFnaRet.UserId = $scope.userData.UserId; 
			fnaservice.SaveFNAPriority($scope.saveFnaRet).then(function(result) {
				$state.go("app.fna",{'leadno': $stateParams.leadno, 'PriorVal': $stateParams.PriorVal});
			})
		}

		$scope.labels =[];
		$scope.leadNo = $stateParams.leadno;
		$scope.retGraphData = fnaservice.GetRetGraph();
		if($scope.retGraphData){
			$scope.sumAssured = $scope.retGraphData.retSumAssured;
			for(var i=1;i<=$scope.retGraphData.retGraph.length; i++){
				$scope.labels.push(i);
			}
			$scope.labels = $scope.labels;
			$scope.series = ['Series A'];
			$scope.data = [$scope.retGraphData.retGraph];	
		}
})

.controller('invGraphCtrl', function($scope, $state, $rootScope, $ionicNavBarDelegate, fnaservice, $ionicModal, $stateParams) { // Add a simple controller

		var CurrentDate = new Date();
		var setDate = CurrentDate.setMonth(CurrentDate.getMonth());
		var date = new Date(setDate).getMonth()+1;
		$scope.data= {};
		$scope.saveFnaInv = {};
		$scope.invData = {};
	 	$scope.data.ActionDate = CurrentDate.getFullYear()  + '/' + date + '/' + CurrentDate.getDate();
		$scope.data.ProcessDate = $scope.data.ActionDate;
		$scope.data.Leadno = $stateParams.leadno;
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		
		$scope.saveInv = function(){
			var CurrentDate = new Date();
			var setDate = CurrentDate.setMonth(CurrentDate.getMonth());
			var date = new Date(setDate).getMonth()+1;
			$scope.saveFnaInv.ActionDate = CurrentDate.getFullYear()  + '/' + date + '/' + CurrentDate.getDate();
			$scope.saveFnaInv.Leadno = $stateParams.leadno;
			$scope.saveFnaInv.ConCode = 'INV';
			$scope.saveFnaInv.PriorVal = $stateParams.PriorVal;
			$scope.saveFnaInv.UserId = $scope.userData.UserId; 
			fnaservice.SaveFNAPriority($scope.saveFnaInv).then(function(result) {
				$state.go("app.fna",{'leadno': $stateParams.leadno, 'PriorVal': $stateParams.PriorVal});
			})
		}

		$scope.labels =[];
		$scope.invGraphData = fnaservice.GetInvGraph();
		$scope.leadNo = $stateParams.leadno;
		if($scope.invGraphData){
			$scope.invTFC = $scope.invGraphData.invTFC;
			$scope.invCVF = $scope.invGraphData.invCVF;
			$scope.fbc = $scope.invTFC - $scope.invCVF;
			for(var i=1;i<=$scope.invGraphData.invGraph.length; i++){
				$scope.labels.push(i);
			}
			$scope.labels = $scope.labels;
			$scope.series = ['Series A'];
			$scope.data = [$scope.invGraphData.invGraph];	
		}
	
})
