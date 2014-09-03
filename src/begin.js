var version='2.10.20';
var updateDate='2014-9-3';

if ( typeof unsafeWindow === "undefined") {
    unsafeWindow    = ( function () {
        var dummyElem   = document.createElement('p');
        dummyElem.onclick=function(){return window;};
        return dummyElem.onclick ();
    } ) ();
}

//主入口
//$(function main(){

