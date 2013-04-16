/**
 * @class QuickFavo
 */
function QuickFavo(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu || !iZhihu.config['QuickFavo']) {
        return null;
    }
    iZhihu.QuickFavo = this;
    
    this.css = 
        ['div.izh_fav{position:absolute;z-index:9999;display:none;border:1px solid #999999;background-color:#fff;border-radius:5px 5px 0 0;margin-left:-1px;}'
        ,'div.izh_fav .title{padding:0 5px;background-color:#0874c4;color:#fff;font-weight:bold;font-size:15px;text-align:center;border-radius:3px 3px 0 0;}'
        ,'div.izh_fav a.fav{display:block;clear:both;float;left;padding:0 36px 0 24px;line-height:2;}'
        ,'div.izh_fav a.fav i.z-icon-collect{visibility:hidden;background-position:-56px -36px;position:absolute;left:10px;margin-top:0.5em;}'
        ,'div.izh_fav a.fav.selected i.z-icon-collect{visibility:visible;}'
        ,'div.izh_fav a.fav:hover{text-decoration:none}'
        ,'div.izh_fav a.fav span{float:right;display:block;margin-right:-32px}'
        ,'.meta-item.on{position:relative;z-index:10000;background-color:#fff;border:1px solid #999999;border-top-color:#fff;margin:-1px -8px -1px -1px;padding:0 7px;border-radius:2px 2px 3px 3px;}'
        ,''].join('\n');
    this.addQuickFavo = function($v,$a){
        if($v.length){
            if($a.children('.izh_fav').length<=0){
                $('<div class="izh_fav">loading...</div>').bind('mouseover',function(){
                    $(this).show().parent().find('.meta-item[name=favo]').addClass('on');
                }).bind('mouseout',function(){
                    $(this).hide().parent().find('.meta-item[name=favo]').removeClass('on');
                }).appendTo($a);
            }
            $v.bind('mouseenter',function(){
                var $a=getItem($(this))
                  , $m=$(this).addClass('on').closest('.zm-item-meta')
                  //, mBottom=parseInt($a.css('margin-bottom'))
                  //, pBottom=parseInt($a.css('padding-bottom'))
                  , aid=$a.attr('data-aid')
                ;
                $a.children('.izh_fav').css({
                    'bottom':$(this).offsetParent().innerHeight()-$(this).position().top
                  , 'left':$(this).position().left
                }).show();
                $.getJSON('http://www.zhihu.com/collections/json',$.param({answer_id:aid}),function(result,status,xhr){
                    var aid=this.url.substr(this.url.indexOf('answer_id=')+10)
                      , sel=pageIs.Question?'.zm-item-answer'
                           :pageIs.Home?'.feed-item'
                           :pageIs.Answer?'.zm-item-answer'
                           :''
                      , $a=$(sel+'[data-aid='+aid+']')
                      , $v=$a.children('.izh_fav').html('<div class="title"title="以下为最近选择的收藏夹">快速收藏</div>')
                    ;
                    if(''==sel)return;
                    $.each(result.msg[0].slice(0,4),function(i,e){
                        $('<a/>',{
                            'class':'fav'
                          , href:'javascript:;'
                          , aid:aid
                          , fid:e[0]
                          , html:e[1]
                        }).click(function(){
                            var u='http://www.zhihu.com/collection/';
                            u+=$(this).hasClass('selected')?'remove':'add';
                            $.post(u,$.param({_xsrf:$('input[name=_xsrf]').val(),answer_id:$(this).attr('aid'),favlist_id:$(this).attr('fid')}),function(result){
                                var act=this.url.substring(this.url.lastIndexOf('/')+1)
                                  , fid=utils.getParamInQuery(this.data,'favlist_id')
                                  , aid=utils.getParamInQuery(this.data,'answer_id')
                                  , sel=pageIs.Question?'.zm-item-answer'
                                       :pageIs.Home?'.feed-item'
                                       :''
                                  , $vi=''==sel?null:$(sel+'[data-aid='+aid+'] .izh_fav a[fid='+fid+']')
                                  , inc=0;
                                if(''==sel)return;
                                if(act=='remove'&&result.msg=='OK'){
                                    $vi.removeClass('selected');
                                    inc=-1;
                                }else if(act=='add'&&result.msg.length){
                                    $vi.addClass('selected');
                                    inc=1;
                                }
                                if(inc!=0){
                                    $vi.children('span').html(parseInt($vi.children('span').html())+inc);
                                }
                            });
                        }).appendTo($v)
                          .prepend($('<i/>',{'class':'z-icon-collect'}))
                          .append($('<span/>',{html:e[3]}));
                    });
                    $.each(result.msg[1].slice(0,4),function(i,e){
                        $v.find('a.fav[fid='+e+']').addClass('selected');
                    });
                });
            });
            $v.bind('mouseleave',function(){
                var $a=getItem($(this).removeClass('on'));
                $a.children('.izh_fav').hide();
            });
        }
    };

    return this;
}
