// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter',
                        ['ionic',
                        'ionic-sidetabs',
                        'jett.ionic.scroll.sista',
                        'ngMessages',
                        'ngCordova',
                        'chart.js',
                        'ui.rCalendar',
                        'starter.controllers' , 
                        'starter.services',
                        'starter.login',
                        'starter.loginService',
                        'configs',
                        'pascalprecht.translate',
                        'starter.dashboard',
                        'starter.dashboardService',
                        'starter.appointmentsCtrl',
                        'starter.appointmentsService',
                        'starter.profile',
                        'starter.profileService',
                        'starter.proposalCtrl',
                        'starter.proposalservice',
                        'starter.salesCtrl',
                        'starter.salesQuoteService',
                        'starter.ContactCtrl',
                        'starter.contactservice',
                        'starter.previewCtrl',
                        'starter.previewService',
                        'starter.birthdayCtrl',
                        'starter.birthdayService',
                        'starter.fnaservice',
                        'starter.fnaCtrl',
                        'starter.newSalesQuoteservice',
                        'starter.newSalesQuoteCtrl',
                        'starter.calendarCtrl',
                        'starter.calendarservice',
                        'starter.eNewsCtrl',
                        'starter.eNewsservice',
                        'starter.setting',
                        ])

.run(function($ionicPlatform , $rootScope, $timeout, $window, $state, $location, $ionicLoading) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !localStorage.getItem("loginStatus")) {
                $location.url('/login');
            }
        }) 

        $rootScope.$on('loading:show', function() {
            $ionicLoading.show({template: '<ion-spinner icon="ios"></ion-spinner>'})
        })

        $rootScope.$on('loading:hide', function() {
            $ionicLoading.hide()
        })
    })
  
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

        if(toState.url =='/dashboard'){
            $timeout(function(){
                angular.element(document.querySelector('#leftMenu' )).removeClass("hide");
            },1000);
        }	
    });
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider , $httpProvider) {

    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                $rootScope.$broadcast('loading:show')
                return config
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide')
                return response
            }
        }
    })

  /*$ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');*/

    if(localStorage.getItem('language') == null){
        $translateProvider.useStaticFilesLoader({
            prefix: 'locales/',
            suffix: '.json'
        })
        .registerAvailableLanguageKeys(['locale-en', 'locale-id'], {})
        .preferredLanguage('locale-en')
        .fallbackLanguage('locale-en')
        .useSanitizeValueStrategy('escapeParameters');
    }

    else{
        $translateProvider.useStaticFilesLoader({
            prefix: '/locales/',
            suffix: '.json'
        })
        .registerAvailableLanguageKeys(['locale-en', 'locale-id'], {})
        .preferredLanguage(localStorage.getItem('language'))
        .fallbackLanguage(localStorage.getItem('language'))
        .useSanitizeValueStrategy('escapeParameters');
    }

    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',
        onEnter: function($state){
            if(!localStorage.getItem("loginStatus")){
               $state.go('login');
            }
        }
    })

    //--------------------------------------

    .state('login', {
        url: '/login',
        templateUrl: 'templates/tab-signin.html',
        controller: 'loginCtrl'
    })

    //--------------------------------------

    .state('app.UserProfile', {
        url: '/userProfile',
        views: {
            'menuContent': {
                templateUrl: 'templates/userProfile.html',
                controller: 'userprofileCtrl'
            }
        }
    })

    .state('app.dashboard', {
        url: '/dashboard',
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard.html',
                controller: 'dashboardCtrl'
            }
        },
        authStatus: true
    })

    /*This is language change route*/
    .state('app.setting', {
        url: '/setting',
            views: {
            'menuContent': {
                templateUrl: 'templates/setting.html',
                controller: 'settingCtrl'
            }
        }
    })
    /*stop language*/

    .state('app.birthday', {
        url: '/birthday',
            views: {
            'menuContent': {
                templateUrl: 'templates/birthday.html',
                controller: 'birthdayCtrl'
            }
        }
    })

    .state('app.calendar', {
        url: '/calendar',
            views: {
            'menuContent': {
                templateUrl: 'templates/calendar.html',
                controller: 'calendarCtrl'
            }
        }
    })

    .state('app.editcalendar', {
        url: '/editcalendar/:event',
            views: {
            'menuContent': {
                templateUrl: 'templates/editcalendar.html',
                controller: 'editcalendarCtrl'
            }
        }
    })

    .state('app.calendarui', {
        url: '/calendarui',
        views: {
            'menuContent': {
                templateUrl: 'templates/calendarui.html',
                controller: 'CalendaruiCtrl'
            }
        }
    })

    /*appointment tabs route*/
    
    .state('app.appointments', {
        url: '/appointments',
        views: {
            'menuContent': {
                templateUrl: 'templates/appointments.html',
                controller: 'appointmentsCtrl'
            }
        }
    })

    .state('app.appointments.thismonth', {
        url: '/thismonth',
        views: {
            'thismonth': {
                templateUrl: 'templates/thismonth.html',
                controller: 'thismonthCtrl'
            }
        }
    })

    .state('app.appointments.nextmonth', {
        url: '/nextmonth',
        views: {
            'nextmonth': {
                templateUrl: 'templates/nextmonth.html',
                controller: 'nextmonthCtrl'
            }
        }
    })

    .state('app.appointments.eventToday', {
        url: '/eventToday',
        views: {
            'eventToday': {
                templateUrl: 'templates/eventToday.html',
                controller: 'eventTodayCtrl'
            }
        }
    })

    /*event tabs*/
    .state('app.morningevent', {
        url: '/morning',
            views: {
            'menuContent': {
                templateUrl: 'templates/morning.html',
                controller: 'morningEventCtrl'
            }
        }
    })

    .state('app.afternoonevent', {
        url: '/afternoon',
            views: {
            'menuContent': {
                templateUrl: 'templates/afternoon.html',
                controller: 'afternoonEventCtrl'
            }
        }
    })

    .state('app.nightevent', {
        url: '/nightevent',
            views: {
            'menuContent': {
                templateUrl: 'templates/nightevent.html',
                controller: 'nightEventCtrl'
            }
        }
    })

    /*close appointment tabs route*/

    .state('app.contacts', {
        url: '/contacts',
            views: {
            'menuContent': {
                templateUrl: 'templates/contacts.html',
                controller: 'contactCtrl'
            }
        }
    })

    .state('app.contactupdate', {
        url: '/contactupdate/:leadno/:id',
            views: {
            'menuContent': {
                templateUrl: 'templates/contactupdate.html',
                controller: 'contactupdateCtrl'
            }
        }
    })

    /*fna routes start */

    .state('app.fna', {
        url: '/fna/:leadno',
            views: {
            'menuContent': {
                templateUrl: 'templates/fna.html',
                controller : 'fnaCtrl'
            }
        }
    })

    .state('app.EDU', {
        url: '/EduFNA/:leadno/:PriorVal',
            views: {
            'menuContent': {
                templateUrl: 'templates/EduFNA.html',
                controller : 'eduCtrl'
            }
        }
    })

    .state('app.INV', {
        url: '/InvFNA/:leadno/:PriorVal',
            views: {
            'menuContent': {
                templateUrl: 'templates/InvFNA.html',
                controller : 'invCtrl'
            }
        }
    })

    .state('app.PRO', {
        url: '/ProFNA/:leadno/:PriorVal',
            views: {
            'menuContent': {
                templateUrl: 'templates/ProFNA.html',
                controller : 'proCtrl'
            }
        }
    })

    .state('app.RET', {
        url: '/RetFNA/:leadno/:PriorVal',
            views: {
            'menuContent': {
                templateUrl: 'templates/RetFNA.html',
                controller : 'retCtrl'
            }
        }
    })

    .state('app.eduGraph', {
        url: '/eduGraph/:leadno/:PriorVal',
            views: {
            'menuContent': {
                templateUrl: 'templates/eduGraph.html',
                controller : 'GraphCtrl'
            }
        }
    })

    .state('app.invGraph', {
        url: '/invGraph/:leadno/:PriorVal',
            views: {
            'menuContent': {
                templateUrl: 'templates/invGraph.html',
                controller : 'invGraphCtrl'
            }
        }
    })

    .state('app.proGraph', {
        url: '/proGraph/:leadno/:PriorVal',
            views: {
            'menuContent': {
                templateUrl: 'templates/proGraph.html',
                controller : 'proGraphCtrl'
            }
        }
    })

    .state('app.retGraph', {
        url: '/retGraph/:leadno/:PriorVal',
            views: {
            'menuContent': {
                templateUrl: 'templates/retGraph.html',
                controller : 'retGraphCtrl'
            }
        }
    })

    
    
    /*fna routes end*/

    .state('app.newSalesQuote', {
        url: '/newSalesQuote/:leadno/:proId',
            views: {
            'menuContent': {
                templateUrl: 'templates/newSalesQuote.html',
                controller:'newSalesQuoteCtrl'
            }
        }
    })

    .state('app.salesQuote', {
        url: '/salesQuote',
            views: {
            'menuContent': {
                templateUrl: 'templates/salesQuote.html',
                controller: 'salesCtrl'
            }
        }
    })

    .state('app.salesQuoteInsuredNew', {
        url: '/salesQuoteInsuredNew/:leadno/:proId',
            views: {
            'menuContent': {
                templateUrl: 'templates/salesQuoteInsuredNew.html',
                controller:'salesQuoteInsuredNewCtrl'
            }
        }
    })

    .state('app.salesQuoteInsuredPolicyHolder', {
        url: '/salesQuoteInsuredPolicyHolder/:leadno/:proId/:relation/:relationCode',
            views: {
            'menuContent': {
                templateUrl: 'templates/salesQuoteInsuredPolicyHolder.html',
                controller:'salesQuoteInsuredPolicyCtrl'
            }
        }
    })

    .state('app.salesQuoteBasicPlan', {
        url: '/salesQuoteBasicPlan/:leadno/:proId/:relation/:relationCode',
            views: {
            'menuContent': {
                templateUrl: 'templates/salesQuoteBasicPlan.html',
                controller:'basicplanDetailCtrl'
            }
        }
    })

    .state('app.salesQuoteInsuredFund', {
        url: '/salesQuoteInsuredFund/:leadno/:proId/:relation/:fundId',
            views: {
            'menuContent': {
                templateUrl: 'templates/salesQuoteInsuredFund.html',
                controller:'basicPlanFundCtrl'
            }
        }
    })

    .state('app.salesQuoteInsuredEditFund', {
        url: '/salesQuoteInsuredEditFund/:leadno/:proId/:relation/:fundId',
            views: {
            'menuContent': {
                templateUrl: 'templates/salesQuoteInsuredEditFund.html',
                controller:'basicPlanEditFundCtrl'
            }
        }
    })

    .state('app.salesQuoteCoverage', {
        url: '/salesQuoteCoverage/:leadno/:proId/:relation',
            views: {
            'menuContent': {
                templateUrl: 'templates/salesQuoteCoverage.html',
                controller:'salesQuoteCoverage'
            }
        }
    })

    .state('app.salesQuoteCoverageRiderPlan', {
        url: '/salesQuoteCoverageRiderPlan/:leadno/:proId/:relation',
            views: {
            'menuContent': {
                templateUrl: 'templates/salesQuoteCoverageRiderPlan.html',
                controller:'salesQuoteCoverageRider'
            }
        }
    })

    .state('app.salesCoverageTopupPlan', {
        url: '/salesCoverageTopupPlan/:leadno/:proId/:relation/:case',
            views: {
            'menuContent': {
                templateUrl: 'templates/salesCoverageTopupPlan.html',
                controller:'salesQuoteCoverageTopup'
            }
        }
    })

    .state('app.salesCoverageRiderBasicPlan', {
        url: '/salesCoverageRiderBasicPlan/:leadno/:proId/:relation/:planCode/:planName/:lifeNo',
            views: {
            'menuContent': {
                templateUrl: 'templates/salesCoverageRiderBasicPlan.html',
                controller:'salesCoverageRiderBasicPlanCtrl'
            }
        }
    })

    .state('app.salesQuoteSummary', {
        url: '/salesQuoteSummary/:leadno/:proId/:relation/',
            views: {
            'menuContent': {
                templateUrl: 'templates/salesQuoteSummary.html',
                controller:'salesQuoteSummaryCtrl'
                }
        }
    })

    .state('app.salesQuoteEditBasicPlan', {
        url: '/salesQuoteEditBasicPlan/:leadno/:proId/:relation',
            views: {
            'menuContent': {
                templateUrl: 'templates/salesQuoteEditBasicPlan.html',
                controller:'salesQuoteEditBasicPlanCtrl'
            }
        }
    })

    .state('app.preview', {
        url: '/preview/:leadno',
            views: {
            'menuContent': {
                templateUrl: 'templates/preview.html',
                controller: 'previewCtrl'
            }
        }
    })

    .state('app.editDetail', {
        url: '/editDetail',
            views: {
            'menuContent': {
                templateUrl: 'templates/editDetail.html',
                controller: 'editDetailCtrl'
            }
        }
    })

    .state('app.proposal', {
        url: '/proposal',
            views: {
            'menuContent': {
                templateUrl: 'templates/proposal.html',
                controller: 'proposalCtrl'
            }
        }
    })

    .state('app.activity', {
        url: '/activity',
            views: {
            'menuContent': {
                templateUrl: 'templates/activity.html',
                controller: 'activityCtrl'
            }
        }
    })

    .state('app.activity.thismonth', {
        url: '/thismonth',
        views: {
            'thismonth': {
                templateUrl: 'templates/thismonth.html',
                controller: 'thismonthCtrl'
            }
        }
    })

    .state('app.activity.nextmonth', {
        url: '/nextmonth',
        views: {
            'nextmonth': {
                templateUrl: 'templates/nextmonth.html',
                controller: 'nextmonthCtrl'
            }
        }
    })

    .state('app.activity.eventToday', {
        url: '/eventToday',
        views: {
            'eventToday': {
                templateUrl: 'templates/eventToday.html',
                controller: 'eventTodayCtrl'
            }
        }
    })


    .state('app.eNews', {
        url: '/eNews',
            views: {
            'menuContent': {
                templateUrl: 'templates/eNews.html',
                controller: 'eNewsCtrl'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/dashboard');
});
