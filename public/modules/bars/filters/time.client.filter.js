'use strict';

angular.module('bars').filter('time', function() {
    return function(input) {
        var re = /(\d\d):(\d\d)/; 
        var matches = re.exec(input);
        if (matches !== null) {
            var isPM = matches[1] / 12 >= 1;
            var ampm = isPM ? 'PM' : 'AM';
            return (matches[1] % 12) + ':' + matches[2] + ' ' + ampm;
        }
        return null;
    };
});
            
