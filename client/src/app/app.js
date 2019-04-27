angular.module('myApp', ['ngRoute', 'ngCookies', 'ngMaterial', 'ngMessages'])

.config(['$routeProvider', '$locationProvider', 
function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: 'app/home/home.html',
        controller: 'homeController'
    })
    .when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'loginController'
    })
    .when('/account', {
        templateUrl: 'app/account/account.html',
        controller: 'accountController'
    })
    .when('/rezervations', {
        templateUrl: 'app/rezervations/rezervations.html',
        controller: 'rezervationsController'
    })
    .when('/items', {
        templateUrl: 'app/items/items.html',
        controller: 'itemsController'
    });

    $locationProvider.html5Mode(true);
}])

.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
})

.controller('mainController', [ '$rootScope', '$scope', '$location', '$cookies', 'ConstValuesService', 'LogoutService', 'TextService', '$route',
function ($rootScope, $scope, $location, $cookies, ConstValuesService, LogoutService, TextService, $route) {

    $scope.$on('$locationChangeStart', function (event, next, current) {
        initPath();
        initLanguage();
    });

    $scope.getTextById = function (id) {
        return TextService.getTextById(id);
    };

    $rootScope.logout = function () {
        LogoutService.logout();
    };

    var initLanguage = function () {
        TextService.initLanguage();
    };

    var initPath = function () {
        var loginCookie = $cookies.get(ConstValuesService.loginCookieName);

        if ($location.path() == "/account") {
            $location.path('/account');
            return;
        }

        if (loginCookie === undefined) {
            console.log("ma sinucid",$location.path());
            $location.path('/login');
        } 
    };

    $rootScope.changeLanguage = function (language) {
        TextService.changeLanguage(language);
        $route.reload();   
    }; 
}]);
