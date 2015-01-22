/*
 * directives of app
 */
'use strict'
angular.module('ngDirective', [])
.directive('ngTest', function(){
	return function(scope, element, attr){
		$(element).html('this is a directive test');
	}
});

