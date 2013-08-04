/*
 * 首页
 */
$(function(){
    var $lblActivityCaption=$('#zh-home-list-title')//activity_caption
      , $btnNewActivity=$('#zh-main-feed-fresh-button')//new_activity
      , $feedList=$('.zh-general-list')//feed_list
      , $topLinkHome=$('#zh-top-link-home')
      , $filter=$('<span>',{
            'class':'izh-feeds-filter'
          , html:'<a class="izh-feeds-filter-option"showFeeds="QUESTION,ANSWER"><i class="zg-icon"></i>问答</a><a class="izh-feeds-filter-option"showFeeds="ROUNDTABLE"><i class="zg-icon"></i>圆桌</a><a class="izh-feeds-filter-option"showFeeds="ARTICLE"><i class="zg-icon"></i>专栏</a>'
          , style:'position:absolute;display:none;background-color:#fff;border:1px solid #777'
        })
      , $filterInfo=$('<span>')
      , ShowFeeds=function(type,enable){
            var id="izhCSS_FilterFeed_"+type
              , nd=document.getElementById(id)
            ;
            if(enable){
                if(nd)nd.parentNode.removeChild(nd);
            }else if(heads.length){
                if(!nd){
                    nd=_doc.createElement('style');
                    nd.type='text/css';
                    nd.id=id;
                    nd.appendChild(_doc.createTextNode('.feed-item[data-feedtype^="'+type+'_"]{display:none}'));
                    heads[0].appendChild(nd);
                }
                //{ROUNDTABLE_ADD_RELATED: "roundtable",ARTICLE_VOTE_UP: "post_vote",ARTICLE_CREATE: "post_create",RECOMMENDED: "feed_recommended",QUESTION_FOLLOW: "feed_question_follow",QUESTION_CREATE: "feed_question",ANSWER_VOTE_UP: "feed_answer_vote",ANSWER_CREATE: "feed_answer_answer"};
            }
        }
      , refreshFilterInfo=function(){
            var count=$feedList.children('.feed-item:hidden').length
              , info=''
            ;
            if(count>0)
                info='（根据您的选择，'+count+'条动态被隐藏）';
            $filterInfo.html(info);
      }
    ;
    if (pageIs.Home){
        $filter.children('.izh-feeds-filter-option').addClass('checked').click(function(event){
            var i=0
              , $e=$(this).toggleClass('checked')
              , f=$e.attr('showFeeds').split(',')
            ;
            for(;i<f.length;i++){
                ShowFeeds(f[i],$e.is('.checked'));
            }
            refreshFilterInfo();
    	});
        if($topLinkHome.length){
            var $filter2=$('<div>').append($filter.clone(true,true).css('display','')).hide()
                	.on('show',function(){
                	    var $e=$(this).stop();
                    	$e.fadeIn('slow');
                	})
                	.on('hide',function(){
                	    var $e=$(this).stop();
                    	$e.fadeOut('slow');
                	})
                	.on('mouseenter',function(){
                	    $(this).trigger('show');
                	})
                	.on('mouseleave',function(){
                	    $(this).trigger('hide');
                	})
            ;
            $topLinkHome.after($filter2).parent()
            	.on('mouseenter',function(event){
                    var $e=$(event.target)
                      , $f=$e.next()
                    ;
            	    $f.trigger('show');
            	})
            	.on('mouseleave',function(event){
                    var $e=$(event.target)
                      , $f=$e.next()
                    ;
            	    $f.trigger('hide');
            	})
            ;
        }
        if($lblActivityCaption.length){
            $filter
            	.on('show',function(){
            	    var $e=$(this).stop();
            	    if($e.is(':hidden'))
            	    	$e.css({display:'',opacity:0})
                    $e.animate({opacity:1},'slow');
            	})
            	.on('hide',function(){
            	    var $e=$(this).stop();
                	$e.fadeOut('slow');
            	})
            	.on('mouseenter',function(){
            	    $(this).trigger('show');
            	})
            	.on('mouseleave',function(){
            	    $(this).trigger('hide');
            	})
        	;
            $('#feed-ver').before($filterInfo);
            $lblActivityCaption.children('i').after($filter)
            	.on('mouseenter',function(event){
                    var $e=$(event.target)
                      , $f=$e.next()
                    ;
            	    $f.trigger('show');
            	})
            	.on('mouseleave',function(event){
                    var $e=$(event.target)
                      , $f=$e.next()
                    ;
            	    $f.trigger('hide');
            	})
            ;
        }
        if (izhHomeNoti
         && $lblActivityCaption.length
         && $btnNewActivity.length
        ){
            $lblActivityCaption.css({
                'float':'left'
              , 'margin-bottom':'2px'
              , 'line-height':'32px'
              , 'width':'100%'
              }).next().css('clear','both');
            $btnNewActivity.css({
                'float':'right'
              , 'margin':'0'
              , 'line-height':'22px'
            }).appendTo($lblActivityCaption);
        }
    }
    if(pageIs.Home||pageIs.Debuts){
        $feedList.find('.feed-item').each(function(i,e){
            window.iZhihu.Answer.processAnswer($(e),null
              , izhAuthorRear
              , izhAuthorList
            );
        });
        $feedList.bind('DOMNodeInserted',function(event){
            var $item=$(event.target);
            if($item.is('.feed-item')){
                window.iZhihu.Answer.processAnswer($item,null
                  , $body.attr('izhAuthorRear')=='1'
                  , $body.attr('izhAuthorList')=='1'
                );
                refreshFilterInfo();
            }
        });
    }

});
