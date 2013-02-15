/**
 * 配置界面
 */
$(function(){
  var domBtnSettings = [
    '<li>',
      '<a href="javascript:void(0);" tabindex="-1">',
        '<i class="zg-icon zg-icon-dd-settings izhihu-settings"></i>',
        'iZhihu',
      '</a>',
    '</li>'
  ].join('');

  var cbemptyimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=';
    var domDlgSettings = [
      '<div id="izh-dlg-settings" class="modal-dialog" tabindex="0" style="display:none;width:500px">',
        '<div class="modal-dialog-title modal-dialog-title-draggable">',
          '<span class="modal-dialog-title-text">配置选项</span>',
          '<span class="modal-dialog-title-close"></span>',
        '</div>',
        '<div class="modal-dialog-content">',
          '<div>',
            '<div class="zg-section">',
            '<table class="t_set_tb"border="0"cellspacing="0"cellpadding="5"width="100%">',
            	'<thead>',
            		'<tr><td colspan="2"align="left"><b>功能开关</b></td></tr>',
            	'</thead>',
            	'<tbody>',
            		'<tr style="display:none"><td align="left"title="">在首页直接浏览常去话题</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeTopics" /></td></tr>',
            		'<tr><td align="left"title="* 导航部分加宽\n* 首页隐藏大头像\n* 赞同票右移\n* 首页评论框拉宽\n* 过渡效果 ">改变网页样式外观（感谢 <a href="http://www.zhihu.com/people/yukirock">@罗大睿</a>）</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeLayout" /></td></tr>',
            		'<tr><td align="left"title="挪到 Timeline 右上方，与标题「最新动态」平行">调整首页中的「新动态」提醒按钮</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeNoti" /></td></tr>',
            		'<tr><td align="left">将问题页中的回答者信息挪到回答下方</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setAuthorRear" /></td></tr>',
            		'<tr><td align="left">在问题页中显示回答者目录（在页面左侧掩藏）</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setAuthorList" /></td></tr>',
            		'<tr><td align="left">在回答右侧浮动显示回答的评论</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setShowComment" /></td></tr>',
            		'<tr><td align="left"title="">在「收藏」按钮上方显示「快速收藏」</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setQuickFavo" /></td></tr>',
            	'</tbody>',
            '</table>',
            '</div>',
            '<div class="zm-command">',
              '<div class="zg-left">',
              '</div>',
              '<a id="Refresh" class="zg-btn-blue" href="javascript:;">刷新网页</a>',
            '</div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
        
  var d = '<div id="izh-dlg-settings" title="配置选项"><p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the x icon.</p></div>'
  $(domBtnSettings).insertBefore($('ul#top-nav-profile-dropdown li:last'))
  .click(function(){
    console.log(this);
    $('.modal-dialog-bg').show();
    $('#izh-dlg-settings').css({'top': (window.innerHeight - $('#izh-dlg-settings').height()) / 2, 'left': (window.innerWidth - $('#izh-dlg-settings').width()) / 2}).fadeIn('slow');
    $('input:checkbox','#izh-dlg-settings').checkbox({cls:'t_jchkbox',empty:cbemptyimg});
  });
  $(domDlgSettings).appendTo(_doc.body)
  .drags({handler:'.modal-dialog-title-draggable'})
  .find('.modal-dialog-title-close').click(function(){
    $('.modal-dialog-bg').hide();
    $('#izh-dlg-settings').first().hide();
  });
})