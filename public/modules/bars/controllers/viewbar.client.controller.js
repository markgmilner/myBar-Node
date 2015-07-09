'use strict';

angular.module('bars').controller('ViewBarsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bars', 'uiGmapGoogleMapApi', 'Reviews',
	function($scope, $stateParams, $location, Authentication, Bars, uiGmapGoogleMapApi, Reviews) {
        $scope.testsys = true;
		$scope.authentication = Authentication;
		$scope.max = 5;
        $scope.rating = 3;
        $scope.noReviews = false;
        $scope.newReviews = {rating: 3, review: '', good: 0, bad: 0};
        
        $scope.map = { center: { latitude: 34.0451919, longitude: -118.2611465 }, zoom: 15 };
        $scope.marker = { id:0, coords: {latitude: 34.0451919, longitude: -118.2611465 }, options: {draggable: false}, events: {} };
        
        $scope.goodReview = function (upreview){
        	upreview.good = upreview.good + 1;
        	var review = new Reviews(
				upreview
			);
			review.$update(function(response) {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        	
        };
        $scope.badReview = function (upreview){
        	upreview.bad = upreview.bad + 1;
        	var review = new Reviews(
				upreview
			);
			review.$update(function(response) {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        	
        };
        
        $scope.removeReview = function (newReview, index){
        	$scope.bar.reviews.splice(index, 1);
        	var review = new Reviews(
  	      	 	newReview
  	      	 );
  	      	 review.$remove(function(response) {
  	      	 	var a = 1; //TODO remove from Review array
  	      	 }, function(errorResponse) {
  	      	 	$scope.error = errorResponse.data.message;
  	      	 });
        };
        
        //TODO $scope.markAsFavorite = function (bar)  user sets bar as fav

		$scope.hoveringOver = function(value) {
			$scope.overStar = value;
			$scope.percent = 100 * (value / $scope.max);
		};
        
        $scope.addReview = function(bar){
			//$scope.newReviews.user = $rootScope.username;
			var temp = $scope.newReviews;
			$scope.bar.reviews.unshift(temp);
			$scope.newReviews.barName = $scope.bar.name;
			$scope.newReviews.barID = $scope.bar._id;
			var review = new Reviews(
				$scope.newReviews
			);
			review.$save(function(response) {
                Reviews.reviews.push(review);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			$scope.newReviews = {rating: 3, review: '', good: 0, bad: 0};
        };
        
		$scope.remove = function(bar) {
			if (bar) {
				bar.$remove();

				for (var i in $scope.bars) {
					if ($scope.bars[i] === bar) {
						$scope.bars.splice(i, 1);
					}
				}
				$location.path('bars');
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
				$scope.noReviews = ($scope.totalReviews === 0);
				if (!$scope.noReviews){
					$scope.bar.rating = $scope.bar.rating/$scope.totalReviews;
				}
			}
			);
			
		};
		
		uiGmapGoogleMapApi.then(function(maps) {}); 
	}
]);
