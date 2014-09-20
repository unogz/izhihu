/**
 * @class SearchingList
 */
function SearchingList(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu) {
        return null
    }
    iZhihu.SearchingList = this
    
    this.$topSearch = $('#zh-top-search')
    this.$topSearchInput = $('#zh-top-search-form > input#q')
    if (!this.$topSearch.length) return

    this.SearchEngineOutsideList = {
        'google': {icon:'http://www.baidu.com/favicon.ico',url:'http://www.baidu.com/s?wd={0}'}
      , 'baidu': {icon:'https://www.google.com/favicon.ico',url:'https://www.google.com/?q=site:zhihu.com%20{0}#q=site:zhihu.com+{0}'}
    }

    utils.observeDOMNodeAdded(this.$topSearch[0],function(event){
        var _a = event.addedNodes || []
        if (!_a.length) return
        utils.observeDOMNodeAdded(_a[0],function(event){
            var _a = event.addedNodes || [null]
              , $item = $(_a[0])
              , seoKey = iZhihu.config['SearchEngineOutside'] || 'baidu'
              , seo = iZhihu.SearchingList.SearchEngineOutsideList[seoKey] || {icon:'',url:''}
              , strSearchUrl = seo.url.replace(/\{0\}/g, function(){return iZhihu.SearchingList.$topSearchInput.val()})
            console.log(seoKey)
            if ($item.is('.ac-row[role=option]')){
                var $a = $item.children('a')
                  , href = $a.attr('href')
                  , css = 'float:right;'
                  , $aNew = $('<a>', {class:'zg-icon zg-icon-sidenav-debuts',style:css,href:href,target:'_blank',click:function(event){
                        event.stopPropagation()
                    }})
                if (href.indexOf('/search?') === 0) {
                    $aNew.css({marginTop:'0.5em'})
                    $item.append($('<a>', {class:'icon',style:'margin-top:0.5em;float:left',href:strSearchUrl,target:'_blank',click:function(event){
                        event.stopPropagation()
                    }}).append($('<img>', {border:0,src:seo.icon,width:16,height:16})))
                } else if (href.indexOf('/question/') < 0) {
                    $aNew.css({marginTop:'-1.5em'})
                }
                $item.append($aNew)
            }
        })
    })

    return this
}
