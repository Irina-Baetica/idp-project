angular.module('myApp')

.controller('accountController', ['$timeout', '$rootScope', '$scope', '$location', '$cookies', 'ConstValuesService', 'TextService', '$http', '$templateCache', 'LoginService', 'AccountService',
function ($timeout, $rootScope, $scope, $location, $cookies, ConstValuesService, TextService, $http, $templateCache, LoginService, AccountService) {
    $rootScope.showLogoutButton = false;
    $rootScope.showSidenav = false;
    $scope.error = false;
    $scope.school = null;
    $scope.number = null;

    $scope.newAccount = function () {
        console.log("sunt aici");
        if (!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($scope.email))) {
                    console.log("sunt aici1");
            return;
        }

        if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($scope.password))) {
                    console.log("sunt aici2",$scope.password);
            return;
        }

        if (!(/^(.+\d)$/.test($scope.number))) {
            return;
        }

        if (!$scope.school) {
            return;
        }

        AccountService.create($scope.email, $scope.password, $scope.school, $scope.number,
            function (err, resp) {
                if (resp) {
                    $location.path('/login');
                } else {
                    $scope.error = true;
                    $timeout(function() {$scope.error = false;}, 5000);
                    console.log("error"); 
                }
            });
    };

    $scope.displaySchool = function (school) {
        return school.name + ", " + school.street + ", " + school.nr + ", " + school.city + ", " + school.county;
    };

    $scope.getTextById = function (id) {
        return TextService.getTextById(id);
    };

    $scope.changedValue = function (school) {
        $scope.school = school.id;
        console.log($scope.school);
    };

    var getSchools = function () {
        AccountService.getSchools(function (err, resp) {
            if (resp) {
                $scope.schools = resp;
            } else {
                $scope.error = true;
                $timeout(function() {$scope.error = false;}, 5000);
                console.log("error");
            }
        });
    };

    getSchools();

}]);
