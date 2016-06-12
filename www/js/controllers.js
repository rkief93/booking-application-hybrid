var url = "192.168.187.1";
angular.module('app.controllers', ['ionic', 'ngAnimate'])

.controller('mainPage', function($scope) {
	
})
   
.controller('signupCtrl', function($scope, $ionicPopup, $ionicLoading, $http, $state) {
	$scope.user = {};

	$scope.createUser = function()	{

		if ($scope.user.name == "" || $scope.user.matric == "" || $scope.user.password == "" || $scope.user.fac == "" || 
			$scope.user.email == "" || $scope.user.phone == "" || $scope.user.name == null || $scope.user.matric == null || 
			$scope.user.password == null || $scope.user.fac == null || $scope.user.email == null || $scope.user.phone == null ) {
			var alertPopup = $ionicPopup.alert ({
				title: 'Register Failed!',
				template: 'Please fill all details.'
			});
			return alertPopup;
			console.log($scope.user)
		}

		// console.log($scope.user)
		$http.post('http://'+url+':3000/mobileapi/signup', $scope.user)
			.then(function(respond) {
				if (respond.data.success == true) {
					console.log(respond.data.success);
					var alertPopup = $ionicPopup.alert({
						title: 'Register success',
						template: respond.data.msg
					});
					
					$state.go("login");
					$ionicLoading.hide();
				}
				else {
					var alertPopup = $ionicPopup.alert({
						title: 'Register Failed!',
						template: 'No matric existed!'
					});
					return alertPopup;
				}
			},	function(error)	{
				console.log(error);
			});
	}
})

   
.controller('LoginCtrl', function($scope, $http, $state, $ionicPopup, $ionicLoading) {
	
	$scope.user = {};

	$scope.signIn = function()	{
		console.log($scope.user)
		$http.post('http://'+url+':3000/mobileapi/login', $scope.user)
			.then(function(respond) {
				if (respond.data.success == true) {
					console.log(respond.data.success);
					localStorage.matric = $scope.user.matric;
					var alertPopup = $ionicPopup.alert({
						title: 'Login success',
						template: respond.data.msg
					});
					$state.go("menu.homepage");
				}
				else {
					var alertPopup = $ionicPopup.alert({
						title: 'Login Failed!',
						template: 'wrong matric number or password'
					});
					return alertPopup;
				}
			},	function(error)	{
				console.log(error);
			});
	}
})
	
.controller('forgotCtrl', function ($scope) {

})

      
.controller('informativeSectionCtrl', function($scope) {

})
   
.controller('viewScheduleCtrl', function($scope, $http, $ionicPopup, $filter) {
  
  $scope.bookDetails = [];
  $scope.form = {};    
  $scope.searchPresents = false;

  console.log($scope.searchPresents);

  $scope.onChange = function ()	{
  	if ($scope.form.searchDate != "")	
  		$scope.searchPresents = true;
  	else
  		$scope.searchPresents = false;


  };

  $scope.$on("$ionicView.beforeEnter", function() {
    $http.get('http://'+url+':3000/mobileapi/viewSchedule/')
      .then(function(respond) {
        if (respond.data.success == true) {
          $scope.bookDetails = respond.data.result;
        }
        else {
          var alertPopup = $ionicPopup.alert({
            title: 'Details error!',
            template: 'please check your credential'
          });
          return alertPopup;
        }
      },  function(error) {
        console.log(error);
      });
  });

})
   
