/*
 * 首页
 */
$(function(){
    var $lblActivityCaption=$('#zh-home-list-title')//activity_caption
      , $btnNewActivity=$('#zh-main-feed-fresh-button')//new_activity
      , $feedList=$('.zh-general-list')//feed_list
    ;
    if (pageIs.Home){
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
            }
        });
    }

});
