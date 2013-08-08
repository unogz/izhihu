/**
 * @class Noti7
 */
function Noti7(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu || !iZhihu.config['Noti7']) {
        return null;
    }
    iZhihu.Noti7 = this;
    
    this.$noti7 = $('#zh-top-nav-live-new');
    this.$frame = $('.zm-noti7-frame',this.$noti7);
    this.$content = $('.zm-noti7-content-body',this.$noti7);
    this.$footer = $('.zm-noti7-popup-footer',this.$noti7);
    this.$tab = $('.zm-noti7-popup-tab-container','#zh-top-nav-live-new-inner');

    this.css = 
        ['#zh-top-nav-live-new .zm-noti7-popup-footer a[unreadonly="1"]{color:#225599 !important;text-shadow:0 0 1px #225599;}'
        ,''].join('\n');
    this.enhance = function(){
        iZhihu.Noti7.$tab.find('.zm-noti7-popup-tab-item').each(function(i,e){
            utils.observeDOMAttrModified(e,function(event){
                var $e=$(event.target);
                if($e.is('.zm-noti7-popup-tab-item.current')){
                	var currentClass=$e.attr('class')
                	  , $bFilterRead=$('.izh-filter-read',iZhihu.Noti7.$footer);
                	if(currentClass!=$bFilterRead.attr('currentClass')){
                	    $bFilterRead.attr({'unreadOnly':'','currentClass':currentClass});
                	}
                }
            });
        });
        iZhihu.Noti7.$footer.append(
            $('<a>',{
                'class':'izh-filter-read'
              , html:'隐藏已读'
              , href:'javascript:void(0);'
              , 'unreadOnly':''
              , click:function(){
                    var unreadOnly=this.getAttribute('unreadOnly')=='1'
                      , $contentVisible=iZhihu.Noti7.$content.filter(':visible')
                      , $scroller=$contentVisible.closest('.zh-scroller-inner')
                      , $items=$contentVisible.find('.zm-noti7-content-item')
                    ;
                    unreadOnly=!unreadOnly;
                    this.setAttribute('unreadOnly',unreadOnly?'1':'');
                    if(unreadOnly){
                        $scroller.attr('scrollTop',$scroller[0].scrollTop);
                        $items.not('.unread').hide();
                        var scrollTop = parseInt($scroller.attr('scrollTop_unread'));
                        if(!isNaN(scrollTop))
                            $scroller.scrollTop(scrollTop);
                    }else{
                        $scroller.attr('scrollTop_unread',$scroller[0].scrollTop);
                        $items.not('.unread').show();
                        var scrollTop = parseInt($scroller.attr('scrollTop'));
                        if(!isNaN(scrollTop))
                            $scroller.scrollTop(scrollTop);
                    }
                }
              
            })
        );
    };

    return this;
}
