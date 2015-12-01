//console.log((new Date()).getTime());

var $ = window.$;
var _ = this._;
var purl = window.purl||$.url;

//使用CasperJS的模拟用户操作： http://casperjs.org/api.html#client-utils
//var client = window.create();

var url = purl();
var page = url.segment(1);

var pageIs={}
  , $win=$(window)
  , _doc=window.document
  , $body=$(_doc.body)
  , _path=window.frameElement?window.frameElement.src.replace(/https?:\/\/www.zhihu.com/,''):url.data.attr['path']
  , css=''
  , $h=$('head')
  , $s=$('<style>', { 'type': 'text/css' })
  , iPathAnswers=_path.indexOf('/answers')
  , iPathCollection=_path.indexOf('/collection')
;
pageIs.Home='/'==_path;
pageIs.Answer=0<_path.indexOf('/answer/');
pageIs.Question=!pageIs.Answer&&0==_path.indexOf('/question/');
pageIs.Answers=0<iPathAnswers&&_path.substr(iPathAnswers)=='/answers';
pageIs.Collection=0==iPathCollection;
pageIs.Debuts=0==_path.indexOf('/debuts/');
pageIs.MyCollection=0==_path.indexOf('/collections/mine');
pageIs.SettingsFilter=0==_path.indexOf('/settings/filter')

var i=0
  , $user=$('.zu-top-nav-userinfo')//user_avater
  , z=$user.length?$user.attr('href'):''
  , $banner=$(document.body).children().first()
  , $main=$('[role=main]')//main
  , css_AuthorListItemA='padding:0 10px 0 0;'
  , css_AuthorListItemA_name='padding:0 5px;'
;

window.iZhihu = {
    $win:$win
  , $body:$body
  , $main:$main
  , config:$.extend(cfgDefault, utils.getValue('izhihu',cfgDefault))
};

var izhHomeLayout = window.iZhihu.config['HomeLayout']
  , izhAuthorList = window.iZhihu.config['AuthorList']
  , izhRightComment = window.iZhihu.config['ShowComment']
  , izhQuickFavo = window.iZhihu.config['QuickFavo']
  , izhAuthorRear = window.iZhihu.config['AuthorRear']
  , izhHomeNoti = window.iZhihu.config['HomeNoti']
  , izhQuickBlock = window.iZhihu.config['QuickBlock']
  , izhTopNavAutoFold = window.iZhihu.config['TopNavAutoFold']
;

utils.transferOldCfg();

$body.attr({
    'izhHomeLayout' : izhHomeLayout?'1':''
  , 'izhAuthorList' : izhAuthorList?'1':''
  , 'izhRightComment' : izhRightComment?'1':''
  , 'izhQuickFavo' : izhQuickFavo?'1':''
  , 'izhAuthorRear' : izhAuthorRear?'1':''
  , 'izhHomeNoti' : izhHomeNoti?'1':''
  , 'izhQuickBlock' : izhQuickBlock?'1':''
  , 'izhTopNavAutoFold' : izhTopNavAutoFold?'1':''
});

var _QuickBlock = new QuickBlock(window.iZhihu)
  , _QuickFavo = new QuickFavo(window.iZhihu)
  , _Comment = new Comment(window.iZhihu)
  , _Noti7 = new Noti7(window.iZhihu)
  , _Answer = new Answer(window.iZhihu)
  , _SearchingList = new SearchingList(window.iZhihu)
  , _TopNav = new TopNav(window.iZhihu)
;