.controller('bookCourtCtrl', function($scope, $http, $state, $ionicPopup, $ionicLoading, $ionicHistory, $filter) {
	$scope.data = {};

	$scope.book = function()	{
		
		if ($scope.data.sport == null || $scope.data.facid == null || $scope.data.court == null || $scope.data.date == null || $scope.data.timefrom == null || 
			$scope.data.timeto == null || $scope.data.event == null || $scope.data.sport == "" || $scope.data.facid == "" || $scope.data.court == "" || $scope.data.date == "" || 
			$scope.data.timefrom == "" || $scope.data.timeto == "" || $scope.data.event == "") {
			var alertPopup = $ionicPopup.alert ({
				title: 'Booking Failed!',
				template: 'Please fill all details.'
			});
			return alertPopup;
		}

		$scope.data.bdate = $filter('date')($scope.data.date, "yyyy-MM-dd");
		console.log($scope.data.bdate);

		$http.post('http://'+url+':3000/mobileapi/booking/' + localStorage.matric, $scope.data)
			.then(function(respond) {
				if (respond.data.success == true) {
					console.log(respond.data.success);
					var alertPopup = $ionicPopup.alert({
						title: 'Booking success!',
						template: respond.data.msg
					});
					console.log("popopop")
					$state.go("menu.bookCourt");
				}
				else {
					var alertPopup = $ionicPopup.alert({
						title: 'Booking Failed!',
						template: 'Please fill all details.'
					});
					return alertPopup;
				}
			},	function(error)	{
				console.log(error);
			});
	}
      
})
   
.controller('profileCtrl', function($scope, $http, $ionicPopup, $state) {

	$scope.userProfile = [];

	$scope.$on("$ionicView.beforeEnter", function()	{
		$http.get('http://'+url+':3000/mobileapi/profile/' + localStorage.matric)
			.then(function(respond) {
				if (respond.data.success == true) {
					$scope.userProfile = respond.data.result;
				}
				else {
					var alertPopup = $ionicPopup.alert({
						title: 'Profile error!',
						template: 'please check your credential'
					});
					return alertPopup;
				}
			},	function(error)	{
				console.log(error);
			});
	});
})
   
.controller('homepageCtrl', function($scope, $ionicHistory, $state, $ionicPopup, $http) {
	$scope.logout = function () {
		localStorage.clear();
		$ionicHistory.clearCache();
		$ionicHistory.clearHistory();
		var alertPopup = $ionicPopup.alert({
						title: 'Logout success',
						template: 'You have been logged out from the system'
					});
		$state.go("main");
	};

	$scope.announcementDetails = [];
	$scope.form = {};

	// console.log($scope.form.searchDetail);

	$scope.$on("$ionicView.beforeEnter", function()	{
		$http.get('http://'+url+':3000/mobileapi/announcement/')
			.then(function(respond) {
				if (respond.data.success == true) {
					$scope.announcementDetails = respond.data.result;
				}
				else {
					var alertPopup = $ionicPopup.alert({
						title: 'Details error!',
						template: 'please check your credential'
					});
					return alertPopup;
				}
			},	function(error)	{
				console.log(error);
			});
	});
})

.controller('futInfoCtrl', function($scope, $ionicHistory) {
	$scope.goBack = function(){
	    $ionicHistory.goBack();
	    $ionicHistory.viewHistory().backView;
	}
})

.controller('badInfoCtrl', function($scope, $ionicHistory) {
	$scope.goBack = function(){
	    $ionicHistory.goBack();
	    $ionicHistory.viewHistory().backView;
	}
})

.controller('detailsCtrl', function($scope, $http, $ionicPopup, $filter, $ionicHistory) {

	$scope.bookDetails = [];
	$scope.form = {};
	$scope.searchPresent = false;

	console.log($scope.searchPresent);

	$scope.onChange = function ()	{
		console.log($scope.form.searchText);
		if ($scope.form.searchText != "")	
			$scope.searchPresent = true;
		else
			$scope.searchPresent = false;


		console.log($scope.searchPresent);
	};

	$scope.$on("$ionicView.beforeEnter", function()	{
		$http.get('http://'+url+':3000/mobileapi/details/' + localStorage.matric)
			.then(function(respond) {
				if (respond.data.success == true) {
					$scope.bookDetails = respond.data.result;
				}
				else {
					var alertPopup = $ionicPopup.alert({
						title: 'Details error!',
						template: 'please check your credential'
					});
					return alertPopup;
				}
			},	function(error)	{
				console.log(error);
			})
	});
	$scope.goBack = function(){
	    $ionicHistory.goBack();
	    $ionicHistory.viewHistory().backView;
	}
})

.controller('menuCtrl', function($scope) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
    if (data.enableBack) {
        $scope.$root.showMenuIcon = true;
    } else {
        $scope.$root.showMenuIcon = false;
    }
});
})
 