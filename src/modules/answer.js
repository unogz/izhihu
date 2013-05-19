/**
 * 回答页
 */

$(function(){
  if(pageIs.Answer){

var $lblQuestionMeta=$('#zh-question-meta-wrap')//question_meta
;

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
    var $listAnswers=$('.zm-item-answer','#zh-single-question');
    if($listAnswers&&$listAnswers.length){
        $listAnswers.each(function(i,e){
            window.iZhihu.Answer.processAnswer($(e),null
              , izhAuthorRear
              , false);
        });
    }

    $('#zh-question-answer-wrap').bind('DOMNodeInserted',function(event){
        var $na=$(event.target).filter('.zm-item-answer');
        if($na.length){
            window.iZhihu.Answer.processAnswer($na,null
                , izhAuthorRear
                , false);
        }
    });

    var $cm=$('.zm-comment-box',$questionWrap);
    if($cm.length && $cm.is(':visible')){
    	iZhihu.Comment.scrollFocusCommentOnLoad($cm);

    	iZhihu.Comment.metaScrollToViewBottom($cm.closest('.zm-item-meta'),function(){
            iZhihu.Comment.processComment($cm);
        });
    }
  }
})