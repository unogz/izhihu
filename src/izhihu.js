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

var izhHomeLayout = utils.getCfg('HomeLayout')
  , izhAuthorList = utils.getCfg('AuthorList')
  , izhShowComment = utils.getCfg('ShowComment')
  , izhQuickFavo = utils.getCfg('QuickFavo')
  , izhAuthorRear = utils.getCfg('AuthorRear')
  , izhHomeNoti = utils.getCfg('HomeNoti');

var pi={}
  , _d=window.document
  , _p=url.data.attr['path']
  , css=''
  , $h=$('head')
  , $s=$('<style type="text/css"></style>')
  , ipas=_p.indexOf('/answers')
  , ipcc=_p.indexOf('/collection')
;
pi.h='/'==_p;
pi.a=0<_p.indexOf('/answer/');
pi.q=!pi.a&&0==_p.indexOf('/question/');
pi.as=0<ipas&&_p.substr(ipas)=='/answers';
pi.cc=0==ipcc;

var i=0
  , z=''
  , $v=$('#zh-home-list-title')//activity_caption
  , $y=$('#zh-main-feed-fresh-button')//new_activity
  , $u=$('.zu-top-nav-userinfo')//user_avater
  , $x=$('#zh-question-meta-wrap')//answers_count
  , $r=$('#zh-question-answer-form-wrap')//reply_form
  , $l=$('#zh-question-collapsed-link')//expand/collap
;

var css_comment={
    'position':'fixed'
  , 'background-color':'#fff'
  , 'outline':'none'
  , 'overflow':'auto'
  , 'z-index':'9'
  , 'right':10
  , 'border-radius':0
  , 'border':'1px solid #999999'
  , 'padding-left':5
  , 'padding-bottom':5
};

