/*
 * 只显示有图答案
 */
if ( $('.zh-answers-title.clearfix').length ) {  //如果在问题页面内
	window.xcancel = function (){
		$('.zm-item-answer').show()
	}
	
	window.xonlyimages = function (){
		$('.zm-item-answer').hide()
		$('img[data-actualsrc]').closest('.zm-item-answer').show()
	}
	
    $("#zh-question-answer-num")
    .after(" <input type='checkbox' id='xfilter' />")
	.after(" <label for='xfilter'>　只显示有图答案</label>")

    $('#xfilter').click(function(){
		if( this.checked ){
			xonlyimages()
		}else{
			xcancel()
		}
    })
    
    setTimeout(function(){
        $('.zg-btn-white.zu-button-more')[0].addEventListener("click",function(){  //此处jQuery无效，所以使用浏览器方法
            if( ! $('#xfilter')[0].checked ){
                return
            }
            window.xtemp = setInterval(function(){
                if( ! $('.loading').length ){
                    xonlyimages()
                    xtemp = clearInterval(xtemp)
                }
            },350)
        })
    },180)
}