css+=['.t_showframe{padding:10px 10px 10px 10px;background:#f0f0f0;border:1px solid #fff;box-shadow:2px 5px 15px #333;border-radius:10px;-moz-box-shadow:2px 5px 15px #333;-moz-border-radius:10px;-webkit-box-shadow:2px 5px 15px #333;-webkit-border-radius:10px}#iZhihu_rtjddiv{width:650px;height:437px}#iZhihu_setdiv{width:600px;height2:295px}.t_setdiv{padding-bottom:10px;background:#fcfcfc;width:100%;height:100%}.t_set_tb{font-family:"Lucida Sans Unicode","Lucida Grande",Sans-Serif !important;font-size:12px !important;text-shadow:none !important;border-collapse:collapse !important;margin:0 !important;line-height:120%}.t_set_tb thead td{background:#0080c0;color:#fff;border:none !important;padding:4px 8px 4px !important;border-radius-topleft:10px;border-radius-topright:10px;-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;-webkit-border-top-left-radius:10px;-webkit-border-top-right-radius:10px}.t_set_tb th,.t_set_tb td{padding:8px;background:#e8edff;border:none !important;border-top:2px solid #fcfcfc !important;color:#669;line-height:1.1em !important}.t_set_tb td input,.t_set_tb td textarea{font-size:12px !important;padding:0 !important}.t_set_tb tbody tr:hover th,.t_set_tb tbody tr:hover td{background:#d0dafd}.t_set_tb tfoot td{border-radius-bottomleft:10px;border-radius-bottomright:10px;-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;-webkit-border-bottom-left-radius:10px;-webkit-border-bottom-right-radius:10px}.t_set_ft{font-family:Arial,sans-serif,瀹�� !important;font-size:12px !important;font-weight:bold !important;text-shadow:none !important;margin-top:15px !important}.t_set_ft a{text-decoration:none;color:#000}.t_setbtn{border:1px solid black;padding:2px;cursor:pointer;background:#fff;color:#0080c0}.t_setftbtn span{padding:2px 10px 2px 10px !important}.t_rtjdbtn{background:#0080c0 !important;color:#fff !important}.t_rtjdtxtpos{padding-top:5px}#iZhihu_rthint{font-family:Arial,sans-serif,瀹�� !important;font-size:16px !important;font-weight:bold;padding:5px 10px 5px 10px;position:fixed;top:20px;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;display:inline-block;opacity:0.7}.t_rthint_n{color:#fff !important;background:#000 !important}.t_rthint_f{background:#880000 !important;color:#ffffdd !important}.t_upbtn{background:#0080c0 !important;color:#fff !important}.t_upinfo{height:120px !important;vertical-align:text-top !important}#izh_updatediv th{border-right:2px solid #fcfcfc !important}#izh_updatediv tfoot td{border:none !important;border-top:2px solid #fcfcfc !important;font-family:Arial,sans-serif,瀹�� !important;font-size:12px !important;font-style:normal !important;text-shadow:none !important}.t_txtshow{text-align:center;background:#0080c0;color:#f0f0f0;user-select:none;-moz-user-select:none}.t_frshow{font-size:1.2em;position:fixed;z-index:99999;top:45px;width:200px;opacity:0.9;cursor:pointer}.t_tbox{padding:10px;position:relative;border:1px solid #f0f0f0;line-height:20px;*height:1%;width:200px;-moz-box-shadow:2px 5px 15px #333;-moz-border-radius:7px;-webkit-box-shadow:2px 5px 15px #333;-webkit-border-radius:7px}.t_tbox s{position:absolute;top:-20px;left:160px;display:block;height:0;width:0;font-size:0;line-height:0;border-color:transparent transparent #f0f0f0 transparent;border-style:dashed dashed solid dashed;border-width:10px}.t_tbox i{position:absolute;top:-9px;left:-10px;display:block;height:0;width:0;font-size:0;line-height:0;border-color:transparent transparent #0080c0 transparent;border-style:dashed dashed solid dashed;border-width:10px}@media screen and (-webkit-min-device-pixel-ratio:0){#iZhihu_rtjddiv{height:417px}#iZhihu_setdiv{height2:295px}#izh_updatediv{height:315px}}'
     ,''].join('\n');
