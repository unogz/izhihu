var $ = unsafeWindow.$;
var _ = this._;
var purl = window.purl||$.url;

//使用CasperJS的模拟用户操作： http://casperjs.org/api.html#client-utils
var client = window.create();

var url = purl();
var page = url.segment(1);

//主入口
$(function main(){
  console.log('izhihu started.')
});

var pageIs={}
  , $win=$(unsafeWindow)
  , _doc=window.document
  , $body=$(_doc.body)
  , _path=window.frameElement?window.frameElement.src.replace(/https?:\/\/www.zhihu.com/,''):url.data.attr['path']
  , css=''
  , $h=$('head')
  , $s=$('<style type="text/css"></style>')
  , iPathAnswers=_path.indexOf('/answers')
  , iPathCollection=_path.indexOf('/collection')
;
pageIs.Home='/'==_path;
pageIs.Answer=0<_path.indexOf('/answer/');
pageIs.Question=!pageIs.Answer&&0==_path.indexOf('/question/');
pageIs.Answers=0<iPathAnswers&&_path.substr(iPathAnswers)=='/answers';
pageIs.Collection=0==iPathCollection;
pageIs.Debuts=0==_path.indexOf('/debuts/');

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
  , config:_.extend(cfgDefault, utils.getValue('izhihu',cfgDefault))
};

var izhHomeLayout = window.iZhihu.config['HomeLayout']
  , izhAuthorList = window.iZhihu.config['AuthorList']
  , izhRightComment = window.iZhihu.config['ShowComment']
  , izhQuickFavo = window.iZhihu.config['QuickFavo']
  , izhAuthorRear = window.iZhihu.config['AuthorRear']
  , izhHomeNoti = window.iZhihu.config['HomeNoti']
  , izhQuickBlock = window.iZhihu.config['QuickBlock']
;

utils.transferOldCfg();

window.iZhihu.$body.attr({
    'izhHomeLayout' : izhHomeLayout?'1':''
  , 'izhAuthorList' : izhAuthorList?'1':''
  , 'izhRightComment' : izhRightComment?'1':''
  , 'izhQuickFavo' : izhQuickFavo?'1':''
  , 'izhAuthorRear' : izhAuthorRear?'1':''
  , 'izhHomeNoti' : izhHomeNoti?'1':''
  , 'izhQuickBlock' : izhQuickBlock?'1':''
});

var _QuickBlock = new QuickBlock(window.iZhihu)
  , _QuickFavo = new QuickFavo(window.iZhihu)
  , _Comment = new Comment(window.iZhihu)
;

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
     ,'.t_jchkbox{display:inline;font-size:20px;line-height:15px;padding-right:4px;cursor:pointer;cursor:hand}'
     ,'.t_jchkbox .mark{display:inline}'
     ,'.t_jchkbox img{vertical-align:middle;width:45px;height:15px}'
     ,'.t_jchkbox img{background:transparent url("data:image/png;base64,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") no-repeat}'
     ,'.t_jchkbox img{background-position:0 0}'
     ,'.t_jchkbox-hover img{background-position:0 -15px}'
     ,'.t_jchkbox-checked img{background-position:0 -30px}'
     ,'.t_jchkbox-checked .t_jchkbox-hover img{background-position:0 -45px}'
     ,'.t_jchkbox-disabled img{background-position:0 -60px}'
     ,'.t_jchkbox-checked .t_jchkbox-disabled img{background-position:0 -75px}'
     ,''].join('\n');
css+=['.izh_boxShadow{box-shadow: 5px 5px 3px 0px #999 !important;}'
     ,'#zh-question-meta-wrap.izh_noBorder{border-bottom-color:transparent !important;}'
     ,'#zh-question-filter-wrap.izh_noBorder{border-top-color:transparent !important;}'
     ,''].join('\n');
