var $ = unsafeWindow.$;
var _ = this._;
var purl = window.purl;

//使用CasperJS的模拟用户操作： http://casperjs.org/api.html#client-utils
var client = window.create();

var url = purl();
var page = url.segment(1);

//主入口
$(function main(){
  console.log('izhihu started.')
});

