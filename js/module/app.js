/**
 * Created by song on 2015/1/19.
 */
var ngSoong = angular.module('ngSoong', ['ngRoute', 'ngDirective']);

ngSoong.config(function($routeProvider, $httpProvider){
    $routeProvider
        .when('/', {templateUrl: 'partials/independent/welcome.html', controller: 'welcomeCtrl'})
        .otherwise({redirectTo: '/welcome'});
});

ngSoong.run(['$rootScope', function($rootScope){
    $rootScope.init = function(){
        console.log('init..');
    }
    console.log('angularjs is running...');
}]);

function BaseCtrl($scope, $printInfo){
	$printInfo.print('hello world',{color: pink;});
}

