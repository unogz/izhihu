/**
 * 配置界面
 */
$(function(){
  var dom = [
    '<li>',
      '<a href="javascript:void(0);" tabindex="-1">',
        '<i class="zg-icon zg-icon-dd-settings izhihu-settings"></i>',
        'iZhihu',
      '</a>',
    '</li>'
  ].join('');

  var d = '<div id="dialog" title="Basic dialog"><p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the x icon.</p></div>'
  $(document).append(d)
  $(dom).insertBefore($('ul#top-nav-profile-dropdown li:last')).click(function(){
    console.log(this);
  });
})