"use strict";
(function(window, document){

    var SongScroll = function(selector, options){
        var that = this;
        that.wrapper = typeof selector == 'object' ? selector : document.querySelector(selector);
        that.pieces = that.wrapper.children;

        that.settings = {
            scrollDuration : 500,
            direction: 't2b'
        };
        that.settings = songExtend(that.settings, options);

        that.init();
    };

    SongScroll.prototype = {
        enable : true,
        x : 0,
        y : 0,
        pagesCount : 0,
        currentPageIndex : 0,
        currentDirection : 0, /*-1向下;1向上*/
        blockScrollFlag : false,

        init: function(){
            var that = this;

            that.pagesCount = that.pieces.length;

            var support = this._supportOrNot('js');

            this._bind('mousewheel DOMMouseScroll', function(event){
                that._preventDefault(event);
//                event.preventDefault();
                var mouseOffset = event.wheelDelta || -event.detail;
                //TODO
                //initScroll(event, mouseOffset);
                that._setDirection(mouseOffset);
                that.goNext();
            }, document);
        },
        goNext : function(){
            this.goPage(this.currentPageIndex - this.currentDirection);
        },
        goNextPage : function(){
            var nextIndex = this.currentPageIndex + 1;
            this.goPage(nextIndex);
        },
        goBeforePage : function(){
            var nextIndex = this.currentPageIndex - 1;
            this.goPage(nextIndex);
        },
        goPage : function(index){
            if(this.blockScrollFlag) {return false;}   // block mouse wheel/scroll event during the period of scroll animation
            if(index < 0 || index > (this.pagesCount - 1)) return false;

            if(index - this._indexOf(this.wrapper.querySelector('.active'), this.wrapper.children) < 0)
                this.currentDirection = 1;
            else
                this.currentDirection = -1;

            var that = this;
            this.blockScrollFlag = true;
            var time = parseFloat(this._getStyle(this.wrapper.children[index], 'transitionDuration')) * 1000;   // per page's scroll duration

            if(this.currentDirection > 0) {
                for(var i = index; i <= this.pagesCount; i++ )
                    this._removeClass('old', this.wrapper.children[i]);
            }else{
                for(var i = 0; i <= index + this.currentDirection; i++ )
                    this._addClass('old', this.wrapper.children[i]);
            }
            setTimeout(function(){
                that._removeClass('active', that.wrapper.querySelectorAll('.active'));
                that._addClass('active', that.wrapper.children[index]);
            }, time);

            this.currentPageIndex = index;

            setTimeout(function(){
                that.blockScrollFlag = false;
            }, time);
        },
        _setDirection : function(mouseOffset){
            if(mouseOffset > 0) this.currentDirection = 1;
            else this.currentDirection = -1;
        },
        _supportOrNot : function(cssName){
            return (document.querySelector('html').className.indexOf('no-' + cssName) < 0);
        },
        _getStyle : function(elem, cssName){
            if(!elem || !cssName) return;
            return elem.currentStyle ? elem.currentStyle : window.getComputedStyle(elem, null)[cssName];
        },
        _indexOf : function(ele, arr){
            for(var i in arr){
                if(arr[i] === ele) return i;
            }
        },
        _addClass : function(className, ele){
            if(!this._selectorTOF(ele)) return;
            if(!this._listOrNot(ele)) {
                var temp = [];
                temp.push(ele);
                ele = temp;
            }
            ele = Array.prototype.slice.call(ele);
            for(var i in ele){
                var elem = ele[i];
                var eleClassName = elem.getAttribute('class') || elem.className;
                if(eleClassName.indexOf(className) > 0) return;
                else elem.setAttribute('class', eleClassName + ' ' + className);
            }
        },
        _removeClass : function(className, ele){
            if(!this._selectorTOF(ele)) return;
            if(!this._listOrNot(ele)){
                var temp = [];
                temp.push(ele);
                ele = temp;
            }
            ele = Array.prototype.slice.call(ele);
            for(var i in ele){
                var elem = ele[i];
                var eleClassName = elem.getAttribute('class') || elem.className,
                    classArray = eleClassName.split(' '),
                    index = classArray.indexOf(className);
                if(index < 0)
                    return;
                else {
                    classArray.splice(index, 1);
                    var targetClassName = classArray.join(' ');
                    elem.setAttribute('class', targetClassName);
                }
            }
        },
        _bind : function(type, eventHandle, ele){
            var elem = ele || this.wrapper;
            var typeArr = type.split(' ');
            for(var key in typeArr){
                type = typeArr[key];
                if ( elem.addEventListener ) {
                    elem.addEventListener( type, eventHandle, false );
                } else if ( elem.attachEvent ) {
                    elem.attachEvent( "on" + type, eventHandle );
                }
            }
        },
        _unbind : function(type, eventHandle, ele){
            var elem = ele || this.wrapper;
            if ( elem.removeEventListener ) {
                elem.removeEventListener( type, eventHandle, false );
            } else if ( elem.detachEvent ) {
                elem.detachEvent( "on" + type, eventHandle );
            }
        },
        _preventDefault : function(event){
            if(event && event.preventDefault) event.preventDefault();
            else window.event.returnValue = false;
        },
        _listOrNot: function(obj){
            if(obj instanceof NodeList || obj instanceof HTMLCollection) return true;
            else return false;
        },
        _selectorTOF : function(selector){
            if(this._listOrNot(selector)) return !!selector.length;
            else return !!selector;
        }
    };

    window.SongScroll = SongScroll;

}(window, document));

function songExtend(source, target){
    for(var key in target){
        source[key] = target[key];
    }
    return source;
}
