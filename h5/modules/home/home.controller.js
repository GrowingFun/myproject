(function () {

	'use strict';

	angular
		.module('app')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$rootScope', '$timeout', '$location', '$state', 'API', 'ENUM', '$window', 'AppAuthenticationService', 'CartModel','ConfigModel'];

	function HomeController($scope, $rootScope, $timeout, $location, $state, API, ENUM, $window, AppAuthenticationService, CartModel,ConfigModel) {

		var MAX_BANNERS = 10;
		var MAX_NOTICES = 5;
		var MAX_CATEGORIES = 4;
		var MAX_PRODUCTS = 4;

		$scope.banners = [];
		$scope.notices = [];

		// var emptyCategory = {};
		// var emptyCategories = [];

		// for ( var i = 0; i < MAX_CATEGORIES; ++i ) {
		//   emptyCategories.push( emptyCategory );
		// }

		// $scope.categories = emptyCategories;

		var emptyProduct = {};
		var emptyProducts = [];

		for (var i = 0; i < MAX_PRODUCTS; ++i) {
			emptyProducts.push(emptyProduct);
		}

		$scope.topSale = emptyProducts;
		$scope.newArrival = emptyProducts;
		$scope.editorChoice = emptyProducts;

		$scope.touchSearch = _touchSearch;
		$scope.touchBanner = _touchBanner;
		$scope.touchNotice = _touchNotice;
		$scope.touchCategory = _touchCategory;
		$scope.touchProduct = _touchProduct;
		$scope.touchGroup = _touchGroup;

		$scope.reload = _reload;
		$scope.loadMore = _loadMore;

		$scope.cartModel = CartModel;

		function _touchSearch() {
			$state.go('search', {});
		}

		function _touchBanner(banner) {
			if (!banner.link || !banner.link.length) {
				$scope.toast('没有链接');
				return;
			}

			$window.location.href = banner.link;
		}

		function _touchNotice(notice) {
			var url = '';
			if (notice.url.indexOf("http://", 0) == -1) {
				url = "http://" + notice.url;
			} else {
				url = notice.url;
			}
			$window.location.href = url;
		}

		function _touchGroup(group) {
			$state.go('home', {

			});
		}

		function _touchCategory(category) {
			$state.go('search-result', {
				sortKey: ENUM.SORT_KEY.DEFAULT,
				sortValue: ENUM.SORT_VALUE.DEFAULT,

				keyword: null,
				category: category.id,

				navTitle: category.name,
				navStyle: 'default'
			});
		}

		function _touchProduct(product) {
			$state.go('product', {
				product: product.id,
			});
		}

		function _reloadBanners() {
			API.banner
				.list({
					page: 1,
					per_page: MAX_BANNERS
				})
				.then(function (banners) {
					$scope.banners = banners;
					var timer = $timeout(function () {
						$scope.bannerSwiper = new Swiper('.home-banner', {
							pagination: '.swiper-pagination',
							paginationClickable: true,
							spaceBetween: 30,
							centeredSlides: true,
							autoplay: 1500,
							autoplayDisableOnInteraction: false,
							loop: true,
						});
					}, 1);
				});
		}

		function _reloadNotices() {
			API.notice
				.list({
					page: 1,
					per_page: MAX_NOTICES
				})
				.then(function (notices) {
					$scope.notices = notices;
					var timer = $timeout(function () {
						$scope.noticeSwiper = new Swiper('.notice-slide', {
							spaceBetween: 30,
							centeredSlides: true,
							autoplay: 1500,
							autoplayDisableOnInteraction: false,
							direction: 'vertical',
							loop: true
						});
					}, 1);
				});
		}

		function _reloadCategories() {
			API.category
				.list({
					page: 1,
					per_page: MAX_CATEGORIES
				})
				.then(function (categories) {
					$scope.categories = categories;
				});
		}

		function _reloadEditorChoice() {
			API.product
				.list({
					page: 1,
					per_page: MAX_PRODUCTS,
					sort_key: ENUM.SORT_KEY.POPULAR,
					sort_value: ENUM.SORT_VALUE.DESC
				})
				.then(function (products) {
					$scope.editorChoice = products;
				});
		}

		function _reloadTopSale() {
			API.product
				.list({
					page: 1,
					per_page: MAX_PRODUCTS,
					sort_key: ENUM.SORT_KEY.SALE,
					sort_value: ENUM.SORT_VALUE.DESC
				})
				.then(function (products) {
					$scope.topSale = products;
				});
		}

		function _reloadNewArrival() {
			API.product
				.list({
					page: 1,
					per_page: MAX_PRODUCTS,
					sort_key: ENUM.SORT_KEY.DATE,
					sort_value: ENUM.SORT_VALUE.DESC
				})
				.then(function (products) {
					$scope.newArrival = products;
				});
		}

		function _reload() {

			if(!AppAuthenticationService.getOpenId()){

                if ($rootScope.isWeixin()) {
                    $state.go('wechat-authbase', {});
                    return;
                }
            }

			_reloadBanners();
			_reloadNotices();
			// _reloadCategories();
			_reloadEditorChoice();
			_reloadNewArrival();
			_reloadTopSale();
			ConfigModel.fetch();

			$scope.cartModel.reloadIfNeeded();
		}

		function _loadMore() {
			// TODO:
		}

		_reload();
	}

})();