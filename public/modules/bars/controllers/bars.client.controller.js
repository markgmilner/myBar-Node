'use strict';

angular.module('bars').controller('BarsController', ['$scope', '$stateParams', '$location', 'Bars', 'uiGmapGoogleMapApi', '_', 
	function($scope, $stateParams, $location, Bars, uiGmapGoogleMapApi, _) {
	
		$scope.map = { center: { latitude: 34.0451919, longitude: -118.2611465 }, zoom: 15 };
		$scope.markers = [];
        uiGmapGoogleMapApi.then(function(maps) {}); 
        $scope.max = 5;

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
			$scope.bars = Bars.query(function(){
				var count = 0;
				var marker;
				_.forEach($scope.bars, function(bar){
					marker = { id:count, coords: {latitude: bar.address.latCoord, longitude: bar.address.longCoord }, options: {draggable: false}, events: {} };
					$scope.markers.push(marker);
					count = count + 1;
				});
			});
		};
		
		$scope.edit = function(bar) {
			$location.path('bars/' + bar._id + '/edit');
		}

	}
]);
