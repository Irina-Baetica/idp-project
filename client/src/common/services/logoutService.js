angular.module('myApp')

.factory('LogoutService', [ '$location', '$cookies', 'ConstValuesService',
function ( $location, $cookies, ConstValuesService) {

  	var logout = function () {
  		$cookies.remove(ConstValuesService.loginCookieName);
  		$location.path('/login')
  	};

	return {
		logout : logout
	};
}]);
