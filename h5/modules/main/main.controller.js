(function () {

	'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['$scope',"$rootScope", '$http','$window', '$location', '$state', '$stateParams','AppAuthenticationService'];

	function MainController($scope, $rootScope,$http, $window,$location, $state, $stateParams,AppAuthenticationService) {

		if(!AppAuthenticationService.getToken()&&$rootScope.isWeixin()){
			var callbackUrl = encodeURIComponent($window.location.protocol+"//"+$window.location.host+$window.location.pathname);
			var scope = "snsapi_userinfo";
			var locationRef = GLOBAL_CONFIG.API_HOST + "/v2/ecapi.auth.web?vendor=1"+"&scope="+scope+"&referer=" + callbackUrl;
			$window.location.href = locationRef;
		}
		else{
			$state.go('home', {
			});
		}


	}

})();