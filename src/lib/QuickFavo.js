/**
 * @class QuickFavo
 */
function QuickFavo(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu || !iZhihu.config['QuickFavo']) {
        return null;
    }
    iZhihu.QuickFavo = this;
    
    this.DefaultCount = 4;
    this.PinnedList = iZhihu.config['QuickFavoPinned'];
    this.css = 
        ['.izh-Pin4QuickFavo{float:none;display:block;margin:-31px 0 20px 160px;}'
        ,'.izh-Pin4QuickFavo > span{padding:0 5px;}'
        ,'div.izh_fav{position:absolute;z-index:9999;display:none;border:1px solid #999999;background-color:#fff;border-radius:5px 5px 0 0;margin-left:-1px;}'
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
                      , $v=$a.children('.izh_fav').html([
                            '<div class="title"title="以下为最近选择的收藏夹">快速收藏</div>'
                          //, '<div class="pinned"></div><div class="normal"></div>'
                        ].join(''))
                    ;
                    if(''==sel)return;
                    var favAll=result.msg[0]
                      , favSel=result.msg[1]
                      , num=iZhihu.QuickFavo.DefaultCount
                      , fav=new Array()
                      , favNormal=new Array()
                    ;
                    $.each(favAll,function(i,e){
                        var fID=e[0]
                          , pinned=iZhihu.QuickFavo.PinnedList[fID]
                        ;
                        if(pinned){
                          fav.push(e);
                        }else{
                          favNormal.push(e);
                        }
                    });
                    num -= fav.length;
                    if(num){
                        fav=fav.concat(favNormal.slice(0,num));
                    }
                    favNormal.length=0;
                    while(fav.length){
                        var e=fav.shift()
                          , fID=e[0]
                          , fName=e[1]
                        ;
                        favNormal[fID]=fName;
                        var $f=$('<a/>',{
                                'class':'fav'
                              , href:'javascript:;'
                              , aid:aid
                              , fid:fID
                              , html:fName
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
                            }).prepend($('<i/>',{'class':'z-icon-collect'}))
                              .append($('<span/>',{html:e[3]}));
                        $f.appendTo($v/*.children(pinned?'.pinned':'.normal')*/);
                    };
                    $.each(favSel,function(i,e){
                        if(favNormal[e])
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

    iZhihu.$body.bind('DOMNodeInserted',function(event){
		var $e=$(event.target);
		if($e.is('.modal-dialog')){
			$e.bind('DOMNodeInserted',function(event){
				var $e=$(event.target)
                  , $favList=$e.find('.zm-favo-list-content');
				if($favList.length){
					var $favItems=$favList.children('.zm-favo-list-item-link[data-lid]');
					$favItems.each(function(i,e){
						var $pin=$('<input/>',{
                                type:'checkbox'
                              , title:'保持在「快速收藏」菜单顶部显示'
                            });
						$('<span/>',{
                            'class':'izh-Pin4QuickFavo'
                          , 'lid':e.getAttribute('data-lid')
                          }).append($('<span/>',{html:'置顶'}))
							.append($pin)
    						.insertAfter(e).attr('index',i);
						$pin.click(function(event){
                            var pinned=this.checked
                              , $e=$(this.parentNode)
                              , $f=$e.prev('.zm-favo-list-item-link')
                            ;if(!$f.length)return;
                            var lid=$e.attr('lid')
                              , $checks=$e.closest('.zm-favo-list-content').find('.izh-Pin4QuickFavo .t_jchkbox')
                              , time=50
                              , cssStart={position:'relative','background-color':'#0874C4','z-index':'100'}
                              , cssEnd={position:'','background-color':'','z-index':''}
                              , nextRollUp=function(){
                                    if($t.length&&!$t.hasClass('pinned')){
                                        $e.dequeue('rollUp');
                                    }
                                }
                              , funcRollUp=function(){
                                    var $b=$e.prev()
                                      , $a=$b.prev().prev()
                                    ;
                                    if(!$a.length||($a.hasClass('pinned')&&parseInt($a.attr('data-lid'))<parseInt($b.attr('data-lid')))){
                                        return;
                                    }
                                    $b.animate({bottom:$a.outerHeight()},{
                                        duration:time
                                      , step:function(now){$b.css(cssStart);}
                                      , complete:function(){
                                            $b.css($.extend({bottom:0},cssEnd));
                                            $b.insertBefore($a).after($e);
                                            //nextStep();
                                            funcRollUp();
                                        }
                                    });
                                }
                              , funcRollDown=function(){
                                    var $a=$e.prev()
                                      , $b=$a.next().next()
                                    ;
                                    if(!$b.length||(!$b.hasClass('pinned')&&parseInt($b.attr('index'))>parseInt($a.attr('index')))){
                                        return;
                                    }
                                    $a.animate({top:$b.outerHeight()},{
                                        duration:time
                                      , step:function(now){$a.css(cssStart);}
                                      , complete:function(){
                                            $a.css($.extend({top:0},cssEnd));
                                            $a.insertAfter($b.next()).after($e);
                                            //nextStep();
                                            funcRollDown();
                                        }
                                    });
                                }
                            ;
                            if(pinned){
                                $f.removeClass('pinned')/*.nextAll('.izh-Pin4QuickFavo').each(function(i,e){
                                    var $t=$(e);
                                    if($t.hasClass('pinned')||parseInt($t.attr('index'))<parseInt($e.attr('index'))){
                                        //$f.insertAfter($t).after($e);
                                        funcRollDown();
                                    }else{
                                        return false;
                                    }
                                    return true;
                                })*/;funcRollDown();
                            }else{
                                $f.addClass('pinned')/*.prevAll('.izh-Pin4QuickFavo').each(function(i,e){
                                    var $t=$(e);
                                    if(!$t.hasClass('pinned')){
                                        //$f.insertBefore($t.prev('.zm-favo-list-item-link')).after($e);
                                        funcRollUp();
                                    }else{
                                        return false;
                                    }
                                    return true;
                                })*/;funcRollUp();
                            }
                            iZhihu.QuickFavo.PinnedList[lid]=!pinned;
                            utils.setCfg('QuickFavoPinned',iZhihu.QuickFavo.PinnedList);
						}).checkbox({cls:'t_jchkbox',empty:cbemptyimg});
                        e.setAttribute('index',i);
					});
				}
			});
		}
	});

    return this;
}
