angular.module('starter.fnaservice', [])
   .service('fnaservice', ['$rootScope', '$q', '$http', 'swordfish_BASE_URL', fnaservice])
	
	function fnaservice($rootScope, $q, $http, swordfish_BASE_URL, $scope) {
	 	
	 	var mem;
	 	var graphCVF;
	 	var tFC;
	 	var invGraph;
	 	var invCVF;
	 	var invTFC;
	 	var proGraph;
	 	var proSumAssured;
	 	var retGraph;
	 	var retSumAssured;

		this.GetFNAPriority = function(userData, leadno, PriorVal){
			var deferred = $q.defer();
			$http({                           
				method : 'GET',                
				url : swordfish_BASE_URL.url + 'api/FNA/GetFNAPriority?priorFNAVal={UserId:"'+userData.UserId+'", Leadno:"'+leadno+'",PriorVal:"'+PriorVal+'"}',
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
			   deferred.resolve(result);
			})
			return deferred.promise;
		}
		
		this.GetContactList = function(data, leadno) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',                
				url : swordfish_BASE_URL.url + 'api/Contact/GetContactList?contactData={UserId:"'+data.UserId+'",Leadno:"'+leadno+'"}',
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.SaveFNAPriority = function(data) {
			var deferred = $q.defer();
			$http({                           
				method : 'POST',                
				url : swordfish_BASE_URL.url + 'api/FNA/SaveFNAPriority?priorFNAData={UserId:"'+data.UserId+'",Leadno:"'+data.Leadno+'",ActionDate:"'+data.ActionDate+'",ConCode:"'+data.ConCode+'",PriorVal:"'+data.PriorVal+'"}',
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}
		   
		this.TotalFutureCost = function(data) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',                
				url : swordfish_BASE_URL.url + 'api/FNA/FNACalc?calcuData={Rate:'+data.Rate+',Amt:'+data.Amt+',NPer:'+data.NPer+'}',
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.AmountSumAssured = function(data) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',                
				url : swordfish_BASE_URL.url + 'api/FNA/FNACalc?calcuData={Rate:'+data.Rate+',Amt:'+data.Amt+',NPer:'+data.NPer+'}',
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.SaveEducationFNA = function(data, userData) {
			var deferred = $q.defer();
			$http({                           
				method : 'POST',                
				url : swordfish_BASE_URL.url + 'api/FNA/SaveEducationFNA?eduData={ActionDate:"'+data.ActionDate+'",Leadno:"'+data.Leadno+'",AnnualCost:"'+data.AnnualCost+'",ChildAge:"'+data.ChildAge+'",EductionEntryAge:"'+data.EductionEntryAge+'",AmountInvested:"'+data.AmountInvested+'",InflationRate:"'+data.InflationRate+'",TotalFutureCost:"'+data.TotalFutureCost+'",AmountSumAssured:"'+data.AmountSumAssured+'",NoofYearInEducation:"'+data.NoofYearInEducation+'",AnnualAverageRoi:"'+data.AnnualAverageRoi+'",ProcessDate:"'+data.ProcessDate+'",UserID:"'+userData.UserId+'",LevelNo:"'+data.LevelNo+'"}',
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.SaveInvestmentFNA = function(data) {
			var deferred = $q.defer();
			$http({                           
				method : 'POST',                
				url : swordfish_BASE_URL.url + 'api/FNA/SaveInvestmentFNA?invData={ActionDate:"'+data.ActionDate+'", Leadno:"'+data.Leadno+'", Age:"'+data.Age+'", AttainAge:"'+data.AttainAge+'", PresentAmount:"'+data.PresentAmount+'", InflationRate:"'+data.InflationRate+'" , AnnualAverageRoi:"'+data.AnnualAverageRoi+'", AmountInvested:"'+data.AmountInvested+'", FutureCost:"'+data.FutureCost+'", AmountSumAssured:"'+data.AmountSumAssured+'",ProcessDate:"'+data.ProcessDate+'", UserID:"0005991.6"}',
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.SaveProtectionFNA = function(data) {
			var deferred = $q.defer();
			$http({                           
				method : 'POST',                
				url : swordfish_BASE_URL.url + '/api/FNA/SaveProtectionFNA?proData={ActionDate:"'+data.ActionDate+'", Leadno:"'+data.Leadno+'", AmountPercentageFamilyIncome:"'+data.AmountPercentageFamilyIncome+'", ComfortYears:"'+data.ComfortYears+'", AnnualAverageRoi:"'+data.AnnualAverageRoi+'",AmountSumAssured:"'+data.AmountSumAssured+'", ProcessDate:"'+data.ProcessDate+'", UserID:"'+data.UserID+'"}',
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.proAmountSumAssured = function(data) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',                
				url : swordfish_BASE_URL.url + 'api/FNA/FNAPV?calcuPVData={Rate:"'+data.Rate+'",Amt:"'+data.Amt+'",NPer:"'+data.NPer+'"}',
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.SaveRetirementFNA = function(data) {
			var deferred = $q.defer();
			$http({                           
				method : 'POST',                
				url : swordfish_BASE_URL.url + '/api/FNA/SaveRetirementFNA?retData={ActionDate:"'+data.ActionDate+'", Leadno:"'+data.Leadno+'", CurrentAnnualIncome:"'+data.CurrentAnnualIncome+'", Age:"'+data.Age+'", RetirementAge:"'+data.RetirementAge+'", LifeExpentancy:"'+data.LifeExpentancy+'" , InflationRate:"'+data.InflationRate+'", AmountSumAssured:"'+data.AmountSumAssured+'",AnnualAverageRoi:"'+data.AnnualAverageRoi+'", ProcessDate:"'+data.ProcessDate+'", UserID:"'+data.UserID+'"}',
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.InitGraph = function() {
			var mem;
			var graphCVF;
			var tFC; 
		}

		this.SaveGraph = function(data, currentValueInFuture, tFc) {
			 mem = data;
			 graphCVF = currentValueInFuture;
			 tFC = tFc;
			 return 'success'
		}

		this.GetGraph = function() {
			return {
				mem: mem,
				graphCVF: graphCVF,
				tFC: tFC
			};
		}

		this.SaveInvGraph = function(data, tFC ,currentValueInFuture ) {
			invGraph = data;
			invCVF = currentValueInFuture
			invTFC = tFC
			return 'success'
		}

		this.GetInvGraph = function() {
			return {
				invGraph:invGraph,
				invCVF:invCVF,
				invTFC:invTFC
			};
		}

		this.SaveProGraph = function(data, sumAssured) {
			 proGraph = data;
			 proSumAssured = sumAssured;
			 return 'success'
		}

		this.GetProGraph = function() {
			return {
				proGraph: proGraph,
				proSumAssured: proSumAssured 
			};
		}

		this.SaveRetGraph = function(data, sumAssured) {
			 retGraph = data;
			 retSumAssured = sumAssured;
			 return 'success'
		}

		this.GetRetGraph = function() {
			return {
				retGraph: retGraph,
				retSumAssured: retSumAssured 
			}; 
		}	
	} 