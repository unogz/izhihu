/*
 * 点赞自动匿名、关注【此处需要两个开关接口】
 */
if (pageIs.UpAutoFollowHide){
	$("body").on("click", "button.up", function () {
		var xq
		if ($(this).parent(".goog-scrollfloater-floating").length) { //获得qid
			xq = $("[style^='visibility: hidden; position: static; top: au']")
			.parent().find("[data-resourceid]").attr("data-resourceid")
		} else {
			xq = $(this).parent().parent().find("[data-resourceid]").attr("data-resourceid")
		}
		
		//匿名
		$.post("http://www.zhihu.com/question/set_anonymous", 
		"qid=" + xq + "&_xsrf=" + $("[name='_xsrf']").val()
		)
		
		//关注
		$.post("http://www.zhihu.com/node/QuestionFollowBaseV2",
		"method=follow_question&params=%7B%22question_id%22%3A%22" + xq + "%22%7D&_xsrf=" + $("[name='_xsrf']").val()
		)
	})
}
