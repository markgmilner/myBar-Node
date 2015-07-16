'use strict';

// Setting up route
angular.module('forums').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('listForums', {
			url: '/forums',
			templateUrl: 'modules/forum/views/forums.client.view.html'
		}).

		state('viewForum', {
			url: '/forums/:forumId',
			templateUrl: 'modules/forum/views/forum-posts.client.view.html'
		});
	}
]);
