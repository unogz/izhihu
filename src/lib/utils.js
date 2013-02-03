/**
 * @class Utils 辅助类
 */
function utils(){
};

/**
 * 读取配置
 */
utils.getCfg = function(key){
  var obj = {
    'comment_sidebar': true
   ,'answer_orderByTime': false
   ,'AuthorList':true
   ,'ShowComment':true
   ,'HomeLayout':true
   ,'QuickFavo':true
   ,'AuthorRear':true
   ,'HomeNoti':true
  };
  obj = _.extend(obj, this.getValue('izhihu'));
  return key ? obj[key] : obj;
};

/**
 * 读取存储
 */
utils.getValue = function(key, defaultValue){
  return localStorage[key] || defaultValue;
};

/**
 * 写入存储
 */
utils.setValue = function(key, value){
  return localStorage[key] = value;
};

/**
 * 删除存储
 */
utils.deleteValue = function(key){
  return delete localStorage[key];
};


/**
 * @method formatStr
 *
 * 格式化字符串模版,支持2种格式:
 *
 *     formatStr("i can speak {language} since i was {age}",{language:'javascript',age:10});
 *     formatStr("i can speak {0} since i was {1}",'javascript',10);
 *
 * 如果不希望被转义,则用两个括号,如: `formatStr("i can speak {0} since i was {{1}",'javascript',10);`
 *
 */
utils.formatStr = function(tpl,obj){
  obj = typeof obj === 'object' ? obj : Array.prototype.slice.call(arguments, 1);
  return tpl.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n){
    if (m == "{{") { return "{"; }
    if (m == "}}") { return "}"; }
    return obj[n];
  });
}