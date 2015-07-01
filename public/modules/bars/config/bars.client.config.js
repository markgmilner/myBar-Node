'use strict';

// Configuring the Articles module
angular.module('bars').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        /*
		Menus.addMenuItem('topbar', 'Playlists', 'playlists', 'dropdown');
		Menus.addSubMenuItem('topbar', 'playlists', 'List Playlists', 'playlists');
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
