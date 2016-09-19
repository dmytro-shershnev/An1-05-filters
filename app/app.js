(function() {
	"use strict";

	angular
		.module("app", ["ngSanitize", "feature"])
		.controller("Default", Default)
		.filter("labelCase", labelCase)
		.filter("skip", skip)
		.filter("take", take);

	function Default(productData) {
		var $ctrl = this;
		$ctrl.products = productData.products;

		$ctrl.getExpiryDate = getExpiryDate;
		$ctrl.customSorter = customSorter;

  		function getExpiryDate(days) {
   			let now = new Date();
   			return now.setDate(now.getDate() + days);
   		}

		function customSorter(item) {
		   return item.expiry < 5 ? 0 : item.price;
		}

		$ctrl.htmlSnippet = 
			'Pretty text with some links:\n'+
			'http://angularjs.org/,\n'+
			'mailto:us@somewhere.org,\n'+
			'another@somewhere.org,\n'+
			'and one more: ftp://127.0.0.1/.';
	}

	function labelCase() {
		return function(input, reverse) {
			return reverse
				? angular.lowercase(input[0]) + angular.uppercase(input.substring(1))
				: angular.uppercase(input[0]) + angular.lowercase(input.substring(1))
		};
	}

	function skip() {
		return function(input, skipCount) {
			return input.slice(skipCount);
		};
	}

	function take($filter) {
		return function(input, skipCount, takeCount) {
			let tmp = $filter("skip")(input, skipCount);

			return $filter("limitTo")(tmp, takeCount);
		};
	}

	angular.element(document).ready(() => {
		angular.bootstrap(document, ["app"]);
	});

})();

















