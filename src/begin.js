var version='2.13';
var updateDate='2015-12-1';

if ( typeof unsafeWindow === "undefined") {
    unsafeWindow    = ( function () {
        var dummyElem   = document.createElement('p');
        dummyElem.onclick=function(){return window;};
        return dummyElem.onclick ();
    } ) ();
}

//主入口
//$(function main(){

