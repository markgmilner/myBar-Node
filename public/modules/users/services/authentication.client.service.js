'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$location', '_',
	function($location, _) {
		var that = this;
        that.user = window.user;
        that.isAuthenticated = function() {
            return !!that.user;
        };
        that.isAuthorized = function(roles) {
            return that.user && _.intersection(that.user.roles, roles).length > 0;
        };
		return that;
	}
]);
