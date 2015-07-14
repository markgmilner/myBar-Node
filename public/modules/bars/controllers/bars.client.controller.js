'use strict';

angular.module('bars').controller('BarsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bars', 'uiGmapGoogleMapApi',
	function($scope, $stateParams, $location, Authentication, Bars, uiGmapGoogleMapApi) {
		$scope.authentication = Authentication;
		
		$scope.create = function(barObj) {
			var bar = new Bars(barObj);
			bar.$save(function(response) {
				$location.path('bars/' + response._id);
                //TODO this should be changed when we decide how to handle bars to keep in scope
                Bars.bars.push(bar);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(bar) {
			if (bar) {
				bar.$remove();
				for (var i in $scope.bars) {
					if ($scope.bars[i] === bar) {
						$scope.bars.splice(i, 1);
					}
				}
			} else {
				$scope.bar.$remove(function() {
					$location.path('bars');
				});
			}
		};

		$scope.update = function(barObj) {
			barObj.$update(function() {
				$location.path('bars/' + barObj._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.bars = Bars.query();
		};

	}
]);
