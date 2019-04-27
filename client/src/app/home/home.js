angular.module('myApp')

.controller('homeController', ['$rootScope', '$scope', 'TextService',
function ($rootScope, $scope, TextService) {
	$rootScope.showLogoutButton = true;
	$rootScope.showSidenav = true;

	$scope.getTextById = function (id) {
        return TextService.getTextById(id);
    };

}]);
