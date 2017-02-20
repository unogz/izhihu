/*
 * 黑名单迁徙
 */
if ( $(".settings-section").length ){
	$("#section-blocked-columns").after('<div id="section-blocked-columns" class="settings-section"><div class="settings-section-title"><h2>黑名单迁徙</h2><p class="settings-section-desc">获取名单：点击按钮，按钮会消失，名单在F12控制台内生成<br/>执行批量拉黑：将黑名单代码粘贴到左侧，点击按钮拉黑 </p></div><div class="settings-item clearfix"><div class="settings-item-content"><input class="zg-form-text-input" id="xa" type="text" placeholder="将黑名单代码粘贴到这里"> <button class="zg-btn-follow" id="xb"> 执行拉黑 </button> <button id="xget" class="zg-btn-follow" style="float:right">获得名单 </button></div></div></div>')
	
	$("#xget").click(function(){
		var xlist = []
		$(".avatar-link[href^='/people/']").each(function(){
			xlist.push( $(this).attr("href") )
		})
		$(this).remove()
		console.log( xlist.toString() )  //prompt输出有字符串长度限制？！
	})
	
	$("#xb").click(function(){
		if( $("#xa")[0].value == "" ){
			return
		}
		
		$("#xb").attr('disabled',"true").text("正在拉黑")

		window.xlist = $("#xa")[0].value.split(",")
		window.xsrf = "action=add&_xsrf=" + $("[name='_xsrf']").val()
		window.i=0

		window.xblock = setInterval(function (){
			var xpeople = xlist[i]

			$.get("/node/MemberProfileCardV2?params=%7B%22url_token%22%3A%22"+xpeople.slice(8)+"%22%7D"
			,function(xhr){  //typeof xhr --> string
				if( ! xhr.match("zg-btn-unfollow") ){  //不会拉黑自己的followees
					$.post( xpeople+"/block",xsrf )
				}
			})

			i++
			if( i >= xlist.length ){
				xblock = clearInterval(xblock)
				$("#xb").removeAttr('disabled').text("　执行拉黑（上一次拉黑已结束）　")
			}
		},180)
	})
	
}