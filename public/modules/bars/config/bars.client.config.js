'use strict';

// Configuring the Articles module
angular.module('bars').run(['Menus',
	function(Menus) {
        /*
		Menus.addMenuItem('topbar', 'Bars', 'bars', 'dropdown', '/bars(/create)?');
		Menus.addSubMenuItem('topbar', 'bars', 'List Bars', 'bars');
		Menus.addSubMenuItem('topbar', 'bars', 'Add New Bar', 'bars/create');
        */
	}
]);

angular.module('bars').config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCY6exoka61eGfwNXTqR-abLnZb649j8TA',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});
