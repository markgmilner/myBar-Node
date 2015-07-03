'use strict';

angular.module('bars').controller('ViewBarsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bars', 'uiGmapGoogleMapApi',
	function($scope, $stateParams, $location, Authentication, Bars, uiGmapGoogleMapApi) {
        $scope.testsys = true;
		$scope.authentication = Authentication;
		$scope.max = 5;
		$scope.isReadonly = false;
        $scope.newReviews = {rating: 3, review: "", addedBy: "", good: 0, bad: 0};
        $scope.noReviews = false;
        $scope.max = 5;
        $scope.rating = 0;
        
        $scope.map = { center: { latitude: 34.0451919, longitude: -118.2611465 }, zoom: 15 };
        $scope.marker = { id:0, coords: {latitude: 34.0451919, longitude: -118.2611465 }, options: {draggable: false}, events: {} };
		
		$scope.hoveringOver = function(value) {
			$scope.overStar = value;
			$scope.percent = 100 * (value / $scope.max);
		};
        
        $scope.addReview = function(bar){
			//$scope.newReviews.user = $rootScope.username;
			$scope.bar.reviews.unshift($scope.newReviews);
			$scope.newReviews.barName = $scope.bar.name;
			$scope.newReviews.barID = $scope.bar._id;
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
			//TODO update bar with star
			//TODO  review add
        };
        
        //TODO $scope.goodReview = function (review)
        //TODO $scope.badReview = function (review)
        //TODO $scope.removeReview = function (review)  must update rating as well on bar
        //TODO $scope.markAsFavorite = function (bar)  user sets bar as fav

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

		$scope.findOne = function() {
			$scope.bar = Bars.get({
				barId: $stateParams.barId
			}, function(){
				$scope.marker.coords.latitude = $scope.bar.latCoord;
				$scope.marker.coords.longitude = $scope.bar.longCoord;
				$scope.map.center.latitude = $scope.bar.latCoord;
				$scope.map.center.longitude = $scope.bar.longCoord;
				$scope.totalReviews = $scope.bar.reviews.length;
				console.log('totalreviews:' + $scope.totalReviews);
				$scope.noReviews = ($scope.totalReviews == 0);
				if (!$scope.noReviews){
					$scope.rating = ($scope.bar.star1 + ($scope.bar.star2 * 2) + ($scope.bar.star3 * 3) + ($scope.bar.star4 * 4) + ($scope.bar.star5 * 5)) / ($scope.totalReviews);
				}
				console.log('rating:' + $scope.rating);
			}
			);
			
		};
		
		uiGmapGoogleMapApi.then(function(maps) {}); 
	}
]);
