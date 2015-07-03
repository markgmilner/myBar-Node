'use strict';

angular.module('bars').controller('BarsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bars', 'uiGmapGoogleMapApi',
	function($scope, $stateParams, $location, Authentication, Bars, uiGmapGoogleMapApi) {
		$scope.authentication = Authentication;
		
		$scope.create = function(barObj) {
			//TODO *********************** Send address to gmapapi to get lat/long and update bar
			var bar = new Bars(
				barObj
			);
			bar.$save(function(response) {
				$location.path('bars/' + response._id);

				$scope.name = '';
				$scope.description = '';
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

		$scope.update = function() {
			var bar = $scope.bar;

			bar.$update(function() {
				$location.path('bars/' + bar._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.bars = Bars.query();
		};

	}
]);
