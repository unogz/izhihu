/*
 * 首页
 */
$(function(){
    var $lblActivityCaption=$('#zh-home-list-title')//activity_caption
      , $btnNewActivity=$('#zh-main-feed-fresh-button')//new_activity
      , $feedList=$('.zh-general-list')//feed_list
      , $filter=$('<span>',{
            'class':''
          , html:'<input type="checkbox"filter="QUESTION,ANSWER">问答<input type="checkbox"filter="ROUNDTABLE">圆桌<input type="checkbox"filter="ARTICLE">专栏'
          , style:'position:absolute;display:none;background-color:#fff;border:1px solid #777'
        })
      , $filterInfo=$('<span>')
      , funcAddFeedFilter=function(type){
            if (heads.length > 0) {
                var node = _doc.createElement("style");
                node.type = "text/css";
                node.id = "izhCSS_FilterFeed_"+type;
                node.appendChild(_doc.createTextNode('.feed-item[data-feedtype^="'+type+'_"]{display:none}'));
                heads[0].appendChild(node); 
                //{ROUNDTABLE_ADD_RELATED: "roundtable",ARTICLE_VOTE_UP: "post_vote",ARTICLE_CREATE: "post_create",RECOMMENDED: "feed_recommended",QUESTION_FOLLOW: "feed_question_follow",QUESTION_CREATE: "feed_question",ANSWER_VOTE_UP: "feed_answer_vote",ANSWER_CREATE: "feed_answer_answer"};
            }
        }
      , funcDelFeedFilter=function(type){
            var id="izhCSS_FilterFeed_"+type
              , nd=document.getElementById(id)
            ;
            if(nd)nd.parentNode.removeChild(nd);
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
        if($lblActivityCaption.length){
            $filter.children('input').attr('checked','checked').click(function(event){
                var i=0
                  , $e=$(this)
                  , f=$e.attr('filter').split(',')
                ;
                for(;i<f.length;i++){
                    if($e.is(':checked')){
                        funcDelFeedFilter(f[i]);
                    }else{
                        funcAddFeedFilter(f[i]);
                    }
                }
                refreshFilterInfo();
            });
            $('#feed-ver').before($filterInfo);
            $lblActivityCaption.children('i').after($filter)
            	.on('click',function(event){
                    var $e=$(event.target)
                      , $f=$e.next()
                    ;
                    if($f.is(':hidden')){
                        $f.css({display:'',opacity:0}).animate({opacity:1},'slow',function(){
                        });
                    }else{
                    	$f.fadeOut('slow');
                    }
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
