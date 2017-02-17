angular.module('starter.calendarCtrl', ['ionic', 'ngCordova','angular-bootstrap-calendar'])

.controller('calendarCtrl', function($scope, $state, $cordovaToast, $window , $ionicNavBarDelegate,$ionicLoading, $ionicModal, $stateParams, $cordovaCalendar, calendarservice) {

    $scope.$on( "$ionicView.enter", function( scopes, states ) {
        $scope.calender = {};
        $scope.calender.ActionType = 'A';
        $scope.calender.EventType = 'EVENTS';
        $scope.calender.ModifyDate = new Date();
        $scope.Add = function() {
            $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
            $scope.calender.UserId = $scope.userData.UserId;
            $scope.calender.AgentCode  = $scope.userData.AgentCode;
            var data = JSON.stringify($scope.calender)
            console.log("data",data);
            calendarservice.SaveAgentEvent(data).then(function(result) {
                $state.go('app.calendarui');
                $cordovaToast.show("Information Added Successfully!", 2000, 'bottom').then(function(success) {
                    console.log("");
                }, function (error) {
                    console.log("Try again! " + error);
                });
            })
        }
    });
})

.controller('CalendaruiCtrl', function ($scope, $state, $rootScope, $cordovaToast, $ionicNavBarDelegate,fnaservice, $ionicModal, $stateParams, $ionicPopup, calendarservice) {

    $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));    
    $scope.calendar = {};
    calendarservice.GetAgentEventCalendarList($scope.userData).then(function(result) {
        if(result != null){
            $scope.calData = angular.fromJson(result.replace( /\'/g, "\""));
            $scope.calendar.eventSource = createRandomEvents(); 
        }
    }) 

    $scope.changeMode = function (mode) {
        $scope.calendar.mode = mode;
    }; 

    $scope.today = function () {
        $scope.calendar.currentDate = new Date();
    };

    $scope.onViewTitleChanged = function (title) {
        $rootScope.viewTitle = title;
    };

    $scope.isToday = function () {

        var today = new Date(),
        currentCalendarDate = new Date($scope.calendar.currentDate);
        today.setHours(0, 0, 0, 0);
        currentCalendarDate.setHours(0, 0, 0, 0);
        return today.getTime() === currentCalendarDate.getTime();
    }; 

    $scope.deleteEvent = function(event){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Delete event',
            template: 'Are you sure you want to delete this event ?'
        });
        

        confirmPopup.then(function(res) {
            if(res) {
                calendarservice.DeleteEvent(event).then(function(result) {
                    $cordovaToast.show("Information Delete Successfully!", 5000, 'bottom').then(function(success) {
                        console.log("");
                    }, function (error) {
                        console.log("Try again! " + error);
                    });
                    calendarservice.GetAgentEventCalendarList($scope.userData).then(function(result) {
                        if(result != null){
                            $scope.calData = angular.fromJson(result.replace( /\'/g, "\""));
                            $scope.calendar.eventSource = createRandomEvents(); 
                        }
                    }) 
                })
            }
        });
    } 
    $scope.editEvent = function(event){
        $state.go('app.editcalendar',{"event": event});
    }
    function createRandomEvents() {
        var events = [];
        for (var i = 0; i < $scope.calData.length; i += 1) {
            events.push({
                title: $scope.calData[i].Title,
                startTime: new Date($scope.calData[i].StartDate),
                endTime: new Date($scope.calData[i].EndDate),
                allDay: false,
                Id:$scope.calData[i].Id
            });
        }
        return events;
    }
})

.controller('editcalendarCtrl', function ($scope, $cordovaToast, $state, $window, $ionicNavBarDelegate, fnaservice, $ionicModal, $stateParams, $ionicPopup, $ionicLoading, calendarservice) {

    $scope.$on( "$ionicView.enter", function( scopes, states ) {
        $scope.eventList = {};
        $scope.Update = function() {
            $scope.eventList.ActionType = 'U';
            $scope.eventList.EventType = 'EVENTS';
            $scope.eventList.ModifyDate = new Date();
            $scope.userData = JSON.parse(localStorage.getItem('loginResponse'));
            $scope.eventList.UserId = $scope.userData.UserId;
            $scope.eventList.AgentCode  = $scope.userData.AgentCode;
            var data = JSON.stringify($scope.eventList)
            console.log("data-U",data);
            calendarservice.SaveAgentEvent(data).then(function(result) {
                $state.go('app.calendarui');
                $cordovaToast.show("Information Edit Successfully!", 2000, 'bottom').then(function(success) {
                    console.log("");
                    }, function (error) {
                    console.log("Try again! " + error);
                });
            })
        }
        calendarservice.EventDetail($stateParams.event).then(function(result) {
            if (result != null) {
                $scope.eventList = angular.fromJson(result.replace( /\'/g, "\""));
                console.log("$scope.eventList",$scope.eventList);
                $scope.eventList.EventTitle = $scope.eventList.Title; 
                console.log("sfsafsf", $scope.eventList.EventTitle);
                $scope.eventList.StartDate = new Date($scope.eventList.StartDate);
                $scope.eventList.EndDate = new Date($scope.eventList.EndDate);
                $scope.eventList.StartDate = new Date($scope.eventList.StartDate);
                $scope.eventList.EndDate = new Date($scope.eventList.EndDate);
            }
        }) 
    });
})