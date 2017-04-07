(function () {

    'use strict';

    angular
    .module('app')
    .controller('SignupController', SignupController);

    SignupController.$inject = ['$scope', '$http', '$window', '$location', '$state', 'API'];

    function SignupController($scope, $http, $window, $location, $state, API) {

    	$scope.username = "";
    	$scope.password = "";
    	$scope.password2 = "";
    	$scope.email = "";

    	$scope.touchSignup = _touchSignup;
    	$scope.touchLicense = _touchLicense;

        $scope.siteInfo = {};

    	function _touchSignup() {
    		var username = $scope.username;
    		var password = $scope.password;
    		var password2 = $scope.password2;
    		var email = $scope.email;

            if ( !username || username.length < 4 ) {
                $scope.toast('请输入正确的用户名');
                return;
            }

            if ( !password || password.length < 4 ) {
                $scope.toast('请输入正确的密码');
                return;
            }

			if ( password != password2 ) {
                $scope.toast('请输入正确的密码');
                $scope.password2 = '';
                return;
			}

            if ( !email || email.length < 5 ) {
                $scope.toast('请输入正确的邮箱地址');
                return;
            }

            var params = {};
            params.username = username;
            params.password = password;
            params.email = email;

            API.auth.default.
            signup(params)
            .then(function(success){
                if (success) {
                    $scope.toast('注册成功');
                    $scope.goHome();
                }
            });
    	}

    	function _touchLicense() {
            $window.location.href = $scope.siteInfo.terms_url;
    	}
        function _reloadSiteInfo(){
            API.site.get().then(function(siteInfo){
                    $scope.siteInfo = siteInfo;
                }

            )
        }
        _reloadSiteInfo();
    }

})();
