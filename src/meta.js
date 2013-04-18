// ==UserScript==
// @name         iZhihu
// @namespace    https://github.com/unogz/izhihu
// @version      2.6.1
// @description  知乎插件
// @match        http://www.zhihu.com/*
// @include      http://www.zhihu.com/*
// @copyright    2013+, @钢盅郭子 @刘勇 @罗大睿
// @updateinfo   发布日期 2013-04-18|# 修复错误：「快速屏蔽」在评论列表中的「候审」按钮工作不正常
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_openInTab
// ==/UserScript==

var version='2.6.1';
var updateDate='2013-4-18';

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
