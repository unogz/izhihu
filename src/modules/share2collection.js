/**
 * 分享答案到收藏夹, 对应的issue #1
 * @author 天猪
 */
(function(global){
  "use strict"

  var module = {
    name: 'share2collection',
    description: '分享答案到收藏夹'
  };

  module.init = function(){
    console.log('share2collection init.');
    console.log(utils.getCfg());
  };

  izhihu.set(module);

})(this);
