'use strict';

angular.module('bars').controller('CreateBarController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bars',
	function($scope, $stateParams, $location, Authentication, Bars) {
		$scope.authentication = Authentication;
        $scope.bar = {};
        $scope.hideminusbar = true;
        $scope.hideminushh = true;
        var open = new Date(2014, 1, 1, 11, 0, 0, 0);
        var close = new Date(2014, 1, 1, 3, 0, 0, 0);
        var start = new Date(2014, 1, 1, 16, 0, 0, 0);
        var end = new Date(2014, 1, 1, 19, 0, 0);
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
            $scope.bar.monday = {isClosed: true, noHH: true};
            $scope.bar.tuesday = {isClosed: true, noHH: true};
            $scope.bar.wednesday = {isClosed: true, noHH: true};
            $scope.bar.thursday = {isClosed: true, noHH: true};
            $scope.bar.friday = {isClosed: true, noHH: true};
            $scope.bar.saturday = {isClosed: true, noHH: true};
            $scope.bar.sunday = {isClosed: true, noHH: true};
            var i;
            var j;
            for (i = 0; i < $scope.barHours.length; i++)
            {
                if ($scope.barHours[i].monday)
                {
                    $scope.bar.monday =
                            {
                                isClosed: false,
                                noHH: true,
                                open: $scope.barHours[i].open,
                                close: $scope.barHours[i].close,
                                happyHour: []
                            };
                    for (j = 0; j < $scope.hhHours.length; j++)
                    {
                        if ($scope.hhHours[j].monday)
                        {
                            $scope.bar.monday.noHH = false;
                            $scope.bar.monday.happyHour.push({start: $scope.hhHours[j].start, end: $scope.hhHours[j].end});
                        }
                    }
                }
                if ($scope.barHours[i].tuesday)
                {
                    $scope.bar.tuesday =
                            {
                                isClosed: false,
                                noHH: true,
                                open: $scope.barHours[i].open,
                                close: $scope.barHours[i].close,
                                happyHour: []
                            };
                    for (j = 0; j < $scope.hhHours.length; j++)
                    {
                        if ($scope.hhHours[j].tuesday)
                        {
                            $scope.bar.tuesday.noHH = false;
                            $scope.bar.tuesday.happyHour.push({start: $scope.hhHours[j].start, end: $scope.hhHours[j].end});
                        }
                    }
                }
                if ($scope.barHours[i].wednesday)
                {
                    $scope.bar.wednesday =
                            {
                                isClosed: false,
                                noHH: true,
                                open: $scope.barHours[i].open,
                                close: $scope.barHours[i].close,
                                happyHour: []
                            };
                    for (j = 0; j < $scope.hhHours.length; j++)
                    {
                        if ($scope.hhHours[j].wednesday)
                        {
                            $scope.bar.wednesday.noHH = false;
                            $scope.bar.wednesday.happyHour.push({start: $scope.hhHours[j].start, end: $scope.hhHours[j].end});
                        }
                    }
                }
                if ($scope.barHours[i].thursday)
                {
                    $scope.bar.thursday =
                            {
                                isClosed: false,
                                noHH: true,
                                open: $scope.barHours[i].open,
                                close: $scope.barHours[i].close,
                                happyHour: []
                            };
                    for (j = 0; j < $scope.hhHours.length; j++)
                    {
                        if ($scope.hhHours[j].thursday)
                        {
                            $scope.bar.thursday.noHH = false;
                            $scope.bar.thursday.happyHour.push({start: $scope.hhHours[j].start, end: $scope.hhHours[j].end});
                        }
                    }
                }
                if ($scope.barHours[i].friday)
                {
                    $scope.bar.friday =
                            {
                                isClosed: false,
                                noHH: true,
                                open: $scope.barHours[i].open,
                                close: $scope.barHours[i].close,
                                happyHour: []
                            };
                    for (j = 0; j < $scope.hhHours.length; j++)
                    {
                        if ($scope.hhHours[j].friday)
                        {
                            $scope.bar.friday.noHH = false;
                            $scope.bar.friday.happyHour.push({start: $scope.hhHours[j].start, end: $scope.hhHours[j].end});
                        }
                    }
                }
                if ($scope.barHours[i].saturday)
                {
                    $scope.bar.saturday =
                            {
                                isClosed: false,
                                noHH: true,
                                open: $scope.barHours[i].open,
                                close: $scope.barHours[i].close,
                                happyHour: []
                            };
                    for (j = 0; j < $scope.hhHours.length; j++)
                    {
                        if ($scope.hhHours[j].saturday)
                        {
                            $scope.bar.saturday.noHH = false;
                            $scope.bar.saturday.happyHour.push({start: $scope.hhHours[j].start, end: $scope.hhHours[j].end});
                        }
                    }
                }
                if ($scope.barHours[i].sunday)
                {
                    $scope.bar.sunday =
                            {
                                isClosed: false,
                                noHH: true,
                                open: $scope.barHours[i].open,
                                close: $scope.barHours[i].close,
                                happyHour: []
                            };
                    for (j = 0; j < $scope.hhHours.length; j++)
                    {
                        if ($scope.hhHours[j].sunday)
                        {
                            $scope.bar.sunday.noHH = false;
                            $scope.bar.sunday.happyHour.push({start: $scope.hhHours[j].start, end: $scope.hhHours[j].end});
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
            $scope.create($scope.bar);
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
        /*
        $scope.testData = function() {
            $scope.bar = {"price": "$", "name": "TestBar", "neighborhood": "TestNeighborhood", "atmosphere": "test1, test2, test3", "type": "test1, test2, test3", "street": "testStreet", "city": "testCity", "state": "testState", "zip": "testZip", "deal": "testDeal", "instagram": "testInsta"};
        };
        */
        $scope.clear = function() {
            $scope.bar = {price: '$'};
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
