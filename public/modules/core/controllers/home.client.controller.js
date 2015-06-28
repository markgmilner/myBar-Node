'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Bars',
	function($scope, Authentication, Bars) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        $scope.bars = Bars.query();
	}
]);
