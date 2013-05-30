// ==UserScript==
// @name         iZhihu
// @namespace    https://github.com/unogz/izhihu
// @version      2.7.4 Beta
// @description  知乎插件
// @match        http://www.zhihu.com/*
// @include      http://www.zhihu.com/*
// @copyright    2013+, @钢盅郭子 @刘勇 @罗大睿
// @updateinfo   发布日期 2013-05-31|# 改进「右舷评论」：|> 提高在不同宽度窗口下评论列表宽度的适应性 |> 「人气评论」、「返回顶部」按钮改用图标 |# 修复了一些错误
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_openInTab
// ==/UserScript==

var version='2.7.4 Beta';
var updateDate='2013-5-31';

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
