angular.module('myApp')

.factory('ConstValuesService',
function () {
  	var deviceInfoURL = "http://127.0.0.1:5000/";
  	var loginCookieName = "loginCookie";
  	var languageCookieName = "languageCookie";
  	var errorMaterialIcon = "error_outline";

	return {
	   deviceInfoURL : deviceInfoURL,
	   loginCookieName : loginCookieName,
	   errorMaterialIcon : errorMaterialIcon
	};
});
