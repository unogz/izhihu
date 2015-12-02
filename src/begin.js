var version='2.12.0';
var updateDate='2015-2-9';

if ( typeof unsafeWindow === "undefined") {
    unsafeWindow    = ( function () {
        var dummyElem   = document.createElement('p');
        dummyElem.onclick=function(){return window;};
        return dummyElem.onclick ();
    } ) ();
}

//主入口
//$(function main(){

