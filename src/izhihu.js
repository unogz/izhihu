// ==UserScript==
// @name         izhihu2
// @namespace    https://github.com/unogz/izhihu
// @version      2.0.0
// @description  知乎插件
// @match        http://www.zhihu.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @require      http://underscorejs.org/underscore-min.js
// @require      https://github.com/n1k0/casperjs/raw/master/modules/clientutils.js
// @copyright    2012+, @钢盅郭子 @刘勇 @罗大睿
// ==/UserScript==

var _ = this._;

//使用CasperJS的模拟用户操作： http://casperjs.org/api.html#client-utils
var client = window.create();

var izhihu = this.izhihu = {
  name: 'izhihu_main',
  description: '爱知乎',
  modules: []
};

izhihu.set = function(module){
  if(_.isObject(module) && _.isFunction(module.init)){
    this.modules.push(module);
  }else{
    console.log('incorrect module format, %s', item);
  }
}

//主入口
$(function main(){
  _.each(izhihu.modules, function(module){
    module.init();
  });
});

