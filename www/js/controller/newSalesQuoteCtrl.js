angular.module('starter.newSalesQuoteCtrl', [])

.controller('newSalesQuoteCtrl', function($scope, $state, $ionicNavBarDelegate, newSalesQuoteservice, $ionicModal, $stateParams ) {
	
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		newSalesQuoteservice.GetContactList($scope.userData.UserId, $stateParams.leadno).then(function(contactList){
			$scope.contactDetail = angular.fromJson(contactList.replace( /\'/g, "\""));
		})

		var date = new Date();
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.idrCurrency = [];
		$scope.usdCurrency = [];
		$scope.allCurrency = [];
		$scope.salesCurrency = {};
		$scope.basicPlan = {};
		$scope.data = {};
		$scope.data.TimeStamp = date.getFullYear()  + '-' + date.getMonth() + '-' + date.getDate() + '-' + date.getHours()+ ':' + date.getMinutes()+ ':' + date.getSeconds();
		$scope.data.LoginId = $scope.userData.UserId;
		$scope.data.EffectiveDate = date.getFullYear()  + '-' + date.getMonth() + '-' + date.getDate();
		
		$scope.updateBox = function(editData){
			var planCode = JSON.parse(editData)
			$state.go('app.salesQuoteInsuredNew',{'leadno': $stateParams.leadno, "proId": planCode.basicPlanCode});
		}

		function sorting(json_object, key_to_sort_by) {
		    function sortByKey(a, b) {
		        var x = a[key_to_sort_by];
		        var y = b[key_to_sort_by];
		        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		    }
		    json_object.sort(sortByKey);
		}

		newSalesQuoteservice.getBasicPlan($scope.data).then(function(result) {
			if(result != null){
				$scope.basicPlan = angular.fromJson( result.replace( /\'/g, "\""));
				$scope.allCurrency = sorting($scope.basicPlan, 'basicPlanName');
				for(var i=0; i<$scope.basicPlan.length; i++){
					$scope.allCurrency = $scope.basicPlan;
					if($scope.basicPlan[i].basicPlanCurrency == "IDR"){
						$scope.idrCurrency.push($scope.basicPlan[i]);
					}else{
						$scope.usdCurrency.push($scope.basicPlan[i]);
					}
				}
			} 
		})

		$scope.getAll = function(data){
			$scope.basicPlan = $scope.basicPlan
		}	 
		
		$scope.getUsd = function(data){
			$scope.basicPlan = $scope.usdCurrency;
		}

		$scope.getIdr = function(data){
			$scope.basicPlan = $scope.idrCurrency;
		}
})

.controller('salesQuoteInsuredNewCtrl', function($scope, $state, $ionicHistory, $ionicNavBarDelegate, $ionicModal, $stateParams, newSalesQuoteservice) {
	
	$scope.$on("$ionicView.enter", function(event, data){
		var CurrentDate = new Date();
		var setDate = CurrentDate.setMonth(CurrentDate.getMonth());
		var date = new Date(setDate).getMonth()+1;

		$scope.salesDetail = {};
		$scope.checked = true;
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));

		newSalesQuoteservice.updateContact($scope.userData, $stateParams.leadno).then(function(updateData){
			$scope.users = angular.fromJson(updateData.replace( /\'/g, "\""));
			$scope.users.BirthdDate = new Date($scope.users.BirthdDate);
		})

		$scope.saleQuoteFor = 'Select';
		newSalesQuoteservice.getRelation('RELATION').then(function(relationData){
			$scope.relation = angular.fromJson(relationData.replace( /\'/g, "\""));
		})

		$scope.changeQuotePrior = function(saleQuoteFor){
			if(saleQuoteFor == 'select'){
				$scope.checked = true;
			}else{
				$scope.checked = false;
			}
		} 

		$scope.myGoBack = function() {
		    $ionicHistory.goBack();
		}

		$scope.continue = function(saleQuoteFor){
			$scope.relation = JSON.parse(saleQuoteFor);
			newSalesQuoteservice.continueBasicPlan($scope.userData.UserId, $stateParams.proId ).then(function(result) {
				$scope.sales = JSON.parse(result);
				$scope.salesDetail.UserId = $scope.userData.UserId;
				$scope.salesDetail.ModifyDate = CurrentDate.getFullYear()  + '-' + date + '-' + CurrentDate.getDate();
				$scope.salesDetail.ProposalStateDate = $scope.salesDetail.ModifyDate;
				$scope.salesDetail.EntryDate = $scope.salesDetail.ModifyDate;                                
				$scope.salesDetail.TransactionDate = $scope.salesDetail.ModifyDate;
				$scope.salesDetail.ProductCode = $stateParams.proId;
				$scope.salesDetail.Leadno = $stateParams.leadno;
				$scope.salesDetail.ProductName = $scope.sales[0].basicPlanName;

				newSalesQuoteservice.saveSaleQuoteDetail($scope.salesDetail).then(function(result) {
					$scope.proId = result;
					newSalesQuoteservice.saveBasicPlan($scope.sales, $scope.userData.UserId, $stateParams.leadno, result).then(function(result) {
						$state.go("app.salesQuoteInsuredPolicyHolder",{'leadno': $stateParams.leadno,"proId": $scope.proId, 'relation':$scope.relation.Name, 'relationCode':$scope.relation.Code}); 
					})
				})
			})
		   
		}
	});
})

.controller('salesQuoteInsuredPolicyCtrl', function($scope, $ionicHistory, $state,$ionicPopup, $ionicNavBarDelegate, $ionicModal, $stateParams, $filter, newSalesQuoteservice, sharedService) {
	
	$scope.$on("$ionicView.enter", function(event, data){

		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		var CurrentDate = new Date();
		var setDate = CurrentDate.setMonth(CurrentDate.getMonth());
		var date = new Date(setDate).getMonth()+1;

		$scope.policyHolder = {};
		$scope.relation = $stateParams.relation;
		$scope.data1 = {};
		$scope.data1.policyHolderBirthdDate = new Date();
		$scope.policyHolderAge = 0;
		$scope.data = {};
		$scope.occupationClass = {};
		$scope.occupationClass.insured = "CLSS1";
		$scope.occupationClass.policy = "CLSS1";

		newSalesQuoteservice.GetSalesQuoteDetail($stateParams.proId).then(function(quoteDetail){
			$scope.quoteDetail = angular.fromJson(quoteDetail.replace( /\'/g, "\""));
			$scope.quoteDetail.ProposalStateDate = new Date($scope.quoteDetail[0].ProposalStateDate.slice(0,9));

			newSalesQuoteservice.GetContactList($scope.userData.UserId, $stateParams.leadno).then(function(contactList){
				$scope.contactDetail = angular.fromJson(contactList.replace( /\'/g, "\""));
				$scope.data.contactBirthdDate = new Date($scope.contactDetail[0].BirthdDate);
				if($scope.contactDetail[0].Gender == 'Female'){
					$scope.contactDetail[0].Gender = 'F'
				}else{
					$scope.contactDetail[0].Gender = 'M'
				}
				init($scope.data.contactBirthdDate, 'P');
				if($stateParams.relation == "Self"){
					
					$scope.policyHolder = $scope.contactDetail[0];
					$scope.data1.policyHolderBirthdDate = new Date($scope.policyHolder.BirthdDate);

					var date = new Date($scope.data1.policyHolderBirthdDate);
					date = date.getFullYear()  + '-' + date.getMonth() + '-' + date.getDate();

					newSalesQuoteservice.ageCalc(date, $scope.quoteDetail[0].ProposalStateDate, 'L').then(function(age){
					   $scope.policyHolderAge = age;
					   sharedService.setPolicyHolderAge($scope.policyHolderAge);
					})
				}
			})
		}) 

		newSalesQuoteservice.getPlanBasicDetail($scope.userData.UserId, $stateParams.leadno, $stateParams.proId).then(function(planBasic){
			$scope.planBasic = angular.fromJson(planBasic.replace( /\'/g, "\""));
		})

		function init(contactDetail, type){
			var CurrentDate = new Date(contactDetail);
			var setDate = CurrentDate.setMonth(CurrentDate.getMonth());
			var bDate = new Date(setDate).getMonth()+1;
			var newdate = CurrentDate.getFullYear()  + '-' + bDate + '-' + CurrentDate.getDate();

			newSalesQuoteservice.ageCalc(newdate, $scope.quoteDetail[0].ProposalStateDate, type).then(function(age){
			   $scope.insuredAge = age;
			   sharedService.insuredHolderAge($scope.insuredAge);
			})
		};

		$scope.ageCalc = function(contactDetail, type){ 
 			var date = new Date(contactDetail);
			var setDate = date.setMonth(date.getMonth());
			var cDate = new Date(setDate).getMonth()+1;
			var newdate = date.getFullYear()  + '-' + cDate + '-' + date.getDate();
			newSalesQuoteservice.ageCalc(newdate, $scope.quoteDetail[0].ProposalStateDate, type).then(function(age){ 
				if(type == 'P'){
					$scope.insuredAge = age;
					sharedService.insuredHolderAge($scope.insuredAge);
				}else{
					$scope.policyHolderAge = age;
					sharedService.setPolicyHolderAge($scope.policyHolderAge);
				}
			})
		};

		$scope.propDeatil = $stateParams.proId.replace(/'/g,''); 
		newSalesQuoteservice.getInsuredPolicyHolderDetail($scope.propDeatil, $scope.userData.UserId).then(function(policyHolderDetail){

			$scope.policyHolderDetail = angular.fromJson(policyHolderDetail.replace( /\'/g, "\""));
			if($scope.policyHolderDetail.length > 0){
				$scope.policyHolder.ContactName = $scope.policyHolderDetail[1].Name;
				$scope.policyHolderAge = $scope.policyHolderDetail[1].Age;
				$scope.data1.policyHolderBirthdDate= new Date($scope.policyHolderDetail[1].BirthDate);
				$scope.policyHolder.Gender = $scope.policyHolderDetail[1].Gender;
				$scope.occupationClass.policy = $scope.policyHolderDetail[1].OccupationClass;
			} 
		})

		$scope.myGoBack = function() {
		    $ionicHistory.goBack();
		}
		
		$scope.save = function(){  

			var insuredPolicyHolder = {
					Category: 'L', 
					ModifyDate: CurrentDate.getFullYear()  + '-' + date + '-' + CurrentDate.getDate(),
					Age: $scope.policyHolderAge,
					LifeNo: 'L1',
					OccupationClass : $scope.occupationClass.insured,
					Name: $scope.policyHolder.ContactName,
					BirthDate: $scope.data.contactBirthdDate.toISOString().slice(0,10), 
					Gender: $scope.policyHolder.Gender,
					DelivaryDate: CurrentDate.getFullYear()  + '-' + date + '-' + CurrentDate.getDate(),
					PropDetailId: $stateParams.proId, 
					UserId: $scope.userData.UserId,
					Actval:'Policy'
				}

			if($scope.policyHolderAge >= $scope.planBasic[0].PolHoderMinAge && $scope.policyHolderAge <= $scope.planBasic[0].PolHoderMaxAge){ 
				
				var policyHolder = {
					Category: 'L', 
					ModifyDate: CurrentDate.getFullYear()  + '-' + date + '-' + CurrentDate.getDate(),
					Age: $scope.policyHolderAge,
					LifeNo: 'L1',
					RelationCode: $stateParams.relationCode,
					OccupationClass : $scope.occupationClass.policy,
					Name: $scope.policyHolder.ContactName,
					BirthDate: $scope.data1.policyHolderBirthdDate.toISOString().slice(0, 10), 
					Gender: $scope.policyHolder.Gender,
					DelivaryDate: CurrentDate.getFullYear()  + '-' + date + '-' + CurrentDate.getDate(),
					PropDetailId: $stateParams.proId, 
					UserId: $scope.userData.UserId,
					Actval:'Policy'
				}

				newSalesQuoteservice.postInsuredPolicyHolder(policyHolder).then(function(planBasic){
					
					var insuredHolder = {
						Category: 'P', 
						ModifyDate: CurrentDate.getFullYear()  + '-' + date + '-' + CurrentDate.getDate(),
						Age: $scope.insuredAge,
						LifeNo: 'P1',
						RelationCode: $stateParams.relationCode,
						OccupationClass : $scope.occupationClass.insured,
						Name: $scope.contactDetail[0].ContactName,
						BirthDate: $scope.data.contactBirthdDate.toISOString().slice(0,10), 
						Gender: $scope.contactDetail[0].Gender,
						DelivaryDate: CurrentDate.getFullYear()  + '-' + date + '-' + CurrentDate.getDate(),
						PropDetailId: $stateParams.proId, 
						UserId: $scope.userData.UserId,
						Actval:'Insured'
					}

					newSalesQuoteservice.postInsuredPolicyHolder(insuredHolder).then(function(planBasic){
						$state.go("app.salesQuoteBasicPlan",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation, 'relationCode':$stateParams.relationCode}); 
					}) 
				}) 
			}else{
				var alertPopup = $ionicPopup.alert({
					title: 'Sorry, Policy holder age must be between or equal to '+$scope.planBasic[0].PolHoderMinAge+'-'+$scope.planBasic[0].PolHoderMaxAge+' years of age',
					template: 'Please check your data!'
				})  
			}
		}

	});
}) 

.controller('basicplanDetailCtrl', function($scope, $state, $ionicPopup, $ionicHistory, $ionicNavBarDelegate, $ionicModal, $stateParams, $filter, newSalesQuoteservice, sharedService) {
	
	$scope.$on("$ionicView.enter", function(event, data){

		$scope.yearlyRegularPremium = 0;
		$scope.sumAssured =0;
		$scope.insurancePortion =0;
		$scope.regularTopup =0;
		$scope.singleTopup =0;
		$scope.basicPlanPayMethod = {};
		$scope.basicPlanPayMethod.basicPlanPremiumTerm = "0";
		$scope.updateSalesQuote = {};

		var userAge =  {insuredAge: '46',policyHolderAge: '45'}; //sharedService.getAge();
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse')); 

		$scope.propDeatil = $stateParams.proId.replace(/'/g,''); 

		newSalesQuoteservice.getInsuredPolicyHolderDetail($scope.propDeatil, $scope.userData.UserId).then(function(policyHolderDetail){
			$scope.policyHolderDetail = angular.fromJson(policyHolderDetail.replace( /\'/g, "\""));
		})

		newSalesQuoteservice.basicSalesQuoteDetail($stateParams.proId).then(function(result){
			$scope.basicplanDetail = angular.fromJson(result.replace( /\'/g, "\""));
			$scope.basicplanDetail.ProposalStateDate = new Date($scope.basicplanDetail[0].ProposalStateDate.slice(0,9));
			$scope.AnnualPremium = $scope.basicplanDetail[0].AnnualPremium;
			
			/*updateContact Api*/
			newSalesQuoteservice.updateContact($scope.userData, $stateParams.leadno).then(function(updateDataResult){
				$scope.users = angular.fromJson(updateDataResult.replace( /\'/g, "\""));

				$scope.users = $scope.users[0];
				$scope.age = userAge.policyHolderAge
				$scope.gender = $scope.users.Gender;
				
				/*getPlanBasicDetail Api*/ 
				newSalesQuoteservice.getPlanBasicDetail($scope.userData.UserId, $stateParams.leadno, $stateParams.proId).then(function(planBasicResult){
				$scope.newplanBasic = angular.fromJson(planBasicResult.replace( /\'/g, "\""));    

					if($scope.newplanBasic[0].ProductCatergory == 'ILP' || $scope.newplanBasic[0].ProductCatergory == 'HB'){
						$scope.basicRegularPremuim = true;
						$scope.basicInsuranceField = true;
						$scope.baiscSingleTopup = true;
						$scope.basicPlamSum = true;
						
						if ($scope.newplanBasic[0].SinglePremInd == '0') {
							$scope.basicRegularTopup = true;	
						} else {
							$scope.basicRegularTopup = false;
						}
						

					} else{
						$scope.basicPlamSum = true;
						$scope.basicRegularPremuim = false;
						$scope.insuranceField = false;
						$scope.basicRegularTopup = false;
						$scope.baiscSingleTopup = false;
						$scope.sumAssuredBasic = {};
						var dateData = new Date();
						$scope.sumAssuredBasic.TimeStamp = dateData.toISOString().slice(0,23);
						$scope.sumAssuredBasic.Gender = $scope.gender;
						$scope.sumAssuredBasic.AnnualPremium = 0;
						$scope.sumAssuredBasic.CommencementDate = $scope.sumAssuredBasic.TimeStamp;
						$scope.sumAssuredBasic.PlanCode = $scope.newplanBasic[0].BasicPlanCode;
						$scope.sumAssuredBasic.InsuredAge = userAge.insuredAge;
						$scope.sumAssuredBasic.PolicyHolderAge = userAge.policyHolderAge;
						$scope.sumAssuredBasic.CPlanCode = $scope.newplanBasic[0].BasicPlanCode;
						$scope.sumAssuredBasic.PremiumPaymentTerm = $scope.basicPlanPayMethod.basicPlanPremiumTerm;                     
						/*SumAssuredBasicPlanTermList Api*/
						newSalesQuoteservice.getSumAssuredBasicPlanTermList($scope.sumAssuredBasic, $scope.userData.UserId).then(function(PremiumTermResult){
							$scope.sumAssuredBasicPlan = angular.fromJson(PremiumTermResult.replace( /\'/g, "\""));
							$scope.insurancePortion = $scope.sumAssuredBasic.AnnualPremium;
							$scope.sumAssured = $scope.sumAssuredBasicPlan[0].saFrom;
						})
					}
					

					$scope.premiumModeData = {};
					var dateData = new Date();
					$scope.premiumModeData.basicPlanCode = $scope.newplanBasic[0].BasicPlanCode;
					$scope.premiumModeData.timeStamp = dateData.toISOString().slice(0,23); 
					$scope.premiumModeData.commDate = $scope.premiumModeData.timeStamp;
					$scope.premiumModeData.gender = $scope.gender;
					$scope.premiumModeData.age = userAge.policyHolderAge;
					/*PremiumMode Api*/ 

					newSalesQuoteservice.getRiderPlanPremiumMode($scope.premiumModeData, $scope.userData.UserId).then(function(PremiumModeResult){
						$scope.premiumMode = angular.fromJson(PremiumModeResult.replace( /\'/g, "\""));
						$scope.premiumTermData = {};
						var dateData = new Date();
						$scope.premiumTermData.timestamp = dateData.toISOString().slice(0,23);
						$scope.premiumTermData.gender = $scope.gender;
						$scope.premiumTermData.annualpremium = $scope.AnnualPremium;
						$scope.premiumTermData.commencementDate = $scope.premiumTermData.timestamp
						$scope.premiumTermData.planCode = $scope.newplanBasic[0].BasicPlanCode;
						$scope.premiumTermData.insuredAge = userAge.insuredAge;
						$scope.premiumTermData.policyHolderAge = userAge.policyHolderAge;
						$scope.premiumTermData.cplanCode = $scope.premiumTermData.planCode;
						$scope.premiumTermData.RelationCode = $stateParams.relationCode;
						/*PremiumTerm Api*/ 

						newSalesQuoteservice.getBasicPremiumTerm($scope.premiumTermData, $scope.userData.UserId).then(function(PremiumTermResult){
						$scope.premiumTerm = angular.fromJson(PremiumTermResult.replace( /\'/g, "\""));
							$scope.beneficialTermData = {};
							var dateData = new Date();
							$scope.beneficialTermData.timeStamp = dateData.toISOString().slice(0,23); 
							$scope.beneficialTermData.Gender = $scope.gender;
							$scope.beneficialTermData.Annualpremium = $scope.AnnualPremium;
							$scope.beneficialTermData.CommencementDate = $scope.beneficialTermData.timeStamp;
							$scope.beneficialTermData.PlanCode = $scope.newplanBasic[0].BasicPlanCode;
							$scope.beneficialTermData.InsuredAge = userAge.insuredAge;
							$scope.beneficialTermData.PolicyHolderAge = userAge.policyHolderAge;
							$scope.beneficialTermData.CplanCode = $scope.newplanBasic[0].BasicPlanCode;
							$scope.beneficialTermData.RelationCode = $stateParams.relationCode;
							/*BeneficialTerm Api*/ 

							newSalesQuoteservice.getBasicBeneficialTerm($scope.beneficialTermData, $scope.userData.UserId).then(function(BeneficialTermResult){
							$scope.beneficialTerm = angular.fromJson(BeneficialTermResult.replace( /\'/g, "\""));
								$scope.premiumMethodData = {};
								var dateData = new Date();
								$scope.premiumMethodData.timestamp = dateData.toISOString().slice(0,23);
								$scope.premiumMethodData.basicPlanCode = $scope.newplanBasic[0].BasicPlanCode;
								$scope.premiumMethodData.commDate = $scope.premiumMethodData.timestamp
								$scope.premiumMethodData.age = userAge.policyHolderAge;
								$scope.premiumMethodData.gender = $scope.gender;
								 /*PremiumMethod Api*/

								$scope.premiumMethod = {
									"RN": "CASH / CHEQUE",
									"ADBCA": "AUTO DEBIT BCA",
									"CC": "CREDIT CARD",
									"TRF": "ATM / TRANSFER / EDC",
									"AP": "ADVANCE PAYMENT",
									"ADBNI": "AUTO DEBIT BNI",
									"ADCIMB": "AUTO DEBIT CIMB NIAGA",
									"ADMANDIRI": "AUTO DEBIT MANDIRI",
									"BSI": "BSI",
									"BSIANZ": "BANK STANDING INSTRUCTION ANZ",
									"BSIBII":"BANK STANDING INSTRUCTION BII",
									"BSIBPD":"BANK STANDING INSTRUCTION BPD",
									"BSIBPR": "BANK STANDING INSTRUCTION BPR",
									"BSIBRI": "BANK STANDING INSTRUCTION BRI",
									"BSIMEGA":"BANK STANDING INSTRUCTION MEGA"

								} 

								$scope.coverageTermData = {};
								var dateData = new Date();
								$scope.coverageTermData.TimeStamp = dateData.toISOString().slice(0,23);
								$scope.coverageTermData.Gender = $scope.gender;
								$scope.coverageTermData.AnnualPremium = $scope.AnnualPremium;
								$scope.coverageTermData.CommencementDate = $scope.coverageTermData.TimeStamp
								$scope.coverageTermData.PlanCode = $scope.newplanBasic[0].BasicPlanCode;
								$scope.coverageTermData.InsuredAge = userAge.insuredAge;
								$scope.coverageTermData.PolicyHolderAge = userAge.policyHolderAge;
								$scope.coverageTermData.CPlanCode = $scope.newplanBasic[0].BasicPlanCode;

								/*getBasicCoverageTerm Api*/
								newSalesQuoteservice.getBasicCoverageTerm($scope.coverageTermData, $scope.userData.UserId).then(function(CoverageTermResult){
									$scope.coverageTerm = angular.fromJson(CoverageTermResult.replace( /\'/g, "\""));
								})

								var productId = $stateParams.proId.replace(/'/g,'');
								$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
							})    
						})
					}) 
				})     
			})
		})

		$scope.myGoBack = function() {
		    $ionicHistory.goBack();
		}

		$scope.yrpCalc = function(yearlyRegularPremium){

			$scope.sumAssuredBasic = {};
			var dateData = new Date();
			$scope.sumAssuredBasic.TimeStamp = dateData.toISOString().slice(0,23);
			$scope.sumAssuredBasic.Gender = $scope.gender;
			$scope.sumAssuredBasic.AnnualPremium = yearlyRegularPremium;
			$scope.sumAssuredBasic.CommencementDate = $scope.sumAssuredBasic.TimeStamp;
			$scope.sumAssuredBasic.PlanCode = $scope.newplanBasic[0].BasicPlanCode;
			$scope.sumAssuredBasic.InsuredAge = userAge.insuredAge;
			$scope.sumAssuredBasic.PolicyHolderAge = userAge.policyHolderAge;
			$scope.sumAssuredBasic.CPlanCode = $scope.newplanBasic[0].BasicPlanCode;
			$scope.sumAssuredBasic.PremiumPaymentTerm = 0;                     
			$scope.sumAssuredBasic.RelationCode = $stateParams.relationCode;

			/*SumAssuredBasicPlanTermList Api*/
			newSalesQuoteservice.getSumAssuredBasicPlanTermList($scope.sumAssuredBasic, $scope.userData.UserId).then(function(PremiumTermResult){
				$scope.sumAssuredBasicPlan = angular.fromJson(PremiumTermResult.replace( /\'/g, "\""));
				$scope.insurancePortion = $scope.sumAssuredBasic.AnnualPremium;
				$scope.sumAssured = $scope.sumAssuredBasicPlan[0].saFrom;
			})
		}

		$scope.premiumTermCalc = function(premiumTerm){

			$scope.sumAssuredBasic = {};
			var dateData = new Date();
			$scope.sumAssuredBasic.TimeStamp = dateData.toISOString().slice(0,23);
			$scope.sumAssuredBasic.Gender = $scope.gender;
			$scope.sumAssuredBasic.AnnualPremium = $scope.insurancePortion;
			$scope.sumAssuredBasic.CommencementDate = $scope.sumAssuredBasic.TimeStamp
			$scope.sumAssuredBasic.PlanCode = $scope.newplanBasic[0].BasicPlanCode;
			$scope.sumAssuredBasic.InsuredAge = userAge.insuredAge;
			$scope.sumAssuredBasic.PolicyHolderAge = userAge.policyHolderAge;
			$scope.sumAssuredBasic.CPlanCode = $scope.newplanBasic[0].BasicPlanCode; 
			$scope.sumAssuredBasic.PremiumPaymentTerm = premiumTerm;                     
			/*SumAssuredBasicPlanTermList Api*/
			newSalesQuoteservice.getSumAssuredBasicPlanTermList($scope.sumAssuredBasic, $scope.userData.UserId).then(function(PremiumTermResult){
				$scope.sumAssuredBasicPlan = angular.fromJson(PremiumTermResult.replace( /\'/g, "\""));
			})
		}
		
		$scope.saveBasicPlan = function(){

			var salesDate = new Date(); 
			$scope.fundCode ={};
			$scope.updateSalesQuote.ModifyDate = salesDate.toISOString().slice(0,23);
			$scope.updateSalesQuote.Id = $stateParams.proId.replace(/'/g,'');
			$scope.updateSalesQuote.AnnualPremium = 0;
			$scope.updateSalesQuote.AnnualSingleTOPUP = 0;
			$scope.updateSalesQuote.AnnualZPremium = 0;
			$scope.updateSalesQuote.CorpPRDiscount = 0;
			$scope.updateSalesQuote.CovTerm = $scope.basicPlanPayMethod.CoverageTerm;
			$scope.updateSalesQuote.BenTerm = $scope.basicPlanPayMethod.benefitterm;
			$scope.updateSalesQuote.EntryDate = salesDate.toISOString().slice(0,23);
			$scope.updateSalesQuote.MortDeferYR = salesDate.getFullYear();
			$scope.updateSalesQuote.PremiumTerm = $scope.basicPlanPayMethod.basicPlanPremiumTerm;
			$scope.updateSalesQuote.PremiumMethod = $scope.basicPlanPayMethod.premiummethod;
			$scope.updateSalesQuote.PremiumMode = $scope.basicPlanPayMethod.premiumMode;
			$scope.updateSalesQuote.ProductCode = $scope.newplanBasic[0].BasicPlanCode;
			$scope.updateSalesQuote.TransactionDate = salesDate.toISOString().slice(0,23);
			$scope.updateSalesQuote.UserId = $scope.userData.UserId; 
			$scope.updateSalesQuote.SumAssuredFrom = $scope.sumAssuredBasicPlan[0].saFrom;
			$scope.updateSalesQuote.SumAssuredTo = $scope.sumAssuredBasicPlan[0].saTo; 

			if($scope.newplanBasic[0].ProductCatergory == 'ILP' || $scope.newplanBasic[0].ProductCatergory == 'HB'){
				if($scope.newplanBasic[0].SinglePremInd == 0){
					$scope.updateSalesQuote.AnnualSCHTopup = Math.ceil($scope.regularTopup);
					$scope.updateSalesQuote.AnnualTP = Math.ceil($scope.insurancePortion);
					$scope.updateSalesQuote.CoverUnit = Math.ceil($scope.sumAssured);
					$scope.updateSalesQuote.GrossAnnualPremium = 0;
				}else{
					$scope.updateSalesQuote.AnnualSCHTopup = 0;
					$scope.updateSalesQuote.AnnualTP = 0;
					$scope.updateSalesQuote.CoverUnit = Math.ceil($scope.sumAssured);
					$scope.updateSalesQuote.GrossAnnualPremium = Math.ceil($scope.insurancePortion);
				}
			}else{
				$scope.updateSalesQuote.AnnualSCHTopup = 0;
				$scope.updateSalesQuote.AnnualTP = 0;
				$scope.updateSalesQuote.CoverUnit = Math.ceil($scope.sumAssured);
				$scope.updateSalesQuote.GrossAnnualPremium = 0;
			}
			newSalesQuoteservice.UpdateSalesQuoteDetail($scope.updateSalesQuote, $scope.userData.UserId).then(function(result){

				if($scope.editquotesDetail && $scope.editquotesDetail.length > 0){
					$state.go("app.salesQuoteCoverage",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation});
				}else{
					if($scope.newplanBasic[0].ProductCatergory == 'ILP' || $scope.newplanBasic[0].ProductCatergory == 'HB'){
						$scope.saveQuotesDetail = angular.fromJson(result.replace( /\'/g, "\"")); 
						$scope.fundCode.TimeStamp = salesDate.toISOString().slice(0,23);
						$scope.fundCode.HierDate = salesDate.toISOString().slice(0,23);
						$scope.fundCode.BasicPlanCode = $scope.newplanBasic[0].BasicPlanCode;
						$scope.fundCode.LifeNo = $scope.policyHolderDetail[0].LifeNo;
						$scope.fundCode.CommDate = salesDate.toISOString().slice(0,23);
						$scope.fundCode.Age = $scope.policyHolderDetail[0].Age;
						$scope.fundCode.Gender = $scope.policyHolderDetail[0].Gender;

						newSalesQuoteservice.getFundCode($scope.fundCode, $scope.userData.UserId).then(function(result){
							$scope.saveFund = angular.fromJson(result.replace( /\'/g, "\""));
							$scope.basicSaveFund = {};
							$scope.basicSaveFund.ModifyDate = salesDate.toISOString().slice(0, 23);
							$scope.basicSaveFund.ProposalId = $stateParams.proId.replace(/'/g,'');
							$scope.basicSaveFund.UserId = $scope.userData.UserId
							
							for(var i=0; i<$scope.saveFund.length; i++){
								$scope.basicSaveFund.FundType = $scope.saveFund[i].fundCode;
								newSalesQuoteservice.saveFundType($scope.basicSaveFund).then(function(result){
									if($scope.saveFund.length == i){
										$state.go("app.salesQuoteInsuredFund",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation, 'fundId':'0'});
									}
								})
							}
						})
					}else{
						$state.go("app.salesQuoteCoverage",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation});
					}
				}
			})
		} 
	});
})


.controller('salesQuoteCoverage', function($scope, $state, $ionicHistory, $ionicPopup, $ionicNavBarDelegate, $ionicModal, $stateParams, $filter, newSalesQuoteservice, sharedService) {
	
	$scope.$on("$ionicView.enter", function(event, data){

		$scope.update = {};
		var updateCov = new Date();
		var productId = $stateParams.proId.replace(/'/g,'');
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.coverageFundData = false;
		$scope.coverageTopUpData = false;

		newSalesQuoteservice.getCoveragePlanDetail(productId, $scope.userData.UserId).then(function(result){
			$scope.quotesDetail = angular.fromJson(result.replace( /\'/g, "\"")); 
			var date  = $scope.quotesDetail[0].QuoteDate;
			$scope.quotesDetail[0].QuoteDate = date.slice(0,9)
			if($scope.quotesDetail[0].PlanCat == 'ILP' || $scope.quotesDetail[0].PlanCat == 'HB'){
				$scope.coverageFundData = true;
				$scope.coverageTopUpData = true;
				newSalesQuoteservice.getFundDetail(productId, $scope.userData.UserId).then(function(result){
					$scope.fundDetail = angular.fromJson(result.replace( /\'/g, "\""));
				}) 

				newSalesQuoteservice.getTopUp(productId).then(function(result){
					$scope.topUpDetail = angular.fromJson(result.replace( /\'/g, "\""));
				})
			}
			else{
				$scope.coverageFundData = false;
				$scope.coverageTopUpData = false;
			}
		})

		$scope.editCoverage = function(){
			$state.go("app.salesQuoteEditBasicPlan",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation});
		}

		$scope.addFund= function(){
			$state.go("app.salesQuoteInsuredFund",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation, 'fundId':'0'});
		}

		$scope.editFund= function(fund){
			$state.go("app.salesQuoteInsuredEditFund",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation, 'fundId':fund});
		}

		$scope.addTopup = function(){
			$state.go("app.salesCoverageTopupPlan",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation, 'case':'add'});
		}

		$scope.editTopUp = function(){
			$state.go("app.salesCoverageTopupPlan",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation, 'case':'edit'});
		}

		$scope.calCovrage = function(){

			newSalesQuoteservice.coverageCalculation($scope.userData.UserId, $stateParams.leadno, $scope.userData.AgentCode, productId, $scope.quotesDetail[0].QuoteNO).then(function(result){
				if(result == null){
					var alertPopup = $ionicPopup.alert({
                        title: 'Fund allocation must be 100',
                        template: 'Please check your data!'
                    })
				}else{
					$scope.calculateCoverage = angular.fromJson(result.replace( /\'/g, "\""));
					var alertPopup = $ionicPopup.alert({
                        title: $scope.calculateCoverage[0].message,
                        template: 'Please check your data!'
                    })	
				}
			})
		}

		$scope.deleteFund = function(event){
			var confirmPopup = $ionicPopup.confirm({
				title: 'Delete event',
				timestamplate: 'Are you sure you want to delete this Fund ?'
			});
			confirmPopup.then(function(res) {
				if(res) {
					newSalesQuoteservice.deleteFund(event.Id).then(function(result) {
						newSalesQuoteservice.getFundDetail(productId, $scope.userData.UserId).then(function(result){
							$scope.fundDetail = angular.fromJson(result.replace( /\'/g, "\""));
						})
					})
				} else { 

				}
			});
		}

		$scope.delTopUp = function(event){
			var confirmPopup = $ionicPopup.confirm({
				title: 'Delete event',
				timestamplate: 'Are you sure you want to delete this Topup ?'
			});

			confirmPopup.then(function(res) {
				if(res) {
					newSalesQuoteservice.deleteTopUp(event).then(function(result) {
						newSalesQuoteservice.getTopUp(productId).then(function(result){
							$scope.topUpDetail = angular.fromJson(result.replace( /\'/g, "\""));
						})
					})
				} else {

				}
			});
		}

		$scope.addCoverage = function(){
			$state.go("app.salesQuoteCoverageRiderPlan",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation});
		}

		$scope.myGoBack = function() {
    		$ionicHistory.goBack();
  		}

		$scope.next = function(){
			if($scope.calculateCoverage && $scope.calculateCoverage[0].code == 'P00001'){
				$state.go("app.salesQuoteSummary",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation});	
			}else{
				var alertPopup = $ionicPopup.alert({
					title: 'Coverage calculation',
					template: 'Coverage Calculation is pending'
				})
			}
		}
	});
})

.controller('basicPlanFundCtrl', function($scope, $state, $ionicHistory, $ionicPopup, $ionicNavBarDelegate, $ionicModal, $stateParams, $filter, newSalesQuoteservice, sharedService) {
	
	$scope.$on("$ionicView.enter", function(event, data){
		
		var fundDate = new Date();
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		var productId = $stateParams.proId.replace(/'/g,'');
		$scope.data = {};
		$scope.data.Allocation = 100;
		$scope.updateFund = {};
		
		newSalesQuoteservice.getCoveragePlanDetail(productId, $scope.userData.UserId).then(function(result){
			$scope.fundPlanCoverageDetail = angular.fromJson(result.replace( /\'/g, "\"")); 
			var date  = $scope.fundPlanCoverageDetail[0].QuoteDate;
			$scope.fundPlanCoverageDetail[0].QuoteDate = date.slice(0,9)
		})

		newSalesQuoteservice.getFundList(productId, $scope.userData.UserId).then(function(result){
			$scope.fundList = angular.fromJson(result.replace( /\'/g, "\""));
		})

		$scope.myGoBack = function() {
    		$ionicHistory.goBack();
  		}

		$scope.save = function(){
			var fundData = JSON.parse($scope.data.fundType);
			if($scope.data.Allocation  >= 1  && $scope.data.Allocation <= 100){
				$scope.updateFund.ModifyDate = fundDate.toISOString().slice(0,23);
				$scope.updateFund.ProposalId = productId;
				$scope.updateFund.FundType = fundData.Code;
				$scope.updateFund.FPERC = $scope.data.Allocation;
				$scope.updateFund.UserId = $scope.userData.UserId;
				if(fundData.Id == 0){
					$scope.updateFund.ActVal = 'A';
					$scope.updateFund.Id = 0;
				}else{
					$scope.updateFund.ActVal = 'U';
					$scope.updateFund.Id = 0;
				}

				newSalesQuoteservice.updateFundType($scope.updateFund).then(function(result){
					$scope.result = angular.fromJson(result.replace( /\'/g, "\""));
					if($scope.result == 1){
						$state.go("app.salesQuoteCoverage",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation});       
					}else{
						var alertPopup = $ionicPopup.alert({
							title: 'Sorry, Fund is already add',
							template: 'Please check your data!'
						}) 
					}
				})
			}else{
				var alertPopup = $ionicPopup.alert({
					title: 'Sorry, Fund value must between 1 to 100.',
					template: 'Please check your data!'
				}) 
			}
		}

	});   
})

.controller('salesQuoteCoverageRider', function($scope, $state, $ionicHistory, $ionicPopup, $ionicNavBarDelegate, $ionicModal, $stateParams, $filter, newSalesQuoteservice, sharedService) {
	
	$scope.$on("$ionicView.enter", function(event, data){

		var riderDate = new Date();
		$scope.getRider = {};
		$scope.addCoverageRider = {}
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.propDeatil = $stateParams.proId.replace(/'/g,''); 
		$scope.data = {};
		$scope.rider ={};
		$scope.rider.l1 = 'L1';

		newSalesQuoteservice.getCoveragePlanDetail($scope.propDeatil, $scope.userData.UserId).then(function(result){
			$scope.quotesDetail = angular.fromJson(result.replace( /\'/g, "\""));
		})

		newSalesQuoteservice.getPlanBasicDetail($scope.userData.UserId, $stateParams.leadno, $stateParams.proId).then(function(planBasicResult){
			$scope.basicPlan = angular.fromJson(planBasicResult.replace( /\'/g, "\""));
			$scope.propDeatil = $stateParams.proId.replace(/'/g,''); 
			newSalesQuoteservice.getInsuredPolicyHolderDetail($scope.propDeatil, $scope.userData.UserId).then(function(policyHolderDetail){
				
				$scope.policyHolderDetail = angular.fromJson(policyHolderDetail.replace( /\'/g, "\""));
				$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
				$scope.getRider.TimeStamp = riderDate.toISOString().slice(0,23);
				$scope.getRider.LoginId = $scope.userData.UserId;
				$scope.getRider.HierDate = riderDate.toISOString().slice(0,23);;
				$scope.getRider.BasicPlanCode = $scope.basicPlan[0].BasicPlanCode;
				$scope.getRider.CommDate = riderDate.toISOString().slice(0,23);
				$scope.getRider.Age = $scope.policyHolderDetail[1].Age;
				$scope.getRider.Gender = $scope.policyHolderDetail[1].Gender;
				newSalesQuoteservice.getCoverageRiderPlan($scope.getRider).then(function(riderPlan){
					if(riderPlan == null){
						$scope.riderPlan ={};	
					}else{
						$scope.riderPlan = angular.fromJson(riderPlan.replace( /\'/g, "\""));
					}
				})
			})
		})
		
		$scope.myGoBack = function() {
    		$ionicHistory.goBack();
  		}

		$scope.next = function(data){ 
			var coverage = JSON.parse(data); 
			newSalesQuoteservice.validateRiderPlan(coverage.riderPlanCode, $scope.userData.UserId, $scope.propDeatil).then(function(validatePlan){
				$scope.validateRider = angular.fromJson(validatePlan.replace( /\'/g, "\""));
				if($scope.validateRider[0].code == 'P00001'){
					$state.go("app.salesCoverageRiderBasicPlan",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation, 'planCode':coverage.riderPlanCode,'planName': coverage.riderPlanName, 'lifeNo': $scope.rider.l1});
				}
				else{
					var alertPopup = $ionicPopup.alert({
						title: 'Sorry, rider plan not validate with basic plan',
						template: 'Please check your data!'
					}) 
				}
				 
			})
		}
	});   
})

.controller('salesQuoteCoverageTopup', function($scope, $state, $ionicHistory, $ionicPopup, $ionicNavBarDelegate, $ionicModal, $stateParams, $filter, newSalesQuoteservice, sharedService) {
	
	$scope.$on("$ionicView.enter", function(event, data){

		var topUpDate = new Date();
		$scope.data = {};
		$scope.topUp = [];
		$scope.topUpPlan = {};
		var productId = $stateParams.proId.replace(/'/g,'');
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse')); 
		newSalesQuoteservice.getCoveragePlanDetail(productId, $scope.userData.UserId).then(function(result){
			$scope.fundPlanCoverageDetail = angular.fromJson(result.replace( /\'/g, "\""));   
			for(var i=1;i<=$scope.fundPlanCoverageDetail[0].CoverageTerm; i++){
				$scope.topUp.push(i);
				var date  = $scope.fundPlanCoverageDetail[0].QuoteDate;
				$scope.fundPlanCoverageDetail[0].QuoteDate = date.slice(0,9)
			}
		})

		if($stateParams.case == 'edit'){
			newSalesQuoteservice.getTopUp(productId).then(function(result){
				$scope.topUpEditDetail = angular.fromJson(result.replace( /\'/g, "\""));
				$scope.data.topUp = $scope.topUpEditDetail[0].TOPUPAmount;
				$scope.data.withDraw = $scope.topUpEditDetail[0].WithdrawAmount;
				$scope.data.topYear = $scope.topUpEditDetail[0].YearVal;
			})
		}
		
		/*$scope.back = function(){
			$state.go("app.salesQuoteCoverage",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation});
		}*/
		
		$scope.myGoBack = function() {
    		$ionicHistory.goBack();
  		}

		$scope.save = function(){

			if($stateParams.case == 'edit'){
				$scope.topUpPlan.Id = $scope.topUpEditDetail[0].Id;
			}else{
				$scope.topUpPlan.Id = 0;
			}
			$scope.topUpPlan.ModifyDate = topUpDate.toISOString().slice(0,23);
			$scope.topUpPlan.ProPosalId = productId;
			$scope.topUpPlan.Year = $scope.data.topYear;
			$scope.topUpPlan.TOPUPAmount = $scope.data.topUp;
			$scope.topUpPlan.WithdrawAmount = $scope.data.withDraw;
			$scope.topUpPlan.UserId = $scope.userData.UserId;
			newSalesQuoteservice.saveTopup($scope.topUpPlan).then(function(topUpPlan){
				$scope.topUpPlan = angular.fromJson(topUpPlan.replace( /\'/g, "\""));
				$state.go("app.salesQuoteCoverage",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation});
			})
		}

	});   
})

.controller('basicPlanEditFundCtrl', function($scope, $state, $ionicHistory, $ionicPopup, $ionicNavBarDelegate, $ionicModal, $stateParams, $filter, newSalesQuoteservice, sharedService) {
	
	$scope.$on("$ionicView.enter", function(event, data){
		
		var fundDate = new Date();
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		var productId = $stateParams.proId.replace(/'/g,'');
		$scope.data = {};
		$scope.data.Allocation = 100;
		$scope.updateFund = {};
		
		newSalesQuoteservice.getCoveragePlanDetail(productId, $scope.userData.UserId).then(function(result){
			$scope.fundPlanCoverageDetail = angular.fromJson(result.replace( /\'/g, "\"")); 
			var date  = $scope.fundPlanCoverageDetail[0].QuoteDate;
			$scope.fundPlanCoverageDetail[0].QuoteDate = date.slice(0,9)
		})

		newSalesQuoteservice.getFundList(productId, $scope.userData.UserId).then(function(result){
			$scope.fundList = angular.fromJson(result.replace( /\'/g, "\""));
		}) 
		
		/*$scope.back = function(){
			$state.go("app.salesQuoteCoverage",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation});
		}*/
		$scope.myGoBack = function() {
	    	$ionicHistory.goBack();
	  	}

		$scope.save = function(){

			if($scope.data.Allocation  >= 1  && $scope.data.Allocation <= 100){
				$scope.updateFund.ModifyDate = fundDate.toISOString().slice(0,23);
				$scope.updateFund.ProposalId = productId;
				$scope.updateFund.FundType = $scope.data.fundType;
				$scope.updateFund.FPERC = $scope.data.Allocation;
				$scope.updateFund.UserId = $scope.userData.UserId;
				$scope.updateFund.ActVal = 'U';
				 
				if($stateParams.fundId == 0){
					$scope.updateFund.ActVal = 'A';
					$scope.updateFund.Id = 0;
				}else{
					$scope.updateFund.ActVal = 'U';
					$scope.updateFund.Id = $stateParams.fundId;
				}

				newSalesQuoteservice.updateFundType($scope.updateFund).then(function(result){
					$scope.result = angular.fromJson(result.replace( /\'/g, "\""));
					if($scope.result == 1){
						$state.go("app.salesQuoteCoverage",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation});       
					}else{
						var alertPopup = $ionicPopup.alert({
							title: 'Sorry, Fund is already add',
							template: 'Please check your data!'
						}) 
					}
				})
			}else{
				var alertPopup = $ionicPopup.alert({
					title: 'Sorry, Fund value must between 1 to 100.',
					template: 'Please check your data!'
				}) 
			}
		}

	});
})


.controller('salesCoverageRiderBasicPlanCtrl', function($scope, $state, $ionicHistory, $ionicPopup, $ionicLoading, $ionicNavBarDelegate, $ionicModal, $stateParams, $filter, newSalesQuoteservice, sharedService) {

	$scope.$on("$ionicView.enter", function(event, data){

		var riderDate = new Date();
		$scope.addCoverageRider = {}
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.propDeatil = $stateParams.proId.replace(/'/g,''); 
		$scope.planName = $stateParams.planName;
		$scope.lifeNumber = $stateParams.lifeNo;
		$scope.rider = {};

		newSalesQuoteservice.getCoveragePlanDetail($scope.propDeatil, $scope.userData.UserId).then(function(result){
			if(result == null){

			}else{
				$scope.quotesDetail = angular.fromJson(result.replace( /\'/g, "\""));
				var date  = $scope.quotesDetail[0].QuoteDate;
				$scope.quotesDetail[0].QuoteDate = date.slice(0,9)
			}
		})

		newSalesQuoteservice.getRiderTermList($scope.propDeatil, $stateParams.lifeNo, $scope.userData.UserId, $stateParams.planCode).then(function(result){
			if(result == null){

			}else{
				$scope.riderBasicPlan = angular.fromJson(result.replace( /\'/g, "\""));
			}
		}) 

		$scope.myGoBack = function() {
    		$ionicHistory.goBack();
  		}

		$scope.save = function(){ 
			$scope.addCoverageRider.ModifyDate = riderDate.toISOString().slice(0,23);
			$scope.addCoverageRider.ProDetailId = $scope.propDeatil;
			$scope.addCoverageRider.SumAssured = $scope.quotesDetail[0].SumAssured;
			$scope.addCoverageRider.CoverageTerm = $scope.rider.coverageTerm;
			$scope.addCoverageRider.GrossInstallPrem = $scope.quotesDetail[0].GrossInstallPrem;
			$scope.addCoverageRider.PlanCode = $stateParams.planCode;
			$scope.addCoverageRider.PlanName = $stateParams.planName;
			$scope.addCoverageRider.PlanType = 'R';
			$scope.addCoverageRider.PremiumTerm = $scope.rider.premiumTerm;
			$scope.addCoverageRider.BeneficalTerm = $scope.rider.benefitTerm;
			$scope.addCoverageRider.UserId = $scope.userData.UserId;
			newSalesQuoteservice.saveCoveragePlan($scope.addCoverageRider).then(function(coveragePlan){
				$scope.coveragePlan = angular.fromJson(coveragePlan.replace( /\'/g, "\""));
				$state.go("app.salesQuoteCoverage",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation});
			})
		}
	});
	 
})

.controller('salesQuoteEditBasicPlanCtrl', function($scope, $state, $ionicPopup, $ionicLoading, $ionicNavBarDelegate, $ionicModal, $stateParams, $filter, newSalesQuoteservice, sharedService) {

	$scope.$on("$ionicView.enter", function(event, data){

		$scope.yearlyRegularPremium = 0;
		$scope.sumAssured =0;
		$scope.insurancePortion =0;
		$scope.regularTopup =0;
		$scope.singleTopup =0;
		$scope.basicPlanPayMethod = {};
		$scope.basicPlanPayMethod.basicPlanPremiumTerm = "0";
		$scope.updateSalesQuote = {};

		var userAge =  {insuredAge: '46',policyHolderAge: '45'}; //sharedService.getAge();
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse')); 

		$scope.propDeatil = $stateParams.proId.replace(/'/g,''); 

		newSalesQuoteservice.getInsuredPolicyHolderDetail($scope.propDeatil, $scope.userData.UserId).then(function(policyHolderDetail){
			$scope.policyHolderDetail = angular.fromJson(policyHolderDetail.replace( /\'/g, "\""));
		})

		newSalesQuoteservice.basicSalesQuoteDetail($stateParams.proId).then(function(result){
			$scope.basicplanDetail = angular.fromJson(result.replace( /\'/g, "\""));
			var date  = $scope.basicplanDetail[0].ProposalStateDate;
			$scope.basicplanDetail[0].ProposalStateDate = date.slice(0,9)
			$scope.AnnualPremium = $scope.basicplanDetail[0].AnnualPremium;
			
			/*updateContact Api*/
			newSalesQuoteservice.updateContact($scope.userData, $stateParams.leadno).then(function(updateDataResult){
				$scope.users = angular.fromJson(updateDataResult.replace( /\'/g, "\""));
				$scope.users = $scope.users[0];
				$scope.age = userAge.policyHolderAge
				$scope.gender = $scope.users.Gender;
				
				/*getPlanBasicDetail Api*/ 
				newSalesQuoteservice.getPlanBasicDetail($scope.userData.UserId, $stateParams.leadno, $stateParams.proId).then(function(planBasicResult){
				$scope.newplanBasic = angular.fromJson(planBasicResult.replace( /\'/g, "\""));    
					if($scope.newplanBasic[0].ProductCatergory == 'ILP' || $scope.newplanBasic[0].ProductCatergory == 'HB'){

						$scope.basicRegularPremuim = true;
						$scope.basicInsuranceField = true;
						$scope.basicRegularTopup = true;
						$scope.baiscSingleTopup = true;
						$scope.basicPlamSum = true;
					} else{
						$scope.basicPlamSum = true;
						$scope.basicRegularPremuim = false;
						$scope.insuranceField = false;
						$scope.basicRegularTopup = false;
						$scope.baiscSingleTopup = false;
						$scope.sumAssuredBasic = {};
						var dateData = new Date();
						$scope.sumAssuredBasic.TimeStamp = dateData.toISOString().slice(0,23);
						$scope.sumAssuredBasic.Gender = $scope.gender;
						$scope.sumAssuredBasic.AnnualPremium = 0;
						$scope.sumAssuredBasic.CommencementDate = $scope.sumAssuredBasic.TimeStamp;
						$scope.sumAssuredBasic.PlanCode = $scope.newplanBasic[0].BasicPlanCode;
						$scope.sumAssuredBasic.InsuredAge = userAge.insuredAge;
						$scope.sumAssuredBasic.PolicyHolderAge = userAge.policyHolderAge;
						$scope.sumAssuredBasic.CPlanCode = $scope.newplanBasic[0].BasicPlanCode;
						$scope.sumAssuredBasic.PremiumPaymentTerm = $scope.basicPlanPayMethod.basicPlanPremiumTerm;                     
						/*SumAssuredBasicPlanTermList Api*/
						newSalesQuoteservice.getSumAssuredBasicPlanTermList($scope.sumAssuredBasic, $scope.userData.UserId).then(function(PremiumTermResult){
							$scope.sumAssuredBasicPlan = angular.fromJson(PremiumTermResult.replace( /\'/g, "\""));
							$scope.insurancePortion = $scope.sumAssuredBasic.AnnualPremium;
							$scope.sumAssured = $scope.sumAssuredBasicPlan[0].saFrom;
						})
					}
					

					$scope.premiumModeData = {};
					var dateData = new Date();
					$scope.premiumModeData.basicPlanCode = $scope.newplanBasic[0].BasicPlanCode;
					$scope.premiumModeData.timeStamp = dateData.toISOString().slice(0,23); 
					$scope.premiumModeData.commDate = $scope.premiumModeData.timeStamp;
					$scope.premiumModeData.gender = $scope.gender;
					$scope.premiumModeData.age = userAge.policyHolderAge;
					/*PremiumMode Api*/ 

					newSalesQuoteservice.getRiderPlanPremiumMode($scope.premiumModeData, $scope.userData.UserId).then(function(PremiumModeResult){
						$scope.premiumMode = angular.fromJson(PremiumModeResult.replace( /\'/g, "\""));
						$scope.premiumTermData = {};
						var dateData = new Date();
						$scope.premiumTermData.timestamp = dateData.toISOString().slice(0,23);
						$scope.premiumTermData.gender = $scope.gender;
						$scope.premiumTermData.annualpremium = $scope.AnnualPremium;
						$scope.premiumTermData.commencementDate = $scope.premiumTermData.timestamp
						$scope.premiumTermData.planCode = $scope.newplanBasic[0].BasicPlanCode;
						$scope.premiumTermData.insuredAge = userAge.insuredAge;
						$scope.premiumTermData.policyHolderAge = userAge.policyHolderAge;
						$scope.premiumTermData.cplanCode = $scope.premiumTermData.planCode;
						$scope.premiumTermData.RelationCode = $stateParams.relationCode;
						/*PremiumTerm Api*/ 

						newSalesQuoteservice.getBasicPremiumTerm($scope.premiumTermData, $scope.userData.UserId).then(function(PremiumTermResult){
						$scope.premiumTerm = angular.fromJson(PremiumTermResult.replace( /\'/g, "\""));
							$scope.beneficialTermData = {};
							var dateData = new Date();
							$scope.beneficialTermData.timeStamp = dateData.toISOString().slice(0,23); 
							$scope.beneficialTermData.Gender = $scope.gender;
							$scope.beneficialTermData.Annualpremium = $scope.AnnualPremium;
							$scope.beneficialTermData.CommencementDate = $scope.beneficialTermData.timeStamp;
							$scope.beneficialTermData.PlanCode = $scope.newplanBasic[0].BasicPlanCode;
							$scope.beneficialTermData.InsuredAge = userAge.insuredAge;
							$scope.beneficialTermData.PolicyHolderAge = userAge.policyHolderAge;
							$scope.beneficialTermData.CplanCode = $scope.newplanBasic[0].BasicPlanCode;
							$scope.beneficialTermData.RelationCode = $stateParams.relationCode;
							/*BeneficialTerm Api*/ 

							newSalesQuoteservice.getBasicBeneficialTerm($scope.beneficialTermData, $scope.userData.UserId).then(function(BeneficialTermResult){
							$scope.beneficialTerm = angular.fromJson(BeneficialTermResult.replace( /\'/g, "\""));
								$scope.premiumMethodData = {};
								var dateData = new Date();
								$scope.premiumMethodData.timestamp = dateData.toISOString().slice(0,23);
								$scope.premiumMethodData.basicPlanCode = $scope.newplanBasic[0].BasicPlanCode;
								$scope.premiumMethodData.commDate = $scope.premiumMethodData.timestamp
								$scope.premiumMethodData.age = userAge.policyHolderAge;
								$scope.premiumMethodData.gender = $scope.gender;
								 /*PremiumMethod Api*/

								$scope.premiumMethod = {
									"RN": "CASH / CHEQUE",
									"ADBCA": "AUTO DEBIT BCA",
									"CC": "CREDIT CARD",
									"TRF": "ATM / TRANSFER / EDC",
									"AP": "ADVANCE PAYMENT",
									"ADBNI": "AUTO DEBIT BNI",
									"ADCIMB": "AUTO DEBIT CIMB NIAGA",
									"ADMANDIRI": "AUTO DEBIT MANDIRI",
									"BSI": "BSI",
									"BSIANZ": "BANK STANDING INSTRUCTION ANZ",
									"BSIBII":"BANK STANDING INSTRUCTION BII",
									"BSIBPD":"BANK STANDING INSTRUCTION BPD",
									"BSIBPR": "BANK STANDING INSTRUCTION BPR",
									"BSIBRI": "BANK STANDING INSTRUCTION BRI",
									"BSIMEGA":"BANK STANDING INSTRUCTION MEGA"

								} 

								$scope.coverageTermData = {};
								var dateData = new Date();
								$scope.coverageTermData.TimeStamp = dateData.toISOString().slice(0,23);
								$scope.coverageTermData.Gender = $scope.gender;
								$scope.coverageTermData.AnnualPremium = $scope.AnnualPremium;
								$scope.coverageTermData.CommencementDate = $scope.coverageTermData.TimeStamp
								$scope.coverageTermData.PlanCode = $scope.newplanBasic[0].BasicPlanCode;
								$scope.coverageTermData.InsuredAge = userAge.insuredAge;
								$scope.coverageTermData.PolicyHolderAge = userAge.policyHolderAge;
								$scope.coverageTermData.CPlanCode = $scope.newplanBasic[0].BasicPlanCode;

								/*getBasicCoverageTerm Api*/
								newSalesQuoteservice.getBasicCoverageTerm($scope.coverageTermData, $scope.userData.UserId).then(function(CoverageTermResult){
									$scope.coverageTerm = angular.fromJson(CoverageTermResult.replace( /\'/g, "\""));
								})

								var productId = $stateParams.proId.replace(/'/g,'');
								$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));

								newSalesQuoteservice.getCoveragePlanDetail(productId, $scope.userData.UserId).then(function(result){
									$scope.editquotesDetail = angular.fromJson(result.replace( /\'/g, "\""));
									if($scope.editquotesDetail[0].PremiumMode != null){
										$scope.yearlyRegularPremium = $scope.editquotesDetail[0].AnnualPremium;
										$scope.sumAssured = $scope.editquotesDetail[0].SumAssured;
										$scope.insurancePortion = $scope.editquotesDetail[0].AnnualPremium;
										$scope.basicPlanPayMethod.basicPlanPremiumTerm = $scope.editquotesDetail[0].PremiumTerm;
										$scope.basicPlanPayMethod.CoverageTerm = $scope.editquotesDetail[0].CoverageTerm;
										$scope.basicPlanPayMethod.benefitterm = $scope.editquotesDetail[0].BeneficalTerm;
										$scope.basicPlanPayMethod.PremiumMode = $scope.editquotesDetail[0].PremiumMode;
										$scope.basicPlanPayMethod.premiummethod = $scope.editquotesDetail[0].PremiumMethod;
									}
									
								}) 
							})    
						})
					}) 
				})     
			})
		})

		$scope.myGoBack = function() {
		    $ionicHistory.goBack();
		}

		$scope.yrpCalc = function(yearlyRegularPremium){

			$scope.sumAssuredBasic = {};
			var dateData = new Date();
			$scope.sumAssuredBasic.TimeStamp = dateData.toISOString().slice(0,23);
			$scope.sumAssuredBasic.Gender = $scope.gender;
			$scope.sumAssuredBasic.AnnualPremium = yearlyRegularPremium;
			$scope.sumAssuredBasic.CommencementDate = $scope.sumAssuredBasic.TimeStamp;
			$scope.sumAssuredBasic.PlanCode = $scope.newplanBasic[0].BasicPlanCode;
			$scope.sumAssuredBasic.InsuredAge = userAge.insuredAge;
			$scope.sumAssuredBasic.PolicyHolderAge = userAge.policyHolderAge;
			$scope.sumAssuredBasic.CPlanCode = $scope.newplanBasic[0].BasicPlanCode;
			$scope.sumAssuredBasic.PremiumPaymentTerm = 0;                     
			$scope.sumAssuredBasic.RelationCode = $stateParams.relationCode;

			/*SumAssuredBasicPlanTermList Api*/
			newSalesQuoteservice.getSumAssuredBasicPlanTermList($scope.sumAssuredBasic, $scope.userData.UserId).then(function(PremiumTermResult){
				$scope.sumAssuredBasicPlan = angular.fromJson(PremiumTermResult.replace( /\'/g, "\""));
				$scope.insurancePortion = $scope.sumAssuredBasic.AnnualPremium;
				$scope.sumAssured = $scope.sumAssuredBasicPlan[0].saFrom;
			})
		}

		$scope.premiumTermCalc = function(premiumTerm){

			$scope.sumAssuredBasic = {};
			var dateData = new Date();
			$scope.sumAssuredBasic.TimeStamp = dateData.toISOString().slice(0,23);
			$scope.sumAssuredBasic.Gender = $scope.gender;
			$scope.sumAssuredBasic.AnnualPremium = $scope.insurancePortion;
			$scope.sumAssuredBasic.CommencementDate = $scope.sumAssuredBasic.TimeStamp
			$scope.sumAssuredBasic.PlanCode = $scope.newplanBasic[0].BasicPlanCode;
			$scope.sumAssuredBasic.InsuredAge = userAge.insuredAge;
			$scope.sumAssuredBasic.PolicyHolderAge = userAge.policyHolderAge;
			$scope.sumAssuredBasic.CPlanCode = $scope.newplanBasic[0].BasicPlanCode; 
			$scope.sumAssuredBasic.PremiumPaymentTerm = premiumTerm;                     
			/*SumAssuredBasicPlanTermList Api*/
			newSalesQuoteservice.getSumAssuredBasicPlanTermList($scope.sumAssuredBasic, $scope.userData.UserId).then(function(PremiumTermResult){
				$scope.sumAssuredBasicPlan = angular.fromJson(PremiumTermResult.replace( /\'/g, "\""));
			})
		}



		$scope.saveBasicPlan = function(){

			var salesDate = new Date(); 
			$scope.updateSalesQuote.ModifyDate = salesDate.toISOString().slice(0,23);
			$scope.updateSalesQuote.Id = $stateParams.proId.replace(/'/g,'');
			$scope.updateSalesQuote.AnnualPremium = 0;
			$scope.updateSalesQuote.AnnualSingleTOPUP = 0;
			$scope.updateSalesQuote.AnnualZPremium = 0;
			$scope.updateSalesQuote.CorpPRDiscount = 0;
			$scope.updateSalesQuote.CovTerm = $scope.basicPlanPayMethod.CoverageTerm;
			$scope.updateSalesQuote.BenTerm = $scope.basicPlanPayMethod.benefitterm;
			$scope.updateSalesQuote.EntryDate = salesDate.toISOString().slice(0,23);
			$scope.updateSalesQuote.MortDeferYR = salesDate.getFullYear();
			$scope.updateSalesQuote.PremiumTerm = $scope.basicPlanPayMethod.basicPlanPremiumTerm;
			$scope.updateSalesQuote.PremiumMethod = $scope.basicPlanPayMethod.premiummethod;
			$scope.updateSalesQuote.PremiumMode = $scope.basicPlanPayMethod.PremiumMode;
			$scope.updateSalesQuote.ProductCode = $scope.newplanBasic[0].BasicPlanCode;
			$scope.updateSalesQuote.TransactionDate = salesDate.toISOString().slice(0,23);
			$scope.updateSalesQuote.UserId = $scope.userData.UserId; 
			$scope.updateSalesQuote.SumAssuredFrom = $scope.sumAssuredBasicPlan[0].saFrom;
			$scope.updateSalesQuote.SumAssuredTo = $scope.sumAssuredBasicPlan[0].saTo; 

			if($scope.newplanBasic[0].ProductCatergory == 'ILP' || $scope.newplanBasic[0].ProductCatergory == 'HB'){
				if($scope.newplanBasic[0].SinglePremInd == 0){
					$scope.updateSalesQuote.AnnualSCHTopup = Math.ceil($scope.regularTopup);
					$scope.updateSalesQuote.AnnualTP = Math.ceil($scope.insurancePortion);
					$scope.updateSalesQuote.CoverUnit = Math.ceil($scope.sumAssured);
					$scope.updateSalesQuote.GrossAnnualPremium = 0;
				}else{
					$scope.updateSalesQuote.AnnualSCHTopup = 0;
					$scope.updateSalesQuote.AnnualTP = 0;
					$scope.updateSalesQuote.CoverUnit = Math.ceil($scope.sumAssured);
					$scope.updateSalesQuote.GrossAnnualPremium = Math.ceil($scope.insurancePortion);
				}
			}else{
				$scope.updateSalesQuote.AnnualSCHTopup = 0;
				$scope.updateSalesQuote.AnnualTP = 0;
				$scope.updateSalesQuote.CoverUnit = Math.ceil($scope.sumAssured);
				$scope.updateSalesQuote.GrossAnnualPremium = 0;
			}
			newSalesQuoteservice.UpdateSalesQuoteDetail($scope.updateSalesQuote, $scope.userData.UserId).then(function(result){
				if(result != null){
					$state.go("app.salesQuoteCoverage",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation});
				}
			})
		} 
	});
})


.controller('salesQuoteSummaryCtrl', function($scope, $state, $ionicPopup,$ionicLoading, $ionicNavBarDelegate, $ionicModal, $stateParams, $filter, newSalesQuoteservice, sharedService) {
	
	$scope.$on("$ionicView.enter", function(event, data){

		var applyDate = new Date();
		$scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
		$scope.propDeatil = $stateParams.proId.replace(/'/g,''); 
		$scope.applySales = {};

		newSalesQuoteservice.getInsuredPolicyHolderDetail($scope.propDeatil, $scope.userData.UserId).then(function(policyHolderDetail){
			if(policyHolderDetail == null){
			}else{
				$scope.policyHolderDetail = angular.fromJson(policyHolderDetail.replace( /\'/g, "\""));
				var date  = $scope.policyHolderDetail[0].BirthDate;
				$scope.policyHolderDetail[0].BirthDate = date.slice(0,10)
				var date  = $scope.policyHolderDetail[1].BirthDate;
				$scope.policyHolderDetail[1].BirthDate = date.slice(0,10)  
			}
		})
		newSalesQuoteservice.getCoveragePlanDetail($scope.propDeatil, $scope.userData.UserId).then(function(result){
			if(result == null){

			}else{
				$scope.quotesDetail = angular.fromJson(result.replace( /\'/g, "\""));
				var date  = $scope.quotesDetail[0].QuoteDate;
				$scope.quotesDetail[0].QuoteDate = date.slice(0,9)
			}
		})

		$scope.back = function(){
			$state.go("app.salesQuoteCoverage",{'leadno': $stateParams.leadno,"proId": $stateParams.proId, 'relation':$stateParams.relation});
		}

		$scope.apply = function(){
			$scope.applySales.modifyDate = applyDate.toISOString().slice(0,23);
			$scope.applySales.propId = $scope.propDeatil;
			newSalesQuoteservice.applySaleQuote($scope.applySales).then(function(result){
				$scope.saveQuotesDetail = angular.fromJson(result.replace( /\'/g, "\"")); 
			})
		}

	});
})


.factory('sharedService', function () {

	var data = {
		insuredAge: '',
		policyHolderAge: ''
	};
	return {
		getAge: function () {
			return data;
		},
		insuredHolderAge: function (insuredAge) {
			data.insuredAge = insuredAge;
		},
		setPolicyHolderAge: function (policyHolderAge) {
			data.policyHolderAge = policyHolderAge;
		}
	};
}); 