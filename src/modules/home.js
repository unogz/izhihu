/*
 * 首页
 */
$(function(){
    var $lblActivityCaption=$('#zh-home-list-title')//activity_caption
      , $btnNewActivity=$('#zh-main-feed-fresh-button')//new_activity
      ;
    if (pageIs.Home&&izhHomeNoti &&
        $lblActivityCaption.length && $btnNewActivity.length){
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

});
