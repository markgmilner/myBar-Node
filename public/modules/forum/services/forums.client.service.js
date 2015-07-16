'use strict';

//Forums service used for communicating with the articles REST endpoints
angular.module('forums').factory('Forums', ['$resource',
	function($resource) {
        var that = $resource('forums/:forumId', {
			forumId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});

        that.forums = that.query();
        return that;
	}
]);
