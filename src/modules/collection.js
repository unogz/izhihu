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
        
    //注册点击事件
    btn.click(function(){
      var allLinksCollection=new allLinks('Collections','#zh-list-answer-wrap','收藏夹');
	  if(!allLinksCollection.initDialog())return;
      $('.modal-dialog-bg').show();
      allLinksCollection.$dlg.css({'top': btn.position().top + 60, 'left': (window.innerWidth - allLinksCollection.$dlg.width()) / 2}).fadeIn('slow');
      allLinksCollection.start();
    });
  }
  if(pageIs.Answers){
    //添加按钮
    $('.zm-profile-section-name')
      .append('<span class="zg-bull">•</span>  ')
      .append('<a href="javascript:;" id="getAllLinks">地址清单</a>');

    var btn = $('#getAllLinks');
    var result = [];
        
    //注册点击事件
    btn.click(function(){
      var allLinksAnswers=new allLinks('Answers','#zh-profile-answer-list .zh-general-list','用户回答');
	  if(!allLinksAnswers.initDialog())return;
      $('.modal-dialog-bg').show();
      allLinksAnswers.$dlg.css({'top': btn.position().top + 60, 'left': (window.innerWidth - allLinksAnswers.$dlg.width()) / 2}).fadeIn('slow');
      allLinksAnswers.start();
    });
  }
})