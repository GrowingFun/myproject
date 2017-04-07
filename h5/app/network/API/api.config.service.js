(function () {
    'use strict';

    angular
    .module('app')
    .factory('APIConfigService', APIConfigService);

    APIConfigService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];

    function APIConfigService($http, $q, $timeout, CacheFactory, ENUM) {

        var service = new APIEndpoint( $http, $q, $timeout, CacheFactory, 'APIConfigService' );
        service.get = _get;
        return service;

        function _get( params ) {
            return this.fetch( '/v2/ecapi.config.get', params, false, function(res){
                if ( ENUM.ERROR_CODE.OK == res.data.error_code ) {

                    if(GLOBAL_CONFIG.ENCRYPTED){
                        return res.data;
                    }
                    else{
                        var key = "i1j56p443p739lbl1zr4zow76j6kz4g6";
                        var data = res.data.data;
                        return JSON.parse( XXTEA.decryptFromBase64(data, key) );
                    }

                }
                return null;
            });
        }

    }

})();
