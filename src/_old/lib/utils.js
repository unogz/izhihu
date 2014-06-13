/**
 * @class Utils 辅助类
 */
function utils(){
};

var cfgDefault = {
    'comment_sidebar': true
  , 'answer_orderByTime': false
  , 'AuthorList':false
  , 'ShowComment':true
  , 'HomeLayout':false
  , 'QuickFavo':true
  , 'QuickFavoPinned':{}
  , 'AuthorRear':false
  , 'HomeNoti':false
  , 'QuickBlock':false
  , 'Noti7':true
  , 'HomeFeedsColumns':false
  , 'RightComment_AutoScrollPageWhenClosing':true
};
  
/**
 * 读取配置
 */
utils.getCfg = function(key){
  if(!key)return false;
  var cfg = _.extend(cfgDefault, this.getValue('izhihu',cfgDefault));
  return key ? cfg[key] : cfg;
};

utils.setCfg = function(key,value){
  if(!key)return;
  var cfg = _.extend(cfgDefault, this.getValue('izhihu',cfgDefault));
  cfg[key]=value;
  this.setValue('izhihu',cfg);
};

/**
 * 读取存储
 */
utils.getValue = function(key, defaultValue){
    var v=localStorage[key];
    if(v)
        return JSON.parse(v);
    else
        return defaultValue;
};

/**
 * 写入存储
 */
utils.setValue = function(key, value){
  localStorage[key] = JSON.stringify(value);
};

/**
 * 删除存储
 */
utils.deleteValue = function(key){
  return delete localStorage[key];
};

utils.transferOldCfg=function(){
    var oldHomeLayout = localStorage['izh_HomeLayout']
      , oldAuthorList = localStorage['izh_AuthorList']
      , oldShowComment = localStorage['izh_ShowComment']
      , oldQuickFavo = localStorage['izh_QuickFavo']
      , oldAuthorRear = localStorage['izh_AuthorRear']
      , oldHomeNoti = localStorage['izh_HomeNoti']
    ;
    if(oldHomeLayout){
        izhHomeLayout=oldHomeLayout;
        localStorage.removeItem('izh_HomeLayout');
        this.setCfg('HomeLayout',izhHomeLayout);
    }
    if(oldAuthorList){
        izhAuthorList=oldAuthorList;
        localStorage.removeItem('izh_AuthorList');
        this.setCfg('AuthorList',izhAuthorList);
    }
    if(oldShowComment){
        izhRightComment=oldShowComment;
        localStorage.removeItem('izh_ShowComment');
        this.setCfg('ShowComment',izhRightComment);
    }
    if(oldQuickFavo){
        izhQuickFavo=oldQuickFavo;
        localStorage.removeItem('izh_QuickFavo');
        this.setCfg('QuickFavo',izhQuickFavo);
    }
    if(oldAuthorRear){
        izhAuthorRear=oldAuthorRear;
        localStorage.removeItem('izh_AuthorRear');
        this.setCfg('AuthorRear',izhAuthorRear);
    }
    if(oldHomeNoti){
        izhHomeNoti=oldHomeNoti;
        localStorage.removeItem('izh_HomeNoti');
        this.setCfg('HomeNoti',izhHomeNoti);
    }

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
};

utils.getParamInQuery=function(queryStr,paramName){
    var param=paramName+'='
      , start=queryStr.indexOf(param)+param.length
      , end=queryStr.indexOf('&',start);
    return end<start?queryStr.substring(start):queryStr.substring(start,end);
};

utils.observeDOMAttrModified = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].type == 'attributes' )
                    callback(mutations[0]);
            });
            obs.observe( obj, { attributes:true });
        }else if( eventListenerSupported ){
            obj.addEventListener('DOMAttrModified', callback, false);
        }
    }
})();

utils.observeDOMNodeAdded = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                mutations.forEach(function(mutation) {
                    console.log(mutation.type);
                    callback(mutation);
                  });    
            });
            obs.observe( obj, { childList:true });
        }else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
        }
    }
})();

utils.RegexSrcPic = /src="[\s\S]+?.jpg"/g
