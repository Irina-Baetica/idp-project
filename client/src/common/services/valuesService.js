angular.module('myApp')

.factory('ConstValuesService',
function () {
  	var deviceInfoURL = "http://0.0.0.0:5000/";
  	var loginCookieName = "loginCookie";
  	var languageCookieName = "languageCookie";
  	var errorMaterialIcon = "error_outline";

	return {
	   deviceInfoURL : deviceInfoURL,
	   loginCookieName : loginCookieName,
	   errorMaterialIcon : errorMaterialIcon
	};
});
