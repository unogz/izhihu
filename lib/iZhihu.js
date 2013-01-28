// ==UserScript==
// @name       iZhihu2
// @namespace  https://github.com/unogz/izhihu
// @version    2.0.0
// @description  知乎插件
// @match    http://www.zhihu.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @copyright  2012+, @钢盅郭子 @刘勇 @罗大睿
// ==/UserScript==

function iZhihu(){
  console.log(this.getCfg())
}

$(function(){
  new iZhihu()
})

/**
 * 读取配置
 */
iZhihu.prototype.getCfg = function(){
  var defaults = {
    'comment_sidebar': true
  };
  return $.extend(defaults, this.getValue('iZhihu'));
};

/**
 * 读取存储
 */
iZhihu.prototype.getValue = function(key, defaultValue){
  return localStorage[key] || defaultValue;
};

/**
 * 写入存储
 */
iZhihu.prototype.setValue = function(key, value){
  return localStorage[key] = value;
};

/**
 * 删除存储
 */
iZhihu.prototype.deleteValue = function(key){
  return delete localStorage[key];
};