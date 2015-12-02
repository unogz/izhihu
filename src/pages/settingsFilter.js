/*
 * 设置-屏蔽
 */
if (pageIs.SettingsFilter){
    var all=[]
      , $secBlockedUsers = $('#section-blocked-users')
      , $secBlockedUsersTitle = $secBlockedUsers.children('.settings-section-title:first').children('h2:first')
      , $pnlUnBlockedUsers = $('<div>').appendTo($secBlockedUsersTitle).css({
            float: 'right'
        })
      , $lbFilterBlockedUsers = $('<label/>').appendTo($pnlUnBlockedUsers).css({
            float: 'left'
        })
      , $tbFilterBlockedUsers = $('<input/>', {
            'class': 'zg-form-text-input zg-mr15'
          , placeholder: '用户名或昵称'
        }).appendTo($pnlUnBlockedUsers).on('keyup', function(event){
            var kw=this.value
              , n=0
              , $listBlockedUsers=$secBlockedUsers.find('.blocked-users > .item > .body > a').each(function(i,e){
                    var $a = $(e)
                      , href = e.getAttribute('href') || ''
                      , text = e.innerHTML
                      , notMatch = (href.indexOf(kw) < 0 && text.indexOf(kw) < 0)
                    if(!notMatch){
                        n++
                    }
                    $a.closest('.item').css('display', notMatch ? 'none' : '')
                })
            $lbFilterBlockedUsers.text([n?n+' ':'无','人匹配：'].join(''))
        }).css({
            float: 'left'
        }).trigger('keyup')
      , funcUnblock=function(){
            if(all.length==0){return}
            var e=all.shift()
            $.post('http://www.zhihu.com/settings/unblockuser', $.param({
                _xsrf: $('input[name=_xsrf]').val()
              , uid: e.getAttribute('data-id')
            })).done(function(result){
                $(e).remove()
            }).fail(function(result){
                all.push(e)
            }).always(function(result){
                $lbFilterBlockedUsers.text([all.length?all.length+' ':'无','人匹配：'].join(''))
                funcUnblock()
            })
        }
      , h=$tbFilterBlockedUsers.outerHeight()
      , $btUnBlockedUsers = $('<input/>', {
            'class': 'zg-btn zg-btn-unfollow'
          , type: 'button'
          , value: '取消屏蔽'
        }).appendTo($pnlUnBlockedUsers).on('click', function(event){
            $('#section-blocked-users > .settings-item > .settings-item-content > .blocked-users > .item').each(function(i,e){
                var $e = $(e)
                if($e.is(':visible')){
                    all.push(e)
                }
            })
            funcUnblock()
        }).css({
            float: 'left'
        }).height(h)
    $lbFilterBlockedUsers.css('line-height', h+'px')
}
