/**
 * 收藏页
 */
$(function(){
  var $listAnswers=null;
  if(pageIs.Collection){
    $listAnswers=$('#zh-list-answer-wrap .zm-item');
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
      var y = ($win.height() - allLinksCollection.$dlg.width()) / 2
        , x = ($win.width() - allLinksCollection.$dlg.width()) / 2
      ;
      allLinksCollection.$dlg.css({'top': y, 'left': x}).fadeIn('slow');
      allLinksCollection.start();
    });
    
    $('#zh-list-answer-wrap').bind('DOMNodeInserted',function(event){
        var $na=$(event.target).filter('.zm-item');
        if($na.length){
            window.iZhihu.Answer.processAnswer($na, null, false, false);
        }
    });
  }
  if(pageIs.Answers){
    $listAnswers=$('#zh-profile-answer-list .zm-item');
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
      var y = ($win.height() - allLinksAnswers.$dlg.width()) / 2
        , x = ($win.width() - allLinksAnswers.$dlg.width()) / 2
      ;
      allLinksAnswers.$dlg.css({'top': y, 'left': x}).fadeIn('slow');
      allLinksAnswers.start();
    });
    
    $('#zh-profile-answer-list > .zh-general-list').bind('DOMNodeInserted',function(event){
        var $na=$(event.target).filter('.zm-item');
        if($na.length){
            window.iZhihu.Answer.processAnswer($na, null, false, false);
        }
    });
  }

    //process each answer
    if($listAnswers&&$listAnswers.length){
        $listAnswers.each(function(i,e){
            //setTimeout(function(){
                window.iZhihu.Answer.processAnswer($(e), null, false, false);
            //},1000);
        });
    }
    
  if(pageIs.MyCollection&&window.iZhihu.QuickFavo){
    var $favItems=$('#zh-favlists-wrap').children('.zm-item');
    $favItems.each(function(i,e){
    });
  }
})