/*
 * 专栏评论自动展开
 */
window.xload = setInterval(function() {
	if ( $(".load-more").length ) {
		$('[ng-click="source.fetch()"]').click()
	} else {
		xload = clearInterval(xload)
	}
},350)