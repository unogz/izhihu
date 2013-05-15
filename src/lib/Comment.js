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
          //, 'right':10
          , 'border-radius':'0 6px 0 0'
          , 'padding':'100px 0px 0px 7px'
          , 'visibility':'hidden'
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
            ,'.zm-comment-box{position:absolute;}'
            ,'.zm-comment-box .icon-spike{display:none !important;}'
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
        iZhihu.$win.scroll(function(event){
            if(iZhihu.Comment.Opening){
                iZhihu.Comment.putCommentBox($(iZhihu.Comment.Opening),true);
            }
        });
    }
    this.processCommentButton = function($a){
        if(iZhihu.Comment.RightComment){
            var $bc=$a.find('.meta-item[name="addcomment"],.meta-item[name="add-q-comment"]');
            $bc.prependTo($bc.parent());
        }
    };
    this.putCommentBox = function($cm,keepSize){if(!$cm||!$cm.length)return;
        var th=keepSize?parseInt($cm.attr('izh_cmHeight')):0
          , offsetTop=document.documentElement.scrollTop-$cm.closest('.zm-item-meta').offset().top
          , offsetBottom=-offsetTop-iZhihu.$win.height()
          , inQuestion=$cm.attr('izh_inQuestion')=='1'
        ;
        if(!th||isNaN(th)){
            var $t=$cm.clone().css({'position':'absolute','z-index':'-1'}).appendTo(iZhihu.$body).show();
            th=$t.children('.zm-comment-list').css({'position':'absolute','height':'','top':'','bottom':''}).height()+100;
            $t.remove();$t=null;
        }
        $cm.attr('izh_cmHeight',th)
        if(th<iZhihu.$win.height()-iZhihu.$main.offset().top){
            var top=inQuestion?0:$cm.parent().offset().top-document.documentElement.scrollTop;
            if(top+th>iZhihu.$win.height()){
                $cm.css({'top':'','bottom':offsetBottom});
            }else{
                $cm.css({'top':offsetTop+(top>iZhihu.$main.offset().top?top:iZhihu.$main.offset().top),'bottom':''});
            }
        }else{
            $cm.css({'top':offsetTop+iZhihu.$main.offset().top,'bottom':offsetBottom});
        }
        $cm.css({'visibility':'visible','position':'absolute'});
    };
    this.showComment = function($ac,$cm){
        var noCommentOpening = iZhihu.Comment.Opening == null;
        iZhihu.Comment.Opening = $cm.get(0);
        $('.zm-comment-box:visible')
            .each(function(i,e){
                if(!$cm.length||e!=$cm.get(0))
                    $(e).css('visibility','hidden').closest('.zm-item-meta').find('[name=addcomment],[name=add-q-comment]')[0].click();
            });
        var o=function(){
            
        var currTop=_doc.body.scrollTop
          , $n=$ac.next(),$n=$n.length?$n:$ac.parent().next()
          , t=$ac.offset().top-iZhihu.$main.offset().top
          , b=$ac.offset().top-iZhihu.$main.offset().top
          , w=$ac.width()
          , inAnswer=$ac.is('.zm-item-answer')
          , inQuestion=$ac.is('#zh-question-detail')
          , $questionMeta=$('#zh-question-meta-wrap')//question_meta
          , h=inQuestion?$questionMeta.offset().top+$questionMeta.height()+parseInt($questionMeta.css('padding-bottom'))-iZhihu.$main.offset().top
                             :$ac.height()+parseInt($ac.css('padding-bottom'))+parseInt($n.css('padding-top'))
          , cmWidth=540//$item.width()//iZhihu.$main.width()-$item.closest('.zu-main-content-inner').outerWidth()//-iZhihu.$main.offset().left-18
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

            iZhihu.Comment.putCommentBox(
                $cm.css({'width':cmWidth}).attr('izh_inQuestion',inQuestion?'1':'0')
            );
            
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
        iZhihu.$body.scrollTop(currTop);
        };

        $cm.addClass('izh_boxShadow').css(css_comment);
        $('i.zm-comment-bubble',$cm).hide();
        if(noCommentOpening){
            $ac.closest('.zu-main-content-inner').css({'position':'relative','left':0}).animate({left:-100},o);
        }else{
            o();
        }	
    };
    this.hideComment = function($ac,$cm){
        var $n=$ac.next()
          , $n=$n.length?$n:$ac.parent().next()
          , inQuestion=$ac.is('#zh-question-detail');
        if(!$cm)$cm=$ac.find('.zm-comment-box');
        var o=function(){
            $(this).css('position','');
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

        if(iZhihu.Comment.Opening == $cm.get(0)){
            iZhihu.Comment.Opening = null;
            $ac.closest('.zu-main-content-inner').animate({left:0},o);
        }else{
            o();
        }	
    };
    this.processComment = function($cm){
        if(!$cm.is('.zm-comment-box'))return;
        var $item=iZhihu.getItem($cm);
        if(iZhihu.Comment.RightComment){
            var cmLeft=$item.width()-1;
            $cm.css({'left':cmLeft,'width':216,'z-index':'10000'});
        }
        if($cm.has('.zm-comment-list').length){
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
                    var $openedBy=$(this)
                      , $ac=$openedBy.closest('.zm-item-meta')
                      , $cm=$ac.find('.zm-comment-box').css('visibility','hidden')
                    ;
                    if($cm.length){
                        var $item=iZhihu.getItem($cm);
                        if($cm.is(':hidden')){
                            iZhihu.Comment.showComment($item,$cm);
                        }else{
                            iZhihu.Comment.hideComment($item,$cm);
                        }
                    }
                });
            }
            if($cm.is(':empty')) return;
            var $list=$cm.find('.zm-comment-list');
            $list.bind('DOMNodeInserted',function(event){
            //utils.observeDOMNodeAdded($list[0],function(event){
            	/*if(!event.addedNodes)return;
                console.log('Nodes '+event.addedNodes.length+' inserted');
            	for(var i=0;i<event.addedNodes.length;i++){
            		var $icm=$(event.addedNodes[i]);
                }*/
                var $icm=$(event.target);
                if(!$icm.is('.zm-item-comment'))return;
                //console.log($icm);
                if(iZhihu.QuickBlock){
                    //console.log('Adding QuickBlock');
                    iZhihu.QuickBlock.addQuickBlockInOneComment($icm);
                }
                if(iZhihu.Comment.RightComment){
                    $icm.bind('DOMNodeRemoved',function(event){
                        var $list=$(event.target).closest('.zm-comment-list')
                          , $cm=$list.closest('.zm-comment-box:visible');
                        if($cm.length){
                            //console.log('Refreshing comment list');
                            if($list.children().length==1){
                                $('.izh-quick-block-switch',$cm).add('.izh-buttons-cm-R',$cm).hide();
                            }
                            iZhihu.Comment.putCommentBox($cm);
                        }
                    });
                }
            
                if(iZhihu.Comment.RightComment){
                    var $cm=$(event.target).closest('.zm-comment-box:visible');
                    if($cm.length){
        	            var countNow=$(this).children().length
                    	  , countAll=parseInt($cm.attr('data-count'))
                    	;
                        if(countAll-countNow>1){
                        	return;
                        }
                        //console.log('Refreshing comment list');
                        $('.izh-quick-block-switch',$cm).add('.izh-buttons-cm-R',$cm).show();
                        iZhihu.Comment.putCommentBox($cm);
                    }
                }
            });

            if(iZhihu.Comment.RightComment){
                //$cm.addClass('izh_boxShadow').css(css_comment);
                //$('i.zm-comment-bubble',$cm).hide();
                $list.css({
                    'height':'100%'
                  , 'overflow':'auto'
                }).children('.zm-item-comment').bind('DOMNodeRemoved',function(event){
                    var $cm=$(this).closest('.zm-comment-box:visible');
                    if($cm.length){
                        if($(this).closest('.zm-comment-list').children().length==1){
                            $('.izh-quick-block-switch',$cm).add('.izh-buttons-cm-R',$cm).hide();
                        }
                        iZhihu.Comment.putCommentBox($cm);
                    }
                });
                iZhihu.Comment.showComment($item,$cm);
            }
            var $btnCC=$('<a>',{
                    'class':'zu-question-answer-meta-comment izh-button-cc'
                  , href:'javascript:void(0);'
                  , html:'收起'
                  , click:function(){
                        var $cm=$(this).closest('.zm-comment-box')
                          , $item=iZhihu.getItem($cm)
                          , $itemMeta=$cm.closest('.zm-item-meta')
                        ;
                        //iZhihu.Comment.hideComment($item);
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
                if($list.children().length==0){
                    $buttonsR.hide();
                }
                $btnCC.css({
                    'float':'left'
                  , 'margin-left':7
                }).prepend('<i class="z-icon-izh-fold"/>').prependTo($buttonsL);
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
            if(iZhihu.QuickBlock){
                iZhihu.QuickBlock.addQuickBlockInCommentList($buttonsL);
            }
        }
    };

    return this;
}
