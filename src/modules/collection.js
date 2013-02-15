/**
 * 收藏页
 */
$(function(){
  if(pageIs.Collection){
    //添加按钮
    $('#zh-list-meta-wrap')
      .append('<span class="zg-bull">•</span>  ')
      .append('<a href="javascript:;" id="getAllLinks">地址清单</a>');

    var btn = $('#getAllLinks');
    var result = [];
    
    var w=unsafeWindow;
    // 复制到剪贴板（未实现）
    var copyToClipboard = function(txt){
        if(w.clipboardData){
        	w.clipboardData.clearData();
        	w.clipboardData.setData("Text", txt);
        }else if(navigator.userAgent.indexOf("Opera") != -1){
        	w.location = txt;
        }else if(w.netscape){
            try{
                w.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }catch(e){
                alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
            }
            var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
            if (!clip)
                return;
            var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
            if (!trans)
                return;
            trans.addDataFlavor('text/unicode');
            var str = new Object();
            var len = new Object();
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var copytext = txt;
            str.data = copytext;
            trans.setTransferData("text/unicode", str, copytext.length * 2);
            var clipid = Components.interfaces.nsIClipboard;
            if(!clip)
                return false;
            clip.setData(trans,null,clipid.kGlobalClipboard);
            alert("复制成功！");
        }
    };

    // 选中元素内文本
    var selectText = function(element) {
        var doc = document
            , text = doc.getElementById(element)
            , range, selection
        ;    
        if (doc.body.createTextRange) { //ms
            range = doc.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) { //all others
            selection = window.getSelection();        
            range = doc.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    //初始化弹出框
    var initDialog = function(){
      if(!$('#izh-dlg-collections').length){
        var dom = [
          '<div id="izh-dlg-collections" class="modal-dialog" tabindex="0" style="display: none;width:500px">',
            '<div class="modal-dialog-title modal-dialog-title-draggable">',
              '<span class="modal-dialog-title-text">收藏夹链接清单</span>',
              '<span class="modal-dialog-title-text" id="izhihu-collection-info"></span>',
              '<span class="modal-dialog-title-close"></span>',
            '</div>',
            '<div class="modal-dialog-content">',
              '<div>',
                '<div class="zg-section">',
                  '<div id="izhihu-collection-links" tabIndex="-1" class="zg-form-text-input" style="height:300px;overflow-y:scroll;outline:none;">',
                    //'<textarea style="width: 100%; height: 132px;" id="izhihu-collection-links" class="zu-seamless-input-origin-element"></textarea>',
                  '</div>',
                '</div>',
                '<div class="zm-command">',
                  '<div class="zg-left">',
                  '<a id="reload" class="zg-btn-blue" href="javascript:;">重新获取</a>',
                  '</div>',
                  //'<a class="zm-command-cancel" name="cancel" href="javascript:;">取消</a>',
                  '<a id="copy" class="zg-btn-blue" href="javascript:;">复制到剪贴板</a>',
                  '<a id="selAll" class="zg-btn-blue" href="javascript:;">选择全部</a>',
                '</div>',
              '</div>',
            '</div>',
          '</div>'
        ].join('');
        
        $('.zhi').append(dom);

        $('#izh-dlg-collections .modal-dialog-title-close').click(function(){
          $('.modal-dialog-bg').hide();
          $('#izh-dlg-collections').first().hide();
        });

        //拖动
        $('#izh-dlg-collections').drags({handler:'.modal-dialog-title-draggable'});

        $('#copy','#izh-dlg-collections').click(function(){
        	var s = new Array();
        	$('a','#izhihu-collection-links').each(function(i,e){
        		s.push(e.getAttribute('href'));
        	});
        	//copyToClipboard(txt);
        	GM_setClipboard('test','html');//s.join('<br/>')
        	alert('已复制 :)');
        }).hide();
        
        $('#selAll','#izh-dlg-collections').click(function(){
            selectText('izhihu-collection-links');
        });
        
        $('#reload','#izh-dlg-collections').click(function(){
            result = [];
            $('#izhihu-collection-links').empty();
            handler([$('#zh-list-answer-wrap .zm-item').size(), $('#zh-list-answer-wrap').html(), $('#zh-load-more').attr('data-next')]);
        });
      }
    };

    //分析内容
    var processNode = function(content){
      $(content).find('.zm-item-fav').each(function(index, item){
        var dom = $(item);
        var obj = {
          title: dom.parent().find('.zm-item-title a').text(),
          questionUrl: dom.parent().find('.zm-item-title a').attr('href'),
          answerUrl: url.data.attr['base']+dom.find('.answer-date-link-wrap a').attr('href'),
          answerAuthor: dom.find('.zm-item-answer-author-wrap a[href^="/people"]').text().trim(),
          summary: dom.find('.zm-item-answer-summary').children().remove().end().text(),
          content: dom.find('.zm-editable-content').html()
        };
        result.push(obj);
        var str = utils.formatStr('<li style="list-style-type:none"><a href="{answerUrl}" title="* 《{title}》&#13;* {answerAuthor}：&#13;* {summary}">{answerUrl}</a></li>', obj);
        $('#izhihu-collection-links').append(str);
        $('#izhihu-collection-info').html('（努力加载中...已得到记录 ' + result.length + ' 条）');
      });
    };
    
    //处理函数
    var offset = 0;
    var handler = function(msg){
      offset += Number(msg[0]);
      var start = String(msg[2]);

      processNode(msg[1]);
      
      if(start !== '-1'){
        $.post(window.location, $.param({
          offset: offset,
          start: start,
          _xsrf: $('[name=_xsrf]').val()
        }),function(r){
          handler(r.msg);
        });
      }else{
        offset = 0;
        $('#izhihu-collection-info').html('（加载完成，共得到记录 ' + result.length + ' 条）');
        $('#zh-global-spinner').hide();
        selectText('izhihu-collection-links');
      }
    };
    
    //注册点击事件
    btn.click(function(){
      initDialog();
      $('.modal-dialog-bg').show();
      $('#zh-global-spinner').show();
      $('#izh-dlg-collections').css({'top': btn.position().top + 60, 'left': (window.innerWidth - $('#izh-dlg-collections').width()) / 2}).fadeIn('slow');
      if(!$('#izhihu-collection-links').children().length){
        $('#reload','#izh-dlg-collections')[0].click();
      }
    });
  }
})