if(izhHomeLayout){
	css += ['#zh-question-list { padding-left:30px!important }'
           ,'#zh-main-feed-fresh-button { margin-left:-30px!important }'
           ,'.feed-item {'
           ,'    border-bottom:1px solid #EEE!important;'
           ,'    margin-top:-1px!important'
           ,'}'
           ,'.feed-item .avatar { display:none!important }'
           ,'.feed-main,.feed-item.combine { margin-left:0!important }'
           ,'.feed-item-q { margin-left:-30px!important;padding-left:0!important }'
           ,window.iZhihu.Comment.RightComment ? '' : '.feed-item-a .zm-comment-box { max-width:602px!important }'
           ,window.iZhihu.Comment.RightComment ? '' : '.feed-item-q .zm-comment-box { max-width:632px!important; width:632px!important }'
           ,'.zm-tag-editor,'
           ,'#zh-question-title,'
           ,'#zh-question-detail,'
           ,'#zh-question-meta-wrap,'
           ,'.zh-answers-title,'
           ,'#zh-question-filter-wrap {'
           ,'    margin-left:-32px!important'
           ,'}'
           ,'#zh-question-log-page-wrap .zm-tag-editor,'
           ,'#zh-question-log-page-wrap #zh-question-title {'
           ,'    margin-left:0 !important'
           ,'}'
           ,'.zh-answers-title,'
           ,'#zh-question-filter-wrap {'
           ,'    border-bottom:1px solid #EEE!important;'
           ,'    z-index:1000!important'
           ,'}'
           ,'#zh-question-meta-wrap {'
           ,'    margin-bottom:0!important;'
           ,'    padding-bottom:10px!important;'
           ,'    border-bottom:1px solid #EEE!important'
           ,'}'
           ,'#zh-question-answer-wrap { margin-top:-1px!important }'
           ,'#zh-question-collapsed-wrap,#zh-question-answer-wrap { border:none!important }'
           ,'.zu-question-collap-title { border-top:1px solid #EEE!important }'
           ,'#zh-question-collapsed-wrap>div:last-child,.zm-item-answer:last-child { border-bottom:1px solid #EEE!important }'
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
           ,'h3{ line-height:25px }'
           ,'.zu-footer-inner {padding:15px 0!important}'
           ,'.zm-side-pinned-topics .zm-side-nav-li{float:left;padding-right:30px!important}'
           ,'.zm-side-list-content{clear:both}'
           ,'.unpin{ display:inline-block!important }'
           ,''].join('\n');
}
if(window.iZhihu.Comment.RightComment){
    css += window.iZhihu.Comment.css;
}
if(window.iZhihu.QuickFavo){
    css += window.iZhihu.QuickFavo.css;
}
if(window.iZhihu.QuickBlock){
    css += window.iZhihu.QuickBlock.css;
}
var heads = _doc.getElementsByTagName("head");
if (heads.length > 0) {
    var node = _doc.createElement("style");
    node.type = "text/css";
    node.appendChild(_doc.createTextNode(css));
    heads[0].appendChild(node); 
}

if(!$('.modal-dialog-bg').length){
    $body.append('<div id="izh-dlg-bg" class="modal-dialog-bg" style="opacity:0.5;position:fixed;top:0;bottom:0;left:0;right:0;display:none;"></div>');
}

