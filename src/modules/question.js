/**
 * 问题页
 */

$(function(){
  if(pageIs.Question){

var $lblQuestionMeta=$('#zh-question-meta-wrap')//question_meta
  , $lblAnswersCount=$('#zh-question-answer-num')//answers_count
  , $reply=$('#zh-question-answer-form-wrap')//reply_form
  , $uno=$('<div>',{'class':'uno',style:'float:left'})//izh_AuthorsList
  , $ppT=$('<span>',{'class':'meT',style:'display:none'})//izh_AuthorsList_TopSelfIndicator
  , $frm=$('<div>',{'class':'frame'})//izh_AuthorsList_frame
  , $ppB=$('<span>',{'class':'meB',style:'display:none'})//izh_AuthorsList_BottomSelfIndicator
  , $pp=$('<ul>',{'class':'pp'})//izh_AuthorsList_UL
  , $ppI=$('<div>')

;

//答案按时间排序
    if(utils.getCfg('answer_orderByTime')){
      client.click('.zh-answers-filter-popup div[data-key=added_time]');
    }
    
    var $questionWrap=$('#zh-question-meta-wrap');
    $questionWrap.children('.panel-container').bind('DOMNodeInserted',function(event){
        processComment($(event.target));
    });
    if(izhRightComment){
        $questionWrap.children('.meta-item[name=addcomment]')
        	.css({'display':'block','float':'right','margin-left':7})
        	.insertBefore($questionWrap.children().first());
        processComment($('.zm-comment-box',$questionWrap));
    }
        
    //process each answer
    var $listAnswers=$('.zm-item-answer','#zh-single-question');
    if($listAnswers&&$listAnswers.length){
        if(izhAuthorList){
            $uno.appendTo($banner);
            $ppT.appendTo($uno);
            $frm.appendTo($uno);
            $pp.appendTo($frm);
            $ppB.appendTo($uno);
            //uno.appendChild(ppI);
        }
        $listAnswers.each(function(i,e){
            processAnswer($(e),$pp
              , izhAuthorRear
              , izhAuthorList
              , izhRightComment
              , izhQuickBlock);
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
            $('<div>',{'class':'modal-dialog-title'}).css({
                  'border-top-left-radius':0
            }).insertBefore($ppT);
            $uno.mouseover(function(){
                resizeAuthorList($('.frame',this));
                $(this).css('left','0');
            }).mouseout(function(){
                $(this).css('left',9-$(this).width());
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
                        processAnswer($a,$pp
                          , $body.attr('izhAuthorRear')=='1'
                          , $body.attr('izhAuthorList')=='1'
                          , $body.attr('izhRightComment')=='1'
                          , $body.attr('izhQuickBlock')=='1'
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
  }
})