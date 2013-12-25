allLinks=function(_name,_listSel,_listName){
    this.name=_name;
    this.listSel=_listSel;
    this.listName=_listName;
    this.dlgID='izh-dlg-'+_name;
    this.$dlg=null;
    var _initialTitle=_listName+'地址清单',_result=new Array(),_loadTimes=0;

    //初始化弹出框
    this.initDialog = function(){
      this.$dlg=$('#'+this.dlgID);
      var retVal=0<this.$dlg.length;
      if(!retVal){
        var dom = [
          '<div id="'+this.dlgID+'" class="modal-dialog allLinks" tabindex="0" style="display: none;width:500px">',
            '<div class="modal-dialog-title modal-dialog-title-draggable">',
              '<span class="modal-dialog-title-text">'+_initialTitle+'</span>',
              '<span class="modal-dialog-title-text izhihu-collection-info"></span>',
              '<span class="modal-dialog-title-close"></span>',
            '</div>',
            '<div class="modal-dialog-content">',
              '<div>',
                '<div class="zg-section">',
                  '<div class="izhihu-collection-links" tabIndex="-1" class="zg-form-text-input" style="height:300px;overflow-y:scroll;outline:none;">',
                  '</div>',
                  '<form action="http://ilovezhihu.duapp.com/saveMe.py"method="post"target="_blank"style="display:none"><textarea style="width: 100%;" name="links"class="izhihu-collection-links-post"></textarea><input name="title"/></form>',
                '</div>',
                '<div class="zm-command">',
                  '<div class="zg-left">',
                  '<a class="zg-btn-blue reload" href="javascript:;">重新获取</a>',
                  '</div>',
                  //'<a class="zm-command-cancel" name="cancel" href="javascript:;">取消</a>',
                  '<a class="zg-btn-blue save" href="javascript:;">保存</a>',
                '</div>',
              '</div>',
            '</div>',
          '</div>'
        ].join('');
        
        this.$dlg = $(dom).appendTo(document.body).attr('name',_name).attr('listSel',_listSel);
        if(this.$dlg.length)
            retVal=true;

        $('.modal-dialog-title-close',this.$dlg).click(function(){
          $('#zh-global-spinner').hide();
          $('.modal-dialog-bg').hide();
          $(this).parentsUntil('.modal-dialog').parent().hide();
        });

        //拖动
        this.$dlg.drags({handler:'.modal-dialog-title-draggable'});
        
        $('.save',this.$dlg).click(function(){
            var $dlg=$(this).parentsUntil('.modal-dialog-content').parent()
              , $links=$dlg.find('.izhihu-collection-links')
              , $linksPost=$dlg.find('.izhihu-collection-links-post')
              , $linksTitle=$linksPost.next()
              , $form=$linksPost.parent()
              , links=''
            ;
            $links.find('li a').each(function(i,e){
                links+=e.getAttribute('href')+'\n';
            });
            $linksPost.val(links);
            $linksTitle.val($('#zh-fav-head-title,.zm-profile-header-main .title-section a.name').text());
            $form.submit();
        });
        
        $('.reload',this.$dlg).click(function(){
            var $d=$(this).parentsUntil('.modal-dialog').parent();
            handler(1,Number(url.data.param.query['page']),$d);
        });
      }
      return retVal;
    };
    this.start=function($d){
        if($('#zh-global-spinner:visible').length)return;
        if(!$d)$d=this.$dlg;
        if(!$d)return;
        if(!$('.izhihu-collection-links',$d).children().length){
            handler(1,Number(url.data.param.query['page']),$d);
        }
    };

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

};
