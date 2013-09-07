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
              , '<a class="izh-button izh-feeds-filter-option"showFeeds="QUESTION_CREATE"><i class="zg-icon"></i>提问</a>'
              , '<a class="izh-button izh-feeds-filter-option"showFeeds="QUESTION_FOLLOW"><i class="zg-icon"></i>关注</a>'
              , '<a class="izh-button izh-feeds-filter-option"showFeeds="ANSWER_CREATE"><i class="zg-icon"></i>回答</a>'
              , '<a class="izh-button izh-feeds-filter-option"showFeeds="ANSWER_VOTE_"><i class="zg-icon"></i>赞同</a>'
              , '<a class="izh-button izh-feeds-filter-option"showFeeds="ARTICLE_,ROUNDTABLE_"data-tip="s$t$专栏、圆桌"><i class="zg-icon"></i>其他</a>'
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
      , izhHomeFeedsColumns = window.iZhihu.config['HomeFeedsColumns']
      , feedsColumns=function(){ // Implemented by morley, modified by unogz
			//动态的类型
			var feedTypes = [{
			 index: 0,
			 name: '全部',
			 codeName: ''
			}, {
			 index: 1,
			 name: '提问',
			 codeName: 'QUESTION_CREATE'
			}, {
			 index: 2,
			 name: '关注',
			 codeName: 'QUESTION_FOLLOW'
			}, {
			 index: 3,
			 name: '回答',
			 codeName: 'ANSWER_CREATE'
			}, {
			 index: 4,
			 name: '赞同',
			 codeName: 'ANSWER_VOTE_UP'
			}, {
			 index: 5,
			 name: '专栏',
			 codeName: 'ARTICLE_'
			}, {
			// index: 6,
			// name: '顶贴',
			// codeName: 'ARTICLE_VOTE_UP'
			// }, {
			//     index: 7,
			//     name: '圆桌',
			//     codeName: 'ROUNDTABLE_ADD_RELATED'
			// }, {
			//     index: 8,
			//     name: '推荐内容',
			//     codeName: 'RECOMMENDED'
			}];
			
			//自定义 CSS 到 head
			var styles = [];
			
			styles.push('.za-filter{display: inline-block;margin-right:10px;cursor:pointer;color:#999;}');
			styles.push('.za-filter.active{color:#259;}');
			styles.push('.za-filter>.zg-num.hide{display:none;}');
			
			$('<style/>').html(styles.join('')).appendTo('head');
			
			var $zhHomeListTitle = $('#zh-home-list-title');
			
			//根据类型添加过滤按钮 到 #zh-home-list-title
			var filterBtns = []
			  , i = feedTypes.length;
			
			while (i--) {
			 filterBtns.push(
			     $('<span class="za-filter"/>')
			     .attr('typeIndex', feedTypes[i].index)
			     .html(feedTypes[i].name)
			     .append($('<span class="zg-num"/>').addClass('hide'))
			     .on('click', toggleFeedType)
			 );
			}
			
			filterBtns.reverse();
			filterBtns[0].addClass('active');
			var curfeedTypeCodeName = '';
			
			$zhHomeListTitle.html(
			 $zhHomeListTitle.html().replace('最新动态', '')
			).find('i').eq(0).after(filterBtns).remove();

			var $targetZero = filterBtns[0].find('.zg-num');

			//按钮事件
			function toggleFeedType() {
			 var $clicked = $(this);
			 $clickedNum = $clicked.find('.zg-num');
			 // 交互效果
			 filterBtns.forEach(function(item) {
			     item.removeClass('active');
			 });

			 $clicked.addClass('active');

			 if ($clicked.attr('typeIndex') == 0) {
			     $('.zg-num', '.za-filter').html('').addClass('hide');
			 } else {
			     var totalUnread = (parseInt($targetZero.html()) || 0) - (parseInt($clickedNum.html()) || 0);
			     if (totalUnread != 0) {
			         $targetZero.html(totalUnread);
			     } else {
			         $targetZero.html('').addClass('hide');
			     }
			
			     $clickedNum.html('').addClass('hide');
			 }
			 curfeedTypeCodeName = feedTypes[$clicked.attr('typeIndex')].codeName;
			 // 信息流过滤
			 $('.feed-item').each(function() {
			     typeMatch($(this));
			 });
			}
			
			function typeMatch($elem) {
			 if (curfeedTypeCodeName == '') {
			     $elem.show();
			 } else if (curfeedTypeCodeName == $elem.attr('data-feedtype')) {
			     $elem.show();
			 } else {
			     $elem.hide();
			 }
			}
			
			function getTypeIndexByCodeName(codeName) {
			 var i = feedTypes.length;
			 while (i--) {
			     if (codeName.indexOf(feedTypes[i].codeName)) {
			         return i;
			     };
			 }
			}
			
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
			
			//监听推送
			var hasNewFeed = false;
			//create an observer instance
			var observer = new MutationObserver(function(mutations) {
			 if ( !! parseInt($("#zh-main-feed-fresh-button").html())) {
			     mutations.forEach(function(mutation) {
			         if (mutation.type === 'childList') {
			             console.log('Has New Feed');
			             // 有新推送则触发之
			             hasNewFeed = true;
			             $("#zh-main-feed-fresh-button").html('');
			             $.when($("#zh-main-feed-fresh-button")[0].click()).done(function() {
			                 setTimeout(function() {
			                     hasNewFeed = false;
			                 }, 1000);
			             });
			         }
			     });
			 };
			});
			
			//pass in the target node, as well as the observer options
			observer.observe(
			 $("#zh-main-feed-fresh-button")[0], {
			     childList: true
			 });
			
			//监听插入
			$('#js-home-feed-list').on("DOMNodeInserted", function(e) {
			 var $self = $(e.target);
			
			 if ($self.hasClass('feed-item')) {
			     if (hasNewFeed) {
			         $self.hide();
			         var $target = filterBtns[getTypeIndexByCodeName($self.attr('data-feedtype'))].find('.zg-num');
			         $target.html((parseInt($target.html()) || 0) + 1).removeClass('hide');
			         $targetZero.html((parseInt($targetZero.html()) || 0) + 1).removeClass('hide');
			     } else {
			         typeMatch($self);
			     }
			 }
          });
      }
    ;
    if (pageIs.Home){
    	if (!izhHomeFeedsColumns){
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
	            	    $filterInfo.filter('.nothing').hide();
	            	})
	            	.on('mouseleave',function(event){
	                    var $e=$(this)
	                      , $f=$e.children().last()
	                    ;
	            	    $f.trigger('hide');
	            	    $filterInfo.filter('.nothing').hide();
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
        }else{
        	feedsColumns();
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
