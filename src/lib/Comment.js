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
          , 'padding':'100px 0px 0px 10px'
        }
    ;
    this.RightComment = iZhihu.config['ShowComment'];
    if (!this.RightComment){
        this.css = '';
    } else {
        this.css = 
            ['.mention-popup{z-index:10000 !important;}'
            ,'.zm-item-meta .meta-item[name=addcomment],'
            ,'.zm-item-meta .meta-item[name=add-q-comment]{display:block;float:right;margin-left:7px !important;}'
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
        iZhihu.$body.scrollTop(t);
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
        if($cm.length){
            $ac.find('.izh_tape_a').hide();
        }
        $ac.find('.izh_tape_b').hide();
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
            if(iZhihu.QuickBlock){
                iZhihu.QuickBlock.addQuickBlockInComment($cm);
            }
            if(iZhihu.Comment.RightComment){
                $cm.addClass('izh_boxShadow').css(css_comment).closest('.zm-item-meta').find('[name=addcomment],[name=add-q-comment]').click(function(event){
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
                var $item=getItem($cm);
                iZhihu.Comment.showComment($item,$cm);
                $('i.zm-comment-bubble',$cm).hide();
                $('.zm-comment-list',$cm).css({
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
                  , click:function(){
                        var $item=getItem($cm)
                          , $itemMeta=$cm.closest('.zm-item-meta');
                        iZhihu.Comment.hideComment($item);
                        $itemMeta.find('[name=addcomment],[name=add-q-comment]')[0].click();
                    }
                });
            if(iZhihu.Comment.RightComment){
                $btnCC.prepend('<i class="z-icon-izh-fold"/>')
                .add(
                    $('<div>',{
                    	'class':'izh-cm-buttons'
                      , style:'right:1em;'
                    }).append(
                        $('<a>',{
                            'class':''
                          , html:'返回顶部'
                          , click:function(){
                                $(this.parentNode).nextAll('.zm-comment-list').scrollTop(0);
                            }
                        }).add('<a>',{
                            'class':''
                          , html:'人气妙评'//先来后到
                          , click:function(){
                            }
                        }).css({
                            'float':'right'
                          , 'margin-left':7
                        })
                    )
                ).css({
                    'cursor':'pointer'
                  , 'position':'absolute'
                  , 'top':70
                }).insertBefore($cm.children(':first'));
            }else{
                $btnCC.prepend('<i class="z-icon-fold"/>')
                .css({
                    'float':'right'
                  , 'cursor':'pointer'
                  , 'margin-right':5
                }).appendTo($cm);
            }
        }
    };

    return this;
}
