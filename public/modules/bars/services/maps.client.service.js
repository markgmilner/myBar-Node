'use strict';

//Bars service used for communicating with the articles REST endpoints
angular.module('bars').factory('Maps', ['$http',
	function($http) {
        var that = {};
        var gApiKey = 'AIzaSyBL0YxPCRj5ujcgZkGlJ5SDBVAOwdL9XKI';
        that.geocode = function(address, suc, err){
            var base = 'https://maps.googleapis.com/maps/api/geocode/json';
            var parameters = {
                'key' : gApiKey,
                'address' : address
            };
            $http.get(base, {params : parameters, cache : true}).success(suc).error(err);
        };
        return that;
	}
]);