if(pageIs.Question&&izhAuthorList){
    css+=['div.uno{position:absolute;left:0;border:1px solid #0771C1;border-right-width:0;border-top-right-radius:6px}'
         ,'div.uno .frame{overflow-x:hidden;overflow-y:auto;direction:rtl}'
         ,'div.uno span.meT,div.uno span.meB,div.uno ul.pp li span.me{position:absolute;right:0;display:block;height:1px;width:1px;line-height:1px;background-color:transparent;border-style:solid;border-color:transparent;}'
         ,'div.uno span.meT{border-width:6px 4px;border-top-width:0px;border-bottom-color:#fff;}'
         ,'div.uno span.meB{border-width:6px 4px;border-bottom-width:0px;border-top-color:#fff;margin-top:-7px;}'
         ,'div.uno ul{background-color:#0771C1;padding:0;margin:0;direction:ltr}'
         ,'div.uno ul li{display:block;list-style-type:none;margin:0;padding:0;white-space:nowrap;}'
         ,'div.uno ul li a{display:block;}div.uno li a.sel{text-decoration:none;}'
         ,'div.uno ul li a{'+css_AuthorListItemA+'}'
         ,'div.uno ul.pp li span.me{position:static;margin:6px -8px;border-width:4px 6px;border-right-color:#fff;float:right;}'
         ,'div.uno li a span.name{text-align:right;display:block;'+css_AuthorListItemA_name+'background-color:#fff;}div.uno li a.sel span.name{color:#fff;background-color:#0771C1;}'
         ,'div.uno li a span.name.noname{color:#000;}'
         ,'div.uno li a span.name.collapsed{color:#999999;}'
         ,'div.uno li a span.name.friend{font-style:italic;}'
         ,'div.uno li span.hp{background-color:#999999;position:relative;float:right;margin-top:-2px;line-height:2px;height:2px;}'
         ,'div.uno table.plus{float:right;margin:7px -9px;height:7px;border-collapse:collapse;border-style:hidden;}div.uno table.plus td{border:1px solid #fff;width:1px;height:1px;}'
         ,'div.uno a.sel table.plus{}div.uno a.sel table.plus td{}'
         ,'div.uno li a span.func{text-align:center;}'
         ,'div.izh-answer-preview{position:fixed;margin-top:1px;background-color:#fff;border:1px solid #0771C1;border-top-width:22px;border-top-right-radius:6px;box-shadow:5px 5px 5px #777;}'
         ,'div.izh-answer-preview .zm-editable-content{top:0;bottom:0;left:0;right:0;overflow-y:auto;padding:10px;}'
         ,'div.izh-answer-preview img.zm-list-avatar{position:absolute;right:10px;top:-35px;border:1px solid #0771C1;border-radius:6px;}'
         ,'div.izh-answer-preview span.comment{position:absolute;top:-18px;line-height:18px;border-top-right-radius:3px;background-color:#fff;padding:0 5px;}'
         ,''].join('\n');
}
css+=['.z-icon-izh-fold{background-position:-173px -107px;width:15px;height:15px;}'
     ,''].join('\n');
css+=['.t_set_tb{font-family:"Lucida Sans Unicode","Lucida Grande",Sans-Serif !important;font-size:12px !important;text-shadow:none !important;border-collapse:collapse !important;margin:0 !important;line-height:120%}'
     ,'.t_set_tb thead td{background:#0080c0;color:#fff;border:none !important;padding:4px 8px 4px !important;border-top-left-radius:6px;border-top-right-radius:6px}'
     ,'.t_set_tb th,.t_set_tb td{padding:8px;background:#e7f3f9;border:none !important;border-top:2px solid #fcfcfc !important;color:#669;line-height:1.1em !important}'
     ,'.t_set_tb td input,.t_set_tb td textarea{font-size:12px !important;padding:0 !important}'
     ,'.t_set_tb tbody tr:hover th,.t_set_tb tbody tr:hover td{background:#d0dafd}'
     ,'.t_set_tb tfoot td{border-radius-bottomleft:10px;border-radius-bottomright:10px;-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;-webkit-border-bottom-left-radius:10px;-webkit-border-bottom-right-radius:10px}'
     ,'.t_set_tb td{white-space:nowrap;}'
     ,'.t_set_tb td .icon-help{float:right;}'
     ,''].join('\n');
