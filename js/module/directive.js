/*
 * directives of app
 */
'use strict'
angular.module('ngDirective', [])
.directive('ngTest', function(){
	return function(scope, element, attr){
		$(element).html('this is a directive test');
	};
})
.directive('draggable', function($document) {
    return function(scope, element, attr) {
		var startX = 0, startY = 0, x = 0, y = 0;
    	element.css({
    		cursor: 'pointer'
      	});
    	element.bind('mousedown', function(event) {
        	startX = event.screenX - x;
        	startY = event.screenY - y;
        	$document.bind('mousemove', mousemove);
      		$document.bind('mouseup', mouseup);
     	});

   		function mousemove(event) {
        	y = event.screenY - startY;
        	x = event.screenX - startX;
        	element.css({
          		top: y + 'px',
          		left:  x + 'px'
       		 });
      	}

     	function mouseup() {
        	$document.unbind('mousemove', mousemove);
        	$document.unbind('mouseup', mouseup);
      	}
    };
 })
.directive('hello', function(){
	return {
		restrict: 'E',
		template: '<div>'
				+ '<div class="title" ng-click="toggle()">{{title}}</div>'
				+ '<div class="body" ng-show="showMe" ng-transclude></div>'
				+ '</div>',
		transclude: true,
		replace: true,
		scope: {
			title: '=helloTitle',
			dirFun: '&test'
		},
		link: function(scope, element, attrs){
			scope.showMe = true;
			scope.toggle = function(){
				scope.showMe = !scope.showMe;
				scope.dirFun.call();
			}
		}
	}
});

