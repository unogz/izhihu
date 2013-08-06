/*
 * 首页
 */
$(function(){
    var $lblHomeTitle=$('#zh-home-list-title')//activity_caption
      , $btnNewActivity=$('#zh-main-feed-fresh-button')//new_activity
      , $feedList=$('.zh-general-list')//feed_list
      , $topLinkHome=$('#zh-top-link-home')
      , $filter=$('<span>',{
            'class':'izh-feeds-filter'
          , html:[''
              , '<a class="izh-button izh-feeds-filter-option"showFeeds="QUESTION_"><i class="zg-icon"></i>问题</a>'
              , '<a class="izh-button izh-feeds-filter-option"showFeeds="ANSWER_CREATE"><i class="zg-icon"></i>回答</a>'
              , '<a class="izh-button izh-feeds-filter-option"showFeeds="ANSWER_VOTE_"><i class="zg-icon"></i>赞同</a>'
              , '<a class="izh-button izh-feeds-filter-option"showFeeds="ARTICLE_"><i class="zg-icon"></i>专栏</a>'
              , '<a class="izh-button izh-feeds-filter-option"showFeeds="ROUNDTABLE_"><i class="zg-icon"></i>圆桌</a>'
            ].join('')
        })
      , $filterInfo=$('<a>',{'class':'izh-feeds-filter-info nothing',href:'javascript:void(0);'}).on('click',function(){$filter.trigger($filter.is(':hidden')||$filter.attr('doing')=='hide'?'show':'hide');})
      , ShowFeeds=function(type,enable){
            var id="izhCSS_FilterFeed_"+type
              , nd=document.getElementById(id)
            ;
            if(enable){
                if(nd)nd.parentNode.removeChild(nd);
            }else if(heads.length){
                if(!nd){
                    nd=_doc.createElement('style');
                    nd.type='text/css';
                    nd.id=id;
                    nd.appendChild(_doc.createTextNode('.feed-item[data-feedtype^="'+type+'"]{display:none}'));
                    heads[0].appendChild(nd);
                }
                //{ROUNDTABLE_ADD_RELATED: "roundtable",ARTICLE_VOTE_UP: "post_vote",ARTICLE_CREATE: "post_create",RECOMMENDED: "feed_recommended",QUESTION_FOLLOW: "feed_question_follow",QUESTION_CREATE: "feed_question",ANSWER_VOTE_UP: "feed_answer_vote",ANSWER_CREATE: "feed_answer_answer"};
            }
        }
      , refreshFilterInfo=function(){
            var count=$feedList.children('.feed-item:hidden').length
              , info='&nbsp;>过滤选项<'
            ;
            if(count){
                info='（'+count+'条动态被隐藏）';
                $filterInfo.removeClass('nothing').css({display:''});
            }else{
                $filterInfo.addClass('nothing');
            }   
            $filterInfo.html(info);
      }
    ;
    if (pageIs.Home){
        $filter.children('.izh-feeds-filter-option').addClass('on').click(function(event){
            var i=0
              , $e=$(this)
              , fs=$e.attr('showFeeds')
              , fa=fs.split(',')
            ;
            $('.izh-feeds-filter-option[showFeeds="'+fs+'"]').toggleClass('on');
            for(;i<fa.length;i++){
                ShowFeeds(fa[i],$e.is('.on'));
            }
            refreshFilterInfo();
    	});
        if($topLinkHome.length){
            var $filter2=$('<div>')
            		.css({position:'absolute',border:'1px solid #777',backgroundColor:'#fff'}).hide()
                    .append($filter.clone(true,true).css({display:'block'}))
                	.on('show',function(){
                	    var $e=$(this).stop();
                	    if($e.is(':hidden'))
                	    	$e.css({display:'',opacity:0})
                        $e.animate({opacity:1},'slow');
                	})
                	.on('hide',function(){
                	    var $e=$(this).stop();
                    	$e.fadeOut('slow');
                	})
            ;
            $topLinkHome.after($filter2).parent()
            	.on('mouseenter',function(event){
                    var $e=$(this)
                      , $f=$e.children().last()
                    ;
            	    $f.trigger('show');
            	})
            	.on('mouseleave',function(event){
                    var $e=$(this)
                      , $f=$e.children().last()
                    ;
            	    $f.trigger('hide');
            	})
            ;
        }
        if($lblHomeTitle.length){
            $filterInfo.css({
                display:'none'
              , textDecoration:'none'
              , cursor:'pointer'
            }).insertBefore($('#feed-ver'));
            $lblHomeTitle.css({overflow:'hidden'})
            	.prepend($filter)
            	//.children('i:first')
            	.on('mouseenter',function(event){
                    var $e=$(this)
                      , $f=$e.children('.izh-feeds-filter-info.nothing').stop()
                    ;
            	    if($f.is(':hidden'))
            	    	$f.css({display:'',opacity:0})
                    $f.animate({opacity:1},'fast');
            	})
            	.on('mouseleave',function(event){
                    var $e=$(this)
                      , $f=$e.children('.izh-feeds-filter-info.nothing').stop()
                    ;
            	    $f.fadeOut('fast');
            	})
            ;
            $filter.css({marginLeft:-$filter.width(),display:'none'})
            	.on('show',function(){
            	    var $e=$(this);
            	    if($e.attr('doing')==='show')return;
            	    $e.attr('doing','show').stop();
            	    if($e.is(':hidden'))
            	    	$e.css({display:''})
                    $e.animate({marginLeft:0},'slow',function(){$(this).css('display','').removeAttr('doing');});
            	})
            	.on('hide',function(){
            	    var $e=$(this);
            	    if($e.attr('doing')==='hide')return;
            	    $e.attr('doing','hide').stop();
                    $e.animate({marginLeft:-$filter.width()},'slow',function(){$(this).css('display','none').removeAttr('doing');});
            	})
            	.on('mouseenter',function(event){
                    var $e=$(this)
                    ;
            	    $e.trigger('show');
            	})
            	.on('mouseleave',function(event){
                    var $e=$(this)
                    ;
            	    $e.trigger('hide');
            	})
        	;
        	refreshFilterInfo();
        }
        if (izhHomeNoti
         && $lblHomeTitle.length
         && $btnNewActivity.length
        ){
            $lblHomeTitle.css({
                'float':'left'
              , 'margin-bottom':'2px'
              , 'line-height':'32px'
              , 'width':'100%'
              }).next().css('clear','both');
            $btnNewActivity.css({
                'float':'right'
              , 'margin':'0'
              , 'line-height':'22px'
            }).appendTo($lblHomeTitle);
        }
    }
    if(pageIs.Home||pageIs.Debuts){
        $feedList.find('.feed-item').each(function(i,e){
            window.iZhihu.Answer.processAnswer($(e),null
              , izhAuthorRear
              , izhAuthorList
            );
        });
        $feedList.bind('DOMNodeInserted',function(event){
            var $item=$(event.target);
            if($item.is('.feed-item')){
                window.iZhihu.Answer.processAnswer($item,null
                  , $body.attr('izhAuthorRear')=='1'
                  , $body.attr('izhAuthorList')=='1'
                );
                refreshFilterInfo();
            }
        });
    }

});
