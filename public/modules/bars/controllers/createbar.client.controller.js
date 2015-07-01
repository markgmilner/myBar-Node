'use strict';

function BarObject() {
    return {
        monday : {isClosed: true, noHH: true, best: false},
        tuesday : {isClosed: true, noHH: true, best: false},
        wednesday : {isClosed: true, noHH: true, best: false},
        thursday : {isClosed: true, noHH: true, best: false},
        friday : {isClosed: true, noHH: true, best: false},
        saturday : {isClosed: true, noHH: true, best: false},
        sunday : {isClosed: true, noHH: true, best: false}
    };
}

angular.module('bars').controller('CreateBarController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bars',
	function($scope, $stateParams, $location, Authentication, Bars) {
		$scope.authentication = Authentication;
        $scope.bar = new BarObject();
        $scope.hideminusbar = true;
        $scope.hideminushh = true;
        var open = '10:00';
        var close = '02:00';
        var start = '16:00';
        var end = '18:00';
        $scope.barHours =
                [
                    {
                        monday: true,
                        tuesday: true,
                        wednesday: true,
                        thursday: true,
                        friday: true,
                        saturday: true,
                        sunday: true,
                        open: open,
                        close: close
                    }
                ];
        $scope.hhHours =
                [
                    {
                        monday: true,
                        tuesday: true,
                        wednesday: true,
                        thursday: true,
                        friday: true,
                        saturday: false,
                        sunday: false,
                        start: start,
                        end: end
                    }
                ];
        $scope.showAddBarHours = function(hours) {
            return hours === $scope.barHours[$scope.barHours.length - 1];
        };
        $scope.showRemoveBarHours = function() {
            return 1 !== $scope.barHours[$scope.barHours.length];
        };
        $scope.showRemoveHHHours = function() {
            return 1 !== $scope.hhHours[$scope.hhHours.length];
        };
        $scope.showAddHHHours = function(hours) {
            return hours === $scope.hhHours[$scope.hhHours.length - 1];
        };
        $scope.addBarHours = function() {
            $scope.hideminusbar = false;
            $scope.addBaseBarHours();
        };
        $scope.removeBarHours = function(hours) {
            var index = $scope.barHours.indexOf(hours);
            if (index > -1)
                $scope.barHours.splice(index, 1);
            if ($scope.barHours.length === 1)
            {
                $scope.hideminusbar = true;
            }
        };
        $scope.removeHHHours = function(hours) {
            var index = $scope.hhHours.indexOf(hours);
            if (index > -1)
                $scope.hhHours.splice(index, 1);
            if ($scope.hhHours.length === 1)
            {
                $scope.hideminushh = true;
            }
        };
        $scope.addHHHours = function() {
            $scope.hideminushh = false;
            $scope.addBaseHHHours();
        };
        $scope.addHoursToBar = function() {
            var i;
            var j;
            for (i = 0; i < $scope.barHours.length; i++)
            {
                if ($scope.barHours[i].monday)
                {
                    var monday = $scope.bar.monday;
                    monday.isClosed = false;
                    monday.open = $scope.barHours[i].open;
                    monday.close = $scope.barHours[i].close;
                    monday.happyHour = [];
                    for (j = 0; j < $scope.hhHours.length; j++)
                    {
                        if ($scope.hhHours[j].monday)
                        {
                            monday.noHH = false;
                            monday.happyHour.push({start: $scope.hhHours[j].start, end: $scope.hhHours[j].end});
                        }
                    }
                }
                if ($scope.barHours[i].tuesday)
                {
                    var tuesday = $scope.bar.tuesday;
                    tuesday.isClosed = false;
                    tuesday.open = $scope.barHours[i].open;
                    tuesday.close = $scope.barHours[i].close;
                    tuesday.happyHour = [];
                    for (j = 0; j < $scope.hhHours.length; j++)
                    {
                        if ($scope.hhHours[j].tuesday)
                        {
                            tuesday.noHH = false;
                            tuesday.happyHour.push({start: $scope.hhHours[j].start, end: $scope.hhHours[j].end});
                        }
                    }
                }
                if ($scope.barHours[i].wednesday)
                {
                    var wednesday = $scope.bar.wednesday;
                    wednesday.isClosed = false;
                    wednesday.open = $scope.barHours[i].open;
                    wednesday.close = $scope.barHours[i].close;
                    wednesday.happyHour = [];
                    for (j = 0; j < $scope.hhHours.length; j++)
                    {
                        if ($scope.hhHours[j].wednesday)
                        {
                            wednesday.noHH = false;
                            wednesday.happyHour.push({start: $scope.hhHours[j].start, end: $scope.hhHours[j].end});
                        }
                    }
                }
                if ($scope.barHours[i].thursday)
                {
                    var thursday = $scope.bar.thursday;
                    thursday.isClosed = false;
                    thursday.open = $scope.barHours[i].open;
                    thursday.close = $scope.barHours[i].close;
                    thursday.happyHour = [];
                    for (j = 0; j < $scope.hhHours.length; j++)
                    {
                        if ($scope.hhHours[j].thursday)
                        {
                            thursday.noHH = false;
                            thursday.happyHour.push({start: $scope.hhHours[j].start, end: $scope.hhHours[j].end});
                        }
                    }
                }
                if ($scope.barHours[i].friday)
                {
                    var friday = $scope.bar.friday;
                    friday.isClosed = false;
                    friday.open = $scope.barHours[i].open;
                    friday.close = $scope.barHours[i].close;
                    friday.happyHour = [];
                    for (j = 0; j < $scope.hhHours.length; j++)
                    {
                        if ($scope.hhHours[j].friday)
                        {
                            friday.noHH = false;
                            friday.happyHour.push({start: $scope.hhHours[j].start, end: $scope.hhHours[j].end});
                        }
                    }
                }
                if ($scope.barHours[i].saturday)
                {
                    var saturday = $scope.bar.saturday;
                    saturday.isClosed = false;
                    saturday.open = $scope.barHours[i].open;
                    saturday.close = $scope.barHours[i].close;
                    saturday.happyHour = [];
                    for (j = 0; j < $scope.hhHours.length; j++)
                    {
                        if ($scope.hhHours[j].saturday)
                        {
                            saturday.noHH = false;
                            saturday.happyHour.push({start: $scope.hhHours[j].start, end: $scope.hhHours[j].end});
                        }
                    }
                }
                if ($scope.barHours[i].sunday)
                {
                    var sunday = $scope.bar.sunday;
                    sunday.isClosed = false;
                    sunday.open = $scope.barHours[i].open;
                    sunday.close = $scope.barHours[i].close;
                    sunday.happyHour = [];
                    for (j = 0; j < $scope.hhHours.length; j++)
                    {
                        if ($scope.hhHours[j].sunday)
                        {
                            sunday.noHH = false;
                            sunday.happyHour.push({start: $scope.hhHours[j].start, end: $scope.hhHours[j].end});
                        }
                    }
                }
            }
        };
        /*
        $scope.uploadFile = function(id) {
            var file = $scope.barThumb;
            console.info('file is ' + JSON.stringify(file));
            var uploadUrl = "/php/upload.php";
            fileUpload.uploadFileToUrl(file, uploadUrl, id);
        };
        $scope.pop = function(type, title, message) {
            toaster.pop(type, title, message);
        };
        */
        $scope.addBar = function() {
            $scope.addHoursToBar();
            $scope.bar.neighborhood = $scope.bar.neighborhood.toLowerCase();
            $scope.bar.street = $scope.bar.street.toLowerCase();
            $scope.bar.city = $scope.bar.city.toLowerCase();
            $scope.bar.state = $scope.bar.state.toLowerCase();
            $scope.bar.zip = $scope.bar.zip.toLowerCase();
            $scope.bar.atmosphere = $scope.bar.atmosphere.toLowerCase();
            $scope.bar.type = $scope.bar.type.toLowerCase();
            $scope.bar.star1 = $scope.bar.star2 = $scope.bar.star3 = $scope.bar.star4 = $scope.bar.star5 = 0;
            var atm = $scope.bar.atmosphere.split(',');
            $scope.bar.atmosphere = [];
            var i;
            for (i = 0; i < atm.length; i++) {
                $scope.bar.atmosphere.push(atm[i].toString().trim());
            }
            var type = $scope.bar.type.split(',');
            $scope.bar.type = [];
            for (i = 0; i < type.length; i++) {
                $scope.bar.type.push(type[i].toString().trim());
            }
            $scope.bar.reviews = [];
            //$scope.create($scope.bar);
            /*
            $scope.bar.img = [];
            if ($scope.barThumb) {
                $scope.bar.thumb = $scope.barThumb.name;
            }
            */
            /*
            $http.post('/php/addBar.php', $scope.bar)
                    .success(function(response, status, headers, config)
                    {
                        if (response.success === 0) {
                            $scope.pop('error', "ERROR!", response.message);
                        }
                        else if (response.success === 1) {
                            $scope.pop('success', "SUCCESS!", $scope.bar.name + " added!");
                            $scope.uploadFile(response.id);
                        }
                        var temp = $scope.bar.name;
                        $scope.bar = {};
                        document.getElementById('photo').value = null;
                        $scope.setBaseBarHours();
                        $scope.setBaseHHHours();
                        console.log(status + ' - ' + response.message);
                        $location.url('/viewBar/' + temp);
                    })
                    .error(function(data, status)
                    {
                        $scope.pop('error', "ERROR!", "OOPS! Something went wrong!\n" + data);
                        console.log('error');
                    });
                    */
        };
        $scope.testData = function() {
            $scope.bar = _.assign($scope.bar, {'price': '1', 'name': 'TestBar', 'neighborhood': 'TestNeighborhood', 'atmosphere': 'test1, test2, test3', 'type': 'test1, test2, test3', 'street': 'testStreet', 'city': 'testCity', 'state': 'testState', 'zip': 'testZip', 'deal': 'testDeal', 'instagram': 'testInsta'});
        };
        $scope.clear = function() {
            $scope.bar = new BarObject();
            $scope.hideminusbar = true;
            $scope.hideminushh = true;
            $scope.setBaseBarHours();
            $scope.setBaseHHHours();
            document.getElementById('photo').value = null;
        };
        $scope.setBaseBarHours = function() {
            $scope.barHours =
                    [
                        {
                            monday: true,
                            tuesday: true,
                            wednesday: true,
                            thursday: true,
                            friday: true,
                            saturday: true,
                            sunday: true,
                            open: open,
                            close: close
                        }
                    ];
            console.log('Set bar hours');
        };
        $scope.setBaseHHHours = function() {

            $scope.hhHours =
                    [
                        {
                            monday: true,
                            tuesday: true,
                            wednesday: true,
                            thursday: true,
                            friday: true,
                            saturday: false,
                            sunday: false,
                            start: start,
                            end: end
                        }
                    ];
            console.log('Set hh hours');
        };
        $scope.addBaseBarHours = function() {
            $scope.barHours.push(
                    {
                        monday: true,
                        tuesday: true,
                        wednesday: true,
                        thursday: true,
                        friday: true,
                        saturday: true,
                        sunday: true,
                        open: open,
                        close: close
                    }
            );
        };
        $scope.addBaseHHHours = function() {

            $scope.hhHours.push(
                    {
                        monday: true,
                        tuesday: true,
                        wednesday: true,
                        thursday: true,
                        friday: true,
                        saturday: false,
                        sunday: false,
                        start: start,
                        end: end
                    }
            );
        };
    }
]);
