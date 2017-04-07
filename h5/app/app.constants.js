(function() {

  'use strict';

  angular
  .module('app')
  .constant('CONSTANTS', {
    'APP_NAME': GLOBAL_CONFIG.APP_NAME,
    'API_HOST': GLOBAL_CONFIG.API_HOST,
    'APP_CONFIG': {}
  })
  .run( ['$rootScope', 'CONSTANTS', function($rootScope, CONSTANTS) {
    $rootScope.CONSTANTS = CONSTANTS;
  }]);

})();