var _e=null
  , ppWidth=0,ppHeight=400
  , getItem=function($c){
        var $item=$(null);
        if($c && $c.length){ 
            var $itemMeta=$c.closest('.zm-item-meta');
            if ($itemMeta.parent().is('.feed-meta')){
                $item=$c.closest('.feed-item');
            }else if($itemMeta.is('.answer-actions')){
                $item=$c.closest('.zm-item-answer,.feed-item');
            }else{
                $item=$itemMeta.prev();
            }
        }
        return $item;
    }
  , processAnswer=function($a,$pp,bAuthorRear,bAuthorList){
        if(!$a||!$a.length)return;
        if($a.attr('izh_processed')=='1')return;
        var $c=$a.children().last()
          , $p=$a.find('.zm-item-answer-author-info')
          , $v=$a.find('.meta-item[name=favo]');
        if(window.iZhihu.QuickBlock){
            // Region: 快速屏蔽
            var $voteInfo=$('.zm-item-vote-info',$a);
            if($('[name=more]',$voteInfo).length){
                $voteInfo.parent().bind('DOMNodeInserted',function(event){
                    window.iZhihu.QuickBlock.addQuickBlock($(event.target),window.iZhihu.QuickBlock);
                });
            }
            // Region end
        }
        if($p.length){//relocatePersonInfo
            if(bAuthorRear){
                $p.css({
                    'textAlign':'right'
                });
                if($a.is('.feed-item')){
                    $a.find('.answer_wrap .zm-item-answer-detail .zm-item-rich-text')
                    	.append($p.hide()).bind('DOMNodeInserted',function(event){
                    	    var $c=$(event.target);
                    	    if($c.is('.zm-editable-content')){
                    	        $(this).children('.zm-item-answer-author-info')
                    	        	.insertBefore($c.children('.answer-date-link-wrap'))
                    	        	.css({
                    	        	    'position':'absolute'
                    	        	  , 'right':0
                    	        	}).show();
                    	    }
                    	});
                }else{
                    $p.insertBefore($c);
                }
            }
            $p=$p.children().first().children().eq(1);
            if ($pp && bAuthorList){
                // Region: 回答目录项
                var $ppla=$('<a>',{
                            href:'#'+$a.attr('data-aid')
                          , target:'_self'
                          , style:css_AuthorListItemA
                        })
                  , $ppl=$('<li>').append($ppla).appendTo($pp);
                if($a.attr('data-isowner')=='1'){
                    _e=$a.get(0);
                    $ppla.append('<span class="me"></span>');
                }
                var nameCSS='name';
                if($a.attr('data-isfriend')=='1'){
                    nameCSS+=' friend';
                }
                if($a.attr('data-collapsed')=='1'){
                    nameCSS+=' collapsed'
                }
                if(!$p.length){
                    nameCSS+=' noname';
                }
                $('<span>',{
                    'class':nameCSS
                  , html:!$p.length?'匿名用户':$p.html()
                  , style:css_AuthorListItemA_name
                }).appendTo($ppla);
                if ($ppl.width()>ppWidth)
                    ppWidth=$ppl.width();
                // Region end
                // Region: 回答篇幅指示
                var nHP=Math.ceil($('.zm-editable-content',$a).text().length/100);
                $('<span>',{
                    'class':'hp'
                }).css({'width':nHP*10,'margin-left':-nHP*10}).appendTo($ppla);
                // Region end
                $ppla.mouseover(function(){
                    var $frm=$(this.parentNode.parentNode.parentNode)
                      , $uno=$frm.parent().mouseover();
                    $(this).addClass('sel');
                    if(_e){
                        $uno.children('.meT').css('display',0>_e.offsetTop-$frm.scrollTop()?'':'none');
                        $uno.children('.meB').css('display',$frm.height()<_e.offsetTop-$frm.scrollTop()+_e.offsetHeight?'':'none');
                    }
                    // Region: 回答预览
                    var nam=$('span.name',this);
                    if(!nam.length)return;
                    var aid=$(this).attr('href').slice(1)
                      , prv=$uno.next('.izh-answer-preview')
                      , top=$(this).position().top+$uno.position().top
                      , sel='.zm-item-answer[data-aid='+aid+'] > .zm-item-rich-text'
                      , ctx=nam.is('.collapsed')?'#zh-question-collapsed-wrap':'#zh-question-answer-wrap'
                      , div=$(sel,ctx)
                      , htm=div.html()
                      , cmt=$('.zm-item-meta > .zu-question-answer-meta-comment',div.parent())
                    ;
                    if(!prv.length){
                        prv=$('<div>',{
                                'class':div.class
                            })
                            .addClass('izh-answer-preview').width(div.width()+22)
                            .mouseover(function(){$uno.mouseover();$('li a[href=#'+$(this).attr('data-aid')+']',$uno).addClass('sel');$(this).show();})
                            .mouseout(function(){$uno.mouseout();$('li a[href=#'+$(this).attr('data-aid')+']',$uno).removeClass('sel');$(this).hide();})
                            .click(function(){$('li a[href=#'+$(this).attr('data-aid')+']',$uno)[0].click();})
                            .insertAfter($uno)
                        ;
                    }
                    if(prv.attr('data-aid')!=aid){
                        prv.attr('data-aid',aid).html(htm).find('a').attr('onclick','return false;');
                        if($('span.me',this).length)
                            prv.find('a.zu-edit-button').remove();
                        if(!nam.hasClass('noname'))
                            $('img.zm-list-avatar',div.parent()).clone().appendTo(prv);
                        var t=cmt.text(),i=t.indexOf('条评论');
                        if(cmt.length&&i>0)
                            $('<span>',{'class':'comment',html:t.substring(0,i)}).prepend(cmt.children('i').clone()).appendTo(prv);
                    }
                    var th=div.height()+33
                      , maxTop=$uno.position().top+12
                      , contentPosition='';
                    if(maxTop+th<$win.height()){
                        if(top+th<$win.height()){
                            prv.css({'top':top>maxTop?top:maxTop,'bottom':''});
                        }else{
                            prv.css({'top':'','bottom':0});
                        }
                    }else{
                        prv.css({'top':maxTop,'bottom':0});
                        contentPosition='absolute';
                    }
                    prv.css({'left':$uno.width()}).show().children().first().css('position',contentPosition);
                    // Region end
                }).mouseout(function(){
                    $(this).removeClass('sel');
                    var $uno=$(this.parentNode.parentNode.parentNode.parentNode);
                    $uno.next().hide();
                }).click(function(){$(this).mouseout();$uno.css('left',9-$uno.width());});
                if(_e==$a.get(0)){
                    _e=$ppla.get(0);
                }
            }
        }

        if(window.iZhihu.QuickFavo)
            window.iZhihu.QuickFavo.addQuickFavo($v,$a);

        $c.bind('DOMNodeInserted',function(event){
            window.iZhihu.Comment.processComment($(event.target));
        });
        
        window.iZhihu.Comment.processCommentButton($a);

        window.iZhihu.Comment.processComment($('.zm-comment-box',$a));
        $a.attr('izh_processed','1');
    }
;
