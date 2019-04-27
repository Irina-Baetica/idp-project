angular.module('myApp')

.factory('ListRezervationsRequestService', ['$http', '$templateCache', '$cookies', 'ConstValuesService',
function ($http, $templateCache, $cookies, ConstValuesService) {

    var getRezervations = function (id, cb) {
		var dataRequest = id;
		var urlRequest = ConstValuesService.deviceInfoURL;

	    $http({
	        	method: "POST", 
	            url: urlRequest + "rezervations", 
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
		getRezervations : getRezervations
	};
}]);