if(izhHomeLayout){
css+='#zh-question-list { padding-left:30px!important }\n#zh-main-feed-fresh-button { margin-left:-30px!important }\n\n.feed-item {\n    border-bottom:1px solid #EEE!important;\n    margin-top:-1px!important\n}\n.feed-item .avatar { display:none!important }\n\n.feed-main,.feed-item.combine { margin-left:0!important }\n.feed-item-q { margin-left:-30px!important;padding-left:0!important }\n\n.feed-item-a .zm-comment-box { max-width:602px!important }\n.feed-item-q .zm-comment-box { max-width:632px!important; width:632px!important }\n\n\n\n\n.zm-tag-editor,\n#zh-question-title,\n#zh-question-detail,\n#zh-question-meta-wrap,\n.zh-answers-title,\n#zh-question-filter-wrap {\n    margin-left:-32px!important\n}\n\n#zh-question-log-page-wrap .zm-tag-editor,\n#zh-question-log-page-wrap #zh-question-title {\n    margin-left:0 !important\n}\n\n.zh-answers-title,\n#zh-question-filter-wrap {\n    border-bottom:1px solid #EEE!important;\n    z-index:1000!important\n}\n\n#zh-question-meta-wrap {\n    margin-bottom:0!important;\n    padding-bottom:10px!important;\n    border-bottom:1px solid #EEE!important\n}\n\n#zh-question-answer-wrap { margin-top:-1px!important }\n\n#zh-question-collapsed-wrap,#zh-question-answer-wrap { border:none!important }\n.zu-question-collap-title { border-top:1px solid #EEE!important }\n#zh-question-collapsed-wrap>div:last-child,.zm-item-answer:last-child { border-bottom:1px solid #EEE!important }\n\n\n\n\n.zu-autohide,\n.zm-comment-op-link,\n.zm-side-trend-del,\n.unpin {\n    visibility:visible!important;\n    opacity:0;\n}\n.feed-item:hover .zu-autohide,\n.zm-item-answer .zu-autohide,\n.zm-item-comment:hover .zm-comment-op-link,\n.zm-side-trend-row:hover .zm-side-trend-del,\n.zm-side-nav-li:hover .unpin {\n    opacity:1;\n}\n.zm-item-vote-count:hover,.zm-votebar button:hover{\n    background:#a6ce56!important;\n    color:#3E5E00 !important\n}\n\na,a:hover,\ni,\n.zu-autohide,\n.zm-votebar button,\n.zm-item-comment:hover .zm-comment-op-link,\n.zm-comment-op-link,\n.zm-side-trend-row:hover .zm-side-trend-del,\n.zm-side-trend-del,\n.zm-side-nav-li,\n.zu-main-feed-fresh-button,\n.zg-icon,\n.zm-side-nav-li:hover .zg-icon,\n.zm-side-nav-li:hover i,\n.unpin,\n.zm-side-nav-li:hover .unpin {\n    -moz-transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;\n    -webkit-transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;\n    transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;\n}\n\n\n\n\n\nh3{ line-height:25px }\n.zu-footer-inner {padding:15px 0!important}\n.zm-side-pinned-topics .zm-side-nav-li{float:left;padding-right:30px!important}\n.zm-side-list-content{clear:both}\n.unpin{ display:inline-block!important }\n';

}
if(pi.q&&izhAuthorList){
    css+='div.uno{position:absolute;left:0;border:1px solid #0771C1}';
    css+='div.uno .frame{overflow-x:hidden;overflow-y:auto;direction:rtl}';
    css+='div.uno span.meT,div.uno span.meB,div.uno ul.pp li span.me{position:absolute;right:0;display:block;height:1px;width:1px;line-height:1px;background-color:transparent;border-style:solid;border-color:transparent;}';
    css+='div.uno span.meT{border-width:6px 4px;border-top-width:0px;border-bottom-color:#fff;}';
    css+='div.uno span.meB{border-width:6px 4px;border-bottom-width:0px;border-top-color:#fff;margin-top:-7px;}';
    css+='div.uno ul{background-color:#0771C1;padding:0;margin:0;direction:ltr}';
    css+='div.uno ul li{display:block;list-style-type:none;margin:0;padding:0;white-space:nowrap;}';
    css+='div.uno ul li a{display:block;}div.uno li a:hover{text-decoration:none;}';
    css+='div.uno ul li a{padding:0 10px 0 0;}';
    css+='div.uno ul.pp li span.me{position:static;margin:6px -8px;border-width:4px 6px;border-right-color:#fff;float:right;}';
    css+='div.uno li a span.name{text-align:right;display:block;padding:0 5px;background-color:#fff;}div.uno li a:hover span.name{color:#fff;background-color:#0771C1;}';
    css+='div.uno li a span.name.noname{color:#000;}';
    css+='div.uno li a span.name.collapsed{color:#999999;}';
    css+='div.uno li a span.name.friend{font-style:italic;}';
    css+='div.uno table.plus{float:right;margin:7px -9px;height:7px;border-collapse:collapse;border-style:hidden;}div.uno table.plus td{border:1px solid #fff;width:1px;height:1px;}';
    css+='div.uno a:hover table.plus{}div.uno a:hover table.plus td{}';
    css+='div.uno li a span.func{text-align:center;}\n';
}
if(izhQuickFavo){
    css+='div.izh_fav{padding:5px;display:none;position:absolute;z-index:10;border:1px solid #999999;background-color:#fff}';
    css+='div.izh_fav .title{background-color:#0874c4;color:#fff;font-weight:bold;font-size:15px;text-align:center}';
    css+='div.izh_fav a.fav{display:block;clear:both;float;left;padding:0 32px;line-height:32px}div.izh_fav a.fav.selected{background:url("/static/img/check4.png") no-repeat scroll 0 center transparent}div.izh_fav a.fav:hover{text-decoration:none}';
    css+='div.izh_fav a.fav span{float:right;display:block;margin-right:-32px}\n';
}
if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
    PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
    addStyle(css);
} else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        heads[0].appendChild(node); 
    }
}
