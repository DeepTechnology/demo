angular.module('starter.ContactCtrl', [])

.controller('contactCtrl', function($scope, $state, $ionicPopup, $ionicScrollDelegate, $ionicNavBarDelegate, contactservice, $ionicModal ) {
    
    $scope.$on("$ionicView.enter", function(event, data){
        $scope.sttButton=false;
        $ionicNavBarDelegate.showBackButton(false);
        $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
        contactservice.contactList($scope.userData).then(function(result) {
            if (result !== null) {
               $scope.userList = angular.fromJson( result.replace( /\'/g, "\""));
               console.log("$scope.userList",$scope.userList);
                for(var i =0;i<$scope.userList.length;i++){
                    if($scope.userList[i].Leadimage == null){
                        $scope.userList[i].Leadimage = "img/placeholder-male.jpg";
                    }else {
                        $scope.userList[i].Leadimage = "data:image/jpeg;base64," + $scope.userList[i].Leadimage;
                    }
                } 
            } 
            
        })
        
        $scope.scrollToTop = function() { //ng-click for back to top button
            $ionicScrollDelegate.scrollTop();
        $scope.sttButton=false;  //hide the button when reached top
        };
        $scope.getScrollPosition = function() {
            //monitor the scroll
            var moveData = $ionicScrollDelegate.getScrollPosition().top;
            $scope.$apply(function(){
                if (moveData>150){
                    $scope.sttButton=true;
                }else {
                    $scope.sttButton=false;
                }
            }); //apply 
        };  //getScrollPosition
    });// ionicView
})   //contactCtrl

.controller('editDetailCtrl', function($scope, $cordovaToast, $state, $ionicNavBarDelegate, contactservice ) {

    $scope.$on("$ionicView.enter", function(event, data){
        $scope.editData = {};
        $scope.editData.ActionType = 'A';
        $scope.editData.Leadno = "0";
        $scope.editData.ActionDate = new Date();
        $scope.editData.Telephone =  null;
        $scope.editData.Faxno = null;
        $scope.editData.Id = "0";

        $scope.Add = function(){
            $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
            $scope.editData.UserId = $scope.userData.UserId;
            $scope.editData.AgentCode = $scope.userData.AgentCode;
            var data = JSON.stringify($scope.editData)
            contactservice.saveContact(data).then(function(result) {
                $state.go('app.contacts');
                $cordovaToast.show("Information Added Successfully!", 2000, 'bottom').then(function(success) {
                    console.log("");
                }, function (error) {
                    console.log("Try again! " + error);
                });
            })
        }
        $scope.Cancel = function(){
            $state.go('app.contacts');
        }
    });
})

.controller('contactupdateCtrl', function($scope, $window, $cordovaCamera, $cordovaToast, $ionicScrollDelegate, $state, $ionicNavBarDelegate, contactservice, $ionicModal, $stateParams ) {

    $scope.$on("$ionicView.enter", function(event, data){
        $scope.updateData = {};
        $scope.Update = function(){
            $scope.updateData.ActionType = 'U';
            $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
            $scope.updateData.AgentCode  = $scope.userData.AgentCode;
            delete $scope.updateData.Leadimage;
            delete $scope.updateData.ExceptionModel;
            delete $scope.updateData.ContactType;
            delete $scope.updateData.Maasimpotant;
            delete $scope.updateData.Stayintouch;
            delete $scope.updateData.StayintouchDate;
            delete $scope.updateData.MonthVal;
            delete $scope.updateData.MaasimpotantDate;
            delete $scope.updateData.Address;
            $scope.updateData.Address1 = $scope.updateData.Address1;
            $scope.updateData.Address2 = $scope.updateData.Address2;
            var data = JSON.stringify($scope.updateData)
            contactservice.saveContact(data).then(function(result) {
                $state.go('app.contacts');
                $cordovaToast.show("Information Added Successfully!", 2000, 'bottom').then(function(success) {
                    console.log("");
                    }, function (error) {
                    console.log("Try again! " + error);
                });
            })
        }
        $scope.Cancel = function(){
            $state.go('app.contacts');
        }
        $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
        contactservice.getContactList($scope.userData, $stateParams.leadno ,$stateParams.id).then(function(updateData){
            if(updateData == null){
            }else{
                $scope.updateData = angular.fromJson(updateData.replace( /\'/g, "\""));
                $scope.updateData = $scope.updateData[0];
                $scope.updateData.Address1 = $scope.updateData.Address.Address1;
                $scope.updateData.Address2 = $scope.updateData.Address.Address2;
                $scope.updateData.Address3 = $scope.updateData.Address.Address3;
                $scope.updateData.CityCode = $scope.updateData.Address.CityCode;
                $scope.updateData.PostalCode = $scope.updateData.Address.PostalCode;
                $scope.updateData.StateCode = $scope.updateData.Address.StateCode;
                $scope.updateData.CountryCode = $scope.updateData.Address.CountryCode;
                $scope.updateData.BirthdDate = new Date($scope.updateData.BirthdDate);
                if($scope.updateData.Leadimage == null){
                    $scope.updateData.Leadimage = "img/placeholder-male.jpg";
                }else {
                    $scope.updateData.Leadimage = "data:image/jpeg;base64," + $scope.updateData.Leadimage;
                }
            }
        })
      
        $scope.profile = {};
        $scope.profile.ActionDate = new Date();
        $scope.addImage = function() {
            var options = { 
                quality : 75, 
                destinationType : Camera.DestinationType.DATA_URL, 
                sourceType : Camera.PictureSourceType.CAMERA, 
                allowEdit : true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
                $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
                $scope.profile.UserId = $scope.userData.UserId;
                $scope.profile.Leadimage = $scope.imgURI;
                $scope.profile.leadno = $stateParams.leadno;
                var data = JSON.stringify($scope.profile)
                contactservice.saveContactProfileImage(data).then(function(result) {
                    $scope.SaveContactProfileImage = angular.fromJson( result.replace( /\'/g, "\""));
                    for(var i =0;i<$scope.SaveContactProfileImage.length;i++){
                        if($scope.SaveContactProfileImage.Leadimage == null){
                            $scope.SaveContactProfileImage.Leadimage = "img/placeholder-male.jpg";
                        } 
                        else{
                            $scope.SaveContactProfileImage.Leadimage = "data:image/jpeg;base64," + $scope.SaveContactProfileImage.Leadimage;
                        }
                    }
                })
            },  function(err) {
            // An error occured. Show a message to the user
            });
        }
    });
})





