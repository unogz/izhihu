// ==UserScript==
// @name         iZhihu
// @namespace    https://github.com/unogz/izhihu
// @version      2.13.2
// @description  知乎插件
// @match        http://www.zhihu.com/*
// @include      http://www.zhihu.com/*
// @match        https://www.zhihu.com/*
// @include      https://www.zhihu.com/*
// @require      http://cdn.staticfile.org/jquery/1.8.2/jquery.min.js
// @require      http://cdn.staticfile.org/iCheck/1.0.1/icheck.min.js
// @resource     jqUI_CSS http://cdn.staticfile.org/iCheck/1.0.1/skins/square/blue.css
// @resource     ui-bg_icheck-skin_square_blue http://cdn.staticfile.org/iCheck/1.0.1/skins/square/blue.png
// @resource     ui-bg_icheck-skin_square_blue2x http://cdn.staticfile.org/iCheck/1.0.1/skins/square/blue@2x.png
// @require      http://cdn.staticfile.org/jqueryui/1.10.4/jquery-ui.min.js
// @require      http://cdn.staticfile.org/purl/2.3.1/purl.min.js
// @require      http://cdn.staticfile.org/underscore.js/1.6.0/underscore-min.js
// @grant        GM_xmlHttpRequest
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @icon         https://raw.githubusercontent.com/unogz/izhihu/develop/misc/xpi-config/icon64.png
// @copyright    2015+, @钢盅郭子 @刘勇 @墨磊
// ==/UserScript==

var jqUI_CssSrc = GM_getResourceText("jqUI_CSS")
GM_addStyle (jqUI_CssSrc.replace('url(blue', 'url(http://cdn.staticfile.org/iCheck/1.0.1/skins/square/blue'));
