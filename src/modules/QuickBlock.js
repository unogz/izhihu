/**
 * @class QuickBlock
 */
function QuickBlock(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu || !iZhihu.config['QuickBlock']) {
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
    this.Pending = {Users:',',Count:0};
    this.Blocking = {Users:',',Count:0};
    this.Unfollowed = {Users:',',Count:0};
    this.Refollowed = {Users:',',Count:0};
    this.css = 
        ['.izh_blockCart{background-color:#0771C1;position:fixed;right:0;z-index:9;padding:0 30px 0 60px;border:1px solid #0771C1;border-left-width:10px;border-top-left-radius:6px;}'
        ,'.izh_blockCart .do{color:#fff;text-align:center;display:block;margin:2px;min-width:80px;width:100%;height:20px;}'
        ,'.izh_blockCart.pending .do:after{text-decoration:blink;color:red;}'
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
        ,'.izh_blockCart .list .user2B.unfo .name{background-color:#f00;}'
        ,'.izh_blockCart .user2B .del{display:block;position:absolute;margin-left:-4.5em;}'
        ,'.izh_blockCart .user2B i.say{display:block;position:absolute;margin-left:-44px;border-radius:6px 6px 0 6px;border:1px solid #999;padding:0 5px 0 3px;}'
        ,'.izh_blockCart .user2B i.say_1{display:block;position:absolute;margin-left:-10px;height:6px;background-color:#fff;width:6px;margin-top:17px;border-bottom:1px solid #999;}'
        ,'.izh_blockCart .user2B i.say_2{display:block;position:absolute;margin-left:-9px;height:6px;background-color:#fff;width:6px;margin-top:17px;border-radius:0 0 0 6px;border:1px solid #999;border-width:0 0 1px 1px}'
        ,'.izh-quick-block{position:absolute;text-align:center;width:4em;margin-top:1.5em;white-space:nowrap;}'
        ,'.izh-quick-block [class^=izh-quick-block]{position:absolute;display:block;white-space:nowrap;}'
        ,'.izh-quick-block:after{content:attr(izh_num2B);margin-top:1em;display:block;}'
        ,'.zm-comment-hd .izh-quick-block-pend{position:absolute;left:0;top:40px;}'
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
	this.doUnfollow = function($e){
	    var uid=$e.attr('uid');
	    $.post('http://www.zhihu.com/node/MemberFollowBaseV2'
	      , $.param({
	            method:'unfollow_member'
	          , params:JSON.stringify({'hash_id':uid})
	          , _xsrf:$('input[name=_xsrf]').val()
            })
	      , function(r){
                var query=decodeURIComponent(this.data)
                  , params=utils.getParamInQuery(query,'params')
                ;
                eval('params='+params);console.log(params);
                var bid='fb-'+params.hash_id
                  , who=bid+','
                  , unfollowed=iZhihu.QuickBlock.Unfollowed
                  , refollowed=iZhihu.QuickBlock.Refollowed
                  , $cartDIV=$('#izh_blockCart')
                  , $user=$cartDIV.find('.user2B[uid='+params.hash_id+']')
                  , $list=$user.closest('.list')
                ;
                $user.prependTo($list.next().next());
                if(unfollowed.Users.indexOf(','+who)<0)
                    unfollowed.Users += who;
                if(refollowed.Users.indexOf(','+who)>=0)
                    refollowed.Users = refollowed.replace(','+who,',');
	        }
	      );
	};
    this.doQuickBlock = function($e){
        var blocking = iZhihu.QuickBlock.Blocking
          , href = $e.attr('href')
          , who = href.split('/').pop()+','
        ;
        if(typeof blocking === 'undefined' || !blocking){
            blocking = iZhihu.QuickBlock.Blocking = { Users:',', Count:0 };
        }else if(blocking.Users.indexOf(','+who) >= 0){
            return; // Already blocking
        }
        var $cartDIV=$('#izh_blockCart');
        $cartDIV.addClass('blocking');
        blocking.Users += who;
        blocking.Count ++;
        $.post('http://www.zhihu.com'+href+'/block',$.param({
            action:'add'
          , _xsrf:$('input[name=_xsrf]').val() 
        }),function(r){
            var href=this.url.replace('http://www.zhihu.com','').replace('/block','')
              , userID=href.split('/').pop()
              , who=','+userID+','
              , blocking=iZhihu.QuickBlock.Blocking
            ;

            if(0==--blocking.Count)$cartDIV.removeClass('pending');
    
            if(blocking.Users.indexOf(who) < 0)
                return; // No this user in pending
              
            blocking.Users = blocking.Users.replace(who,',');
            $('#izh_blockCart .user2B[href="'+href+'"]').find('.del')[0].click();
            $('a[href$="'+href+'"]').css('text-decoration','line-through');
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
    this.in2BlockCart = function($e){
        var pending = iZhihu.QuickBlock.Pending
          , href = $e.attr('href')
          , username = href.split('/').pop()
          , who = username+','
        ;
        if( typeof pending === 'undefined' || !pending){
            pending = iZhihu.QuickBlock.Pending = { Users:',', Count:0 };
        }else if(pending.Users.indexOf(','+who) >= 0){
            return; // Already pending
        }

        var $cartDIV=$('#izh_blockCart');
        if(!$cartDIV.length){
            $cartDIV=$('<div id="izh_blockCart"class="izh_blockCart">').css({
                'top':iZhihu.$main.offset().top
            }).append(
                $('<div>',{
                    'class':'do'
                  , 'izh_num2B':0
                  , 'title':'下为「候审」列表\n点击左上角可收起/展开\n数字为人犯总数（红色表示仍有人犯正待入列）'
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
                      , title:'选中后，将我关注之人标出，改以放逐（取消关注）论处'
                      , click:function(){
                          var $cartDIV=$(this.parentNode.parentNode)
                            , $users=$('.frame .list.i_fo .user2B',$cartDIV)
                            , $action=$('.action',this.parentNode);
                          if(this.checked){
                              $users.addClass('unfo');
                              $action.html('放逐').css('padding','0 2em 0 0').attr('title','对列表内我关注之人取消关注');
                          }else{
                              $users.removeClass('unfo');
                              $action.html('收监').css('padding','0 0 0 2em').attr('title','将下列人犯逐一加入黑名单');
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
                      , title:'选中后，将我关注的人标出，准备「取消关注」'
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
                      , title:'将下列人犯逐一加入黑名单'
                      , click:function(){
                          var $cartDIV=$(this.parentNode.parentNode);
                          if($('.unfo',this.parentNode).is(':checked')){
                              $('.list.i_fo .user2B',$cartDIV).each(function(i,e){
                                  iZhihu.QuickBlock.doUnfollow($(e));
                              });
                              //alert($('#izh_blockCart').find('.list.unfo .user2B').length);// Unfo
                          }else{
                              $('.list .user2B',$cartDIV).each(function(i,e){
                                  iZhihu.QuickBlock.doQuickBlock($(e));
                              });
                          }
                      }
                    }).css({
                        'display':'block'
                      , 'float':'right'
                      , 'margin-left':20
                      , 'margin-right':-10
                      , 'padding':'0 0 0 2em'
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
        if($cartDIV.find('.user2B[href="'+href+'"]').length){
            return;
        }

        $cartDIV.addClass('pending');
        pending.Users += who;
        pending.Count ++;

        $.get('http://www.zhihu.com/node/MemberProfileCardV2?'+$.param({params:JSON.stringify({'url_token':username})}),'',function(r){
            var $html=$(r)
              //, user=r.msg[0]
              , $avatarLink=$html.find('.avatar-link:first')
              , userName=$avatarLink.text()//user[0]
              //, userID=user[1]
              , $btnFollow=$html.find('button[data-follow]')
              , hashID=!$btnFollow.length?'':$btnFollow.attr('data-id')//.substr(3)//user[3]
              , f_=$btnFollow.length&&$btnFollow.is('.zg-btn-unfollow')//r.msg[3]
              , _f=$btnFollow.length&&$btnFollow.is('[data-followme=1]')//r.msg[4]
              , cssF=_f||f_?'zg-icon rel ':''
              , $cartDIV=$('#izh_blockCart')
              , $cart=$cartDIV.find('.list')
              , href=$avatarLink.attr('href')//'/people/'+userID
              , userID=href.substr(8)
              , who=','+userID+','
              , pending=iZhihu.QuickBlock.Pending
            ;console.log(userName+':'+f_+':'+_f);

            if(0==--pending.Count)$cartDIV.removeClass('pending');

            if(hashID=='')
                return; // User blocked or you blocked
            if(pending.Users.indexOf(who) < 0)
                return; // No this user in pending
            
            pending.Users = pending.Users.replace(who,',');

            if($cartDIV.find('.list .user2B[href="'+href+'"]').length)
                return; // User already in block list

            var $user2B=$('<div>',{
                	'class':'user2B'+(f_&&$cartDIV.find('.do .unfo:checked').length?' unfo':'')
                  , 'href':href
                  , 'uid':hashID
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
                ).append($('<i>',{
                    'class':'say'
                  , html:'冤枉'
                  , 'data-tip':'p$t$'+userID
                })
                ).append($('<i>',{'class':'say_1'})
                ).append($('<i>',{'class':'say_2'})
                ).append($('<i>',{'class':cssF})
                ).append(
                    $('<a>',{
                        'class':'name'
                      , href:href
                      , html:userName
                      , target:'_blank'
                    })
                ).show()
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
              , $btnQuickBlock=$('<a>',{
                    'class':'izh-quick-block-switch'
                  , html:'快速屏蔽'
                  , href:'javascript:void(0);'
                  , 'data-tip':'s$t$开始从赞同列表中选择屏蔽对象'
                }).css({
                    'position':'absolute'
                  , 'left':width
                  , 'width':'4em'
                }).click(function(){
                    if(this.getAttribute('on')=='1'){
                        $('.zm-item-vote-info input.izh-quick-block-sel',this.parentNode).hide();
                        $(this).attr({'data-tip':'s$t$开始从赞同列表中选择屏蔽对象','on':'0'}).nextAll('.izh-quick-block').hide();
                        //this.setAttribute('on','0');
                    }
                    else{
                        $('.zm-item-vote-info input.izh-quick-block-sel',this.parentNode).show();
                        $(this).attr({'data-tip':'s$t$结束从赞同列表中选择屏蔽对象','on':'1'}).nextAll('.izh-quick-block').show();
                        //this.setAttribute('on','1');
                    }
                }).insertBefore($vi)
              , $quickBlock=$('<div>',{'class':'izh-quick-block','izh_num2B':'0'}).css({'left':width}).insertBefore($vi).hide()
            ;
            $('<a>',{
                'class':'izh-quick-block-pend'
              , href:'javascript:void(0);'
              , html:'候审'
              , 'data-tip':'s$b$将所选之人列入候审名单以待收监<br/>包括答主'
            }).css({//$.extend(css_QuickBlock,{
                'margin-top':'1em'
              , 'font-size':'200%'
              , 'width':'2em'
            }).click(function(){
                var $pend=$(this)
                  , $quickBlock=$pend.closest('.izh-quick-block')
                  , $users2B=$('.zm-item-vote-info input.izh-quick-block-sel:checked',$quickBlock.parent())
                  , $a=$quickBlock.parent()
                  , $t=null
                ;
                if($a.is('.zm-item-answer-detail')){
                    $t=$a.children('.zm-item-rich-text').find('.zm-item-answer-author-info:first')
                }else if($a.is('.answer-head')){
                    $t=$a.parent('.zm-item-answer').children('.zm-item-answer-author-info')
                }
                if($t&&$t.length){
                    iZhihu.QuickBlock.in2BlockCart($t.children('.zm-item-answer-author-wrap').children('a:first'));
                }
                $users2B.each(function(i,e){
                    iZhihu.QuickBlock.in2BlockCart($(e).next());
                });
            }).prependTo($quickBlock);
            $('<a>',{
                'class':'izh-quick-block-selAll'
              , html:'无'
              , href:'javascript:void(0);'
              , 'data-tip':'s$r$无一选中'
            }).css({
                'margin-left':'3em'
            }).click(function(){
                var $quickBlock=$(this).closest('.izh-quick-block')
                  , $users=$('.zm-item-vote-info input.izh-quick-block-sel',$quickBlock.parent());
                $users.removeAttr('checked');
                $quickBlock.attr('izh_num2B',0);
            }).prependTo($quickBlock);
            $('<a>',{
                'class':'izh-quick-block-notAll'
              , html:'全'
              , href:'javascript:void(0);'
              , 'data-tip':'s$l$全部选中'
            }).css({
            }).click(function(){
                var $quickBlock=$(this).closest('.izh-quick-block')
                , $users=$('.zm-item-vote-info input.izh-quick-block-sel',$quickBlock.parent());
                $users.attr('checked','checked');
              	$quickBlock.attr('izh_num2B',$users.length);
            }).prependTo($quickBlock);
        }
    };
    this.addQuickBlockInOneComment = function($cmItem){
        var $where=$('.zm-comment-hd',$cmItem);
        if($where.find('.izh-quick-block-pend').length)return;
        $('<a>',{
            'class':'izh-quick-block-pend izh-button'
          , html:'候审'
          , href:'javascript:void(0);'
          , 'data-tip':'s$l$将此人列入候审名单以待收监'
        }).click(function(){
            iZhihu.QuickBlock.in2BlockCart($(this).next());
        }).prependTo($where).hide();
    };
    this.addQuickBlockInCommentList = function($where){
        // Region: 快速屏蔽
        var $cm=$where.is('.zm-comment-box')?$where:$where.closest('.zm-comment-box')
          , $u=$('.zm-item-comment',$cm)
        ;
        $u.each(function(i,e){
            iZhihu.QuickBlock.addQuickBlockInOneComment($(e));
        });
        var $btnQuickBlock=$('<a>',{
                'class':'izh-quick-block-switch izh-button'
              , html:'快速屏蔽'
              , href:'javascript:void(0);'
              , 'data-tip':'s$t$开始从评论者中选择屏蔽对象'
            }).css({'margin-left':7}).prependTo($where).click(function(){
                if(this.getAttribute('on')=='1'){
                    $('.zm-comment-hd .izh-quick-block-pend').hide();
                    $(this).attr({'data-tip':'s$t$开始从评论者中选择屏蔽对象','on':'0'}).removeClass('on');
                }
                else{
                    $('.zm-comment-hd .izh-quick-block-pend').show();
                    $(this).attr({'data-tip':'s$t$结束从评论者中选择屏蔽对象','on':'1'}).addClass('on');
                }
            })
        ;
        if($cm.is('.empty')){
            $btnQuickBlock.hide();
        }
        // Region end
    };
    
    iZhihu.$body.bind('DOMNodeInserted',function(event){
        $(event.target).filter('#zh-tooltip').bind('DOMNodeInserted',function(event){
            var $a=$(event.target).filter('#zh-tooltip-people').find('a[name=focus]')
              , bid=$a.attr('id')
              , who=','+bid+','
            ;
            if($a.is('.zg-btn-unfollow')&&iZhihu.QuickBlock.Unfollowed.Users.indexOf(who)>=0){
                $a.html('关注').removeClass('zg-btn-unfollow').addClass('zg-btn-follow');
            }
            if($a.is('.zg-btn-follow')&&iZhihu.QuickBlock.Refollowed.Users.indexOf(who)>=0){
                $a.html('取消关注').removeClass('zg-btn-follow').addClass('zg-btn-unfollow');
            }
        });
    });
    return this;
}
