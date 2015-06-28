'use strict';

// Setting up route
angular.module('bars').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listBars', {
			url: '/bars',
			templateUrl: 'modules/bars/views/list-bars.client.view.html'
		}).
		state('createBar', {
			url: '/bars/create',
			templateUrl: 'modules/bars/views/create-bar.client.view.html'
		}).
		state('viewBar', {
			url: '/bars/:barId',
			templateUrl: 'modules/bars/views/view-bar.client.view.html'
		}).
		state('editBar', {
			url: '/bars/:barId/edit',
			templateUrl: 'modules/bars/views/edit-bar.client.view.html'
		});
	}
]);
