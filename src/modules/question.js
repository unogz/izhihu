/**
 * 问题页
 */

$(function(){
  if(pageIs.Question){

var $lblQuestionMeta=$('#zh-question-meta-wrap')//question_meta
  , $lblAnswersCount=$('#zh-question-answer-num')//answers_count
  , $reply=$('#zh-question-answer-form-wrap')//reply_form
  , ppWidth=0,ppHeight=400
  , $uno=$('<div>',{'class':'uno',style:'float:left'})//izh_AuthorsList
  , $ppT=$('<span>',{'class':'meT',style:'display:none'})//izh_AuthorsList_TopSelfIndicator
  , $frm=$('<div>',{'class':'frame'})//izh_AuthorsList_frame
  , $ppB=$('<span>',{'class':'meB',style:'display:none'})//izh_AuthorsList_BottomSelfIndicator
  , $pp=$('<ul>',{'class':'pp'})//izh_AuthorsList_UL
  , $ppI=$('<div>')
  , css_comment={
        'position':'fixed'
      , 'background-color':'#fff'
      , 'outline':'none'
    //, 'overflow':'auto'
      , 'z-index':'9'
      , 'right':10
      , 'border-radius':0
      , 'border':'1px solid #999999'
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
  , addQuickBlock=function($vi){
      if($vi.is('.zm-item-vote-info')){
          var $u=$('.voters a[href^="/people/"]',$vi);
          $u.each(function(i,e){
              $('<input>',{'class':'izh-quick-block-sel',type:'checkbox'}).css({
              }).insertBefore(e).hide();
          });
          var width=$vi.closest('.zm-item-answer').width()
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
          $('<a>',{'class':'izh-quick-block-do zg-icon',href:'javascript:void(0);'})
          	.css($.extend(css_QuickBlock,{
          	    'position':'absolute'
          	  , 'left':width
          	  , 'margin-top':'2.5em'
          	  , 'margin-left':'2.5em'
          	})).click(function(){
          	    $('.zm-item-vote-info input.izh-quick-block-sel:checked',this.parentNode).each(function(i,e){
          	        quickBlock($(e).next());
          	    });
          	}).insertAfter($btnQuickBlock).hide();
          $('<a>',{'class':'izh-quick-block-selAll',html:'不选',href:'javascript:void(0);'}).css({
              'position':'absolute'
            , 'left':width
            , 'width':'2em'
            , 'margin-top':'3em'
          }).click(function(){
          	$('.zm-item-vote-info input.izh-quick-block-sel',this.parentNode).removeAttr('checked');
          }).insertAfter($btnQuickBlock).hide();
          $('<a>',{'class':'izh-quick-block-notAll',html:'全选',href:'javascript:void(0);'}).css({
              'position':'absolute'
            , 'left':width
            , 'width':'2em'
            , 'margin-top':'1.5em'
          }).click(function(){
          	$('.zm-item-vote-info input.izh-quick-block-sel',this.parentNode).attr('checked','checked');
          }).insertAfter($btnQuickBlock).hide();
      }
  }
;

function showComment($ac,$cm){
    $('.zm-item-answer').not('[data-aid='+$ac.attr('data-aid')+']')
        .find('.zm-comment-box:visible').each(function(i,e){
            $(e).parent().children('[name=addcomment]')[0].click();
        });
    var $n=$ac.next(),$n=$n.length?$n:$ac.parent().next()
      , t=$ac.offset().top-$main.offset().top
      , b=$ac.offset().top-$main.offset().top
      , w=$ac.width()
      , h=$ac.height()+parseInt($ac.css('padding-bottom'))+parseInt($n.css('padding-top'));
    if(!$ac.find('.izh_tape_a,.izh_tape_b').length)
        $('<div class="izh_tape_a"></div><div class="izh_tape_b"></div>').appendTo($ac);
    if(!$cm)$cm=$ac.find('.zm-comment-box');
    if($cm.length){
        if(!$cm.attr('tabindex')){
            $cm.attr('tabindex','-1').focus();//.show();
        }
        $ac.find('.izh_tape_a').css({
            'position':'absolute'
          , 'width':1
          , 'height':h//$cm.height()
          , 'top':0//$cm.offset().top
          , 'left':w-1//$cm.offset().left-1
          , 'z-index':'10'
          , 'background-color':'#fff'
        }).show();
        var $t=$cm.clone().css({'position':'absolute','z-index':'-1'}).appendTo($(document.body)).show();
        $cm.css({'left':$ac.offset().left+$ac.width()-1});
        var th=$t.children('.zm-comment-list').css({'position':'absolute','height':'','top':'','bottom':''}).height()+100;
        if(th<window.innerHeight-$main.offset().top){
            var top=$cm.parent().offset().top-$(document).scrollTop();
            if(top+th>window.innerHeight){
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
      , 'left':w
      , 'z-index':'8'
      , 'background-color':'#999999'
    }).show();
    $ac.css('border-color','#999999');
    $n.css('border-color','#999999');
    $('.zh-backtotop').css('visibility','hidden');
    $(document.body).scrollTop(t);
}
function hideComment($ac,$cm){
    var $n=$ac.next(),$n=$n.length?$n:$ac.parent().next();
    if(!$cm)$cm=$ac.find('.zm-comment-box');
    if($cm.length)
        //if($cm.is(':visible')){
            //$cm.hide();
            $ac.find('.izh_tape_a').hide();
        //}
    $ac.find('.izh_tape_b').hide();
    $ac.css('border-color','#DDDDDD');
    $n.css('border-color','#DDDDDD');
    $('.izh_tape_a:visible,.izh_tape_b:visible').hide();
    $('.zh-backtotop').css('visibility','visible');
}

function processAnswer($a){
    if(!$a||!$a.length)return;
    if($a.attr('izh_processed')=='1')return;
    var $c=$a.children().last()
      , $p=$a.find('.zm-item-answer-author-info')
      , $v=$a.find('.zu-question-answer-meta-fav');
    if($p.length){//relocatePersonInfo
        //var $f=$('<a>',{name:$a.attr('data-aid')}).before($c);
        if(izhAuthorRear){
            $p.insertBefore($c).css('textAlign','right');
        }
        $p=$p.children().first().children().eq(1);
        if($a.length){
            if(izhQuickBlock){
                // Region: 快速屏蔽
                var $answerHead=$('.answer-head',$a);
                if($('[name=more]',$answerHead).length){
                    $answerHead.bind('DOMNodeInserted',function(event){
                        addQuickBlock($(event.target));
                    });
                }
                // Region end
            }
            if(izhAuthorList){
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
                            .mouseover(function(){$('li a[href=#'+$(this).attr('data-aid')+']',$uno).addClass('sel');$(this).show();})
                            .mouseout(function(){$('li a[href=#'+$(this).attr('data-aid')+']',$uno).removeClass('sel');$(this).hide();})
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
                    if(maxTop+th<$(unsafeWindow).height()){
                        if(top+th<$(unsafeWindow).height()){
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
            }
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
        $v.bind('mouseover',function(){
            var $a=$(this).parentsUntil('#zh-question-answer-wrap','.zm-item-answer');
            $a.children('.izh_fav').css({
                'bottom':$(this).height()+$a.height()-$(this).position().top-1
              , 'left':$(this).position().left
            }).show();
            $.getJSON('http://www.zhihu.com/collections/json',$.param({answer_id:$a.attr('data-aid')}),function(result,status,xhr){
                var aid=this.url.substr(this.url.indexOf('answer_id=')+10)
                  , $a=$('.zm-item-answer[data-aid='+aid+']')
                  , $v=$a.children('.izh_fav').html('<div class="title">最近的选择</div>');
                $.each(result.msg[0].slice(0,4),function(i,e){
                    $('<a/>',{
                        'class':'fav'
                      , href:'javascript:;'
                      , aid:aid
                      , fid:e[0]
                      , html:e[1]
                    }).bind('click',function(){
                        var u='http://www.zhihu.com/collection/';
                        u+=$(this).hasClass('selected')?'remove':'add';
                        $.post(u,$.param({_xsrf:$('input[name=_xsrf]').val(),answer_id:$(this).attr('aid'),favlist_id:$(this).attr('fid')}),function(result){
                            var act=this.url.substring(this.url.lastIndexOf('/')+1)
                              , fid_i=this.data.indexOf('favlist_id=')
                              , fid=this.data.substring(fid_i+11)
                              , aid_i=this.data.indexOf('answer_id=')
                              , aid=this.data.substring(aid_i+10,fid_i-1)
                              , $vi=$('.zm-item-answer[data-aid='+aid+'] .izh_fav a[fid='+fid+']')
                              , inc=0;
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
        $v.bind('mouseout',function(){
            var $a=$(this).parentsUntil('#zh-question-answer-wrap','.zm-item-answer');
            $a.children('.izh_fav').hide();
        });
    }
    var processComment=function($cm){
        if($cm.is('.zm-comment-box')){
            if(izhShowComment){
                $cm.css(css_comment).parent().children('[name=addcomment]').on('click',function(event){
                    var $cm=$(this).parent().find('.zm-comment-box');
                    if($cm.length){
                        var $a=$(this).closest('.zm-item-answer');
                        if($cm.is(':hidden')){
                            showComment($a,$cm);
                        }else{
                            hideComment($a,$cm);
                        }
                    }
                });
                if(izhQuickBlock){
                    // Region: 快速屏蔽
                    var $u=$('.zm-comment-hd',$cm);
                    $u.each(function(i,e){
                        $('<a>',{'class':'zg-icon izh-quick-block-do',html:'',href:'javascript:void(0);'})
                        	.css($.extend(css_QuickBlock,{'float':'right'}))
                        	.click(function(){quickBlock($(this).next());}).prependTo(e).hide();
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
                showComment($cm.parents('.zm-item-answer'),$cm);
                $('i.zm-comment-bubble',$cm).hide();
                $('.zm-comment-list',$cm).css({
                    'height':'100%'
                  , 'overflow':'auto'
                }).bind('DOMNodeInserted',function(event){
                    var $cm=$(this).parent('.zm-comment-box:visible');
                    if($cm.length){
                        $('.izh-quick-block',$cm).show();
                        var $a=$cm.closest('.zm-item-answer');
                        showComment($a,$cm);
                        var $icm=$(event.target);
                        $icm.bind('DOMNodeRemoved',function(event){
                            var $cm=$(this).closest('.zm-comment-box:visible');
                            if($cm.length){
                                if($(this).closest('.zm-comment-list').children().length==1){
                                	$('.izh-quick-block',$cm).hide();
                                }
                                var $a=$cm.closest('.zm-item-answer');
                                showComment($a,$cm);
                            }
                        });
                    }
                }).children('.zm-item-comment').bind('DOMNodeRemoved',function(event){
                    var $cm=$(this).closest('.zm-comment-box:visible');
                    if($cm.length){
                        if($(this).closest('.zm-comment-list').children().length==1){
                        	$('.izh-quick-block',$cm).hide();
                        }
                        var $a=$cm.closest('.zm-item-answer');
                        showComment($a,$cm);
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
                    var $a=$(this).closest('.zm-item-answer');
                    hideComment($a);
                    $a.find('[name=addcomment]')[0].click();
                });
            if(izhShowComment){
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
    $c.bind('DOMNodeInserted',function(event){
        processComment($(event.target));
    });
    if(izhShowComment){
        $a.find('.zu-question-answer-meta-comment').css({'display':'block','float':'right'});
        processComment($('.zm-comment-box',$a));
    }
    $a.attr('izh_processed','1');
}

//答案按时间排序
    if(utils.getCfg('answer_orderByTime')){
      client.click('.zh-answers-filter-popup div[data-key=added_time]');
    }
    
    //process each answer
    var _e=null
      , $listAnswers=$('.zm-item-answer','#zh-single-question');
    if($listAnswers&&$listAnswers.length){
        if(izhAuthorList){
            $uno.appendTo($banner);
            $ppT.appendTo($uno);
            $frm.appendTo($uno);
            $pp.appendTo($frm);
            $ppB.appendTo($uno);
            //uno.appendChild(ppI);
        }
        if(izhShowComment){
            $('#zh-question-collapsed-wrap').show();
        }
        $listAnswers.each(function(i,e){
            processAnswer($(e));
        });
        if($reply.children('.zu-answer-form-disabled-wrap').is(':hidden')){
            var $ppla=$('<a>',{href:'#draft',target:'_self'})
                .append('<table class="plus"><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>')
                .append('<span class="name func">-new-</span>')
              , $ppl=$('<li>')
                .append($ppla)
                .appendTo($pp)
            ;
        }
    }
    if($lblQuestionMeta.length){
        var s=new Array()
          , $a=$('<a>')
          , $c=$('<span>',{'class':'zg-bull',html:'•'})
          , $p=$lblQuestionMeta.children('a.meta-item:last');
        if(_e){
            s.push($(_e).attr('href'));
            $a.html('我的回答');
        }else if($reply.length){
            var id='new_answer'
              , $b=$('<a>',{name:id}).before($reply.children().first());
            s.push('#draft');
            $a.html('我要回答');
        }
        $c.insertAfter($p);
        $a.attr('href',s.join('')).attr('target','_self')
            .insertAfter($c);
    }
    var resizeAuthorList=function($f){
        // Adjust AuthorList's size and locate its position
        if(!$f||!$f.length)return;
        var frm=$f.get(0);
        var width=ppWidth
          , height=$(unsafeWindow).height()-$main.offset().top-3-$f.position().top;
        if(frm.scrollHeight>height){
            $f.height(height);
            width+=20;
        }else{
            $f.height('');
        }
        $f.width(width);
    };
    var $btnCollapsedSwitcher=$('#zh-question-collapsed-switcher')
      , numCollapsedCount=!$btnCollapsedSwitcher.length||$btnCollapsedSwitcher.is(':hidden')?0:parseInt($('#zh-question-collapsed-num').text());
    if(isNaN(numCollapsedCount))numCollapsedCount=0;
    if($listAnswers.length||numCollapsedCount){
        if(izhAuthorList){
            $uno.css({
                'float':'none'
              , 'left':9-$uno.width()
            });
            if(!$btnCollapsedSwitcher.length&&!numCollapsedCount)
                resizeAuthorList($frm);
            $('<div>',{'class':'modal-dialog-title'}).append(
                $('<a>',{
                    'class':'z-icon'
                  , href:'javascript:void(0);'
                  , html:'<i class="z-icon-izh-fold"/>'
                  , click:function(){
                      $uno.css('left',9-$uno.width());
                  }
                })
            ).insertBefore($ppT).css({
                  'border-top-left-radius':0
            })
            .children('a.z-icon').css({
                  'position':'absolute'
                , 'right':4
                , 'margin-top':-10
            });
            $uno.mouseover(function(){
                resizeAuthorList($('.frame',this));
                $(this).css('left','0');
            });
            if(_e){
                $uno.children('.meT').css('display',0>_e.offsetTop-$frm.scrollTop()?'':'none');
                $uno.children('.meB').css('display',$frm.height()<_e.offsetTop-$frm.scrollTop()+_e.offsetHeight?'':'none');
            }
        }
        if($btnCollapsedSwitcher.length){
            if(numCollapsedCount>0){
                $('#zh-question-collapsed-wrap').show().bind('DOMNodeInserted',function(event){
                    var $a=$(event.target);
                    if($a.is('.zm-item-answer')){
                        processAnswer($a);
                        var count = $('.zm-item-answer[izh_processed=1]','#zh-question-collapsed-wrap').length;
                        if(count==numCollapsedCount){
                            resizeAuthorList($frm);
                        }
                    }
                });
            }
            $btnCollapsedSwitcher[0].click();
        }
    }
  }
})