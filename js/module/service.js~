/*
 * services of app
 */
'use strict'
var ngService = angular.module('ngService', []);

ngService.factory('$printInfo', function(){
	var print = function(){
		var generateWrapper = function(){
			var infoWrapper = document.getElementById('printInfoWrapperBySoong');
			if(!infoWrapper){
				infoWrapper = document.createElement('div');
				infoWrapper.setAttribute('id', 'printInfoWrapperBySoong');
				document.body.appendChild(infoWrapper);
			}
			if(infoWrapper.parentNode.nodeName.toLowerCase() != 'body'){
				document.body.appendChild(infoWrapper);
			}
			return infoWrapper;
		};

		var setWrapperStyle = function(styleStr){
			if(!styleStr) return;
			var infoWrapper = generateWrapper();
			var styleStrType = Object.prototype.toString.call(styleStr).slice(8,-1).toLowerCase();
			if(styleStrType == 'string' && infoWrapper.cssText){
				infoWrapper.style.cssText = styleStr;
			}else if(styleStrType == 'object'){
				infoWarpper.style.cssText = JSON.stringify(styleStr);
			}
			return this;
		};
	
		var setWrapperContent = function(content){
			var strType = Object.prototype.toString.call(content).slice(8,-1).toLowerCase();
			var infoWrapper = generateWrapper();
			if(strType == 'array' || strType == 'object'){

			}else{
				var ulEle = document.createElement('ul'),
					liEle = document.createElement('li'),
					textNode = document.createTextNode(content);
				liEle.appendChild(textNode);
				ulEle.appendChild(liEle);
				infoWrapper.appendChild(ulEle);
			}
		};


		return {
			getWrapper: generateWrapper,
			setStyle: setWrapperStyle,
			setContent: setWrapperContent
		}
	};
	
	var	defaultStyle = 'display:block;position:fixed;right:5px;top:20px;border:2px solid green;height:auto;text-align:left;z-index:999;';
	//var infoWrapper = new print().setWrapperStyle(defaultStyle).setWrapperContent(printMsg);
	
		
	//setWrapperStyle(infoWrapper, defaultStyle);
	
	return {
		print: function(content, style){
			var style = style ? style : defaultStyle;
			new print().setStyle(style).setContent(printMsg);
		}
	}

	//todo..
	
});
