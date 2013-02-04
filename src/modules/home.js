/*
 * 首页
 */
$(function(){
	if(pi.h&&izhHomeNoti&&$v.length&&$y.length){
        $v.css({
            'float':'left'
          , 'margin-bottom':'2px'
          , 'line-height':'32px'
          , 'width':'100%'
          }).next().css('clear','both');
        $y.css({
            'float':'right'
          , 'margin':'0'
          , 'line-height':'22px'
        }).appendTo($v);
    }
    if($u.length){
        z=$u.attr('href');
    }

});
