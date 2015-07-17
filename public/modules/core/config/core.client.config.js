'use strict';

// Setting up authrorization control
angular.module('core').run(['$rootScope', '$location', 'Authentication', '$modal',
    function($rootScope, $location, Authentication, $modal) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            var authRoles = next.data && next.data.authorizedRoles;
            if (authRoles && !Authentication.isAuthorized(authRoles)) {
                if (Authentication.isAuthenticated()) {
                    //User is not allowed; have user stay on same page
                    var modalInstance = $modal.open({
                        templateUrl: 'modules/core/views/not-authorized.client.template.html',
                        size: 'lg'
                    });
                    $location.path('/');
                } else {
                    //User is not logged in
                    Authentication.redirect = next.url;
                    $location.path('/signin');
                }
            }
        });
    }
]);

