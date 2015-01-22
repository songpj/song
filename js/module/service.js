/*
 * services of app
 */
'use strict'
var ngService = angular.module('ngService', []);

ngService.factory('$printInfo', function(){
	var print = function(){
		var infoWrapperId = 'printInfoWrapperBySoong';
		var	defaultStyle = 'display:block;position:fixed;right:5px;top:10px;border:2px solid green;height:auto;text-align:left;z-index:999;padding:10px;',
			humanStyle = '#printInfoWrapperBySoong{background-color: #fff;}'
	+ '#printInfoWrapperBySoong ul{margin-left:1em;margin-bottom:2px;border-width:0 0 0px 1px;border-style:dashed;margin-left:0;}'
	+ '#printInfoWrapperBySoong > ul{border-bottom-width: 1px;}'
	+ '#printInfoWrapperBySoong ul li{padding-left:12px;position:relative;}'
	+ '#printInfoWrapperBySoong ul li:before{content:"...";position:absolute;left:0;line-height: 15px;}' ;


		var generateWrapper = function(){
			var infoWrapper = document.getElementById(infoWrapperId);
			if(!infoWrapper){
				infoWrapper = document.createElement('div');
				infoWrapper.setAttribute('id', infoWrapperId);
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
				infoWrapper.style.cssText = defaultStyle + styleStr;
			}else if(styleStrType == 'object'){
				styleStr = JSON.stringify(styleStr).replace(new RegExp(/"/g),'').substr(1, styleStr.length-2);
				infoWrapper.style.cssText = defaultStyle + styleStr;
			}
			return this;
		};
	
		var setWrapperContent = function(content, key, parentEle){
			var strType = Object.prototype.toString.call(content).slice(8,-1).toLowerCase();
			var infoWrapper = generateWrapper();
			if(!parentEle){
				parentEle = infoWrapper;
			//	var ulEle = document.createElement('ul');
			//	infoWrapper.appendChild(ulEle);
			//	parentEle = ulEle;
			}

			if(strType == 'array' || strType == 'object'){
				var liEle = document.createElement('li'),
					title = document.createTextNode(key + ':'),
					ulEle = document.createElement('ul');
				liEle.appendChild(title);
				liEle.appendChild(ulEle);
				/*if(parentEle.getAttribute('id') == infoWrapperId){
					parentEle.appendChild(ulEle);
				}else{
					parentEle.appendChild(liEle);
				}*/
				parentEle.getAttribute('id') == infoWrapperId ? parentEle.appendChild(ulEle) : parentEle.appendChild(liEle);

				for(var key in content){
					setWrapperContent(content[key], key, ulEle);
				}
			}else{
				content = key ? key + ': ' + content : content;
				var liEle = document.createElement('li'),
					textNode = document.createTextNode(content);
				liEle.appendChild(textNode);

				if(parentEle.getAttribute('id') == infoWrapperId){
					var temp = document.createElement('ul');
					temp.appendChild(liEle);
					parentEle.appendChild(temp);  // content is not array or object;	
				}else{
					parentEle.appendChild(liEle);
				}
			}
		};

		var humanizeView = function(){
			var	infoWrapper = generateWrapper(),
			style = document.createElement('style');

			style.type = 'text/css';
			if(style.styleSheet) style.styleSheet.cssText = humanStyle;
			else style.appendChild(document.createTextNode(humanStyle));

			infoWrapper.parentNode.insertBefore(style, infoWrapper);
			
			return this;
		}


		return {
			getWrapper: generateWrapper,
			setStyle: setWrapperStyle,
			setContent: setWrapperContent,
			humanize: humanizeView
		}
	};
	
	return {
		print: function(content, style){
			new print().setStyle(style).humanize().setContent(content);
			
		}
	}

	//todo..
	
});
