// ==UserScript==
// @name         iZhihu
// @namespace    https://github.com/unogz/izhihu
// @version      2.6.2
// @description  知乎插件
// @match        http://www.zhihu.com/*
// @include      http://www.zhihu.com/*
// @copyright    2013+, @钢盅郭子 @刘勇 @罗大睿
// @updateinfo   发布日期 2013-04-19|# 修复：「快速收藏」菜单位置异常|# 修复：用户回答「地址清单」链接地址异常
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_openInTab
// ==/UserScript==

var version='2.6.2';
var updateDate='2013-4-19';

var bGreasemonkeyServiceDefined = false;

try {
    if (typeof Components.interfaces.gmIGreasemonkeyService === "object") {
        bGreasemonkeyServiceDefined = true;
    }
}
catch (err) {
    //Ignore.
}

if ( typeof unsafeWindow === "undefined"  ||  ! bGreasemonkeyServiceDefined) {
    unsafeWindow    = ( function () {
        var dummyElem   = document.createElement('p');
        dummyElem.setAttribute ('onclick', 'return window;');
        return dummyElem.onclick ();
    } ) ();
}
