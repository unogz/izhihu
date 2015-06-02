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
    this.Users2B = []
    this.Users2BBQ = []
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
        $('.blocked-users > .item-card').each(function(i,e){
            var uid=$(e).attr('data-id');
            $.post('http://www.zhihu.com/settings/unblockuser',$.param({
                _xsrf:$('input[name=_xsrf]').val()
              , uid:uid
            }),function(r){console.log(r);});
        });
	  };
	  this.doUnfollow = function(){
        var $e = iZhihu.QuickBlock.Users2BBQ.shift()
        if(typeof $e === 'undefined') return

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
                  eval('params='+params);
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
        ).always(function(data, textStatus, jqXHR){
            iZhihu.QuickBlock.doUnfollow()
        });
	  };
    this.doQuickBlock = function(){
        var $e = iZhihu.QuickBlock.Users2BBQ.shift()
        if(typeof $e === 'undefined') return

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
        }).always(function(data, textStatus, jqXHR){
            iZhihu.QuickBlock.doQuickBlock()
        });
  	};
    this.resizeBlockCart = function($cartDIV){
        function parseCssPx($item, name) {
            var m = $item.css(name);
            if (m != 'undefined') {
                return parseInt(m.replace('px',''));
            }
            return 0;
        }
        var $userDIV = $cartDIV.find('.list .user2B');
        var $titleBox = $('#izh_blockCart .do');
        var h = parseCssPx($cartDIV.find('div.frame'),'paddingTop') 
                + ($userDIV.height() + parseCssPx($userDIV,'marginTop')) * $userDIV.length 
                + $titleBox.height()
                + parseCssPx($titleBox, 'marginTop')
                + parseCssPx($titleBox, 'marginBottom');
        
        if(h+iZhihu.$main.offset().top<iZhihu.$win.height()){
            $cartDIV.css({'height':h,'bottom':''});
        }else{
            $cartDIV.css({'height':'','bottom':0});
        }
    };
    this.getCartDIV=function(){
        var $cartDIV=$('#izh_blockCart');
        if(!$cartDIV.length){
            $cartDIV=$('<div>', { id: 'izh_blockCart', 'class': 'izh_blockCart' }).css({
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
                      , title:'清空「候审」列表'
                      , click:function(){
                          var $cartDIV=$('#izh_blockCart');
                          $cartDIV.css('bottom','').find('.list').empty();
                          $(this.parentNode).attr('izh_num2B','0');
                          $cartDIV.css('height','');
                        }
                    }).text('大赦').css({
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
                              $action.text('放逐').css('padding','0 2em 0 0').attr('title','对列表内我关注之人取消关注');
                          }else{
                              $users.removeClass('unfo');
                              $action.text('收监').css('padding','0 0 0 2em').attr('title','将下列人犯逐一加入黑名单');
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
                      , title:'选中后，将我关注的人标出，准备「取消关注」'
                    }).text('从轻').css({
                        'display':'block'
                      , 'float':'left'
                      , 'margin-right':20
                    })
                ).append(
                    $('<a>',{
                        'class':'button action'
                      , href:'javascript:void(0);'
                      , title:'将下列人犯逐一加入黑名单'
                      , click:function(){
                            var $cartDIV=$(this.parentNode.parentNode);
                            if($('.unfo',this.parentNode).is(':checked')){
                                $('.list.i_fo .user2B',$cartDIV).each(function(i,e){
                                    iZhihu.QuickBlock.Users2BBQ.push($(e))
                                });
                                iZhihu.QuickBlock.doUnfollow();
                            }else{
                                $('.list .user2B',$cartDIV).each(function(i,e){
                                    iZhihu.QuickBlock.Users2BBQ.push($(e))
                                });
                                iZhihu.QuickBlock.doQuickBlock();
                            }
                        }
                    }).text('收监').css({
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

        return $cartDIV
    }
    this.in2BlockCart = function(url){
        var $e = iZhihu.QuickBlock.Users2B.shift()
          , $cartDIV = iZhihu.QuickBlock.getCartDIV()

        $cartDIV.addClass('pending');

        if (typeof $e === 'undefined' || !$e || $e.length === 0){
            if((url||'')==''){
                $cartDIV.removeClass('pending')
                return
            }
            $.ajax(url,{
                type:'GET'
              , maxRetryCount: 3
              , retriedCount: 0
            }).done(function(data, textStatus, jqXHR){
                $.each(data.payload,function(i,e){
                    iZhihu.QuickBlock.addUser2B(e)
                })
                iZhihu.QuickBlock.in2BlockCart(data.paging.next)
            }).fail(function(data,textStatus,jXHR){
                if (++this.retriedCount < this.maxRetryCount){
                    iZhihu.QuickBlock.in2BlockCart(url)
                }else{
                }
            })
        }

        var href = $e.attr('href')
          , username = href.split('/').pop()
          , who = username+','
        ;

        if($cartDIV.find('.user2B[href="'+href+'"]').length){
            return;
        }

        $.ajax('http://www.zhihu.com/node/MemberProfileCardV2?'+$.param({params:JSON.stringify({'url_token':username})}), {
            type: 'GET'
          , user2B: $e
          , maxRetryCount: 3
          , retriedCount: 0
        }).done(function(data, textStatus, jqXHR){
            iZhihu.QuickBlock.addUser2B(data)
            iZhihu.QuickBlock.in2BlockCart(url)
        }).fail(function(data,textStatus,jXHR){
            if (++this.retriedCount < this.maxRetryCount){
                iZhihu.QuickBlock.Users2B.unshift(this.user2B)
            }else{
            }
        }).always(function(data,textStatus,jXHR){
            $('#izh_blockCart').removeClass('pending');
            //iZhihu.QuickBlock.in2BlockCart(url)
        });
    };
    this.addUser2B=function(data){
        if (data === '') return
        var $html=$(data.replace(utils.RegexSrcPic, ''))
          , isZHPC=$html.is('.zh-profile-card')
          , $avatarLink=isZHPC?$html.find('.avatar-link:first'):$html.find('.zm-item-link-avatar:first')
          , href=$avatarLink.attr('href')
        if((href||'')=='')return

        var userID=href.substr(8)
          , userName=isZHPC?$avatarLink.text():$avatarLink.attr('title')
          , $btnFollow=$html.find('button[data-follow]')
          , hashID=!$btnFollow.length?'':$btnFollow.attr('data-id')
          , f_=$btnFollow.length&&$btnFollow.is('.zg-btn-unfollow')
          , _f=$btnFollow.length&&$btnFollow.is('[data-followme=1]')
          , cssF=_f||f_?'zg-icon rel ':''
          , $cartDIV=iZhihu.QuickBlock.getCartDIV()
          , $cart=$cartDIV.find('.list')
          , who=','+userID+','
        ;

        if(hashID==''){
            return; // User blocked or you blocked
        }
        
        if($cartDIV.find('.list .user2B[href="'+href+'"]').length){
            return; // User already in block list
        }

        var $user2B=$('<div>',{
                'class':'user2B'+(f_&&$cartDIV.find('.do .unfo:checked').length?' unfo':'')
              , 'href':href
              , 'uid':hashID
            })
            .append(
                $('<a>',{
                    'class':'button del'
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
                }).text('赦')
            ).append(
                $('<i>',{
                    'class':'say'
                  , 'data-tip':'p$t$'+userID
                }).text('冤枉')
            ).append($('<i>',{'class':'say_1'})
            ).append($('<i>',{'class':'say_2'})
            ).append($('<i>',{'class':cssF})
            ).append(
                $('<a>',{
                    'class':'name'
                  , href:href
                  , target:'_blank'
                }).text(userName)
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
        $cartDIV.children('.do').attr('izh_num2B',num2B==0?'0':num2B>9999?'10k+':num2B);
        iZhihu.QuickBlock.resizeBlockCart($cartDIV);
    }
    this.addQuickBlock = function($a){
        var $voteInfo=$('.zm-item-vote-info',$a)
        if($voteInfo.length){
            var $voters=$voteInfo.children('.voters')
            if($voters.length){
                var s=['，',$voteInfo.attr('data-votecount'),'个也不能忍，果断撕'].join('')
                  , aid=$a.attr('data-aid')||$a.children('[itemprop="ZReactor"]').attr('data-id')
                  , url=['http://www.zhihu.com/',$a.attr('data-type')=='p'?'post':'answer','/',aid,'/voters_profile'].join('')
                $('<a>',{href:'javascript:;'}).text(s).bind('click',function(event){
                    var $t=$a.find('.author-info > a.name,.zm-item-answer-author-info > .zm-item-answer-author-wrap > a:first')
                    if($t&&$t.length){
                        iZhihu.QuickBlock.Users2B.push($t)
                    }
                    iZhihu.QuickBlock.in2BlockCart(url)
                }).appendTo($voteInfo)
            }
        }
    };
    this.addQuickBlockInOneComment = function($cmItem){
        var $where=$('.zm-comment-hd',$cmItem);
        if($where.find('.izh-quick-block-pend').length)return;
        $('<a>',{
            'class':'izh-quick-block-pend izh-button'
          , href:'javascript:void(0);'
          , 'data-tip':'s$l$将此人列入候审名单以待收监'
        }).text('候审').click(function(){
            var $e = $(this).next()
            iZhihu.QuickBlock.Users2B.push($e)
            iZhihu.QuickBlock.in2BlockCart();
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
              , href:'javascript:void(0);'
              , 'data-tip':'s$t$开始从评论者中选择屏蔽对象'
            }).text('快速屏蔽').css({'margin-left':7}).prependTo($where).click(function(){
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
                $a.text('关注').removeClass('zg-btn-unfollow').addClass('zg-btn-follow');
            }
            if($a.is('.zg-btn-follow')&&iZhihu.QuickBlock.Refollowed.Users.indexOf(who)>=0){
                $a.text('取消关注').removeClass('zg-btn-follow').addClass('zg-btn-unfollow');
            }
        });
    });
    return this;
}
