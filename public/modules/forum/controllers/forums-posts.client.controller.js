'use strict';

angular.module('forums').controller('forumsPostsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Forums',
function($scope, $stateParams, $location, Authentication, Forums) {
	$scope.authentication = Authentication;
	$scope.newPost = {text: '', good: 0, bad: 0};

	$scope.add = function(post) {
		post.posts.push({text: '', good: 0, bad: 0, posts: []});
	};

	$scope.goodPost = function (){
		$scope.newPost.good = $scope.newpost.good + 1;
		$scope.update();
	};
	$scope.badPost = function (){
		$scope.newPost.good = $scope.newpost.bad + 1;
		$scope.update();
	};

	$scope.removePost = function (newReview, index){
		/*var review = new Reviews(newReview);
		review.$remove(function(response) {
		$scope.reviews.splice(index, 1);
		}, function(errorResponse) {
		$scope.error = errorResponse.data.message;
		});*/
	};

	$scope.post = function(){
		//$scope.netPost.user = currentUser;
		$scope.forum.posts.push($scope.newPost);
		$scope.newPost = {text: '', good: 0, bad: 0};
		//$scope.update();
		$scope.forum.$update(function() {
		}, function (errorResponse) {
			$scope.error = errorResponse.data.message;
		});

	};

	$scope.update = function(){
		$scope.forum.$update(function() {
		}, function (errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.findOne = function() {
		if($stateParams.forumId === '')
		$location.path('forums');
		$scope.forum = Forums.get({
			forumId: $stateParams.forumId
		});
	};
}
]);
