'use strict';

function BarObject() {
    return {
        monday : {isClosed: true, noHH: true, best: false},
        tuesday : {isClosed: true, noHH: true, best: false},
        wednesday : {isClosed: true, noHH: true, best: false},
        thursday : {isClosed: true, noHH: true, best: false},
        friday : {isClosed: true, noHH: true, best: false},
        saturday : {isClosed: true, noHH: true, best: false},
        sunday : {isClosed: true, noHH: true, best: false},
        addressLocation : {lat : 0, lng : 0}
    };
}

angular.module('bars').controller('CreateBarController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bars', 'Maps',
	function($scope, $stateParams, $location, Authentication, Bars, Maps) {
		$scope.authentication = Authentication;
        $scope.bar = new BarObject();
        $scope.hideminusbar = true;
        $scope.hideminushh = true;
        $scope.displayAddressValidation = false;
        $scope.validatedAddresses = [];
        $scope.zeroAddressesReturned = false;
        $scope.addressChoice = 0;
        var open = new Date(0,0,0,9,0,0,0);
        var close = new Date(0,0,0,2,0,0,0);
        var start = new Date(0,0,0,16,0,0,0);
        var end = new Date(0,0,0,18,0,0,0);
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
            var days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
            var convertDate = function(date) {
                var hours = date.getHours().toString(), mins = date.getMinutes().toString();
                if (hours.length === 1) hours = '0' + hours;
                if (mins.length === 1) mins = '0' + mins;
                return hours + ':' + mins;
            };
            _.forEach($scope.barHours, function(hourItem) {
                _.forEach(days, function(day) {
                    if (_.get(hourItem, day)) {
                        var d = _.get($scope.bar, day);
                        d.isClosed = false;
                        d.open = convertDate(hourItem.open);
                        d.close = convertDate(hourItem.close);
                        d.happyHour = [];
                        _.forEach($scope.hhHours, function(hhHourItem) {
                            if (_.get(hhHourItem, day)) {
                                d.noHH = false;
                                d.happyHour.push({start: convertDate(hhHourItem.start), end: convertDate(hhHourItem.end)});
                            }
                        });
                    }
                });
            });
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
        $scope.validateAddress = function() {
            var address = $scope.bar.street + ', ' + $scope.bar.city + ', ' + $scope.bar.state + ' ' + $scope.bar.zip;
            $scope.zeroAddressesReturned = false;
            Maps.geocode(address,
            function(data, status, headers, config) {
                if (data.status === 'OK') {
                    var results = data.results;
                    $scope.validatedAddresses = results;
                    if (results.length > 1 || results[0].partial_match) {
                        $scope.displayAddressValidation = true;
                    } else {
                        $scope.addBar();
                    }
                } else if (data.status === 'ZERO_RESULTS') {
                    $scope.zeroAddressesReturned = true;
                } else {
                    console.log('Address Validation Error');
                }
            },
            function(data, status, headers, config) {
                console.log('Address Geocode Error');
            });
        };
        $scope.validateAddressBack = function() {
            $scope.displayAddressValidation = false;
            $scope.validatedAddresses = [];
        };
        $scope.addBar = function() {
            $scope.addHoursToBar();
            //TODO use google api to determine proper values for below
            $scope.bar.neighborhood = $scope.bar.neighborhood.toLowerCase();
            $scope.bar.street = $scope.bar.street.toLowerCase();
            $scope.bar.city = $scope.bar.city.toLowerCase();
            $scope.bar.state = $scope.bar.state.toLowerCase();
            $scope.bar.zip = $scope.bar.zip.toLowerCase();
            var loc = $scope.validatedAddresses[$scope.addressChoice].geometry.location;
            $scope.bar.latCoord = loc.lat;
            $scope.bar.longCoord = loc.lng;
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
        $scope.testData = function() {
            $scope.bar = _.assign($scope.bar, {'price': '1', 'name': 'TestBar', 'neighborhood': 'TestNeighborhood', 'atmosphere': 'test1, test2, test3', 'type': 'test1, test2, test3', 'street': '11800 Goshen Ave', 'city': 'los angeles', 'state': 'ca', 'zip': '90049', 'deal': 'testDeal', 'instagram': 'testInsta'});
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
