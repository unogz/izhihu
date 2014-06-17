/**
 * 问题页
 */

  if(pageIs.Question){

    var $lblQuestionMeta=$('#zh-question-meta-wrap')//question_meta
      , $listAnswers=$('#zh-question-answer-wrap,#zh-question-collapsed-wrap').children()//$('.zm-item-answer','#zh-single-question')
      , numAnswersCount=$listAnswers.length
      , $btnCollapsedSwitcher=$('#zh-question-collapsed-switcher')
      , numCollapsedCount=!$btnCollapsedSwitcher.length||$btnCollapsedSwitcher.is(':hidden')?0:parseInt($('#zh-question-collapsed-num').text())
      , numAnswersCountTotal=numAnswersCount+numCollapsedCount
      , $reply=$('#zh-question-answer-form-wrap')//reply_form
    ;
    if($lblQuestionMeta.length){
        var s=new Array()
          , $a=$('<a>')
          , $c=$('<span>',{'class':'zg-bull',html:'•'})
          , $p=$lblQuestionMeta.children('.zm-meta-panel').children('a.meta-item:last')
          , $m=$('.zu-answer-form-disabled-wrap:visible > a','#zh-question-answer-form-wrap')
        ;
        if($m.length){
            s.push($m.attr('href'));
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
    if (izhAuthorList&&
        numAnswersCountTotal>100&&
        confirm('这个问题的回答数较多，是否暂时关闭「iZhihu 回答目录」？')){
        //$('#izhCSS_comment').remove();
        //return;
        izhAuthorList=false;
        $body.attr('izhAuthorList','0');
    }
    console.log((new Date()).getTime());
    
    var $lblAnswersCount=$('#zh-question-answer-num')//answers_count
      , $uno=$('<div>',{'class':'uno',style:'float:left'})//izh_AuthorsList
      , $ppT=$('<span>',{'class':'meT',style:'display:none'})//izh_AuthorsList_TopSelfIndicator
      , $frm=$('<div>',{'class':'frame'})//izh_AuthorsList_frame
      , $ppB=$('<span>',{'class':'meB',style:'display:none'})//izh_AuthorsList_BottomSelfIndicator
      , $pp=$('<ul>',{'class':'pp'})//izh_AuthorsList_UL
      , $ppI=$('<div>')
    
    ;

    window.iZhihu.$unoAnswers = $uno

    //答案按时间排序
    if(utils.getCfg('answer_orderByTime')){
      client.click('.zh-answers-filter-popup div[data-key=added_time]');
    }
    
    var $questionWrap=$('#zh-question-meta-wrap');
    $questionWrap.children('.panel-container').bind('DOMNodeInserted',function(event){
        window.iZhihu.Comment.processComment($(event.target));
    });
    if(window.iZhihu.Comment.RightComment){
        //$questionWrap.children('.meta-item[name=addcomment]').prependTo($questionWrap);
        window.iZhihu.Comment.processCommentButton($questionWrap);
        if(!$('#izh_QuestionShadow').length){
            $('<div>',{'class':'izh_boxShadow',id:'izh_QuestionShadow'}).css({
                'z-index': '-1'
              , 'position': 'relative'
              , 'top': -25
              , 'margin-left': -32
            }).prependTo('#zh-single-question').hide();
        }   
    }

    //process each answer
    if($listAnswers&&$listAnswers.length){
        if(izhAuthorList){
            $uno.appendTo($banner);
            $ppT.appendTo($uno);
            $frm.appendTo($uno);
            $pp.appendTo($frm);
            $ppB.appendTo($uno);
            //uno.appendChild(ppI);
            $uno.$endOfLastA=$('<li class="endOfLastA">').appendTo($pp)
        }
        $listAnswers.each(function(i,e){
            window.iZhihu.Answer.processAnswer($(e),$pp
              , izhAuthorRear
              , izhAuthorList);
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
    var resizeAuthorList=function($f){
        // Adjust AuthorList's size and locate its position
        if(!$f||!$f.length)return;
        var frm=$f.get(0);
        var width=window.iZhihu.Answer.ppWidth
          , height=$win.height()-$main.offset().top-3-$f.position().top;
        if(frm.scrollHeight>height){
            $f.height(height);
            width+=20;
        }else{
            $f.height('');
        }
        $f.width(width);
    };
    if(isNaN(numCollapsedCount))numCollapsedCount=0;
    if($listAnswers.length||numCollapsedCount){
        if(izhAuthorList){
            $uno.css({
                'float':'none'
              , 'left':9-$uno.width()
            });
            if(!$btnCollapsedSwitcher.length&&!numCollapsedCount)
                resizeAuthorList($frm);
            $('<div>',{'class':'modal-dialog-title'}).css({
                  'border-top-left-radius':0
            }).insertBefore($ppT);
            $uno.mouseover(function(){
                resizeAuthorList($('.frame',this));
                $(this).css('left','0');
            }).mouseout(function(){
                $(this).css('left',9-$(this).width());
            });
            if(window.iZhihu.Answer._e){
                $uno.children('.meT').css('display',0>window.iZhihu.Answer._e.offsetTop-$frm.scrollTop()?'':'none');
                $uno.children('.meB').css('display',$frm.height()<window.iZhihu.Answer._e.offsetTop-$frm.scrollTop()+window.iZhihu.Answer._e.offsetHeight?'':'none');
            }
        }
        if($btnCollapsedSwitcher.length){
            if(numCollapsedCount>0){
                $('#zh-question-collapsed-wrap').show().bind('DOMNodeInserted',function(event){
                    var $a=$(event.target);
                    if($a.is('.zm-item-answer')){
                        window.iZhihu.Answer.processAnswer($a,$pp
                          , $body.attr('izhAuthorRear')=='1'
                          , $body.attr('izhAuthorList')=='1'
                        );
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

    $('#zh-question-answer-wrap').bind('DOMNodeInserted',function(event){
        var $na=$(event.target).filter('.zm-item-answer');
        if($na.length){
            window.iZhihu.Answer.processAnswer($na,$pp
              , $body.attr('izhAuthorRear')=='1'
              , $body.attr('izhAuthorList')=='1'
            );
        }
    });
    console.log((new Date()).getTime());

    var $cm=$('.zm-comment-box',$questionWrap);
    if($cm.length && $cm.is(':visible')){
        var focusName = iZhihu.Comment.scrollFocusCommentOnPageLoad($cm);
    
        iZhihu.Comment.metaScrollToViewBottom($cm.closest('.zm-item-meta'),function(){
            iZhihu.Comment.processComment($cm, focusName);
        });
    }
  }
