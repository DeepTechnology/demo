angular.module('starter.newSalesQuoteservice', [])
   .service('newSalesQuoteservice', ['$rootScope', '$q', '$http', 'swordfish_BASE_URL', newSalesQuoteservice])
	
	function newSalesQuoteservice($rootScope, $q, $http, swordfish_BASE_URL) {
		
		this.getBasicPlan = function(data) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',                
				url : swordfish_BASE_URL.url + "api/GovtService/GetBasicPlans?basicPlanModel={LoginId:'"+data.LoginId+"'}",
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.getRelation = function(RELATION) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',                
				url : swordfish_BASE_URL.url + 'api/MasterVal/GetMasterValue?mastertabdata={ActionCode:"'+RELATION+'"}',
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.continueBasicPlan = function(data, planCode) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',                
				url : swordfish_BASE_URL.url + "api/GovtService/GetBasicPlans?basicPlanModel={LoginId:'"+data+"', PlanCode:'"+ planCode +"'}",
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.saveSaleQuoteDetail = function(data) {
			var deferred = $q.defer();
			$http({                           
				method : 'POST',                
				url : swordfish_BASE_URL.url + "api/SalesQuote/SaveSalesQuoteDetail?propData={UserId:'"+data.UserId+"',ModifyDate:'"+data.ModifyDate+"',ProposalState:'QUO',ProposalStateDate:'"+data.ProposalStateDate+"',ProductCode:'"+data.ProductCode+"',EntryDate:'"+data.EntryDate+"',Leadno:'"+data.Leadno+"',TransactionDate:'"+data.TransactionDate+"',ProductName: '"+data.ProductName+"'}",
				headers : {'Content-Type': 'application/json','Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.saveBasicPlan = function(data, userId, lead, proId) {
			var deferred = $q.defer();
			$http({                           
				method : 'POST',
				url : swordfish_BASE_URL.url + "api/SalesQuote/SaveBasicPlanDetail?basicPlanDetailData={ProductCatergory:'"+data[0].productCatergory+"',BenefitType:'"+data[0].benefitType+"',ParCode:'"+data[0].parCode+"',Division:'"+data[0].division+"',CoverLife:'"+data[0].coverLife+"',PolComnDtBPrd:'"+data[0].polComnDtBPrd+"',PolComnDtFPrd:'"+data[0].polComnDtFPrd+"',SinglePremInd:'"+data[0].singlePremInd+"',PremAgeBasis:'"+data[0].premAgeBasis+"',minAnnTPINS:'"+data[0].minAnnTPINS+"',minAnnTPINV:'"+data[0].minAnnTPINV+"',BasicPlanCode:'"+data[0].basicPlanCode+"',BasicPlanName:'"+data[0].basicPlanName+"',BasicPlanCurrency:'"+data[0].basicPlanCurrency+"',PolHoderMinAge:'"+data[0].polHolderMinAge+"',PolHoderMaxAge:'"+data[0].polHolderMaxAge+"',UserId:'"+userId+"',Leadno:'"+lead+"',ProductId:"+ proId+"}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.getPlanBasicDetail = function(userId, lead, proId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/SalesQuote/GetPlanBasicDetail?PlanBasicDetail={UserId:'"+userId +"',Leadno:'"+ lead+"',ProductId:"+ proId+"}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.GetSalesQuoteDetail = function(proId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/SalesQuote/GetSalesQuoteDetail?qouteData={Id:"+proId +"}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		} 

		this.getInsuredPolicyHolderDetail = function(PropDetailId, UserId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/SalesQuote/GetInsuredPolicyHolderDetail?PolInsData={PropDetailId:'"+ PropDetailId +"',UserId:'"+ UserId +"'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.GetContactList = function(userId, lead) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/Contact/GetContactList?contactData={UserId:'"+ userId +"',Leadno:'"+ lead +"'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.ageCalc = function(data, proposalDT, type) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/SalesQuote/AgeCalc?ageVal={dateOfBirth:'"+data+"',proposalDT:'"+proposalDT+"',type:'"+type+"'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.saveBasicPlanDetail = function(data, userId, lead, proId) {
			var deferred = $q.defer();
			$http({                           
				method : 'POST',
				url : swordfish_BASE_URL.url + "api/SalesQuote/SaveBasicPlanDetail?basicPlanDetailData={ProductCatergory:'"+data[0].ProductCatergory+"',BenefitType:'"+data[0].BenefitType+"',ParCode:'"+data[0].ParCode+"',Division:'"+data[0].Division+"',CoverLife:'"+data[0].CoverLife+"',PolComnDtBPrd:'"+data[0].PolComnDtBPrd+"',PolComnDtFPrd:'"+data[0].PolComnDtFPrd+"',SinglePremInd:'"+data[0].SinglePremInd+"',PremAgeBasis:'"+data[0].PremAgeBasis+"',minAnnTPINS:'"+data[0].minAnnTPINS+"',minAnnTPINV:'"+data[0].minAnnTPINV+"',BasicPlanCode:'"+data[0].BasicPlanCode+"',BasicPlanName:'"+data[0].BasicPlanName+"',BasicPlanCurrency:'"+data[0].BasicPlanCurrency+"',PolHoderMinAge:'"+data[0].PolHoderMinAge+"',PolHoderMaxAge:'"+data[0].PolHoderMaxAge+"',UserId:'"+userId+"',Leadno:'"+lead+"',ProductId:"+ proId+"}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.postInsuredPolicyHolder = function(data) {
			var deferred = $q.defer();
			$http({                           
				method : 'POST',		
				url : swordfish_BASE_URL.url + "api/SalesQuote/PostInsuredPolicyHolder?PolInsuserPolicyHolderdData={Category:'"+data.Category+"',ModifyDate:'"+data.ModifyDate+"',Age:"+data.Age+",AgeAdminFlg:'',Balc:'',BLKC:'N',FalCGlass:0,DrugAmount:0,BirthDate:'"+data.BirthDate+"',BMI:0,Gender:'"+data.Gender+"',Drug:'',HGT:0,LifeNo:'"+data.LifeNo+"',Name:'"+data.Name+"',NoOfStick:0,OccupationClass:'"+data.OccupationClass+"',RelationCode:'"+data.RelationCode+"',Smoker:'N',Weight:0,ContiGenTowner:'',DelivaryDate:'"+data.DelivaryDate+"',NoofMthod:0,PropDetailId:"+data.PropDetailId+",UserId:'"+data.UserId+"',Actval:'"+data.Actval+"'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.basicSalesQuoteDetail = function(data) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/SalesQuote/GetSalesQuoteDetail?qouteData={Id:"+data+"}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.updateContact = function(userData, leadno){
			var deferred = $q.defer();
		       $http({                           
		          method : 'GET',                
		          url : swordfish_BASE_URL.url + 'api/Contact/GetContactList?contactData={UserId:"'+userData.UserId+'", Leadno:"'+leadno+'"}',
		          headers : {'Content-Type': 'application/json','Accept':'application/json'}
		       })
		       .success(function(result) {
			   deferred.resolve(result);
		       })
		       return deferred.promise;
		}

		this.getRiderPlanPremiumMode = function(data, UserId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/GovtService/GetRiderPlanPremiumMethod?requestGetRiderPlanPremiumMode={transSeqNo:'1',timestamp:'"+data.timeStamp+"',loginId:'"+UserId +"',basicPlanCode:'"+data.basicPlanCode+"',lifeNo:'L1',commDate:'"+data.commDate+"',age:"+data.age+",gender:'"+data.gender+"',distChannel:'AAG',PremiumMethodCode:'0'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}
		

		this.getBasicPremiumTerm = function(data, UserId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/GovtService/GetBasicPremiumTerm?reqBasicPremiumTerm={transSeqNo:'1',timestamp:'"+data.timestamp+"',loginId:'"+UserId +"',distChannel:'AAG',gender:'"+data.gender+"',smoker:'N',pensionAge:'0',annualpremium:'"+data.annualpremium+"',commencementDate:'"+data.commencementDate+"',coverUnit:'0',planCode:'"+data.planCode+"',insuredAge:"+data.insuredAge+",policyHolderAge:'"+data.policyHolderAge+"',relationCode:'"+data.RelationCode+"',premiumPaymentTerm:'0',mortgageEffectiveYear:'0',loanTerm:'0',coverageTerm:'0',benefitTerm:'0',cplanCode:'"+data.cplanCode+"',cbenefitTerm:'0',ccoverageTerm:'0',cpremiumPaymentTerm:'0',cpensionAge:'0'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.getBasicBeneficialTerm = function(data, UserId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/GovtService/getBasicBeneficialTerm?reqBeneficiaryTerm={transSeqNo:'0',timestamp:'"+data.timeStamp+"',loginId:'"+UserId +"',distChannel:'AAG',Gender:'"+data.Gender+"',Smoker:'N',PensionAge:'0',Annualpremium:'"+data.Annualpremium+"',CommencementDate:'"+data.CommencementDate+"',CoverUnit:'0',PlanCode:'"+data.PlanCode+"',InsuredAge:"+data.InsuredAge+",PolicyHolderAge:'"+data.PolicyHolderAge+"',RelationCode:'"+data.RelationCode+"',PremiumPaymentTerm:'0',MortgageEffectiveYear:'0',LoanTerm:'0',coverageTerm:'0',BenefitTerm:'0',CplanCode:'"+data.CplanCode+"',benefitTerm:'0',ccoverageTerm:'0',cpremiumPaymentTerm:'0',cpensionAge:'0'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.getSumAssuredBasicPlanTermList = function(data, UserId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/GovtService/GetSumAssuredBasicPlanTermList?reqSumAssuredBasicPlanTerm={TransSeqNo:'1',TimeStamp:'"+data.TimeStamp+"',LoginId:'"+UserId +"',distChannel:'AAG',Gender:'"+data.Gender+"',Smoker:'N',PensionAge:'0',AnnualPremium:'"+data.AnnualPremium+"',CommencementDate:'"+data.CommencementDate+"',CoverUnit:'0',PlanCode:'"+data.PlanCode+"',InsuredAge:'"+data.InsuredAge+"',PolicyHolderAge:'"+data.PolicyHolderAge+"',RelationCode:'"+data.RelationCode+"',PremiumPaymentTerm:'"+data.PremiumPaymentTerm+"',MortgageEffectiveYear:'0',LoanTerm:'0',CoverageTerm:'0',BenefitTerm:'0',CPlanCode:'"+data.CPlanCode+"',CBenefitTerm:'0',CCoverageTerm:'0',CPremiumPaymentTerm:'0',CPensionAge:'0'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}	

		this.getRiderPlanPremiumMethod = function(data, UserId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/GovtService/GetRiderPlanPremiumMethod?request_GetRiderPlanPremiumMethods={transSeqNo:'1',timestamp:'"+data.timestamp+"',loginId:'"+UserId+"',basicPlanCode:'"+data.basicPlanCode+"',lifeNo:'L1',commDate:'"+data.commDate+"',age:'"+data.age+"',gender:'"+data.gender+"',disChannel:'AAG'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.getBasicCoverageTerm = function(data, UserId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/GovtService/GetBasicCoverageTerm?reqCoverageTerm={TransSeqNo:'1',TimeStamp:'"+data.TimeStamp+"',LoginId:'"+UserId+"',distChannel:'AAG',Gender:'"+data.Gender+"',Smoker:'N',PensionAge:'1',AnnualPremium:'"+data.AnnualPremium+"',CommencementDate:'"+data.CommencementDate+"',CoverUnit:'0',PlanCode:'"+data.PlanCode+"',InsuredAge:'"+data.InsuredAge+"',PolicyHolderAge:'"+data.PolicyHolderAge+"',MortgageEffectiveYear:'0',LoanTerm:'0',CoverageTerm:'0',BenefitTerm:'0',CPlanCode:'"+data.CPlanCode+"',CBenefitTerm:'0',CCoverageTerm:'0',CPremiumPaymentTerm:'0',CPensionAge:'0'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}	

		this.getInsuredPolicyHolderDetail = function(PropDetailId, UserId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/SalesQuote/GetInsuredPolicyHolderDetail?PolInsData={PropDetailId:'"+ PropDetailId +"',UserId:'"+ UserId +"'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		} 

		this.UpdateSalesQuoteDetail = function(data) {
		   var deferred = $q.defer();
		   $http({                           
		       method : 'POST',        			 												
		       url : swordfish_BASE_URL.url + "api/SalesQuote/UpdateSalesQuoteDetail?propDataVal={Id:"+data.Id+",ModifyDate:'"+data.ModifyDate+"',AnnualPremium:'"+data.AnnualPremium+"',AnnualSCHTopup:'"+data.AnnualSCHTopup+"',AnnualSingleTOPUP:'"+data.AnnualSingleTOPUP+"',AnnualTP:'"+data.AnnualTP+"',AnnualZPremium:'"+data.AnnualZPremium+"',CorpPRDiscount:'"+data.CorpPRDiscount+"',CoverUnit:'"+data.CoverUnit+"',CovTerm:'"+data.CovTerm+"',BenTerm:'"+data.BenTerm+"',EntryDate:'"+data.EntryDate+"',InstallmentPremium:'0.0',MortDeferYR:'"+data.MortDeferYR+"',MortGageInterest:'0.0',UWSar:'0.0',PayorAnnExp:'0.0',PayorAnnInc:'0.0',PensionAge:'0',PremiumTerm:'"+data.PremiumTerm+"',FADisc:'0.0',PremiumMethod:'"+data.PremiumMethod+"',PremiumMode:'"+data.PremiumMode+"',ProductCode:'"+data.ProductCode+"',ServiceTaxPrecentage:'0.0',SSTD:'',TransactionDate:'"+data.TransactionDate+"',TPInstallPremium:'0.0',STUInstallPremium:'0.0',GrossAnnualPremium:'"+data.GrossAnnualPremium+"',GrossAnnualZPremium:'0.0',GrossInstallmentPremium:'0.0',FDisc:'0.0',STFDisc:'0.0',PolAdmFee:'0.0',TotalBannZPremium:'0.0',TotalBannPremium:'0.0',TotalBInstallPremium:'0.0',TotalRannZPremium:'0.0',TotalRannPremium:'0.0',TotalRInstallPremium:'0.0',LoadPremium:'0.0',LoadZPremium:'0.0',LoadInstallPremium:'0.0',UserId:'"+data.UserId+"',ActVal:'BSP',SumAssuredFrom:'"+data.SumAssuredFrom+"',SumAssuredTo:'"+data.SumAssuredTo+"'}",
		       headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
		   })
		   .success(function(result) {
		       deferred.resolve(result);
		   })
		   return deferred.promise;
		}
														
		this.getFundCode = function(data, UserId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',                  
				url : swordfish_BASE_URL.url + "api/GovtService/GetFundCode?requestFundCode={TransSeqNo:0,TimeStamp:'"+ data.TimeStamp +"',LoginId:'"+ UserId +"',AgentCode:'AAG',HierDate:'"+data.HierDate+"',BasicPlanCode:'"+data.BasicPlanCode+"',LifeNo:'"+data.LifeNo+"',CommDate:'"+data.CommDate+"',Age:'"+data.Age+"',Gender:'"+data.Gender+"',DistChannel:'AAG',RiderPlanCode:'"+data.BasicPlanCode+"'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.saveFundType = function(data) {
		   var deferred = $q.defer();
		   $http({                           
		       method : 'POST',        			 												
		       url : swordfish_BASE_URL.url + "api/SalesQuote/ADDFundType?fundData={Id:'0',ModifyDate:'"+data.ModifyDate+"',ProposalId:"+data.ProposalId+",FundType:'"+data.FundType+"',FPERC:0,UserId:'"+data.UserId+"'}",
		       headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
		   })
		   .success(function(result) {
		       deferred.resolve(result);
		   })
		   return deferred.promise;
		}

		this.getCoveragePlanDetail = function(productID, userId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',                  
				url : swordfish_BASE_URL.url + "api/SalesQuote/GetCoveragePlanDetail?covDetVal={ProDetailId:"+productID+",UserId:'"+userId+"'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}  
		
		this.getFundList = function(productID, userId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',                 
				url : swordfish_BASE_URL.url + "api/SalesQuote/GetFundList?dataVal={ProposalId:"+productID+",UserId:'"+userId+"'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		// this.updateCoveragePlanDetail = function(productID, userId) {
		// 	var deferred = $q.defer();
		// 	$http({                           
		// 		method : 'POST',                  
		// 		url : swordfish_BASE_URL.url + "api/SalesQuote/UpdateCoveragePlan?covDataVal={ModifyDate:'',TotalBannPremium:0,TotalRannPremium:0,TotalBInstallPremium:0,TotalBannZPremium:0,TotalRannZPremium:0,SSTD:'',ServiceTaxPrecentage:0,PolAdmFee:0,InstallmentPremium:0,AnnualZPremium:0,AnnualPremium:0,CoverUnit:0,CovTerm:0,InstallmentPremium:0,ChargesAmount:0,PlanType:'',BenTerm:0,PremiumTerm:0,Id:0,PlanCode:''}",
		// 		headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
		// 	})
		// 	.success(function(result) {
		// 		deferred.resolve(result);
		// 	})
		// 	return deferred.promise;
		// }

		this.updateFundType = function(data) {
			var deferred = $q.defer();
			$http({                           
				method : 'POST',                  
				url : swordfish_BASE_URL.url + "api/SalesQuote/UpdateFundType?fundVal={id:'"+data.Id+"',ModifyDate:'"+data.ModifyDate+"',ProposalId:"+data.ProposalId+",FundType:'"+data.FundType+"',FPERC:'"+data.FPERC+"',UserId:'"+data.UserId+"',ActVal:'"+data.ActVal+"'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.coverageCalculation = function(UserId, LeadNo, agentCode, ProductId, ProposalNo) {
		   var deferred = $q.defer();
		   $http({                           
		       method : 'GET',        			 												
		       url : swordfish_BASE_URL.url + "api/Coverage/GetCoverageCalculationRet?reqSalesCalculationProcess={UserId:'"+UserId+"',LeadNo:'"+LeadNo+"',AgentCode:'"+agentCode+"',ProductId:"+ProductId+",ProposalNo:'"+ProposalNo+"'}",
		       headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
		   })
		   .success(function(result) {
		       deferred.resolve(result);
		   })
		   return deferred.promise;
		}

		this.getCoverageRiderPlan = function(data, userId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/GovtService/GetRiderPlansList?reqRiderPlanList={TransSeqNo:0,TimeStamp:'"+data.TimeStamp+"',LoginId:'"+data.LoginId+"',BasicPlanCode:'"+data.BasicPlanCode+"',LifeNo:'L1',CommDate:'"+data.CommDate+"',Age:"+data.Age+",Gender:'M',DistChannel:'AAG'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}
 		
		this.getCoverageFund = function(ProposalId, userId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/SalesQuote/GetFundList?dataVal={ProposalId:'"+ProposalId+"',UserId:'"+userId+"'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.saveCoveragePlan = function(data) {
		   var deferred = $q.defer();
		   $http({                           
		       method : 'POST',        			 												
		       url : swordfish_BASE_URL.url + "api/SalesQuote/SaveCoveragePlan?covData={Id:'0',ModifyDate:'"+data.ModifyDate+"',ProDetailId:'"+data.ProDetailId+"',SumAssured:'"+data.SumAssured+"',PremiumTerm:'"+data.PremiumTerm+"',BeneficalTerm:'"+data.BeneficalTerm+"',CoverageTerm:'"+data.CoverageTerm+"',PlanCode:'"+data.PlanCode+"',PlanType:'"+data.PlanType+"',PlanName:'"+data.PlanName+"',LifeNo:'L1',UserId:'"+data.UserId+"'}",
		       headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
		   })
		   .success(function(result) {
		       deferred.resolve(result);
		   })
		   return deferred.promise;
		}

		this.validateRiderPlan = function(PlanCode, UserId, ProposalId) {
		   var deferred = $q.defer();
		   $http({                           
		       method : 'GET',        			 												
		       url : swordfish_BASE_URL.url + "api/GovtService/GetRiderDetailList?reqRiderPlanValidator={PlanCode:'"+PlanCode+"',UserId:'"+UserId+"',ProposalId:'"+ProposalId+"'}",
		       headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
		   })
		   .success(function(result) {
		       deferred.resolve(result);
		   })
		   return deferred.promise;
		}

		this.getTopUp = function(ProposalId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/SalesQuote/GetTopUpDetail?topUpVal={Id:0,ProPosalId:"+ProposalId+"}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}
		
		this.saveTopup = function(data) {
		   var deferred = $q.defer();
		   $http({                           
		       method : 'POST',        			 												
		       url : swordfish_BASE_URL.url + "api/SalesQuote/SaveQuoteTopUp?topUpData={Id:'"+data.Id+"',ModifyDate:'"+data.ModifyDate+"',ProPosalId:'"+data.ProPosalId+"',YearVal:'"+data.Year+"',TOPUPAmount:'"+data.TOPUPAmount+"',WithdrawAmount:'"+data.WithdrawAmount+"',UserId:'"+data.UserId+"'}",
		       headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
		   })
		   .success(function(result) {
		       deferred.resolve(result);
		   })
		   return deferred.promise;
		}

		this.deleteTopUp = function(topId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/SalesQuote/DelTopUpDetail?DelId={Id:'"+topId+"'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}
		
		this.deleteFund = function(fundId) {
			var deferred = $q.defer();
			$http({                           
				method : 'POST',
				url : swordfish_BASE_URL.url + "api/SalesQuote/DelFundType?delVal={Id:'"+fundId+"'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.getFundDetail = function(ProposalId, UserId) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/SalesQuote/GetFundDetail?fundData={Id:'0',ProposalId:"+ProposalId+",UserId:'"+UserId+"'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.getRiderTermList = function(ProposalId, LifeNO, UserId, PlanCode) {
			var deferred = $q.defer();
			$http({                           
				method : 'GET',
				url : swordfish_BASE_URL.url + "api/GovtService/GetRiderTermList?reqRiderTermListWeb={ProposalId:'"+ProposalId+"',LifeNO:'"+LifeNO+"',UserId:'"+UserId+"',PlanCode:'"+PlanCode+"'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		}

		this.applySaleQuote = function(data) {
			var deferred = $q.defer();
			$http({                           
				method : 'POST',
				url : swordfish_BASE_URL.url + "api/SalesQuote/ApplyQouteToProposal?appData={ModifyDate:'"+data.modifyDate+"',Id:'"+data.propId+"'}",
				headers : {'Content-Type': 'application/json', 'Accept':'application/json'}
			})
			.success(function(result) {
				deferred.resolve(result);
			})
			return deferred.promise;
		} 
	}