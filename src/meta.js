// ==UserScript==
// @name         iZhihu
// @namespace    https://github.com/unogz/izhihu
// @version      2.7.1
// @description  知乎插件
// @match        http://www.zhihu.com/*
// @include      http://www.zhihu.com/*
// @copyright    2013+, @钢盅郭子 @刘勇 @罗大睿
// @updateinfo   发布日期 2013-05-21|# 大幅改善了「右舷评论」的外观和性能。更新内容包括：|> 调整评论列表的位置，吸附在页面主要内容（时间线条目、问题及回答）右侧，并不受页面缩放及横向卷动影响|> 当窗口宽度适中时将向左侧滑以保证评论列表展开空间|> 页面纵向卷动时，评论列表以动画形式上下平移|> 细节上的完善
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_openInTab
// ==/UserScript==

var version='2.7.1';
var updateDate='2013-5-21';

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
