var version='2.10.17';
var updateDate='2014-7-11';

if ( typeof unsafeWindow === "undefined") {
    unsafeWindow    = ( function () {
        var dummyElem   = document.createElement('p');
        dummyElem.onclick=function(){return window;};
        return dummyElem.onclick ();
    } ) ();
}

//主入口
$(function main(){

