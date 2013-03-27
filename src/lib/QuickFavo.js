/**
 * @class QuickFavo
 */
function QuickFavo(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu) {
        return null;
    }
    iZhihu.QuickFavo = this;
    
    if (!iZhihu.config['QuickFavo']){
        this.on = false;
        this.css = '';
        this.addQuickFavo = function(){};
    } else {
        this.on = true;
        this.css = 
            ['div.izh_fav{padding:5px;display:none;position:absolute;z-index:10;border:1px solid #999999;background-color:#fff}'
            ,'div.izh_fav .title{background-color:#0874c4;color:#fff;font-weight:bold;font-size:15px;text-align:center}'
            ,'div.izh_fav a.fav{display:block;clear:both;float;left;padding:0 32px;line-height:32px}div.izh_fav a.fav.selected{background:url("/static/img/check4.png") no-repeat scroll 0 center transparent}div.izh_fav a.fav:hover{text-decoration:none}'
            ,'div.izh_fav a.fav span{float:right;display:block;margin-right:-32px}'
            ,''].join('\n');
        this.addQuickFavo = function($v,$a){
            if($v.length){
                if($a.children('.izh_fav').length<=0){
                    $('<div class="izh_fav">loading...</div>').bind('mouseover',function(){
                        $(this).show();
                    }).bind('mouseout',function(){
                        $(this).hide();
                    }).appendTo($a);
                }
                $v.bind('mouseenter',function(){
                    var $a=getItem($(this))
                      , $m=$(this).closest('.zm-item-meta')
                      //, mBottom=parseInt($a.css('margin-bottom'))
                      //, pBottom=parseInt($a.css('padding-bottom'))
                    ;
                    $a.children('.izh_fav').css({
                        'bottom':$(this).offsetParent().innerHeight()-$(this).position().top//(isNaN(mBottom)?0:mBottom)+(isNaN(pBottom)?0:pBottom)//$(this).height()+$a.height()-$(this).position().top-1+parseInt($a.css('padding-top'))
                      , 'left':$(this).position().left
                    }).show();
                    $.getJSON('http://www.zhihu.com/collections/json',$.param({answer_id:$a.attr('data-aid')}),function(result,status,xhr){
                        var aid=this.url.substr(this.url.indexOf('answer_id=')+10)
                          , sel=pageIs.Question?'.zm-item-answer'
                               :pageIs.Home?'.feed-item'
                               :''
                          , $a=$(sel+'[data-aid='+aid+']')
                          , $v=$a.children('.izh_fav').html('<div class="title">最近的选择</div>')
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
                            }).appendTo($v).append($('<span/>',{html:e[3]}));
                        });
                        $.each(result.msg[1].slice(0,4),function(i,e){
                            $v.find('a.fav[fid='+e+']').addClass('selected');
                        });
                    });
                });
                $v.bind('mouseleave',function(){
                    var $a=getItem($(this));
                    $a.children('.izh_fav').hide();
                });
            }
        };
    }

    return this;
}
