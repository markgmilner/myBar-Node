'use strict';

angular.module('bars').controller('rootController', ['$scope', '$stateParams', '$location', 'Authentication',
	function($scope, $stateParams, $location, Authentication) {
        $scope.authentication = Authentication;
        $scope.date = new Date();
        $scope.day = $scope.date.getDay();
	}
]);
