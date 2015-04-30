/**
 * @class TopNav
 */
function TopNav(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu || !iZhihu.config['TopNavAutoFold']) {
        return null
    }
    iZhihu.TopNav = this
    
    this.$topNav = $('body > .zu-top:first')
        .on('mouseover', function(event){
            this.style.top = '0'
            this.setAttribute('izh-mouseover', '1')
            $('#izhCSS_NotiNum').remove()
        })
        .on('mouseout', function(event){
            this.setAttribute('izh-mouseover', '0')
            iZhihu.TopNav.funcFold()
        })
    if (!this.$topNav.length) return

    this.topNavHeight = this.$topNav.height() - 5

    this.funcFold = function(event){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0
          , _self = iZhihu.TopNav
          , isMouseOver = '1' === (_self.$topNav.attr('izh-mouseover') || '')
          , $head = $('head:first')
          , $cssNotiNum = $('#izhCSS_NotiNum')
          , $floatingBar = $('body > .goog-scrollfloater-floating')
        if (scrollTop === 0) {
            _self.$topNav.css({top:0})
        } else if (!isMouseOver) {
            if (scrollTop < _self.topNavHeight) {
                _self.$topNav.css({top:-scrollTop})
                $floatingBar.css({marginTop:-scrollTop})
            } else {
                _self.$topNav.css({top:-_self.topNavHeight})
                $floatingBar.css({marginTop:-_self.topNavHeight})
            }
            if (scrollTop > 20) {
                if (!$cssNotiNum.length) {
                    $('<style>', {
                        id: 'izhCSS_NotiNum'
                      , type: 'text/css'
                    }).appendTo('head:first').text('#zh-top-nav-count,#zh-top-nav-new-pm{position:absolute;top:40px;border-radius:0 !important}.top-nav-profile .zu-top-nav-userinfo{overflow:visible !important}')
                }
                return
            }
        }
        $cssNotiNum.remove()
    }

    iZhihu.$win.scroll(this.funcFold)

    utils.observeDOMNodeAdded(document.body,function(event){
        iZhihu.TopNav.funcFold()
        $.each(event.removedNodes, function(i, e){
            var $floatingBar = $(e).filter('.goog-scrollfloater').css({marginTop:''})
        })
    })

    return this
}
