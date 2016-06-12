// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.directives', 'app.controllers'])

.run(function($ionicPlatform, $rootScope, $location, $ionicLoading, $state, $animate) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
        $animate.enabled(false);
})

// routes.js
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider    
    .state('main', {
      url: '/main',
      templateUrl: 'templates/mainPage.html'
    })
        
    
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
        
        
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
    }) 

    .state('forgot', {
      url: '/forgot',
      templateUrl: 'templates/forgot.html',
      controller:'forgotCtrl'
  })

    .state('fInfo', {
      url: '/fInfo',
      templateUrl: 'templates/futInfo.html',
      controller: 'futInfoCtrl'
    })


    .state('bInfo', {
      url: '/bInfo',
      templateUrl: 'templates/badInfo.html',
      controller: 'badInfoCtrl'
    })
            
    .state('menu', {
      url: '/menu',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })
      
            
    .state('menu.informativeSection', {
      url: '/info',
      views: {
        'side-menu': {
      templateUrl: 'templates/informativeSection.html'
          }
        }
    })
            
    .state('menu.viewSchedule', {
      url: '/viewSch',
      views: {
        'side-menu': {
          templateUrl: 'templates/viewSchedule.html',
          controller: 'viewScheduleCtrl'
          }
        }
    })
            
    .state('menu.bookCourt', {
      url: '/booking',
      views: {
        'side-menu': {
      templateUrl: 'templates/bookCourt.html',
      controller: 'bookCourtCtrl'
          }
        }
    })

    .state('details', {
      url: '/details',     
      templateUrl: 'templates/details.html',
      controller: 'detailsCtrl'
    })
        
   .state('menu.profile', {
      url: '/profile',
      views: {
        'side-menu': {
      templateUrl: 'templates/profile.html',
      controller: 'profileCtrl'
        }
      }
    })

   .state('menu.homepage', {
      url: '/home',
      views: {
        'side-menu': {
          templateUrl: 'templates/homepage.html',
          controller: 'homepageCtrl'
        }
      } 
    })      
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/main');

  // $urlRouterProvider.otherwise('/login');
});
