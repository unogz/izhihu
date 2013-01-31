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
    'comment_sidebar': true,
    'answer_orderByTime': false
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
