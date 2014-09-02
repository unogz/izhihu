allLinks = function(_name, _listSel, _listName) {
    this.name = _name
    this.listSel = _listSel
    this.listName = _listName
    this.dlgID = 'izh-dlg-' + _name
    this.$dlg = null
    var _initialTitle = _listName + '地址清单'
      , _result = new Array()
      , _loadTimes = 0

    //分析内容
    var processNode = function(content,$dlg){
      var $qCurrent = null;
      $('.zm-item-answer', content).each(function(index, item){
        var $a = $(item)
          , $q = $a.closest(".zm-item").children("h2").children("a")
        ;
        if($q.length){
          $qCurrent=$q;
        }else if($qCurrent){
          $q=$qCurrent;
        }else{
          return;
        }
        var hrefQuestion = url.data.attr["base"] + $q.attr("href").replace(url.data.attr["base"],'');
        var obj = {
            title: $q.text(),
            //questionUrl: hrefQuestion,
            answerUrl: hrefQuestion + ($a.parent().is(".zm-item-fav") ? "/answer/" + $a.attr("data-atoken") : ""),
            answerAuthor: $a.find('.zm-item-answer-author-wrap a[href^="/people"]').text().trim(),
            summary: $a.find(".zm-item-answer-summary").children().remove().end().text(),
            content: $a.find(".zm-editable-content").html()
        };
        _result.push(obj);
        var str = utils.formatStr('<li style="list-style-type:none"><a href="{answerUrl}" title="* 《{title}》&#13;* {answerAuthor}：&#13;* {summary}">{answerUrl}</a></li>', obj);
        $('.izhihu-collection-links',$dlg).append(str);
        var count=_result.length;
        $('.izhihu-collection-info',$dlg).html('（努力加载中...已得到记录 ' + count + ' 条）');
      });
    };
        
    var handler = function(pageWant,pageNow,$dlg){
      if (!pageNow)pageNow=1;
      if($dlg.is(':hidden')){
        var count=_result.length;
        $('.izhihu-collection-info',$dlg).html('（加载被终止...已得到记录 ' + count + ' 条）');
        $('#zh-global-spinner').hide();
        return;
      }
      
      if(pageWant==1){
        $('.izhihu-collection-links',$dlg).empty();
        $('#zh-global-spinner').show();
        _result.length=0;
        _loadTimes++;
        $('.izhihu-collection-info',$dlg).html('');
      }
      var $pager=$(_listSel).parent().find('.zm-invite-pager')
        , $lastPage=$pager.children('span').last().prev()
        , totalCount=$pager.length==0?1:Number($lastPage.text())
      ;
      if(pageWant>totalCount){
        $('.izhihu-collection-info',$dlg).html('（加载完成，共得到记录 ' + _result.length + ' 条）');
        $('#zh-global-spinner').hide();
        $('.selAll',$dlg).click();
        return;
      }

      var pageNext=pageWant+1;
      if(pageWant==pageNow){
        processNode($(_listSel).html(),$dlg);
        handler(pageNext,pageNow,$dlg)
      }else{
        var _url=url.data.attr['base']+url.data.attr['path']+'?page='+pageWant;
        $.ajax(_url,{type:'get',context:{loadTimes:_loadTimes}}).done(function(result){
          if(this.loadTimes!=_loadTimes)return;
          processNode(result,$dlg);
          handler(pageNext,pageNow,$dlg)
        });
      }
    };

    //初始化弹出框
    this.initDialog = function(){
        this.$dlg=$('#'+this.dlgID);
        var retVal=0<this.$dlg.length;
        if(!retVal){
            this.$dlg = $('<div>', { id: this.dlgID, 'class': 'modal-dialog allLinks', tabindex: '0', style: 'display: none;width:500px', name: _name, 'listSel': _listSel })
                .append($('<div>', { 'class': 'modal-dialog-title modal-dialog-title-draggable' })
                    .append($('<span>', { 'class': 'modal-dialog-title-text', html: _initialTitle }))
                    .append($('<span>', { 'class': 'modal-dialog-title-text izhihu-collection-info' }))
                    .append($('<span>', {
                        'class': 'modal-dialog-title-close'
                      , click: function() {
                            $('#zh-global-spinner').hide()
                            $('.modal-dialog-bg').hide()
                            $(this).closest('.modal-dialog').hide()
                        }
                    }))
                )
                .append($('<div>', { 'class': 'modal-dialog-content' })
                    .append($('<div>')
                        .append($('<div>', { 'class': 'zg-section' })
                            .append($('<div>', { 'class': 'izhihu-collection-links zg-form-text-input', tabIndex: '-1', style: 'height:300px;overflow-y:scroll;outline:none;' }))
                            .append($('<form>', { action: 'http://ilovezhihu.duapp.com/saveMe.py', method: 'post', target: '_blank', style: 'display:none' })
                                .append($('<textarea>', { style: "width: 100%;", name: "links", 'class': "izhihu-collection-links-post" }))
                                .append($('<input>', { name: 'title' }))
                            )
                        )
                        .append($('<div>', { 'class': 'zm-command' })
                            .append($('<div>', { 'class': 'zg-left' })
                                .append($('<a>', {
                                    'class': 'zg-btn-blue reload'
                                  , href: 'javascript:void(0);'
                                  , html: '重新获取'
                                  , click: function() {
                                        var $d = $(this).closest('.modal-dialog')
                                        handler(1, Number(url.data.param.query['page']), $d)
                                    }
                                }))
                            )
                            .append($('<a>', {
                                'class': 'zg-btn-blue save'
                              , href: 'javascript:void(0);'
                              , html: '保存'
                              , click: function() {
                                    var $dlg = $(this).closest('.modal-dialog-content')
                                      , $links = $dlg.find('.izhihu-collection-links')
                                      , $linksPost = $dlg.find('.izhihu-collection-links-post')
                                      , $linksTitle = $linksPost.next()
                                      , $form = $linksPost.parent()
                                      , links = ''
                                    ;
                                    $links.find('li a').each(function(i, e) {
                                        links += e.getAttribute('href') + '\n'
                                    })
                                    $linksPost.val(links)
                                    $linksTitle.val($('#zh-fav-head-title,.zm-profile-header-main .title-section a.name').text())
                                    $form.submit()
                                }
                            }))
                        )
                    )
                ).appendTo(document.body)
                .draggable({ handle: '.modal-dialog-title-draggable' })

            if(this.$dlg.length)
                retVal = true

        }
        return retVal
    }

    this.start = function($d) {
        if ($('#zh-global-spinner:visible').length) return
        if (!$d) $d = this.$dlg
        if (!$d) return
        if (!$('.izhihu-collection-links', $d).children().length) {
            handler(1, Number(url.data.param.query['page']), $d)
        }
    }

}
