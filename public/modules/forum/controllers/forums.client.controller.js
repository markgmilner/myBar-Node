'use strict';

angular.module('forums').controller('forumsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Forums',
	function($scope, $stateParams, $location, Authentication, Forums) {
		$scope.authentication = Authentication;
		$scope.newForum = {name: '', description: ''};
		
		$scope.create = function() {
			var forum = new Forums($scope.newForum);
			forum.$save(function(response) {
				$location.path('forums/' + response._id);
                //TODO this should be changed when we decide how to handle bars to keep in scope
                Forums.forums.push($scope.newForum);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(forum) {
			if (forum) {
				forum.$remove();
				for (var i in $scope.forums) {
					if ($scope.forums[i] === forum) {
						$scope.forums.splice(i, 1);
					}
				}
			} else {
				$scope.forum.$remove(function() {
					$location.path('forums');
				});
			}
		};

		$scope.update = function(forum) {
			forum.$update(function() {
				$location.path('forums/' + forum._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		$scope.find = function() {
			$scope.forums = Forums.query();
		};
	}
]);
