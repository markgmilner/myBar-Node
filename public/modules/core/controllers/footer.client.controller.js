'use strict';
/*
 * TODO
 * - Memory management for interval promises and functions
 */

angular.module('core').controller('FooterController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
	}
]);
