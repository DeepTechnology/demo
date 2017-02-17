angular.module('starter.profile', [])

.controller('userprofileCtrl', function($scope, $stateParams, $rootScope, $state,$cordovaCamera, $cordovaFile,$ionicLoading, $ionicPopup, profileService) {

    $scope.images = [];
    $scope.takePicture = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            var binary_string =  window.atob($scope.imgURI);
            var len = binary_string.length;
            var bytes = new Uint8Array( len );
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
                $scope.picture = bytes;
            }
        },function (err) {
            // An error occured. Show a message to the user
        });
    }
    
    $scope.getPicture = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            var binary_string =  window.btoa($scope.imgURI);
            var len = binary_string.length;
            var bytes = new Uint8Array( len );
            for (var i = 0; i < len; i++)        {
                bytes[i] = binary_string.charCodeAt(i);
                $rootScope.picture = bytes;
                
            }
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }

    $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
    $scope.UserId = $scope.userData.UserId;
    profileService.getContactList($scope.userData,$scope.UserId).then(function(result) {
        $scope.userList = angular.fromJson( result.replace( /\'/g, "\""));
        $scope.ActionDate = $scope.userList[0].ActionDate;
        $scope.UserID = $scope.userList[0].UserID;
        $scope.Leadno = $scope.userList[0].Leadno;
        $scope.Leadimage = $scope.userList[0].Leadimage;

        for(var i =0;i<$scope.userList.length;i++){
            if($scope.userList[i].Leadimage == null){
                $scope.userList[i].Leadimage = "img/placeholder-male.jpg";
            }
            else {
                $scope.userList[i].Leadimage = $scope.userList[i].Leadimage;
            }
        }
        $scope.profileData = {};
        $scope.profileData.ActionDate = $scope.ActionDate
        $scope.profileData.Leadimage = $rootScope.picture;
        $scope.profileData.Leadno = $scope.Leadno;
        $scope.saveProfile = function(){
            $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
            $scope.UserId = $scope.userData.UserId;
            profileService.saveContactProfileImage($scope.profileData,$scope.UserId).then(function(result) {
                $scope.profileDataList = angular.fromJson( result.replace( /\'/g, "\""));
            })
        }

        $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
        $scope.UserId = $scope.userData.UserId;
        profileService.getProfileList($scope.userData,$scope.UserId).then(function(result) {
            $scope.userprofile = angular.fromJson( result.replace( /\'/g, "\""));
        })
    })
});