css+=['.izh_boxShadow{box-shadow: 5px 5px 3px 0px #999 !important;}'
     ,'#zh-question-meta-wrap.izh_noBorder{border-bottom-color:transparent !important;}'
     ,'#zh-question-filter-wrap.izh_noBorder{border-top-color:transparent !important;}'
     ,'a.izh-button.on{color:#225599;text-shadow:0 0 1px #225599;}'
     ,'a.izh-button .zg-icon{opacity:0.5;}'
     ,'a.izh-button.on .zg-icon{opacity:1;}'
     ,'a.izh-button.off{color:#eee;}'
     ,'a.izh-button.off .zg-icon{opacity:0.2;}'
     ,'.izh-feeds-filter{}'
     ,'.izh-feeds-filter .izh-feeds-filter-option{opacity:0.5;color:#999999;padding-left:5px;text-decoration:none;cursor:pointer;}'
     ,'.izh-feeds-filter .izh-feeds-filter-option i{background-position:-183px -4px;}'
     ,'.izh-feeds-filter .izh-feeds-filter-option.on{opacity:1;color:#225599;}'
     ,'.izh-feeds-filter .izh-feeds-filter-option.on i{background-position:-183px -24px;}'
     ,''].join('\n');
if(izhHomeLayout){
    css +=  ['#zh-question-list { padding-left:30px!important }'
            ,'#zh-main-feed-fresh-button { margin-left:-30px!important }'
            ,'.feed-item {'
            ,'    border-bottom:1px solid #EEE!important;'
            ,'    margin-top:-1px!important'
            ,'}'
            ,'.feed-item .avatar { display:none!important }'
            ,''
            ,'.feed-main,.feed-item.combine { margin-left:0!important }'
            ,'.feed-item-q { margin-left:-30px!important;padding-left:0!important }'
            ,''
            ,window.iZhihu.Comment.RightComment ? '' : '.feed-item-a .zm-comment-box { max-width:602px!important }'
            ,window.iZhihu.Comment.RightComment ? '' : '.feed-item-q .zm-comment-box { max-width:632px!important; width:632px!important }'
            ,''
            ,'.zm-tag-editor,'
            ,'#zh-question-title,'
            ,'#zh-question-detail,'
            ,'#zh-question-meta-wrap,'
            ,'.zh-answers-title,'
            ,'#zh-question-filter-wrap {'
            ,'    margin-left:-32px!important'
            ,'}'
            ,''
            ,'#zh-question-log-page-wrap .zm-tag-editor,'
            ,'#zh-question-log-page-wrap #zh-question-title {'
            ,'    margin-left:0 !important'
            ,'}'
            ,''
            ,'.zh-answers-title,'
            ,'#zh-question-filter-wrap {'
            ,'    border-bottom:1px solid #EEE!important;'
            ,'    z-index:1000!important'
            ,'}'
            ,''
            ,'#zh-question-meta-wrap {'
            ,'    margin-bottom:0!important;'
            ,'    padding-bottom:10px!important;'
            ,'    border-bottom:1px solid #EEE!important'
            ,'}'
            ,''
            ,'#zh-question-answer-wrap { margin-top:-1px!important }'
            ,''
            ,'#zh-question-collapsed-wrap,#zh-question-answer-wrap { border:none!important }'
            ,'.zu-question-collap-title { border-top:1px solid #EEE!important }'
            ,'#zh-question-collapsed-wrap>div:last-child,.zm-item-answer:last-child { border-bottom:1px solid #EEE!important }'
            ,''
            ,'.zu-autohide,'
            ,'.zm-comment-op-link,'
            ,'.zm-side-trend-del,'
            ,'.unpin {'
            ,'    visibility:visible!important;'
            ,'    opacity:0;'
            ,'}'
            ,'.feed-item:hover .zu-autohide,'
            ,'.zm-item-answer .zu-autohide,'
            ,'.zm-item-comment:hover .zm-comment-op-link,'
            ,'.zm-side-trend-row:hover .zm-side-trend-del,'
            ,'.zm-side-nav-li:hover .unpin {'
            ,'    opacity:1;'
            ,'}'
            ,'.zm-item-vote-count:hover,.zm-votebar button:hover{'
            ,'    background:#a6ce56!important;'
            ,'    color:#3E5E00 !important'
            ,'}'
            ,''
            ,'a,a:hover,'
            ,'i,'
            ,'.zu-autohide,'
            ,'.zm-votebar button,'
            ,'.zm-item-comment:hover .zm-comment-op-link,'
            ,'.zm-comment-op-link,'
            ,'.zm-side-trend-row:hover .zm-side-trend-del,'
            ,'.zm-side-trend-del,'
            ,'.zm-side-nav-li,'
            ,'.zu-main-feed-fresh-button,'
            ,'.zg-icon,'
            ,'.zm-side-nav-li:hover .zg-icon,'
            ,'.zm-side-nav-li:hover i,'
            ,'.unpin,'
            ,'.zm-side-nav-li:hover .unpin {'
            ,'    -moz-transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;'
            ,'    -webkit-transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;'
            ,'    transition:color .2s linear,opacity .15s linear,background-color .2s linear,background-position .2s linear .1s;'
            ,'}'
            ,''
            ,'h3{ line-height:25px }'
            ,'.zu-footer-inner {padding:15px 0!important}'
            ,'.zm-side-pinned-topics .zm-side-nav-li{float:left;padding-right:30px!important}'
            ,'.zm-side-list-content{clear:both}'
            ,'.unpin{ display:inline-block!important }'
           ,''].join('\n');
}

