'use strict';

//Bars service used for communicating with the articles REST endpoints
angular.module('bars').factory('Maps', ['$http', '_',
	function($http, _) {
        var that = {};
        var gApiKey = 'AIzaSyBL0YxPCRj5ujcgZkGlJ5SDBVAOwdL9XKI';
        var parseGeocodeResults = function(data, headersGetter) {
            data = angular.fromJson(data);
            var result = { status : data.status, results : [] };
            var res = data.results;
            _.forEach(res, function(addressResult) {
                var address = { partial_match : !!addressResult.partial_match };
                if (addressResult.geometry && addressResult.geometry.location) {
                    address.latCoord = addressResult.geometry.location.lat;
                    address.longCoord = addressResult.geometry.location.lng;
                }
                if (addressResult.formatted_address) {
                    address.formattedAddress = addressResult.formatted_address;
                }
                _.forEach(addressResult.address_components, function(component) {
                    if (component.types.length > 0) {
                        var type = component.types[0];
                        var takeShort = {'administrative_area_level_1' : true, 'route' : true};
                        address[type] = !!takeShort[type] ? component.short_name : component.long_name;
                    }
                });
                result.results.push(address);
            });
            return result;
        };
        that.geocode = function(address, suc, err){
            var base = 'https://maps.googleapis.com/maps/api/geocode/json';
            var parameters = {
                'key' : gApiKey,
                'address' : address
            };
            $http.get(base, {params : parameters, cache : true, transformResponse : parseGeocodeResults}).success(suc).error(err);
        };
        return that;
	}
]);
