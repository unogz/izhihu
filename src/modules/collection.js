/**
 * 收藏页
 */
$(function(){
  if(page == 'collection'){
    //添加按钮
    $('#zh-list-meta-wrap')
      .append('<span class="zg-bull">•</span>  ')
      .append('<a href="javascript:;" id="getAllLinks">地址清单</a>');

    var btn = $('#getAllLinks');
    var result = [];

    //初始化弹出框
    var initDialog = function(){
      if($('#izhihu-dialog').length==0){
        var dom = [
          '<div id="izhihu-dialog-bg" class="modal-dialog-bg" style="opacity: 0.5; width: 1283px; height: 3423px; display: none;"></div>',
          '<div id="izhihu-dialog" class="modal-dialog" tabindex="0" style="display: none;width:500px">',
            '<div class="modal-dialog-title modal-dialog-title-draggable">',
              '<span class="modal-dialog-title-text">收藏夹链接清单</span>',
              '<span class="modal-dialog-title-close"></span>',
            '</div>',
            '<div class="modal-dialog-content">',
              '<div>',
                '<div class="zg-section">',
                  '<div id="izhihu-collection-links" class="zg-form-text-input" style="height:300px; overflow-y:scroll;">',
                    //'<textarea style="width: 100%; height: 132px;" id="izhihu-collection-links" class="zu-seamless-input-origin-element"></textarea>',
                  '</div>',
                '</div>',
                '<div class="zm-command">',
                  '<div class="zm-item-meta zg-left">',
                    '<span id="izhihu-collection-info"></span>',
                  '</div>',
                  //'<a class="zm-command-cancel" name="cancel" href="javascript:;">取消</a>',
                  '<a id="copy" class="zg-btn-blue" href="javascript:;">复制到剪贴板</a>',
                '</div>',
              '</div>',
            '</div>',
          '</div>'
        ].join('');
        
        $('.zhi').append(dom);

        $('#izhihu-dialog .modal-dialog-title-close').click(function(){
          $('.modal-dialog-bg').hide();
          $('#izhihu-dialog').first().hide();
        });

        //拖动
        $('#izhihu-dialog').drags({handler:'.modal-dialog-title-draggable'});

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
        $('#izhihu-collection-info').html('努力加载中(' + result.length + ')...');
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
        $('#izhihu-collection-info').html('加载完成,共' + result.length + '条.');
        $('#zh-global-spinner').hide();
      }
    };
    
    //注册点击事件
    btn.click(function(){
      initDialog();
      $('.modal-dialog-bg').show();
      $('#zh-global-spinner').show();
      $('#izhihu-dialog').css({'top': btn.position().top + 60, 'left': (window.innerWidth - $('#izhihu-dialog').width()) / 2}).fadeIn('slow');
      result = [];
      $('#izhihu-collection-links').empty();
      handler([$('#zh-list-answer-wrap .zm-item').size(), $('#zh-list-answer-wrap').html(), $('#zh-load-more').attr('data-next')]);
    });
  }
})