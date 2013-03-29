/**
 * @class QuickBlock
 */
function QuickBlock(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu) {
        return null;
    }
    iZhihu.QuickBlock = this;
    
/*
    var css_QuickBlock = {
            'background-position':'-146px -202px'
          , 'width':16
          , 'height':16
      	}
    ;
*/
    this.on = iZhihu.config['QuickBlock'];
    if (!this.on){
        this.css = '';
        this.unblockAll = function(){};
        this.doQuickBlock = function(){};
        this.resizeBlockCart = function(){};
        this.in2BlockCart = function(){};
        this.addQuickBlock = function(){};
    } else {
        this.css = 
            ['.izh_blockCart{background-color:#0771C1;position:fixed;right:0;z-index:9;padding:0 30px 0 60px;border:1px solid #0771C1;border-left-width:10px;border-top-left-radius:6px;}'
            ,'.izh_blockCart .do{color:#fff;text-align:center;display:block;margin:2px;min-width:80px;width:100%;height:20px;}'
            ,'.izh_blockCart.doing .do:after{text-decoration:blink;color:red;}'
            ,'.izh_blockCart .do:after{position:relative;content:attr(izh_num2B);}'
            ,'.izh_blockCart .do .button{color:#fff;}'
            ,'.izh_blockCart .frame{overflow-y:auto;overflow-x:hidden;position:absolute;top:25px;bottom:0;left:0;right:0;background-color:#fff;padding-top:5px;}'
            ,'.izh_blockCart .list{display:block;margin:2px;width:100%;padding-right:5px;}'
            ,'.izh_blockCart .list .rel{border-width:0 2px;border-style:solid;border-color:#fff;width:24px;height:18px;}'
            ,'.izh_blockCart .list.i_fo .rel{border-left-color:#259;background-position:-120px -184px;}'
            ,'.izh_blockCart .list.fo_i .rel{border-right-color:#259;background-position:-120px -164px;}'
            ,'.izh_blockCart .list.i_fo.fo_i .rel{background-position:-78px -200px;}'
            ,'.izh_blockCart .user2B{display:block;margin:2px 0;padding:0 40px 0 60px;}'
            ,'.izh_blockCart .user2B i.zg-icon{display:block;position:absolute;right:0;margin-top:5px;}'
            ,'.izh_blockCart .user2B .name{display:block;color:#fff;background-color:#000;white-space:nowrap;padding:2px 5px;border-radius:3px;}'
            ,'.izh_blockCart .list.unfo .user2B .name{background-color:#f00;}'
            ,'.izh_blockCart .user2B .del{display:block;position:absolute;margin-left:-4.5em;}'
            ,'.izh_blockCart .user2B i.say{display:block;position:absolute;margin-left:-44px;border-radius:6px 6px 0 6px;border:1px solid #999;padding:0 5px 0 3px;}'
            ,'.izh_blockCart .user2B i.say_1{display:block;position:absolute;margin-left:-10px;height:6px;background-color:#fff;width:6px;margin-top:17px;border-bottom:1px solid #999;}'
            ,'.izh_blockCart .user2B i.say_2{display:block;position:absolute;margin-left:-9px;height:6px;background-color:#fff;width:6px;margin-top:17px;border-radius:0 0 0 6px;border:1px solid #999;border-width:0 0 1px 1px}'
            ,'.izh-quick-block{position:absolute;text-align:center;width:4em;margin-top:1.5em;}'
            ,'.izh-quick-block [class^=izh-quick-block]{position:absolute;display:block;}'
            ,'.izh-quick-block:after{content:attr(izh_num2B);margin-top:1em;display:block;}'
            ,'.izh-quick-block.doing:after{text-decoration:blink;}'
            ,''
            ].join('\n');
        this.unblockAll = function(){
            $('.zg-btn-unfollow').each(function(i,e){
                var uid=$(e).attr('id').slice(4);
                $.post('http://www.zhihu.com/settings/unblockuser',$.param({
                    _xsrf:$('input[name=_xsrf]').val()
                  , uid:uid
                }),function(r){console.log(r);});
            });
    	};
        this.doQuickBlock = function($e){
            $.post('http://www.zhihu.com'+$e.attr('href')+'/block',$.param({
                action:'add'
              , _xsrf:$('input[name=_xsrf]').val() 
            }),function(r){
                var u=this.url.replace(/http:\/\/www.zhihu.com/g,'').replace(/\/block/g,'');
                $('#izh_blockCart .user2B[href="'+u+'"]').find('.del')[0].click();
                $('a[href="'+u+'"]').css('text-decoration','line-through');
            });
      	};
      	this.resizeBlockCart = function($cartDIV){
            var $temp=$cartDIV.clone().attr('id','').css({'height':'','position':'absolute','bottom':'','z-index':'-1'}).appendTo(iZhihu.$body).show();
            $temp.find('.frame').css({'position':'static','top':'','bottom':'','left':'','right':'','overflow':''});
            var h=$temp.height();
            $temp.remove();
            $temp=null;
            if(h+iZhihu.$main.offset().top<iZhihu.$win.height()){
                $cartDIV.css({'height':h,'bottom':''});
            }else{
            	$cartDIV.css({'height':'','bottom':0});
            }
        };
        this.in2BlockCart = function($e,$doing){
            var $cartDIV=$('#izh_blockCart').addClass('doing')
              , href=$e.attr('href')
            ;
            if($cartDIV.find('.user2B[user="'+href+'"]').length){
                var doing2B=parseInt($doing.attr('izh_doing2B'));
                if(!isNaN(doing2B)){
                	$doing.attr('izh_doing2B',--doing2B);
                    if(!doing2B)$cartDIV.removeClass('doing');
                }
                return;
            }
            if(!$cartDIV.length){
                $cartDIV=$('<div id="izh_blockCart"class="izh_blockCart">').css({
                    'top':iZhihu.$main.offset().top
                }).append(
                    $('<div>',{
                        'class':'do'
                      , 'izh_num2B':0
                    }).append(
                        $('<a>',{
                            'class':'button delAll'
                          , href:'javascript:void(0);'
                          , html:'大赦'
                          , title:'清空「候审」列表'
                          , click:function(){
                              var $cartDIV=$('#izh_blockCart');
                              $cartDIV.css('bottom','').find('.list').empty();
                              $(this.parentNode).attr('izh_num2B','0');
                              $cartDIV.css('height','');
                          }
                        }).css({
                            'display':'block'
                          , 'position':'absolute'
                          , 'left':24
                        })
                    ).append(
                        $('<input>',{
                            'class':'unfo'
                          , href:'javascript:void(0);'
                          , type:'checkbox'
                          , title:'选中后，将我关注的人标出，准备「取消关注」'
                          , click:function(){
                              $('.action',this.parentNode).html(this.checked?'放逐':'收监');
                              var $cartDIV=$(this.parentNode.parentNode)
                                , ll=$('.frame .list.i_fo',$cartDIV);
                              if(this.checked){
                                  ll.addClass('unfo');
                              }else{
                                  ll.removeClass('unfo');
                              }
                          }
                        }).css({
                            'display':'block'
                          , 'float':'left'
                          , 'height':22
                          , 'line-height':22
                        })
                    ).append(
                        $('<span>',{
                            'class':''
                          , href:'javascript:void(0);'
                          , html:'从轻'
                        }).css({
                            'display':'block'
                          , 'float':'left'
                          , 'margin-right':20
                        })
                    ).append(
                        $('<a>',{
                            'class':'button action'
                          , href:'javascript:void(0);'
                          , html:'收监'
                          , title:'收监：将列表内所有人加入黑名单；放逐：对我关注的人取消关注'
                          , click:function(){
                              if($('.unfo',this.parentNode).is(':checked')){
                                  alert($('#izh_blockCart').find('.list.unfo .user2B').length);// Unfo
                              }else{return;
                                  $('#izh_blockCart').find('.user2B').each(function(i,e){
                                      iZhihu.QuickBlock.doQuickBlock($(e));
                                  });
                              }
                          }
                        }).css({
                            'display':'block'
                          , 'float':'right'
                          , 'margin-left':20
                          , 'margin-right':-10
                        })
                    ).append(
                        $('<a>',{
                            'class':'zg-icon zg-icon-double-arrow'
                          , href:'javascript:void(0);'
                          , click:function(){
                              var $cartDIV=$('#izh_blockCart');
                              if($cartDIV.attr('mini')!='1'){
                            	  $cartDIV.find('.frame').hide();
                            	  $cartDIV.css({'height':'','bottom':''});
                            	  $cartDIV.attr('mini','1');
                              }else{
                            	  $cartDIV.find('.frame').show();
                            	  iZhihu.QuickBlock.resizeBlockCart($cartDIV);
                            	  $cartDIV.attr('mini','0');
                              }
                          }
                        }).css({
                            'position':'absolute'
                          , 'left':0
                          , 'top':5
                        })
                    )
                ).append(
                    $('<div>',{'class':'frame'}
                    ).append(
                        $('<div>',{
                            'class':'list i_fo fo_i'
                        })
                    ).append(
                        $('<div>',{
                            'class':'list i_fo'
                        })
                    ).append(
                        $('<div>',{
                            'class':'list fo_i'
                        })
                    ).append(
                        $('<div>',{
                            'class':'list'
                        })
                    )
                ).appendTo(iZhihu.$body);
            }
            $.get('http://www.zhihu.com'+href+'/json','',function(r){
                var user=r.msg[0]
                  , userName=user[0]
                  , userID=user[1]
                  , f_=r.msg[3]
                  , _f=r.msg[4]
                  , cssF=_f||f_?'zg-icon rel ':''
                  , $cartDIV=$('#izh_blockCart')
                  , $cart=$cartDIV.find('.list')
                  , href='/people/'+userID
                  , $blockParent=$('.izh-quick-block:visible').has('.izh-quick-block-do[izh_doing2B!="0"]') // Current block doing
                        .parent().has('.zm-item-vote-info li a[href="'+href+'"]') // & Current user included
                  , $doing=$blockParent.find('.izh-quick-block-do')
                ;console.log(userName+':'+f_+':'+_f);
                var doing2B=parseInt($doing.attr('izh_doing2B'));
                if(!isNaN(doing2B)){
                	$doing.attr('izh_doing2B',--doing2B);
                    if(!doing2B)$cartDIV.removeClass('doing');
                }
                if($cartDIV.find('.list .user2B[user="'+href+'"]').length)
                    return; // User already in block list
                var $user2B=$('<div>',{
                    	'class':'user2B'
                      , 'href':'/people/'+userID
                    })
                    .append(
                        $('<a>',{
                            'class':'button del'
                          , html:'赦'
                          , href:'javascript:void(0);'
                          , click:function(){
                              	var $user=$(this).closest('.user2B')
                              	  , $cartDIV=$('#izh_blockCart')
                              	;
                                $user.remove();
                                var num2B=$cartDIV.find('.list .user2B').length;
                                $cartDIV.children('.do').attr('izh_num2B',num2B==0?'0':num2B>999?'1k+':num2B);
                                if(num2B)
                                    iZhihu.QuickBlock.resizeBlockCart($cartDIV);
                                else
                                    $cartDIV.css('height','');
                            }
                        })
                    )
                    .append($('<i>',{'class':'say',html:'冤枉'}))
                    .append($('<i>',{'class':'say_1'}))
                    .append($('<i>',{'class':'say_2'}))
                	.append($('<i>',{'class':cssF}).show())
                	.append(
                        $('<span>',{
                            'class':'name'
                          , html:userName
                        })
                    )
                ;
                if(f_&&_f){
                    $cart.eq(0).append($user2B);
                }else if(f_){
                    $cart.eq(1).append($user2B);
                }else if(_f){
                    $cart.eq(2).append($user2B);
                }else{
                    $cart.eq(3).append($user2B);
                }
                var num2B=$cartDIV.find('.list .user2B').length;
                $cartDIV.children('.do').attr('izh_num2B',num2B==0?'0':num2B>999?'1k+':num2B);
                iZhihu.QuickBlock.resizeBlockCart($cartDIV);
            });
        };
        this.addQuickBlock = function($vi,quickBlock){
            if($vi.is('.zm-item-vote-info') && !$vi.children('a[name=more]').length){
                if($vi.attr('izh-QuickBlock')!='1'){
                    var $u=$('.voters a[href^="/people/"]',$vi);
                    $u.each(function(i,e){
                        $('<input>',{'class':'izh-quick-block-sel',type:'checkbox'}).css({
                        }).insertBefore(e).hide().click(function(){
                            var $vi=$(this).closest('.zm-item-vote-info')
                              , $quickBlock=$vi.parent().find('.izh-quick-block')
                              , $users=$('input.izh-quick-block-sel:checked',$vi)
                            ;
                          	$quickBlock.attr('izh_num2B',$users.length);
                        });
                    });
                    $vi.attr('izh-QuickBlock','1');
                }
                if($vi.parent().children('a.izh-quick-block-switch').length)
                    return;
                var width=$vi.closest('[data-aid]').width()
                  , $btnQuickBlock=$('<a>',{'class':'izh-quick-block-switch',html:'快速屏蔽',href:'javascript:void(0);'}).css({
                        'position':'absolute'
                      , 'left':width
                      , 'width':'4em'
                    }).click(function(){
                        if(this.getAttribute('on')=='1'){
                            $('.zm-item-vote-info input.izh-quick-block-sel',this.parentNode).hide();
                            $(this).nextAll('.izh-quick-block').hide();
                            this.setAttribute('on','0');
                        }
                        else{
                            $('.zm-item-vote-info input.izh-quick-block-sel',this.parentNode).show();
                            $(this).nextAll('.izh-quick-block').show();
                            this.setAttribute('on','1');
                        }
                    }).insertBefore($vi)
                  , $quickBlock=$('<div>',{'class':'izh-quick-block','izh_num2B':'0'}).css({'left':width}).insertBefore($vi).hide()
                ;
                $('<a>',{'class':'izh-quick-block-do','izh_doing2B':'0',href:'javascript:void(0);',html:'候审'})
                  .css({//$.extend(css_QuickBlock,{
                      'margin-top':'1em'
                    , 'font-size':'200%'
                    , 'width':'2em'
                  }).click(function(){
                      if($('.izh-quick-block .izh-quick-block-do[izh_doing2B!="0"]').length)
                          return; // NA when other block doing
                      var $doing=$(this)
                        , doing2B=parseInt($doing.attr('izh_doing2B'))
                        , $quickBlock=$doing.closest('.izh-quick-block')
                        , $users2B=$('.zm-item-vote-info input.izh-quick-block-sel:checked',$quickBlock.parent())
                      ;
                      $doing.attr('izh_doing2B',$users2B.length);
                      $users2B.each(function(i,e){
                          iZhihu.QuickBlock.in2BlockCart($(e).next(),$doing);
                      });
                  }).prependTo($quickBlock);
                $('<a>',{'class':'izh-quick-block-selAll',html:'无',href:'javascript:void(0);'}).css({
                    'margin-left':'3em'
                }).click(function(){
                    var $quickBlock=$(this).closest('.izh-quick-block')
                      , $users=$('.zm-item-vote-info input.izh-quick-block-sel',$quickBlock.parent());
                    $users.removeAttr('checked');
                    $quickBlock.attr('izh_num2B',0);
                }).prependTo($quickBlock);
                $('<a>',{'class':'izh-quick-block-notAll',html:'全',href:'javascript:void(0);'}).css({
                }).click(function(){
                    var $quickBlock=$(this).closest('.izh-quick-block')
                    , $users=$('.zm-item-vote-info input.izh-quick-block-sel',$quickBlock.parent());
                    $users.attr('checked','checked');
                  	$quickBlock.attr('izh_num2B',$users.length);
                }).prependTo($quickBlock);
            }
        };
    }
    
    return this;
}
