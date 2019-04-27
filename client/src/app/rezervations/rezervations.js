/*
4399e25b-89b0-4554-9179-edf37db08a4d
*/

angular.module('myApp')

.controller('rezervationsController', ['$cookies', '$rootScope', '$scope', 'ListRezervationsRequestService', 'TextService', 'ConstValuesService',
function ($cookies, $rootScope, $scope, ListRezervationsRequestService, TextService, ConstValuesService) {
	$scope.errorMaterialIcon = ConstValuesService.errorMaterialIcon;

	$rootScope.showLogoutButton = true;
	$rootScope.showSidenav = true;

	$scope.error = false;
	$scope.success = false;

	$scope.errorResponse = "Naspa";
  
 	var getRezervations = function () {
 		var loginCookie = $cookies.get(ConstValuesService.loginCookieName);
 		ListRezervationsRequestService.getRezervations(loginCookie, 
 			function (err, resp) {
 				if (resp) {
                   $scope.success = true; 
                   $scope.error = false;
                   $scope.rezervations = resp;
                } else {
                    $scope.error = true;
                    $scope.success = false;
                }
 			});
 	};

 	getRezervations();
}]);
