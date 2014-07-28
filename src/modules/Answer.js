/**
 * @class Answer
 */
function Answer(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu) {
        return null;
    }
    iZhihu.Answer = this;

    this._e=null;
    this.ppWidth=0;
    this.ppHeight=400;

  	this.processAnswer=function($a,$pp,bAuthorRear,bAuthorList){
        if(!$a||!$a.length)return;
        if($a.attr('izh_processed')=='1')return;
        var selCollapse='.meta-item[name=collapse]'
          , $meta=$a.find('.zm-item-meta')
          , $author=$a.find('.zm-item-answer-author-info')
          , $favo=$a.find('.meta-item[name=favo]')
          , $fold=!$a.has('.zh-summary > .toggle-expand').length?null:$('<button/>',{
                'class':'down izh-button fold'
              , html:'收起'
              , click:function(){
                    var $vote=$(this).closest('.zm-votebar')
                      , $answer=$vote.is('.goog-scrollfloater-floating')?null:$vote.closest('.feed-item')
                      , $fold=$answer==null?iZhihu.Answer.$Fold:$answer.find('.zm-item-meta:first '+selCollapse)
                    ;
                    if($fold&&$fold.length){
                        iZhihu.Answer.$Folding=$vote.closest('.entry-body');
                        $fold.get(0).click();
                    }
              	}
            })
          , $vote=$a.find('.zm-votebar')
        ;
        if($vote.length){
            $vote.append($fold).bind('DOMNodeRemoved',function(event){
                var $vote=$(event.target);
                if($vote.is('.zm-votebar')){
                    iZhihu.Answer.$Fold=$vote.closest('.feed-item').find('.zm-item-meta:first '+selCollapse);
                }
            });
        	if($author)$author.find('[name=collapse]').hide();
        	$a.find('.feed-main .entry-body [name=collapse]').hide();
        }
        $meta.find(selCollapse).click(function(){
            if(!iZhihu.Answer.$Folding)return;
            var scrollObj=window.iZhihu4CRX?document.body:document.documentElement
              , $meta=$(this).closest('.feed-meta')
              , $answer=$meta.prev()
              , scrollTop=iZhihu.Answer.$Folding.children('.zm-votebar').length?scrollObj.scrollTop
                      :($answer.closest('.feed-item').offset().top-iZhihu.$body.children().first().height())
            ;
        	scrollTop+=$answer.outerHeight();
            var $summary=$answer.find('.zh-summary').show()
              , offset=0;
            scrollTop-=$summary.outerHeight();
            $summary.hide();
            if(!$answer.find('.zm-item-vote-info.empty').length)
                offset=1;
            if($answer.prev().is(':hidden'))offset+=2;
            $(scrollObj).scrollTop(scrollTop+offset);
            iZhihu.Answer.$Folding=null;
        });
        if(iZhihu.QuickBlock){
            // Region: 快速屏蔽
            var $voteMore=$('.zm-item-vote-info > .more',$a)
            if($voteMore.length){
                $voteMore.parent().parent().bind('DOMNodeInserted',function(event){
                    var $vi=$(event.target).filter('.zm-item-vote-info')
                    if (!$vi.length || $vi.attr('data-votecount')!=$vi.children().first().children().length)
                        return
                    iZhihu.QuickBlock.addQuickBlock($vi)
                })
            }
            // Region end
        }
        if($author.length){//relocatePersonInfo
            if(bAuthorRear){
                $author.css({
                    'textAlign':'right'
                });
                if($a.is('.feed-item')){
                    $a.find('.entry-body .zm-item-answer-detail .zm-item-rich-text')
                        .append($author.hide()).bind('DOMNodeInserted',function(event){
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
                    $author.insertBefore($meta);
                }
            }
            $author=$author.children().first().children().eq(1);
            if ($pp && bAuthorList){
                // Region: 回答目录项
                var collapsed=$a.attr('data-collapsed')=='1'
                  , $ppla=$('<a>',{
                            href:'#answer-'+$a.attr('data-aid')
                          , target:'_self'
                          , style:css_AuthorListItemA
                        })
                  , $ppl=$('<li>').append($ppla)
                  , $uno=iZhihu.$unoAnswers
                if(collapsed){
                    $ppl.appendTo($pp)
                }else{
                    $ppl.insertBefore($uno.$endOfLastA)
                }
                if($a.attr('data-isowner')=='1'){
                    iZhihu.Answer._e=$a.get(0);
                    $ppla.append('<span class="me"></span>');
                }
                var nameCSS='name';
                if($a.attr('data-isfriend')=='1'){
                    nameCSS+=' friend';
                }
                if(collapsed){
                    nameCSS+=' collapsed'
                }
                if(!$author.length){
                    nameCSS+=' noname';
                }
                $('<span>',{
                    'class':nameCSS
                  , html:!$author.length?'匿名用户':$author.html()
                  , style:css_AuthorListItemA_name
                }).appendTo($ppla);
                if ($ppl.width()>iZhihu.Answer.ppWidth)
                    iZhihu.Answer.ppWidth=$ppl.width();
                // Region end
                // Region: 回答篇幅指示
                var nHP=Math.ceil($('.zm-editable-content',$a).text().length/100);
                $('<span>',{
                    'class':'hp'
                }).css({'width':nHP*10,'margin-left':-nHP*10}).appendTo($ppla);
                // Region end
                $ppla.mouseover(function(){
                    var $frm=$(this.parentNode.parentNode.parentNode)
                      , $uno=iZhihu.$unoAnswers
                    $(this).addClass('sel');
                    if(iZhihu.Answer._e){
                        $uno.children('.meT').css('display',0>iZhihu.Answer._e.offsetTop-$frm.scrollTop()?'':'none');
                        $uno.children('.meB').css('display',$frm.height()<iZhihu.Answer._e.offsetTop-$frm.scrollTop()+iZhihu.Answer._e.offsetHeight?'':'none');
                    }
                    // Region: 回答预览
                    var nam=$('span.name',this);
                    if(!nam.length)return;
                    var aid=$(this).attr('href').replace('#answer-','')
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
                }).click(function(){$(this).mouseout();
                iZhihu.$unoAnswers.css('left',9-iZhihu.$unoAnswers.width());});
                if(iZhihu.Answer._e==$a.get(0)){
                    iZhihu.Answer._e=$ppla.get(0);
                }
            }
        }

        if(iZhihu.QuickFavo)
            iZhihu.QuickFavo.addQuickFavo($favo,$a);

        $meta.bind('DOMNodeInserted',function(event){
            iZhihu.Comment.processComment($(event.target));
        });
        
        iZhihu.Comment.processCommentButton($a);

        var $cm=$('.zm-comment-box',$a);
        if($cm.length && $cm.is(':visible')){
        	var focusName = iZhihu.Comment.scrollFocusCommentOnPageLoad($cm);
    
            iZhihu.Comment.metaScrollToViewBottom($cm.closest('.zm-item-meta'),function(){
                iZhihu.Comment.processComment($cm, focusName);
            });
        }
        
        $a.attr('izh_processed','1');
    };

    return this;
}
