angular.module('myApp')

.controller('loginController', ['$timeout', '$rootScope', '$scope', '$location', '$cookies', 'ConstValuesService', 'TextService', '$http', '$templateCache', 'LoginService',
function ($timeout, $rootScope, $scope, $location, $cookies, ConstValuesService, TextService, $http, $templateCache, LoginService) {
    $rootScope.showLogoutButton = false;
    $rootScope.showSidenav = false;

    var onSuccess = function (data) {
        console.log("eroare");
    };

    var onError = function (data) {
        console.log("succes");
    };

    // $scope.login = function () {
    //     if (!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($scope.email))) {
    //         console.log("sth1");
    //         return;
    //     }

    //     if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($scope.password))) {
    //         console.log("sth2");
    //         return;
    //     }

    //     LoginService.login($scope.email, $scope.password, onSuccess, onError);
    // };
    $scope.login = function () {
        if (!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($scope.email))) {
                    console.log("sunt aici1");
            return;
        }

        if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($scope.password))) {
                    console.log("sunt aici2",$scope.password);
            return;
        }

        LoginService.login($scope.email, $scope.password, 
            function (err, resp) {
                if (resp) {
                    $cookies.put(ConstValuesService.loginCookieName, resp);
                    $location.path('/home');
                } else {
                    $scope.error = true;
                    $timeout(function() {$scope.error = false;}, 5000);
                    console.log("error"); 
                }
            });

        // $cookies.put(ConstValuesService.loginCookieName, $scope.email);
        // $location.path('/home');
    };

    $scope.newAccount = function () {
        console.log("why?");
        if (!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($scope.email))) {
            console.log("sth1");
            //return;
        }

        $cookies.put(ConstValuesService.loginCookieName, $scope.email);
        console.log($location.path());
        $location.path('/account');   
        console.log($location.path());     
        //$scope.$apply();
        //console.log("why?X2");
    };

    $scope.getTextById = function (id) {
        return TextService.getTextById(id);
    };
}]);
