(function () {

  'use strict';

  angular
  .module('app')
  .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config( $stateProvider, $urlRouterProvider ) {


    $stateProvider
    .state('main', {
      needAuth: false,
      url:'/main',
      title: "ECShop",
      templateUrl: 'modules/main/main.html'
    });

  }

})();
