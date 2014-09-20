/**
 * @class SearchingList
 */
function SearchingList(iZhihu) {
    if ( typeof iZhihu === 'undefined' || !iZhihu || !iZhihu.config['SearchingList']) {
        return null
    }
    iZhihu.SearchingList = this
    
    this.$topSearch = $('#zh-top-search')
    this.$topSearchInput = $('#zh-top-search-form > input#q')
    if (!this.$topSearch.length) return

    utils.observeDOMNodeAdded(iZhihu.SearchingList.$topSearch[0],function(event){
        var _a = event.addedNodes || []
        if (!_a.length) return
        utils.observeDOMNodeAdded(_a[0],function(event){
            var _a = event.addedNodes || [null]
              , $item = $(_a[0])
              , strSearchUrl = 'http://www.baidu.com/s?wd=site%3Azhihu.com%20' + iZhihu.SearchingList.$topSearchInput.val()
            if ($item.is('.ac-row[role=option]')){
                var $a = $item.children('a')
                  , href = $a.attr('href')
                  , css = 'float:right;'
                  , $aNew = $('<a>', {class:'zg-icon zg-icon-sidenav-debuts',style:css,href:href,target:'_blank',click:function(event){
                        event.stopPropagation()
                    }})
                if (href.indexOf('/search?') === 0) {
                    $aNew.css({marginTop:'0.5em'})
                    $item.append($('<a>', {class:'icon icon-magnify-q',style:'margin-top:0.5em;float:left;',href:strSearchUrl,target:'_blank',click:function(event){
                        event.stopPropagation()
                    }}))
                } else if (href.indexOf('/question/') < 0) {
                    $aNew.css({marginTop:'-1.5em'})
                }
                $item.append($aNew)
            }
        })
    })

    return this
}
