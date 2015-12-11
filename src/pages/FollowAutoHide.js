/*
 * 关注问题自动匿名
 */
if (pageIs.FollowAutoHide){
	$(".follow-button").click(function () {
		$.post("http://www.zhihu.com/question/set_anonymous", 
		"qid=" + $(this).attr("data-id") + "&_xsrf=" + $("[name='_xsrf']").val()
		)
	})

	$("body").on("click", ".follow-link", function () {
		$.post("http://www.zhihu.com/question/set_anonymous", 
		"qid=" + $(this).attr("id").slice(4) + "&_xsrf=" + $("[name='_xsrf']").val()
		)
	})
}