var css_comment='';
if(pageIs.Home||pageIs.Question||pageIs.Answer){
    css_comment = window.iZhihu.Comment.css;
}

css += window.iZhihu.Answer.css;

if(window.iZhihu.QuickFavo){
    css += window.iZhihu.QuickFavo.css;
}
if(window.iZhihu.QuickBlock){
    css += window.iZhihu.QuickBlock.css;
}
if(window.iZhihu.Noti7){
    css += window.iZhihu.Noti7.css;
    window.iZhihu.Noti7.enhance();
}
var heads = _doc.getElementsByTagName("head");
if (heads.length > 0) {
    var node = _doc.createElement("style");
    node.type = "text/css";
    node.id = "izhCSS_main";
    node.appendChild(_doc.createTextNode(css));
    heads[0].appendChild(node); 
    if(css_comment!=''){
        node = _doc.createElement("style")
        node.type = "text/css";
        node.id = "izhCSS_comment";
        node.appendChild(_doc.createTextNode(css_comment));
        heads[0].appendChild(node);
    }
}

if(!$('.modal-dialog-bg').length){
    $body.append(
        $('<div', { id: 'izh-dlg-bg', 'class': 'modal-dialog-bg' }).css({
            'z-index': 85
          , 'opacity': 0.5
          , 'position': 'fixed'
          , 'top': 0
          , 'bottom': 0
          , 'left': 0
          , 'right': 0
          , 'display': 'none'
        })
    );
}

window.iZhihu.getItem=function($c){
    var $item=$(null);
    if($c && $c.length){ 
        var $itemMeta=$c.closest('.zm-item-meta');
        if ($itemMeta.is('.feed-meta') || $itemMeta.parent().is('.feed-meta')){
            $item=$c.closest('.feed-item');
            $item.attr('data-aid', $item.children('meta[itemprop=answer-id]').attr('content'))
        }else if($itemMeta.is('.answer-actions')){
            $item=$c.closest('.zm-item-answer,.feed-item');
        }else{
            $item=$itemMeta.prev();
        }
    }
    return $item;
};

utils.observeDOMNodeAdded(document.body,function(event){
	if(izhTopNavAutoFold){
		window.iZhihu.TopNav.onNodeAdded(event)
	}
})