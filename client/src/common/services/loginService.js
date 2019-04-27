angular.module('myApp')

.factory('LoginService', [ '$location', '$cookies', 'ConstValuesService', '$http', '$templateCache',
function ( $location, $cookies, ConstValuesService, $http, $templateCache) {

	var login = function (email, password, cb) {
        var dataRequest = {
                        "email": email,
                        "password": password
                    };
        var urlRequest = ConstValuesService.deviceInfoURL;

        $http({
                method: "POST", 
                url: urlRequest + "login", 
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
		login : login
	};
}]);
