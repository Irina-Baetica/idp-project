angular.module('myApp')

.factory('AccountService', [ '$location', '$cookies', 'ConstValuesService', '$http', '$templateCache',
function ( $location, $cookies, ConstValuesService, $http, $templateCache) {

	var create = function (email, password, id, number, cb) {
        var dataRequest = {
                        "email": email,
                        "password": password,
                        "school": id,
                        "number": number
                    };
        var urlRequest = ConstValuesService.deviceInfoURL;

        $http({
                method: "POST", 
                url: urlRequest + "account", 
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


    var getSchools = function (cb) {
        var dataRequest = true;
        var urlRequest = ConstValuesService.deviceInfoURL;

        $http({
                method: "POST", 
                url: urlRequest + "schools", 
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
		create : create,
        getSchools : getSchools
	};
}]);
