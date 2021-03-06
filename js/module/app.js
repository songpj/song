/**
 * Created by song on 2015/1/19.
 */
var ngSoong = angular.module('ngSoong', ['ngRoute', 'ngDirective','ngService']);

ngSoong.config(function($routeProvider, $httpProvider){
    $routeProvider
        .when('/', {templateUrl: 'partials/independent/welcome.html', controller: 'WelcomeController'})
        .otherwise({redirectTo: '/welcome'});
});

ngSoong.run(['$rootScope', function($rootScope){
    $rootScope.init = function(){
        console.log('init..');
    }
    console.log('angularjs is running...');
}]);

ngSoong.controller('BaseController', function($scope, $printInfo){
	//$printInfo.print({name: 'this is my name', gender: 'male', other: {address: 'nanking', tel:'911'}},{color: 'pink'});
	//$printInfo.print('sdfdsfsdf',{color: 'pink'});
//	$printInfo.print({test:{sdf:2323, sdfdsf:909090},name: 'this is my name', gender: 'male', other: {address: 'nanking', tel:'911'}},{color: 'pink'});
	$scope.soong = 'previous name';
	$scope.song = 'my first name';
	$scope.title = 'hello title!';
	$scope.text = 'this is a toggle content';
	$scope.fun = function(){
		console.log('directive scope & test');
	};
});

