/**
 * @class Comment
 */
function Comment(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu) {
        return null;
    }
    iZhihu.Comment = this;

    var css_comment={
            'position':'fixed'
          , 'background-color':'#fff'
          , 'outline':'none'
          , 'z-index':'9999'
          , 'right':10
          , 'border-radius':'0 6px 0 0'
          , 'padding':'100px 0px 0px 7px'
        }
    ;
    this.RightComment = iZhihu.config['ShowComment'];
    if (!this.RightComment){
        this.css = 
            ['.zm-comment-box.empty .izh-button-cc{display:none;}'
            ,''].join('\n');
    } else {
        this.css = 
            ['.mention-popup{z-index:10000 !important;}'
            ,'.zm-item-meta .meta-item[name=addcomment],'
            ,'.zm-item-meta .meta-item[name=add-q-comment]{display:block;float:right;margin-left:7px !important;}'
            ,'.zm-comment-box .zm-comment-box-ft{position:absolute;top:0;left:0;right:0;}'
            ,'.zm-comment-box.empty{padding-top:10px !important;}'
            ,'.zm-comment-box.empty .zm-comment-box-ft{position:static;margin:0 !important;padding:15px !important;}'
            ,'.zm-comment-box [class^=izh-buttons-cm]{position:absolute;top:70px;}'
            ,'.zm-comment-box .izh-buttons-cm-L{left:0;}'
            ,'.zm-comment-box .izh-buttons-cm-L > a{margin-right:7px;}'
            ,'.zm-comment-box .izh-buttons-cm-R{right:1em;}'
            ,'.zm-comment-box .izh-buttons-cm-R > a{margin-left:7px;}'
            ,'.zm-comment-box a.izh-button.on{color:#225599;text-shadow:0 0 1px #225599;}'
            ,'.zm-comment-box a.izh-button.off{color:#eee;}'
            ,'.zm-comment-box.empty [class^=izh-buttons-cm]{top:auto;bottom:7px;}'
            ,''].join('\n');
    }
    this.processCommentButton = function($a){
        if(iZhihu.Comment.RightComment){
            var $bc=$a.find('.meta-item[name="addcomment"],.meta-item[name="add-q-comment"]');
            $bc.prependTo($bc.parent());
        }
    };
    this.showComment = function($ac,$cm){
        $('.zm-comment-box:visible')
            .each(function(i,e){
                if(!$cm.length||e!=$cm.get(0))
                    $(e).closest('.zm-item-meta').find('[name=addcomment],[name=add-q-comment]')[0].click();
            });
        var $n=$ac.next(),$n=$n.length?$n:$ac.parent().next()
          , t=$ac.offset().top-iZhihu.$main.offset().top
          , b=$ac.offset().top-iZhihu.$main.offset().top
          , w=$ac.width()
          , inAnswer=$ac.is('.zm-item-answer')
          , inQuestion=$ac.is('#zh-question-detail')
          , $questionMeta=$('#zh-question-meta-wrap')//question_meta
          , h=inQuestion?$questionMeta.offset().top+$questionMeta.height()+parseInt($questionMeta.css('padding-bottom'))-iZhihu.$main.offset().top
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
            var $t=$cm.clone().css({'position':'absolute','z-index':'-1'}).appendTo(iZhihu.$body).show();
            $cm.css({'left':$ac.offset().left+$ac.width()-1});
            var th=$t.children('.zm-comment-list').css({'position':'absolute','height':'','top':'','bottom':''}).height()+100;
            if(th<iZhihu.$win.height()-iZhihu.$main.offset().top){
                var top=inQuestion?0:$cm.parent().offset().top-$(document).scrollTop();
                if(top+th>iZhihu.$win.height()){
                    $cm.css({'top':'','bottom':0});
                }else{
                    $cm.css({'top':top>iZhihu.$main.offset().top?top:iZhihu.$main.offset().top,'bottom':''});
                }
            }else{
                $cm.css({'top':iZhihu.$main.offset().top,'bottom':0});
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
        //iZhihu.$body.scrollTop(t);
    };
    this.hideComment = function($ac,$cm){
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
        //$ac.css('border-color','#DDDDDD');
        //$n.css('border-color','#DDDDDD');
        $('.izh_tape_a:visible,.izh_tape_b:visible').hide();
        $('.zh-backtotop').css('visibility','visible');
    };
    this.processComment = function($cm){
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
            if(iZhihu.Comment.RightComment){
                $cm.closest('.zm-item-meta').find('[name=addcomment],[name=add-q-comment]').click(function(event){
                    var $cm=$(this).closest('.zm-item-meta').find('.zm-comment-box');
                    if($cm.length){
                        var $item=getItem($cm);
                        if($cm.is(':hidden')){
                            iZhihu.Comment.showComment($item,$cm);
                        }else{
                            iZhihu.Comment.hideComment($item,$cm);
                        }
                    }
                });
            }
            if($cm.is(':empty')) return;
            var $list=$cm.find('.zm-comment-list').bind('DOMNodeInserted',function(event){
                var $icm=$(event.target);
                if($icm.is('.zm-item-comment')&&iZhihu.QuickBlock){
                    iZhihu.QuickBlock.addQuickBlockInOneComment($icm);
                }
            });
            if(iZhihu.Comment.RightComment){
                $cm.addClass('izh_boxShadow').css(css_comment);
                var $item=getItem($cm);
                iZhihu.Comment.showComment($item,$cm);
                $('i.zm-comment-bubble',$cm).hide();
                $list.css({
                    'height':'100%'
                  , 'overflow':'auto'
                }).bind('DOMNodeInserted',function(event){
                    var $cm=$(this).parent('.zm-comment-box:visible');
                    if($cm.length){
                        $('.izh-quick-block-switch',$cm).show();
                        var $item=getItem($cm);
                        iZhihu.Comment.showComment($item,$cm);
                        var $icm=$(event.target);
                        $icm.bind('DOMNodeRemoved',function(event){
                            var $cm=$(this).closest('.zm-comment-box:visible');
                            if($cm.length){
                                if($(this).closest('.zm-comment-list').children().length==1){
                                    $('.izh-quick-block-switch',$cm).hide();
                                }
                                var $item=getItem($cm);
                                iZhihu.Comment.showComment($item,$cm);
                            }
                        });
                    }
                }).children('.zm-item-comment').bind('DOMNodeRemoved',function(event){
                    var $cm=$(this).closest('.zm-comment-box:visible');
                    if($cm.length){
                        if($(this).closest('.zm-comment-list').children().length==1){
                            $('.izh-quick-block-switch',$cm).hide();
                        }
                        var $item=getItem($cm);
                        iZhihu.Comment.showComment($item,$cm);
                    }
                });
            }
            var $btnCC=$('<a>',{
                    'class':'zu-question-answer-meta-comment izh-button-cc'
                  , href:'javascript:void(0);'
                  , html:'收起'
                  , click:function(){
                        var $cm=$(this).closest('.zm-comment-box')
                          , $item=getItem($cm)
                          , $itemMeta=$cm.closest('.zm-item-meta')
                        ;
                        iZhihu.Comment.hideComment($item);
                        $itemMeta.find('[name=addcomment],[name=add-q-comment]')[0].click();
                    }
                })
              , $buttonsL=$('<div>',{
                	'class':'izh-buttons-cm-L'
                }).prependTo($cm)
              , $buttonsR=$('<div>',{
                	'class':'izh-buttons-cm-R'
                })
            ;
            if(iZhihu.Comment.RightComment){
                $buttonsR.prependTo($cm);
                $btnCC.css({
                    'float':'left'
                  , 'margin-left':7
                }).prepend('<i class="z-icon-izh-fold"/>').prependTo($buttonsL);
                if(!$cm.is('.empty')){
                    $('<a>',{
                        'class':'izh-button izh-back-top'
                      , href:'javascript:void(0);'
                      , html:'返回顶部'
                      , click:function(){
                            $(this.parentNode).nextAll('.zm-comment-list').scrollTop(0);
                        }
                    }).add('<a>',{
                        'class':'izh-button izh-show-good'
                      , href:'javascript:void(0);'
                      , html:'人气妙评'//先来后到
                      , click:function(){
                           var $e=$(this)
                             , $l=$e.closest('.zm-comment-box').find('.zm-comment-list')
                             , $n=$l.find('.zm-item-comment').has('span.like-num.nil')
                           ;
                           if($e.hasClass('on')){
                               $e.attr('scrollTop_showgood',$l[0].scrollTop);
                               $n.show();
                               $e.removeClass('on');
                               var scrollTop = parseInt($e.attr('scrollTop'));
                               if(!isNaN(scrollTop))
                                   $l.scrollTop(scrollTop);
                           }else{
                               $e.attr('scrollTop',$l[0].scrollTop);
                               $n.hide();
                               $e.addClass('on');
                               var scrollTop = parseInt($e.attr('scrollTop_showgood'));
                               if(!isNaN(scrollTop))
                                   $l.scrollTop(scrollTop);
                           }
                        }
                    }).css({
                        'float':'right'
                    }).appendTo($buttonsR);
                    $list.scroll(function(){
                        var $e=$(this)
                          , $b=$e.closest('.zm-comment-box').find('.izh-back-top')
                        ;
                        if($e.height() < this.scrollTop){
                            $b.removeClass('off');
                        }else{
                            $b.addClass('off');
                        }
                    }).scroll();
                    $list.find('.zm-item-comment span.like-num').each(function(i,e){
                        var tip=e.getAttribute('data-tip').replace('s$r$','s$l$');
                        if(tip!='')e.setAttribute('data-tip',tip);
                    });
                }
            }else{
                $btnCC.prepend('<i class="z-icon-fold"/>')
                .css({
                    'position':'absolute'
                  , 'cursor':'pointer'
                  , 'margin-left':-1
                  , 'left':0
                  , 'background-color':'#fbfbfb'
                  , 'padding':'2px 5px'
                  , 'bottom':-22
                  , 'border':'1px solid #ddd'
                  , 'border-radius':'4px'
                }).insertBefore($cm.find('.zm-comment-box-ft'));
            }
            if(iZhihu.QuickBlock&&!$cm.is('.empty')){
                iZhihu.QuickBlock.addQuickBlockInCommentList($buttonsL);
            }
        }
    };

    return this;
}
