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

angular.module('bars').controller('EditBarController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bars', 'Maps', '_',
	function($scope, $stateParams, $location, Authentication, Bars, Maps, _) {
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
        $scope.barHours = [];
        $scope.hhHours = [];
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

		//TODO File Upload
		
        $scope.validateAddress = function() {
            var address = $scope.bar.address.street + ', ' + $scope.bar.address.city + ',address. ' + $scope.bar.address.state + ' ' + $scope.bar.address.zip;
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
            //TODO should change to check for input on address fields before clearing addresses
            $scope.validatedAddresses = [];
        };
        $scope.addBar = function() {
            $scope.addHoursToBar();
            var bar = $scope.bar;
            var address = $scope.validatedAddresses[$scope.addressChoice];
            bar.address = _.pick(address, ['formattedAddress', 'latCoord', 'longCoord']);
            bar.address.neighborhood = address.neighborhood || bar.neighborhood;
            //TODO failsafes for these
            bar.address.street = [address.street_number, address.route].join(' '); 
            bar.address.city = address.locality; 
            bar.address.state = address.administrative_area_level_1; 
            bar.address.zip = address.postal_code; 

            bar.atmosphere = bar.atmosphere.toLowerCase();
            bar.type = bar.type.toLowerCase();
            var atm = bar.atmosphere.split(',');
            bar.atmosphere = [];
            var i;
            for (i = 0; i < atm.length; i++) {
                bar.atmosphere.push(atm[i].toString().trim());
            }
            var type = bar.type.split(',');
            bar.type = [];
            for (i = 0; i < type.length; i++) {
                bar.type.push(type[i].toString().trim());
            }
            bar.reviews = [];
            $scope.update($scope.bar);
            /*
            $scope.bar.img = [];
            if ($scope.barThumb) {
                $scope.bar.thumb = $scope.barThumb.name;
            }
            */
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
        
        $scope.findOne = function() {
			$scope.bar = Bars.get({
				barId: $stateParams.barId
			}, function(){
				$scope.edit();	
			}
			);
			
		};
		
		$scope.edit = function(){
			var days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
            var convertDate = function(date) {
            	date = date.split(':');
            	var hours = date[0], mins = date[1];
				date = new Date(0,0,0,hours, mins, 0,0);                
                return date;
            };

			var i;
			var j;
			var flag;
            _.forEach(days, function(day) {
            	var dayObj = _.get($scope.bar, day);
            	if (dayObj.isClosed === false){
            		flag = false;
            		for (i=0; i<$scope.barHours.length; i++)
            		{
            			if ($scope.barHours[i].open.getTime() === convertDate(dayObj.open).getTime() && $scope.barHours[i].close.getTime() === convertDate(dayObj.close).getTime())
            			{
            				flag = true;
            				$scope.barHours[i][day] = true;
            			}
            		}
                    if (flag === false) $scope.barHours.push({[day]: true, open: convertDate(dayObj.open), close: convertDate(dayObj.close)});
                    if (dayObj.noHH !== true)
                    {
                        for (i = 0; i < dayObj.happyHour.length; i++)
                        {
                        	flag = false;
                        	for (j=0; j<$scope.hhHours.length; j++)
							{
								if ($scope.hhHours[j].start.getTime() === convertDate(dayObj.happyHour[i].start).getTime() && $scope.hhHours[j].end.getTime() === convertDate(dayObj.happyHour[i].end).getTime())
								{
									flag = true;
									$scope.hhHours[j][day] = true;
								}
							}
                            if (flag === false) $scope.hhHours.push({[day]: true, start: convertDate(dayObj.happyHour[i].start), end: convertDate(dayObj.happyHour[i].end)});
                        }
                    }
                }
            });
			if ($scope.barHours.length === 1) {
				$scope.hideminusbar = true;
			}
			else
			{
				$scope.hideminusbar = false;
			}
			if ($scope.hhHours.length === 1) {
				$scope.hideminushh = true;
			}
			else
			{
				$scope.hideminushh = false;
			}
			var temp = '';
			for (i = 0; i < $scope.bar.atmosphere.length; i++) {
				temp = temp.concat($scope.bar.atmosphere[i] + ', ');
			}
			temp = temp.substring(0, temp.length - 2);
			$scope.bar.atmosphere = temp;
			temp = '';
			for (i = 0; i < $scope.bar.type.length; i++) {
				temp = temp.concat($scope.bar.type[i] + ', ');
			}
			temp = temp.substring(0, temp.length - 2);
			$scope.bar.type = temp;
		};
    }
]);
