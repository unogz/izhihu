// ==UserScript==
// @name         iZhihu
// @namespace    https://github.com/unogz/izhihu
// @version      2.10.19
// @description  知乎插件
// @match        http://www.zhihu.com/*
// @include      http://www.zhihu.com/*
// @require      http://cdn.staticfile.org/jquery/1.8.2/jquery.min.js
// @require      http://izhihu.unogz.com/dist/import/jquery.checkbox.min.js
// @require      http://cdn.staticfile.org/iCheck/1.0.1/icheck.min.js
// @resource     jqUI_CSS http://cdn.staticfile.org/iCheck/1.0.1/skins/square/blue.css
// @resource     ui-bg_icheck-skin_square_blue http://cdn.staticfile.org/iCheck/1.0.1/skins/square/blue.png
// @require      http://izhihu.unogz.com/dist/import/clientutils.js
// @require      http://izhihu.unogz.com/dist/import/drag.js
// @require      http://cdn.staticfile.org/jqueryui/1.10.4/jquery-ui.min.js
// @require      http://cdn.staticfile.org/purl/2.3.1/purl.min.js
// @require      http://cdn.staticfile.org/underscore.js/1.6.0/underscore-min.js
// @grant        GM_xmlHttpRequest
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @icon         http://izhihu.unogz.com/dist/logo.png
// @copyright    2013+, @钢盅郭子 @刘勇 @罗大睿
// @updateinfo   发布日期 2.10 @2013-9-10|# 改进「首页」：增加「首页分栏」模式、修正额外「收起」按钮|# 改进「右舷评论」：为特性「关闭时自动卷屏至对应条目」提供可选开关|# 改进「快速收藏」：增加操作状态指示|#修复「快速屏蔽」
// ==/UserScript==

var jqUI_CssSrc = GM_getResourceText("jqUI_CSS")
  , imgURL = GM_getResourceURL('ui-bg_icheck-skin_square_blue')
GM_addStyle (jqUI_CssSrc.replace('blue.png', imgURL));
