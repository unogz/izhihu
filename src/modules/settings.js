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
            		'<tr><td colspan="2"align="left"><b>功能开关</b>（更改后设置将立刻保存，但只有当页面再次打开时才会生效)</td></tr>',
            	'</thead>',
            	'<tbody>',
                '<tr style="display:none"><td align="left"title="">在首页直接浏览常去话题</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeTopics" name="HomeTopics" /></td></tr>',
                '<tr><td align="left"title="">改变网页样式外观</td><td align="right"><i class="icon icon-help" data-tip="s$t$* 首页隐藏大头像<br/>* 赞同票右移<br/>* 按钮图标动画 "></i><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeLayout" name="HomeLayout" /></td></tr>',
                '<tr><td align="left"title="">调整首页「新动态」提醒按钮</td><td align="right"><i class="icon icon-help" data-tip="s$t$挪到 Timeline 右上角<br/>与标题「最新动态」平行"></i><input type="checkbox" class="t_rtjdchk" id="iZhihu_setHomeNoti" name="HomeNoti" /></td></tr>',
                '<tr><td align="left">将用户信息挪到回答下方</td><td align="right"><input type="checkbox" class="t_rtjdchk" id="iZhihu_setAuthorRear" name="AuthorRear" /></td></tr>',
                '<tr><td align="left">在页面右侧浮动显示打开的评论列表</td><td align="right"><i class="icon icon-help" data-tip="s$t$在首页、问题、回答页中生效"></i><input type="checkbox" class="t_rtjdchk" id="iZhihu_setRightComment" name="ShowComment" /></td></tr>',
                '<tr><td align="left"title="">开启「快速屏蔽」（加入黑名单/取消关注）功能</td><td align="right"><i class="icon icon-help" data-tip="s$t$在赞同列表、评论列表中使用"></i><input type="checkbox" class="t_rtjdchk" id="iZhihu_setQuickBlock" name="QuickBlock" /></td></tr>',
                '<tr><td align="left"title="">开启「快速收藏」菜单</td><td align="right"><i class="icon icon-help" data-tip="s$t$鼠标移上「收藏」按钮时显示"></i><input type="checkbox" class="t_rtjdchk" id="iZhihu_setQuickFavo" name="QuickFavo" /></td></tr>',
                '<tr><td align="left"title="">开启「回答目录」</td><td align="right"><i class="icon icon-help" data-tip="s$t$在问题页面左侧掩藏，鼠标移上时展开<br/>并在右侧即时显示回答预览"></i><input type="checkbox" class="t_rtjdchk" id="iZhihu_setAuthorList" name="AuthorList" /></td></tr>',
            	'</tbody>',
            '</table>',
            '</div>',
              '<div class="zg-left">',
                '当前版本：'+version+'；',
                '最后更新：'+updateDate+'<br/>',
                '制作：<a data-tip="p$t$unogzx" href="/people/unogzx">@钢盅郭子</a>，',
                '<a data-tip="p$t$liuyong25" href="/people/liuyong25">@天猪(刘勇)</a>，',
                '<a data-tip="p$t$luoxr" href="/people/luoxr">@罗大睿</a><br/>',
                '感谢：<a data-tip="p$t$cocksucker" href="/people/cocksucker">@Peter</a>，<a data-tip="p$b$cakvfcwz" href="/people/cakvfcwz">@水云逸</a>',
              '</div>',
              '<div class="zm-command">',
              '<a id="Refresh" class="zg-btn-blue" href="javascript:void(0);" onclick="location.reload();">刷新网页</a>',
            '</div>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
        
  $(domBtnSettings).insertBefore($('ul#top-nav-profile-dropdown li:last'))
  .click(function(){
    console.log(this);
    $('.modal-dialog-bg').show();
    $('input.t_rtjdchk','#izh-dlg-settings').each(function(i,e){
        if(utils.getCfg($(e).attr('name')))
            $(e).attr('checked','checked');
    });
    $('#izh-dlg-settings').css({'z-index':'123','position':'fixed','top': ($win.height() - $('#izh-dlg-settings').height()) / 2, 'left': ($win.width() - $('#izh-dlg-settings').width()) / 2}).fadeIn('slow');
  });
  var $dlg=$(domDlgSettings).appendTo(_doc.body);
  $dlg.drags({handler:'.modal-dialog-title-draggable'});
  $('.modal-dialog-title-close',$dlg).click(function(){
      $('.modal-dialog-bg').hide();
      $('#izh-dlg-settings').first().hide();
  });
  $('input.t_rtjdchk',$dlg).checkbox({cls:'t_jchkbox',empty:cbemptyimg});
  $('input.t_rtjdchk',$dlg).click(function(){
      var key=$(this).attr('name')
        , value=!this.checked;
      console.log(key+' = '+value);
      utils.setCfg(key,value);
  });
})
