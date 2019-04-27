angular.module('myApp')

.controller('itemsController', ['$cookies', '$rootScope', '$scope', 'GetItemsRequestService', 'ConstValuesService', 'TextService',
function ($cookies, $rootScope, $scope, GetItemsRequestService, ConstValuesService, TextService) {
	$rootScope.showLogoutButton = true;
	$rootScope.showSidenav = true;

	$scope.error = false;
	$scope.success = false;

	$scope.errorResponse = "Naspa";
  
 	var getItems = function () {
 		GetItemsRequestService.getItems(
 			function (err, resp) {
 				if (resp) {
             $scope.success = true; 
             $scope.error = false;
             $scope.books = resp;
          } else {
              $scope.error = true;
              $scope.success = false;
          }
 			});
 	};

  $scope.rezerve = function (id) {
    var loginCookie = $cookies.get(ConstValuesService.loginCookieName);

    GetItemsRequestService.reserve(loginCookie, id,
      function (err, resp) {
        if (resp) {
             $scope.success = true; 
             $scope.error = false;
             getItems();
          } else {
              $scope.error = true;
              $scope.success = false;
          }
      });
  };

 	getItems();
}]);
