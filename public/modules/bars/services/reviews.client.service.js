'use strict';

//Reviews service used for communicating with the articles REST endpoints
angular.module('bars').factory('Reviews', ['$resource',
	function($resource) {
        var that = $resource('/bar/:barId/reviews/:reviewId', {
			barId: '@barID',
			reviewId: '@_id',
		}, {
			update: {
				method: 'PUT'
			}
		});
			
        return that;
	}
]);
