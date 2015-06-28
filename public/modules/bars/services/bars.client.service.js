'use strict';

//Bars service used for communicating with the articles REST endpoints
angular.module('bars').factory('Bars', ['$resource',
	function($resource) {
        var that = $resource('bars/:barId', {
			barId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});

        that.bars = that.query();
        return that;
	}
]);
