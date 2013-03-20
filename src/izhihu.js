var version='2.1.4.315';
var updateDate='2013-3-19';

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

var izhHomeLayout = utils.getCfg('HomeLayout')
  , izhAuthorList = utils.getCfg('AuthorList')
  , izhRightComment = utils.getCfg('ShowComment')
  , izhQuickFavo = utils.getCfg('QuickFavo')
  , izhAuthorRear = utils.getCfg('AuthorRear')
  , izhHomeNoti = utils.getCfg('HomeNoti')
  , izhQuickBlock = utils.getCfg('QuickBlock')
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
});

var i=0
  , $user=$('.zu-top-nav-userinfo')//user_avater
  , z=$user.length?$user.attr('href'):''
  , $banner=$(document.body).children().first()
  , $main=$('[role=main]')//main
  , css_AuthorListItemA='padding:0 10px 0 0;'
  , css_AuthorListItemA_name='padding:0 5px;'
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
if(izhQuickFavo){
    css+=['div.izh_fav{padding:5px;display:none;position:absolute;z-index:10;border:1px solid #999999;background-color:#fff}'
         ,'div.izh_fav .title{background-color:#0874c4;color:#fff;font-weight:bold;font-size:15px;text-align:center}'
         ,'div.izh_fav a.fav{display:block;clear:both;float;left;padding:0 32px;line-height:32px}div.izh_fav a.fav.selected{background:url("/static/img/check4.png") no-repeat scroll 0 center transparent}div.izh_fav a.fav:hover{text-decoration:none}'
         ,'div.izh_fav a.fav span{float:right;display:block;margin-right:-32px}'
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
           ,'.feed-item-a .zm-comment-box { max-width:602px!important }'
           ,'.feed-item-q .zm-comment-box { max-width:632px!important; width:632px!important }'
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
if(izhQuickBlock){
    css +=['#izh_blockCart{position:fixed;right:0;bottom:0;z-index:99;overflow-y:auto;overflow-x:hidden;padding:0 30px 0 60px;}'
          ,'#izh_blockCart .do{display:block;margin:2px;width:100%;height:20px;}'
          ,'#izh_blockCart .list{display:block;margin:2px;width:100%;}'
          ,'#izh_blockCart .user2B{display:block;margin:2px;width:100%;}'
          ,'#izh_blockCart .user2B i.zg-icon{display:block;position:absolute;right:0;margin-top:5px;}'
          ,'#izh_blockCart .user2B .name{display:block;color:#fff;background-color:#000;white-space:nowrap;padding:2px 5px;border-radius:3px;}'
          ,'#izh_blockCart .user2B .del{display:block;position:absolute;margin-left:-4.5em;}'
          ,'#izh_blockCart .user2B i.say{display:block;position:absolute;margin-left:-44px;border-radius:6px 6px 0 6px;border:1px solid #999;padding:0 5px 0 3px;}'
          ,'#izh_blockCart .user2B i.say_1{display:block;position:absolute;margin-left:-10px;height:6px;background-color:#fff;width:6px;margin-top:17px;border-bottom:1px solid #999;}'
          ,'#izh_blockCart .user2B i.say_2{display:block;position:absolute;margin-left:-9px;height:6px;background-color:#fff;width:6px;margin-top:17px;border-radius:0 0 0 6px;border:1px solid #999;border-width:0 0 1px 1px}'
          ,''].join('\n');
}
var heads = _doc.getElementsByTagName("head");
if (heads.length > 0) {
    var node = _doc.createElement("style");
    node.type = "text/css";
    node.appendChild(_doc.createTextNode(css));
    heads[0].appendChild(node); 
}

if(!$('.modal-dialog-bg').length){
    $(_doc.body).append('<div id="izh-dlg-bg" class="modal-dialog-bg" style="opacity:0.5;position:fixed;top:0;bottom:0;left:0;right:0;display:none;"></div>');
}

var _e=null
  , ppWidth=0,ppHeight=400
  , css_comment={
        'position':'fixed'
      , 'background-color':'#fff'
      , 'outline':'none'
      , 'z-index':'9999'
      , 'right':10
      , 'border-radius':'0 6px 0 0'
      , 'padding':'100px 0px 0px 10px'
    }
  , css_QuickBlock={
        'background-position':'-146px -202px'
      , 'width':16
      , 'height':16
  	}
  , quickBlock=function($e){
        $.post('http://www.zhihu.com'+$e.attr('href')+'/block',$.param({
            action:'add'
          , _xsrf:$('input[name=_xsrf]').val() 
        }),function(r){
            var u=this.url.replace(/http:\/\/www.zhihu.com/g,'').replace(/\/block/g,'');
            $('a[href="'+u+'"]').css('text-decoration','line-through');
        });
  	}
  , in2BlockCart=function($e){
        var $cartDIV=$('#izh_blockCart')
          , href=$e.attr('href')
        ;
        if($cartDIV.find('.user2B[user="'+href+'"]').length)return;
        if(!$cartDIV.length){
            $cartDIV=$('<div id="izh_blockCart">').css({
                'top':$main.offset().top
            })
            .append(
                $('<div>',{
                    'class':'do'
                })
                .append(
                    $('<a>',{
                        html:'大赦'
                      , click:function(){
                          $('.list','#izh_blockCart').empty();
                      }
                    }).css({
                        'display':'block'
                      , 'float':'left'
                    })
                )
                .append(
                    $('<a>',{
                        html:'收监'
                    }).css({
                        'display':'block'
                      , 'float':'right'
                    })
                )
            )
            .append('<div class="list"></div>')
            .appendTo($body);
        }
        $.get('http://www.zhihu.com'+href+'/json','',function(r){
            var user=r.msg[0]
              , userName=user[0]
              , userID=user[1]
              , f_=r.msg[3]
              , _f=r.msg[4]
              , cssF=_f?'zg-icon ':''
              , $cart=$('.list','#izh_blockCart')
              , href='/people/'+userID
            ;console.log(userName+':'+f_+':'+_f);
            if($cart.find('.user2B[user="'+href+'"]').length)return;
            if(cssF!=''){
                cssF+=f_?'zu-entry-focus-each':'zu-entry-focus-single-way'
            }
            var $user2B=$('<div>',{
                	'class':'user2B'
                  , 'user':'/people/'+userID
                })
                .append(
                    $('<a>',{
                        'class':'del'
                      , html:'赦'
                      , href:'javascript:void(0);'
                      , click:function(){
                            $(this).closest('.user2B').remove();
                        }
                    })
                )
                .append($('<i>',{'class':'say',html:'冤枉'}))
                .append($('<i>',{'class':'say_1'}))
                .append($('<i>',{'class':'say_2'}))
            	.append(
            	    $('<i>',{
            	        'class':cssF
            	    }).show()
            	)
            	.append(
                    $('<span>',{
                        'class':'name'
                      , html:userName
                    })
                );
            if(_f&&f_){
                if($cart.find('.user2B i.zu-entry-focus-each').length){
                    $cart.find('.user2B i.zu-entry-focus-each:last').parent().after($user2B);
                }else{
                    $cart.prepend($user2B);
                }
            }else if(_f){
                if($cart.find('.user2B i.zu-entry-focus-single-way').length){
                    $cart.find('.user2B i.zu-entry-focus-single-way:last').parent().after($user2B);
                }else if($cart.find('.user2B i.zu-entry-focus-each').length){
                    $cart.find('.user2B i.zu-entry-focus-each:last').parent().after($user2B);
                }else{
                    $cart.prepend($user2B);
                }
            }else{
                $cart.append($user2B);
            }
        });
  }
  , addQuickBlock=function($vi){
        if($vi.is('.zm-item-vote-info') && !$vi.children('a[name=more]').length){
            if($vi.attr('izh-QuickBlock')!='1'){
                var $u=$('.voters a[href^="/people/"]',$vi);
                $u.each(function(i,e){
                    $('<input>',{'class':'izh-quick-block-sel',type:'checkbox'}).css({
                    }).insertBefore(e).hide();
                });
                $vi.attr('izh-QuickBlock','1');
            }
            if($vi.parent().children('a.izh-quick-block').length)
                return;
            var width=$vi.closest('[data-aid]').width()
              , $btnQuickBlock=$('<a>',{'class':'izh-quick-block',html:'快速屏蔽',href:'javascript:void(0);'}).css({
                    'position':'absolute'
                  , 'left':width
                  , 'width':'4em'
                }).click(function(){
                    if(this.getAttribute('on')=='1'){
                      $('.zm-item-vote-info input.izh-quick-block-sel',this.parentNode).hide();
                      $(this).nextAll('[class^=izh-quick-block]').hide();
                      this.setAttribute('on','0');
                    }
                    else{
                      $('.zm-item-vote-info input.izh-quick-block-sel',this.parentNode).show();
                      $(this).nextAll('[class^=izh-quick-block]').show();
                      this.setAttribute('on','1');
                    }
                }).insertBefore($vi);
            $('<a>',{'class':'izh-quick-block-do',href:'javascript:void(0);',html:'候审'})
              .css($.extend(css_QuickBlock,{
                  'position':'absolute'
                , 'left':width
                , 'width':'4em'
                , 'margin-top':'1.5em'
                , 'font-size':'200%'
              })).click(function(){
                  $('.zm-item-vote-info input.izh-quick-block-sel:checked',this.parentNode).each(function(i,e){
                      in2BlockCart($(e).next());
                  });
              }).insertAfter($btnQuickBlock).hide();
            $('<a>',{'class':'izh-quick-block-selAll',html:'无',href:'javascript:void(0);'}).css({
                'position':'absolute'
              , 'left':width
              , 'width':'2em'
              , 'margin-top':'1.5em'
              , 'margin-left':'3em'
            }).click(function(){
              $('.zm-item-vote-info input.izh-quick-block-sel',this.parentNode).removeAttr('checked');
            }).insertAfter($btnQuickBlock).hide();
            $('<a>',{'class':'izh-quick-block-notAll',html:'全',href:'javascript:void(0);'}).css({
                'position':'absolute'
              , 'left':width
              , 'width':'2em'
              , 'margin-top':'1.5em'
            }).click(function(){
              $('.zm-item-vote-info input.izh-quick-block-sel',this.parentNode).attr('checked','checked');
            }).insertAfter($btnQuickBlock).hide();
        }
  }
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
  , showComment=function($ac,$cm){
        $('.zm-comment-box:visible')
        	.each(function(i,e){
            	if(!$cm.length||e!=$cm.get(0))
            		$(e).closest('.zm-item-meta').find('[name=addcomment],[name=add-q-comment]')[0].click();
            });
        var $n=$ac.next(),$n=$n.length?$n:$ac.parent().next()
          , t=$ac.offset().top-$main.offset().top
          , b=$ac.offset().top-$main.offset().top
          , w=$ac.width()
          , inAnswer=$ac.is('.zm-item-answer')
          , inQuestion=$ac.is('#zh-question-detail')
          , $questionMeta=$('#zh-question-meta-wrap')//question_meta
          , h=inQuestion?$questionMeta.offset().top+$questionMeta.height()+parseInt($questionMeta.css('padding-bottom'))-$main.offset().top
                  			 :$ac.height()+parseInt($ac.css('padding-bottom'))+parseInt($n.css('padding-top'))
        ;
        if(!$ac.find('.izh_tape_a,.izh_tape_b').length)
            $('<div class="izh_tape_a"></div><div class="izh_tape_b"></div>').appendTo($ac);
        if(!$cm)$cm=$ac.find('.zm-comment-box');
        if($cm.length){
            if(!$cm.attr('tabindex')){
                $cm.attr('tabindex','-1').focus();
            }
            if(inQuestion){
                $('#izh_QuestionShadow').css({
                    'height':h
                  , 'margin-bottom':-h
                }).show();
                $questionMeta.next(':visible').andSelf().addClass('izh_noBorder');
            }else{
                $ac.addClass('izh_boxShadow');
            }
            $ac.find('.izh_tape_a').css({
                'position':'absolute'
              , 'width':1
              , 'height':h
              , 'top':0
              , 'margin-left':w-1
              , 'z-index':'10000'
              , 'background-color':'#fff'
            }).show();
            var $t=$cm.clone().css({'position':'absolute','z-index':'-1'}).appendTo($body).show();
            $cm.css({'left':$ac.offset().left+$ac.width()-1});
            var th=$t.children('.zm-comment-list').css({'position':'absolute','height':'','top':'','bottom':''}).height()+100;
            if(th<$win.height()-$main.offset().top){
                var top=inQuestion?0:$cm.parent().offset().top-$(document).scrollTop();
                if(top+th>$win.height()){
                    $cm.css({'top':'','bottom':0});
                }else{
                    $cm.css({'top':top>$main.offset().top?top:$main.offset().top,'bottom':''});
                }
            }else{
                $cm.css({'top':$main.offset().top,'bottom':0});
            }
            $t.remove();
            $t=null;
            $('.mention-popup').attr('data-aid',$ac.attr('data-aid'));
        }else{
            $ac.find('.zu-question-answer-meta-comment')[0].click();
        }
        $ac.find('.izh_tape_b').css({
            'position':'absolute'
          , 'width':1
          , 'height':h
          , 'top':0
          , 'margin-left':w
          , 'z-index':'9998'
          , 'background-color':'#eee'
        }).show();
        //$ac.css('border-color','#999999');
        //$n.css('border-color','#999999');
        $('.zh-backtotop').css('visibility','hidden');
        $body.scrollTop(t);
    }
  , hideComment=function($ac,$cm){
        var $n=$ac.next()
          , $n=$n.length?$n:$ac.parent().next()
          , inQuestion=$ac.is('#zh-question-detail');
        if(!$cm)$cm=$ac.find('.zm-comment-box');
        if(inQuestion){
            $('#izh_QuestionShadow').hide();
            $('#zh-question-meta-wrap').next(':visible').andSelf().removeClass('izh_noBorder');
        }else{
            $ac.removeClass('izh_boxShadow');
        }
        if($cm.length){
            $ac.find('.izh_tape_a').hide();
        }
        $ac.find('.izh_tape_b').hide();
        //$ac.css('border-color','#DDDDDD');
        //$n.css('border-color','#DDDDDD');
        $('.izh_tape_a:visible,.izh_tape_b:visible').hide();
        $('.zh-backtotop').css('visibility','visible');
    }
  , processComment=function($cm){
        if($cm.is('.zm-comment-box')){
/* Collections for comment
        	$cm.find('.zm-comment-editable').bind('DOMNodeInserted',function(event){
        		var $c=$(event.target),$cm=$c.closest('.zm-comment-box');
        		if($c.is('a.member_mention')){
                    if($cm.children('.izh_collections').length<=0){
                        $('<div class="izh_collections">loading...</div>').bind('mouseover',function(){
                            $(this).show();
                        }).bind('mouseout',function(){
                            $(this).hide();
                        }).appendTo($cm);
                    }
                    $c.bind('mouseover',function(){
                        var $ce=$(this).closest('.zm-comment-editable'),$cm=$(this).closest('.zm-comment-box');
                        $cm.children('.izh_collections').css({
                            'bottom':$(this).height()-$(this).position().top-1
                          , 'left':$(this).position().left
                        }).show();
                        $.post('http://www.zhihu.com'+$(this).attr('href')+'/collections'
                          , $.param({_xsrf:$('input[name=_xsrf]').val()})
                          , function(result,status,xhr){
                        		console.log(result);
                        	});
                    });
                    $c.bind('mouseout',function(){
                        var $ce=$(this).closest('.zm-comment-editable'),$cm=$(this).closest('.zm-comment-box');
                        $cm.children('.izh_collections').hide();
                    });
        		}
        	});
 */
            if($body.attr('izhRightComment')=='1'){
                $cm.addClass('izh_boxShadow').css(css_comment).closest('.zm-item-meta').find('[name=addcomment],[name=add-q-comment]').click(function(event){
                    var $cm=$(this).closest('.zm-item-meta').find('.zm-comment-box');
                    if($cm.length){
                        var $item=getItem($cm);
                        if($cm.is(':hidden')){
                            showComment($item,$cm);
                        }else{
                            hideComment($item,$cm);
                        }
                    }
                });
                if($body.attr('izhQuickBlock')=='1'){
                    // Region: 快速屏蔽
                    var $u=$('.zm-comment-hd',$cm);
                    $u.each(function(i,e){
                        $('<a>',{'class':'zg-icon izh-quick-block-do',html:'',href:'javascript:void(0);'})
                        	.css($.extend(css_QuickBlock,{'float':'right'}))
                        	.click(function(){in2BlockCart($(this).next());}).prependTo(e).hide();
                    });
                    var $btnQuickBlock=$('<a>',{'class':'izh-quick-block',html:'快速屏蔽',href:'javascript:void(0);'}).css({
                        'position':'absolute'
                      , 'right':10, 'top':70
                    }).prependTo($cm).click(function(){
                        if(this.getAttribute('on')=='1'){
                        	$('.zm-comment-hd .izh-quick-block-do').hide();
                        	this.setAttribute('on','0');
                        }
                        else{
                        	$('.zm-comment-hd .izh-quick-block-do').show();
                        	this.setAttribute('on','1');
                        }
                    });
                    if($cm.is('.empty')){
                        $btnQuickBlock.hide();
                    }
                    // Region end
                }
                var $item=getItem($cm);
                showComment($item,$cm);
                $('i.zm-comment-bubble',$cm).hide();
                $('.zm-comment-list',$cm).css({
                    'height':'100%'
                  , 'overflow':'auto'
                }).bind('DOMNodeInserted',function(event){
                    var $cm=$(this).parent('.zm-comment-box:visible');
                    if($cm.length){
                        $('.izh-quick-block',$cm).show();
                        var $item=getItem($cm);
                        showComment($item,$cm);
                        var $icm=$(event.target);
                        $icm.bind('DOMNodeRemoved',function(event){
                            var $cm=$(this).closest('.zm-comment-box:visible');
                            if($cm.length){
                                if($(this).closest('.zm-comment-list').children().length==1){
                                	$('.izh-quick-block',$cm).hide();
                                }
                                var $item=getItem($cm);
                                showComment($item,$cm);
                            }
                        });
                    }
                }).children('.zm-item-comment').bind('DOMNodeRemoved',function(event){
                    var $cm=$(this).closest('.zm-comment-box:visible');
                    if($cm.length){
                        if($(this).closest('.zm-comment-list').children().length==1){
                        	$('.izh-quick-block',$cm).hide();
                        }
                        var $item=getItem($cm);
                        showComment($item,$cm);
                    }
                });
                $('.zm-comment-form.zm-comment-box-ft',$cm).css({
                    'position':'absolute'
                  , 'top':0
                  , 'left':0
                  , 'right':0
                });
            }
            var $btnCC=$('<a>',{
                    'class':'zu-question-answer-meta-comment'
                  , html:'收起'
               	}).click(function(){
                    var $item=getItem($cm)
                      , $itemMeta=$cm.closest('.zm-item-meta');
                    hideComment($item);
                    $itemMeta.find('[name=addcomment],[name=add-q-comment]')[0].click();
                });
            if($body.attr('izhRightComment')=='1'){
                $btnCC.css({
                    'cursor':'pointer'
                  , 'position':'absolute'
                  , 'top':70
                }).insertBefore($cm.children(':first'))
                .prepend('<i class="z-icon-izh-fold"></i>');
            }else{
                $btnCC.css({
                    'float':'right'
                  , 'cursor':'pointer'
                  , 'margin-right':5
                }).appendTo($cm)
                .prepend('<i class="z-icon-fold"/>');
            }
        }
    }
  , processAnswer=function($a,$pp,bAuthorRear,bAuthorList,bRightComment,bQuickBlock){
        if(!$a||!$a.length)return;
        if($a.attr('izh_processed')=='1')return;
        var $c=$a.children().last()
          , $p=$a.find('.zm-item-answer-author-info')
          , $v=$a.find('.meta-item[name=favo]');
        if(bQuickBlock){
            // Region: 快速屏蔽
            var $voteInfo=$('.zm-item-vote-info',$a);
            if($('[name=more]',$voteInfo).length){
                $voteInfo.parent().bind('DOMNodeInserted',function(event){
                    addQuickBlock($(event.target));
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
        if($v.length){
            if($a.children('.izh_fav').length<=0){
                $('<div class="izh_fav">loading...</div>').bind('mouseover',function(){
                    $(this).show();
                }).bind('mouseout',function(){
                    $(this).hide();
                }).appendTo($a);
            }
            $v.bind('mouseenter',function(){
                var $a=getItem($(this))
                  , $m=$(this).closest('.zm-item-meta');
                $a.children('.izh_fav').css({
                    'bottom':$m.height()+$m.height()-$(this).height()//$(this).height()+$a.height()-$(this).position().top-1+parseInt($a.css('padding-top'))
                  , 'left':$(this).position().left
                }).show();
                $.getJSON('http://www.zhihu.com/collections/json',$.param({answer_id:$a.attr('data-aid')}),function(result,status,xhr){
                    var aid=this.url.substr(this.url.indexOf('answer_id=')+10)
                      , sel=pageIs.Question?'.zm-item-answer'
                           :pageIs.Home?'.feed-item'
                           :''
                      , $a=$(sel+'[data-aid='+aid+']')
                      , $v=$a.children('.izh_fav').html('<div class="title">最近的选择</div>')
                    ;
                    if(''==sel)return;
                    $.each(result.msg[0].slice(0,4),function(i,e){
                        $('<a/>',{
                            'class':'fav'
                          , href:'javascript:;'
                          , aid:aid
                          , fid:e[0]
                          , html:e[1]
                        }).click(function(){
                            var u='http://www.zhihu.com/collection/';
                            u+=$(this).hasClass('selected')?'remove':'add';
                            $.post(u,$.param({_xsrf:$('input[name=_xsrf]').val(),answer_id:$(this).attr('aid'),favlist_id:$(this).attr('fid')}),function(result){
                                var act=this.url.substring(this.url.lastIndexOf('/')+1)
                                  , fid=utils.getParamInQuery(this.data,'favlist_id')
                                  , aid=utils.getParamInQuery(this.data,'answer_id')
                                  , sel=pageIs.Question?'.zm-item-answer'
                                       :pageIs.Home?'.feed-item'
                                       :''
                                  , $vi=''==sel?null:$(sel+'[data-aid='+aid+'] .izh_fav a[fid='+fid+']')
                                  , inc=0;
                                if(''==sel)return;
                                if(act=='remove'&&result.msg=='OK'){
                                    $vi.removeClass('selected');
                                    inc=-1;
                                }else if(act=='add'&&result.msg.length){
                                    $vi.addClass('selected');
                                    inc=1;
                                }
                                if(inc!=0){
                                    $vi.children('span').html(parseInt($vi.children('span').html())+inc);
                                }
                            });
                        }).appendTo($v).append($('<span/>',{html:e[3]}));
                    });
                    $.each(result.msg[1].slice(0,4),function(i,e){
                        $v.find('a.fav[fid='+e+']').addClass('selected');
                    });
                });
            });
            $v.bind('mouseleave',function(){
                var $a=getItem($(this));
                $a.children('.izh_fav').hide();
            });
        }
        $c.bind('DOMNodeInserted',function(event){
            processComment($(event.target));
        });
        if(bRightComment){
            var $bc=$a.find('.zu-question-answer-meta-comment');
            $bc.css({
                'display':'block'
              , 'float':'right'
              , 'margin-left':7
            }).prependTo($bc.parent());
        }
        processComment($('.zm-comment-box',$a));
        $a.attr('izh_processed','1');
    }
;
