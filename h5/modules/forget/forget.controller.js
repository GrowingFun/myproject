(function () {

	'use strict';

	angular
		.module('app')
		.controller('ForgetController', ForgetController);

	ForgetController.$inject = ['$scope', '$http', '$window', '$location', '$state', 'API', 'ENUM'];

	function ForgetController($scope, $http, $window, $location, $state, API, ENUM) {

		$scope.success = false;
		$scope.input = {
			email: ""
		};

		$scope.touchSendMail = touchSendMail;

		function touchSendMail() {

			var email = $scope.input.email;
			if (!email || email.length < 4) {
				$scope.toast('请输入正确的邮箱');
				return;
			}

			API.auth.default.reset({
				email: email
			}).then(function (success) {
				$scope.success = success;
			})
		}
	}

})();