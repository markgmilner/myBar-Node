'use strict';

//Reviews service used for communicating with the articles REST endpoints
angular.module('bars').factory('Reviews', ['$resource',
	function($resource) {
        var that = $resource('reviews/:reviewId', {
			reviewId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});

        that.reviews = that.query();
        return that;
	}
]);
