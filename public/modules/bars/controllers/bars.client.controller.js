'use strict';

angular.module('bars').controller('BarsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bars', 'uiGmapGoogleMapApi',
	function($scope, $stateParams, $location, Authentication, Bars, uiGmapGoogleMapApi) {
        $scope.testsys = true;
		$scope.authentication = Authentication;
		$scope.max = 5;
		$scope.isReadonly = false;
        $scope.newReviews = {rating: 3, comment: "", timestamp: 0, user: "", good: 0, bad: 0};
        $scope.noReviews = false;
        $scope.max = 5;
        $scope.rating = 0;
        
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 15 };
        $scope.marker = { id:0, coords: {latitude: 45, longitude: -73 }, options: {draggable: false}, events: {} };
		
		$scope.hoveringOver = function(value) {
			$scope.overStar = value;
			$scope.percent = 100 * (value / $scope.max);
		};
        
        $scope.addReview = function(bar){
        	$scope.newReviews.timestamp = Date.now();
			//$scope.newReviews.user = $rootScope.username;
			$scope.bar.reviews.unshift($scope.newReviews);
			switch ($scope.newReviews.rating) {
				case 1:
					$scope.bar.star1 += 1;
					break;
				case 2:
					$scope.bar.star2 += 1;
					break;
				case 3:
					$scope.bar.star3 += 1;
					break;
				case 4:
					$scope.bar.star4 += 1;
					break;
				case 5:
					$scope.bar.star5 += 1;
					break;
			}
			//TODO  send to server
        };
        
        //TODO $scope.goodReview = function (review)
        //TODO $scope.badReview = function (review)
        //TODO $scope.removeReview = function (review)  must update rating as well on bar
        //TODO $scope.markAsFavorite = function (bar)  user sets bar as fav
             
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

		$scope.findOne = function() {
			$scope.bar = Bars.get({
				barId: $stateParams.barId
			});
			/* **********  TODO UnComment when bars have actual coords
			$scope.marker.coords.latitude = $scope.bar.latCoord;
			$scope.marker.coords.longitue = $scope.bar.longCoord;
			$scope.map.center.latitude = $scope.bar.latCoord;
			$scope.map.center.longitue = $scope.bar.longCoord;
			*/
		};
		
		uiGmapGoogleMapApi.then(function(maps) {}); 
	}
]);
