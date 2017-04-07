(function() {

    'use strict';

    angular
        .module('app')
        .factory('ConfigModel', ConfigModel);

    ConfigModel.$inject = ['API','$cookies'];

    function ConfigModel( API,$cookies) {

        var service = {};
        service.config = $cookies.getObject( 'c' )|{};
        service.fetch = _fetch;
        service.getConfig = _getConfig;
        return service;

        function _fetch() {
            var _this = this;
            API.config.get()
                .then(function (data) {
                    _this.config = data.config;
                    _saveConfig(data.config);
                    return data.config;
                });
        }

        function _saveConfig(config){

            // save to cookie storage
            var exdate=new Date();
            exdate.setDate(exdate.getDate()+7);
            $cookies.putObject( 'c', config , {'expires': exdate});
        }

        function _getConfig(){
            return this.config;
        }

    }

})();