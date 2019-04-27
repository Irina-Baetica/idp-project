angular.module('myApp')

.factory('GetItemsRequestService', [ '$location', '$rootScope', '$http', '$templateCache', '$cookies', 'ConstValuesService',
function ( $location, $rootScope, $http, $templateCache, $cookies, ConstValuesService) {

    var getItems = function (cb) {
		var dataRequest = true;
		var urlRequest = ConstValuesService.deviceInfoURL;

	    $http({
	        	method: "POST", 
	            url: urlRequest + "items", 
	            data: JSON.stringify(dataRequest), 
	            cache: $templateCache
	        })
	    .then(function (response) {
            if (response.data.hasOwnProperty("result")) {
                cb(null, response.data.result);
            } else {
                cb(response, null);
            }
        }, function (response) {
            cb(response, null);
        });
	};

	var reserve = function (id, book, cb) {
		var dataRequest = {
			"id": id,
			"book": book
		};
		var urlRequest = ConstValuesService.deviceInfoURL;

	    $http({
	        	method: "POST", 
	            url: urlRequest + "reserve", 
	            data: JSON.stringify(dataRequest), 
	            cache: $templateCache
	        })
	    .then(function (response) {
            if (response.data.hasOwnProperty("result")) {
                cb(null, response.data.result);
            } else {
                cb(response, null);
            }
        }, function (response) {
            cb(response, null);
        });
	};

	return {
		getItems : getItems,
		reserve : reserve
	};
}]);
