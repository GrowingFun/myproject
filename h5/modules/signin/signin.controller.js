(function () {

    'use strict';

    angular
    .module('app')
    .controller('SigninController', SigninController);

    SigninController.$inject = ['$scope', '$http', '$window', '$location', '$state', '$rootScope', 'API', 'ENUM'];

    function SigninController($scope, $http, $window, $location, $state, $rootScope, API, ENUM) {

    	$scope.username = "";
    	$scope.password = "";

    	$scope.touchSignin = _touchSignin;
    	$scope.touchSignup = _touchSignup;
    	$scope.touchForget = _touchForget;
    	$scope.touchWeixin = _touchWeixin;
        $scope.isWeixin = _isWeixin;

    	function _touchSignin() {
    		var username = $scope.username;
    		var password = $scope.password;

            if ( !username || username.length < 4 ) {
                $scope.toast('请输入正确的用户名');
                return;
            }

            if ( !password || password.length < 4 ) {
                $scope.toast('请输入正确的密码');
                return;
            }

			API.auth.base
			.signin({username:username, password:password})
			.then(function(success){
                if (success) {
                    $scope.toast('登录成功');
                    $scope.goHome();
                }
			});
    	}

    	function _touchSignup() {
            $state.go('signup', {});
    	}

    	function _touchForget() {
            $state.go('forget', {});
    	}

    	function _touchWeixin() {
			$state.go('wechat-auth', {});
    	}

        function _isWeixin() {
            return $rootScope.isWeixin();
        }

    }

})();
