/**
 * @class Comment
 */
function Comment(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu) {
        return null;
    }
    iZhihu.Comment = this;

    var css_comment={
            'background-color':'#fff'
          , 'outline':'none'
          , 'z-index':'9999'
          , 'border-radius':'0 6px 0 0'
          , 'position':'absolute'
          , 'visibility':'hidden'
          , 'top':-70
        }
    ;
    this.RightComment = iZhihu.config['ShowComment'];
    this.AutoScrollPageWhenClosing = iZhihu.config['RightComment_AutoScrollPageWhenClosing'];
    if (!this.RightComment){
        this.css = 
            ['.zm-comment-box.empty .izh-button-cc{display:none;}'
            ,''].join('\n');
    } else {
        this.css = 
            ['.mention-popup{z-index:10000 !important;}'
            ,'.zm-item-meta .meta-item.toggle-comment{display:block;float:right;margin-left:7px !important;}'
            ,'.zm-comment-box{position:absolute;margin-top:0;}'
            ,'.zm-comment-box .icon-spike{display:none !important;}'
            ,'.zm-comment-box > .zm-comment-box-ft{position:absolute;top:0;left:0;right:0;}'
            ,'.zm-comment-box.empty{padding-top:10px !important;}'
            ,'.zm-comment-box > .zm-comment-form{margin:15px !important;}'
            ,'.zm-comment-box.empty > .zm-comment-form{bottom:25px;}'
            ,'.zm-comment-box > .zm-comment-form .zm-comment-editable{position:absolute;bottom:60px;top:0;left:0;right:0;overflow:auto;}'
            ,'.zm-comment-box.empty > .zm-comment-form .zm-comment-editable{bottom:25px;}'
            ,'.zm-comment-box > .zm-comment-form .zm-command{position:absolute;left:0;right:0;bottom:40px;}'
            ,'.zm-comment-box.empty > .zm-comment-form .zm-command{bottom:10px;}'
            ,'.zm-comment-box [class^=izh-buttons-cm]{position:absolute;top:70px;}'
            ,'.zm-comment-box.empty [class^=izh-buttons-cm]{top:auto;bottom:30px;z-index:10;}'
            ,'.zm-comment-box .izh-buttons-cm-L{left:0;}'
            ,'.zm-comment-box .izh-buttons-cm-L > a{margin-right:7px;}'
            ,'.zm-comment-box .izh-buttons-cm-R{right:1em;}'
            ,'.zm-comment-box .izh-buttons-cm-R > a{margin-left:7px;}'
            ,'.zm-comment-box a.izh-button.on{color:#225599;text-shadow:0 0 1px #225599;}'
            ,'.zm-comment-box a.izh-button .zg-icon{opacity:0.5;}'
            ,'.zm-comment-box a.izh-button.on .zg-icon{opacity:1;}'
            ,'.zm-comment-box a.izh-button.off{color:#eee;}'
            ,'.zm-comment-box a.izh-button.off .zg-icon{opacity:0.2;}'
            //,'.zm-comment-box.empty [class^=izh-buttons-cm]{top:auto;bottom:7px;}'
            ,'.zm-comment-box.empty .zm-comment-list{visibility:hidden;}'
            ,'.zm-comment-box .zm-comment-list .zm-item-comment[izh_hilight]{background-color:rgb(255,255,160);}'
            ,'.zm-comment-box .izh-button.on .zg-icon-comment-like{background-position:-222px -79px;}'
            ,'.zm-comment-box .izh-button .z-icon-fold{height:6px;}'
            ,''].join('\n');
        this.onWinLoad=function(){
            var iZhihu=window.iZhihu;
            iZhihu.$win.scroll(function(event){
                if(iZhihu.Comment.Opening&&!iZhihu.Comment.PageNotScroll){
                    var animate=true;
                    iZhihu.Comment.box($(iZhihu.Comment.Opening),true,animate);
                }
            });
        
            iZhihu.$win.resize(function(event){
                if(iZhihu.Comment.Opening){
                    var $cm=$(iZhihu.Comment.Opening);
                    iZhihu.Comment.Opening = null;
                    iZhihu.Comment.close(null,$cm);
                    iZhihu.Comment.open(null,$cm);
                }
            });
            if(iZhihu.ScrollTop){
                document.body.scrollTop=iZhihu.ScrollTop;
            }
        }
        this.onWinLoad()
    }
    this.processCommentButton = function($a){
        if(iZhihu.Comment.RightComment){
            var $bc=$a.find('.meta-item.toggle-comment');
            $bc.prependTo($bc.parent());
        }
    };
    this.scrollFocusCommentOnPageLoad = function($cm){
        if(!iZhihu.Comment.RightComment)return;
        var focusName=url.data.attr.fragment;
        if(!focusName||focusName=='')return;
    	if(window.iZhihu4CRX){
            var $icm2C=$cm.find('.zm-comment-list .zm-item-comment a.zg-anchor-hidden[name="'+focusName+'"]').parent()
              , offsetTop=$icm2C.length?$icm2C.offset().top:0
            ;if(offsetTop){document.body.scrollTop=offsetTop;}
    	}
        return focusName;
    };
    
    this.metaScrollToViewBottom = function($itemMeta,funcAfterScroll,always,animate){
        if(!iZhihu.Comment.RightComment || !iZhihu.Comment.AutoScrollPageWhenClosing){
            if(funcAfterScroll){funcAfterScroll();}
            return;
        }
        if(typeof always === 'undefined')always=true;//if false, scrolling only when the .zm-item-meta out of visible range
        if(typeof animate === 'undefined')animate=false;//if false, scrolling instantly
        if(always)$itemMeta.children('.zm-comment-box').css('position','fixed');
        var winHeight=iZhihu.$win.height()
          , scrollObj=window.iZhihu4CRX?document.body:document.documentElement
          , scrollTopNow=scrollObj.scrollTop
          , navHeight=iZhihu.$body.children().first().height()
          , bar=$('.zu-global-notify.zu-global-notify-info:visible')
          , barHeight=!bar.length?0:bar.outerHeight()
          , baseTop=((barHeight&&bar.css('position')=='fixed')?barHeight:(scrollTopNow>barHeight?0:barHeight-scrollTopNow))+navHeight
          , maxHeight=winHeight-baseTop
          , metaHeight=$itemMeta.innerHeight()
          , offsetTop=$itemMeta.offset().top
          , offsetBottom=offsetTop+metaHeight
          , $item=iZhihu.getItem($itemMeta)
          , itemHeight=$item.innerHeight()
          , offsetTopA=$item.offset().top
          , offsetBottomA=offsetTopA+itemHeight
          , scrollTopEnd=itemHeight>maxHeight?offsetBottom-winHeight:(offsetTopA<=scrollTopNow?offsetTopA-baseTop:offsetBottom-winHeight)
        ;
        if(!always){
            always=offsetTop<scrollTopNow+baseTop||offsetBottom>scrollTopNow+winHeight-baseTop;
        }
        if(always){
            iZhihu.ScrollTop=scrollTopEnd;
            if(animate){
                $(scrollObj).animate({'scrollTop':scrollTopEnd},funcAfterScroll);
        	}else{
                $(scrollObj).scrollTop(scrollTopEnd);
                if(funcAfterScroll){funcAfterScroll();}
        	}
        }else{
            if(funcAfterScroll){funcAfterScroll();}
        }
    };
    this.box = function($cm,keepSize,animate){if(!$cm||!$cm.length)return;
        $cm.stop();
        if(typeof keepSize === 'undefined')keepSize=false;
        if(typeof animate === 'undefined')animate=false;
        var winHeight=iZhihu.$win.height()
          , th=keepSize?parseInt($cm.attr('izh_cmHeight')):0
          , scrollTop=(document.body.scrollTop)?document.body.scrollTop:document.documentElement.scrollTop
          , navHeight=iZhihu.$body.children().first().height()
          , bar=$('.zu-global-notify.zu-global-notify-info:visible')
          , barHeight=!bar.length?0:bar.outerHeight()
          , baseTop=((barHeight&&bar.css('position')=='fixed')?barHeight:(scrollTop>barHeight?0:barHeight-scrollTop))+navHeight
          , minHeight=112
          , maxHeight=winHeight-baseTop-35
          , tooSmall=maxHeight<minHeight
          , $meta=$cm.closest('.zm-item-meta')
          , metaHeight=2*$meta.height()-$meta.innerHeight()
          , offsetTop=scrollTop-$meta.offset().top
          , offsetBottom=-offsetTop-winHeight
        ;if(tooSmall)maxHeight=minHeight;
        if(!th||isNaN(th)){
            var $t=$cm.clone().css({'position':'absolute','z-index':'-1'}).appendTo(document.body).show()
              , $l=$t.children('.zm-comment-list')
            ;
            if(!$cm.is('.empty')&&$l.children().length>0)$l.css({'position':'absolute','height':'','top':'','bottom':''});
            th=$l.height();
            th+=th==0?minHeight:100;
            $t.remove();$t=null;//console.log(th);
            $cm.css('height',th<=minHeight?minHeight:(th<maxHeight?th-100:maxHeight-80));
        }
        var target={},other={'height':''};
        $cm.attr('izh_cmHeight',th).css({'display':'','visibility':'visible','position':'absolute'});
        if(th<=maxHeight){
            var top=-offsetTop-70,fixHeight=(th<=minHeight?-1:7);
            if(!tooSmall&&top+th>winHeight){
                target={'top':-offsetBottom-th-metaHeight+fixHeight,'bottom':offsetBottom};
            }else{
                offsetTop+=((!tooSmall)&&top>baseTop?top:baseTop);
                target={'top':offsetTop,'bottom':-offsetTop-th-metaHeight+fixHeight};
            }
            $cm.filter('.empty').find('.zm-comment-form .zm-comment-editable').css({'bottom':''});
        }else{
            target={'top':offsetTop+baseTop,'bottom':offsetBottom};
            $cm.filter('.empty').find('.zm-comment-form .zm-comment-editable').css({'bottom':'20px'});
        }
        if(animate){
            $cm.animate(target,function(){$cm.css(other);});
        }else{
            $cm.css($.extend(target,other));
        }
        $cm;
    };
    this.open = function($ac,$cm,icmFocus){// if $ac is null, just re-sizing and re-locating comment-box
        var noCommentOpening = iZhihu.Comment.Opening == null;
        iZhihu.Comment.Opening = $cm.attr('izh-opening','1').css({'display':'none'}).get(0);
        $('.zm-comment-box:visible:not([izh-opening=1])')
            .each(function(i,e){
                $(e).css('visibility','hidden').closest('.zm-item-meta').find('.toggle-comment')[0].click();
            });
        var winWidth=iZhihu.$win.width()
          , mcLeft=iZhihu.$main.offset().left
          , $ct=$cm.closest('.zu-main-content-inner')
          , ctMarginL=parseInt($ct.css('margin-left'))
          , ctWidth=$ct.width()+ctMarginL
          , ctLeft=$ct.offset().left-ctMarginL
          , $meta=$cm.closest('.zm-item-meta')
          , mtWidth=$meta.innerWidth()
          , minWidth=iZhihu.$main.width()-ctWidth
          , cmWidth=mtWidth
          , maxWidth=winWidth-ctWidth
          , o=function(){
                $cm.attr('opened','1');
        		if(!$ac){
                    iZhihu.Comment.box($cm);
                    return;
        		}
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
                ;
                if(!$ac.find('.izh_tape_a,.izh_tape_b').length)
                    $ac
                        .append($('<div>', { 'class': 'izh_tape_a' }))
                        .append($('<div>', { 'class': 'izh_tape_b' }))
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
        
                    iZhihu.Comment.box(
                        $cm.css({'left':mtWidth-1}).attr('izh_inQuestion',inQuestion?'1':'0').removeAttr('izh-opening')
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
                if(icmFocus){
                    var $icm=$(icmFocus).attr('izh_hilight','1')
                      , $list=$icm.closest('.zm-comment-list');
                    $list.scrollTop(icmFocus.offsetTop-$list.get(0).offsetTop);
                    iZhihu.Comment.HiLightItem=icmFocus;
                    iZhihu.Comment.HiLightColor='rgb(255,255,160)';
                    $icm.click(function(){
                        var iZhihu=window.iZhihu;
                        if(iZhihu&&iZhihu.Comment.HiLightItem){
                            $(iZhihu.Comment.HiLightItem).removeAttr('izh_hilight');
                        }
                    });
                }
            };

        if(maxWidth>549)maxWidth=549;
        if(cmWidth>maxWidth)
            cmWidth=maxWidth;
        if(cmWidth<minWidth)
            cmWidth=minWidth;
        $cm.addClass('izh_boxShadow').css($.extend(css_comment,{'width':cmWidth-9}));
        //if(!$cm.is('.empty'))
            $cm.css({'padding':'100px 0px 0px 7px'});
        $('i.zm-comment-bubble',$cm).hide();
        if(noCommentOpening){
            var cmWidthOver=cmWidth-winWidth
              , shiftLeft=cmWidthOver+ctWidth+ctLeft
            ;
            if(shiftLeft>0){
                if(shiftLeft>ctLeft){shiftLeft=mcLeft;}
                else if(cmWidthOver>0){shiftLeft-=cmWidthOver;}
            }
            if(shiftLeft<0){shiftLeft=0;}
            if(shiftLeft && $ac){
                $ct.css({'position':'relative','left':0}).animate({left:-shiftLeft},o);
            }else{
                $ct.css({'position':'relative','left':-shiftLeft});
                o();
            }
        }else{
            o();
        }	
    };
    this.close = function($ac,$cm){
        if(!$cm)$cm=$ac.find('.zm-comment-box');
        var $ct=$cm.closest('.zu-main-content-inner');
        var o=function(){
            $(this).css('position','');
            if(!$ac)return;
            var $n=$ac.next()
              , $n=$n.length?$n:$ac.parent().next()
              , inQuestion=$ac.is('#zh-question-detail');
            if(!$ac){return;}
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
            $ct.animate({left:0},o);
        }else{
            if(!$ac){$ct.css({left:0});}
            o();
        }
        
    };
    this.processComment = function($cm,focusName){
        var loading=false;
        if($cm.is('.zm-comment-spinner')){
            $cm=$cm.closest('.zm-comment-box');
            loading=true;
        }
        if(!$cm.is('.zm-comment-box'))return;
        var $item=iZhihu.getItem($cm);
        if(iZhihu.Comment.RightComment&&loading){
            var cmLeft=$item.width()-1;
            $cm.css({'left':cmLeft,'width':216,'z-index':'10000'});
        }
        if($cm.filter('.zm-comment-box').has('.zm-comment-list').length){
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
                $cm.closest('.zm-item-meta').find('.toggle-comment').click(function(event){
                    var $openedBy=$(this)
                      , $ac=$openedBy.closest('.zm-item-meta')
                      , $cm=($ac.parent().is('.zm-item-meta.feed-meta')?$ac.parent():$ac).find('.zm-comment-box').css('visibility','hidden')
                    ;
                    if($cm.length){
                        var $item=iZhihu.getItem($cm);
                        if($cm.is(':hidden')){
                            iZhihu.Comment.open($item,$cm);
                        }else{
                            iZhihu.Comment.close($item,$cm);
                        }
                    }
                });
            }
            //if($cm.is('.empty')) return;
            var $list=$cm.find('.zm-comment-list');
            $list.bind('DOMNodeInserted',function(event){
            //utils.observeDOMNodeAdded($list[0],function(event){
            	/*if(!event.addedNodes)return;
                console.log('Nodes '+event.addedNodes.length+' inserted');
            	for(var i=0;i<event.addedNodes.length;i++){
            		var $icm=$(event.addedNodes[i]);
                }*/
                var $icm=$(event.target).filter('.zm-item-comment,.zm-comment-form');
                if(!$icm.length)return;
                var $list=$(this)
                  , $cm=$list.closest('.zm-comment-box:visible');
                if($icm.is('.zm-item-comment')){
                    //console.log($icm);
                    if(iZhihu.QuickBlock){
                        //console.log('Adding QuickBlock');
                        iZhihu.QuickBlock.addQuickBlockInOneComment($icm);
                    }
                    if(iZhihu.Comment.RightComment){
                        $list.css('height','100%');
                        $icm.show().bind('DOMNodeRemoved',function(event){
                            var $icm=$(event.target);
                            if(!$icm.is('.zm-item-comment'))return;
                            var $list=$icm.hide().closest('.zm-comment-list')
                              , $cm=$list.closest('.zm-comment-box:visible');
                            if($cm.length){
                                //console.log('Refreshing comment list');
                                if($list.children().length==1){
                                    $('.izh-quick-block-switch',$cm).add('.izh-buttons-cm-R',$cm).hide();
                                }
                                iZhihu.Comment.box($cm,false,false);
                            }
                        });
    
                        if($cm.length){
            	            var countNow=$list.children().length
                        	  , countAll=parseInt($cm.attr('data-count'))
                              , countRest=countAll-countNow
                              , notAll=$(this).has('.load-more').length
                        	;
                            if((!notAll)&&countRest>1){
                            	return;
                            }
                            //console.log('Refreshing comment list');
                            $('.izh-quick-block-switch',$cm).add('.izh-buttons-cm-R',$cm).show();
                            iZhihu.Comment.box($cm,false,false);
                            if(notAll||countRest<0)$list.scrollTop($icm.get(0).offsetTop);
                        }
                    }
                }else if($icm.is('.zm-comment-form')){
                    if(iZhihu.Comment.RightComment){
                        if($cm.length){
                            var $rcm=$icm;
                            $icm=$rcm.closest('.zm-item-comment');
                            $rcm.find('a.zm-comment-close.zm-command-cancel').click(function(event){
                                var $rcm=$(this).closest('.zm-comment-form').hide()
                                  , $cm=$rcm.closest('.zm-comment-box:visible');
                                if($cm.length){
                                    iZhihu.Comment.box($cm,false,false);
                                }
                            });
                            $rcm.parent().find('a.reply.zm-comment-op-link').click(function(event){
                                var $rcm=$(this).closest('.zm-comment-content-wrap').children('.zm-comment-form').toggle()
                                  , $icm=$(this).closest('.zm-item-comment')
                                  , $list=$icm.closest('.zm-comment-list')
                                  , $cm=$list.closest('.zm-comment-box:visible');
                                if($cm.length){
                                    iZhihu.Comment.box($cm,false,false);
                                    if($rcm.is(':visible'))$list.scrollTop($icm.get(0).offsetTop-$list.get(0).offsetTop);
                                    $rcm.toggle();
                                }
                            });
                            iZhihu.Comment.box($cm,false,false);
                            $list.scrollTop($icm.get(0).offsetTop-$list.get(0).offsetTop);
                        }
                    }
                }
            });
            var cmClose=function(event,alsoScrollToViewBottom){
                    var $cm=$(this).closest('.zm-comment-box');
                		if($(this).is('[name=closeform]')&&(!$cm.is('.empty')))return;
                    var $item=iZhihu.getItem($cm)//.attr('tabindex','-1').focus().removeAttr('tabindex')
                      , $itemMeta=$cm.closest('.zm-item-meta')
                      , alsoScroll=this.getAttribute('izh-alsoScrollToViewBottom')||''
                      , scrollTop=(document.body.scrollTop)?document.body.scrollTop:document.documentElement.scrollTop
                    ;
                    if(alsoScroll!=='1'){
                        $itemMeta.find('.toggle-comment')[0].click();
                        setTimeout(function(){
                            document.body.scrollTop=scrollTop;
                            document.documentElement.scrollTop=scrollTop;
                        },100);
                        return;
                    }
                    iZhihu.Comment.metaScrollToViewBottom($itemMeta,function(){
                        $itemMeta.find('.toggle-comment')[0].click();
                    },false,true);
                }
              , $btnCC=$('<a>',{
                    'class':'zu-question-answer-meta-comment izh-button-cc'
                  , href:'javascript:void(0);'
                  , click:cmClose
                  , 'data-tip':'s$t$收起评论并跳转至所属回答'
                }).text('收起')
              , $buttonsL=$('<div>',{
                	'class':'izh-buttons-cm-L'
                }).prependTo($cm)
              , $buttonsR=$('<div>',{
                	'class':'izh-buttons-cm-R'
                })
            ;
            if(iZhihu.Comment.RightComment){
                $cm.children('.zm-comment-form').find('[name=closeform]').click(cmClose);
                $btnCC.clone(true).css({
                    'background-image': 'url("/static/img/sprites-1.9.2.png")'
                  , 'background-position': '-261px -62px'
                  , 'background-repeat': 'no-repeat'
                  , 'display': 'inline-block'
                  , 'width': 15
                  , 'height': 15
                  , 'position': 'absolute'
                  , 'left': 0
                  , 'top': 0
                  , 'z-index': '10000'
                }).attr('data-tip','s$l$收起评论').text('').prependTo($cm)
                $buttonsR.prependTo($cm);
                if($list.children().length==0){
                    $buttonsR.hide();
                }
                $btnCC.css({
                    'float':'left'
                  , 'margin-left':7
                }).attr('izh-alsoScrollToViewBottom','1').prepend('<i class="z-icon-izh-fold"/>').prependTo($buttonsL);
                $('<a>',{
                    'class':'izh-button izh-back-top'
                  , 'data-tip':'s$l$返回顶部'
                  , href:'javascript:void(0);'
                  , click:function(){
                        $(this.parentNode).nextAll('.zm-comment-list').scrollTop(0);
                    }
                }).append(
                    $('<i>', { 'class': 'zg-icon z-icon-fold' })
                ).add(
                    $('<a>',{
                        'class':'izh-button izh-show-good'
                      , 'data-tip':'s$l$人气妙评'
                      , href:'javascript:void(0);'
                      , click:function(){
                           var $e=$(this)
                             , $c=$e.closest('.zm-comment-box')
                             , $l=$c.find('.zm-comment-list')
                             , $n=$l.find('.zm-item-comment').has('span.like-num.nil')
                           ;
                           if($e.hasClass('on')){
                               $e.attr('scrollTop_showgood',$l[0].scrollTop);
                               $n.show();
                               iZhihu.Comment.box($c,false,false);
                               $e.removeClass('on');
                               var scrollTop = parseInt($e.attr('scrollTop'));
                               if(!isNaN(scrollTop))
                                   $l.scrollTop(scrollTop);
                           }else{
                               $e.attr('scrollTop',$l[0].scrollTop);
                               $n.hide();
                               iZhihu.Comment.box($c,false,false);
                               $e.addClass('on');
                               var scrollTop = parseInt($e.attr('scrollTop_showgood'));
                               if(!isNaN(scrollTop))
                                   $l.scrollTop(scrollTop);
                           }
                        }
                    }).append(
                        $('<i>', { 'class': 'zg-icon zg-icon-comment-like' })
                    )
                ).css({
                    'float':'right'
                }).appendTo($buttonsR);

                iZhihu.Comment.PageNotScroll = true;
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
                iZhihu.Comment.PageNotScroll = false;

                var icmFocus=null;
                    $list.css({
                        'height':$cm.is('.empty')?'':'100%'
                      , 'overflow':'auto'
                    });
                $list.children('.zm-item-comment').each(function(i,e){
                    var $icm=$(e);
                    $icm.bind('DOMNodeRemoved',function(event){
                        var $icm=$(event.target);
                        if(!$icm.is('.zm-item-comment'))return;
                        var $cm=$icm.hide().closest('.zm-comment-box:visible');
                        if($cm.length){
                            if($(this).closest('.zm-comment-list').children().length==1){
                                $('.izh-quick-block-switch',$cm).add('.izh-buttons-cm-R',$cm).hide();
                            }
                            iZhihu.Comment.box($cm,false,false);
                        }
                    });
                    $icm.find('span.like-num').each(function(i,e){
                        var tip=e.getAttribute('data-tip').replace('s$r$','s$l$');
                        if(tip!='')e.setAttribute('data-tip',tip);
                    });
                    if (!icmFocus&&focusName&&focusName!=''
                        && $icm.children('a.zg-anchor-hidden[name="'+focusName+'"]').length){
                        icmFocus=$icm.get(0);
                    }
                });
                iZhihu.Comment.open($item,$cm,icmFocus);
                utils.observeDOMNodeAdded($cm.children('.zm-comment-form').children('.zm-comment-editable')[0],function(event){
                    var $e=$(event.target)
                      , $f=$e.closest('.zm-comment-form')
                      , $l=$f.prev('.zm-comment-list')
                      , $c=$f.closest('.zm-comment-box[opened=1]')
                      , ch=$c.height()
                      , winHeight=iZhihu.$win.height()
                      , scrollTop=document.documentElement.scrollTop+document.body.scrollTop
                      , navHeight=iZhihu.$body.children().first().height()
                      , bar=$('.zu-global-notify.zu-global-notify-info:visible')
                      , barHeight=!bar.length?0:bar.outerHeight()
                      , baseTop=((barHeight&&bar.css('position')=='fixed')?barHeight:(scrollTop>barHeight?0:barHeight-scrollTop))+navHeight
                      , minHeight=112
                      , maxHeight=winHeight-baseTop-35
                    ;
                    if(!$c.length)return;
                    if(!$c.is('.empty')&&$l.children().length>0){
                        lh=$l.height();
                    }else{
                        lh=0;
                    }
                    var $t=$e.clone().appendTo(document.body)
                    	    .css({'position':'absolute','z-index':'-1','width':$e.width(),'min-height':22})
                      , eh=$t.height()
                      , h=Math.max(eh,lh)+(lh==0?90:100)
                    ;
                    $t.remove();$t=null;
                    if(isNaN(ch)||ch!=h){
                        $c.attr('izh_cmHeight',h);
                        iZhihu.Comment.box($c,true,false);
                    }
                    if(!$f.is('.expanded')&&event.addedNodes.length){
                        $f.css({'height':'','bottom':''});
                    }else{
                        eh+=30;
                        $f.css(lh==0||eh>ch?{'height':'','bottom':25}:{'height':eh,'bottom':''});
                    }
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
