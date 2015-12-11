/*
 * 反对自动没有帮助
 */
if (pageIs.DownAutoNoHelp){
	if( window.location.pathname.match(/\/question\/\d+/) ){  //如果在问题页面内（知乎的前端「真棒」）
		$("body").on("click","button.down",function (){
			if ( $(this).parent(".goog-scrollfloater-floating").length ) {
				$("[style^='visibility: hidden; position: static; top: au']")
				.parent().find('[name="nohelp"]')[0].click()  
			} else {
				$(this).parent().parent().find('[name="nohelp"]')[0].click()
			}
		})
	} else {
		$("body").on("click","button.down",function (){
			if ( $(this).parent(".goog-scrollfloater-floating").length ) {
				$("[style^='visibility: hidden; position: static; top: au']")
				.parent().parent().find('[name="nohelp"]')[0].click()  
			} else {
				$(this).parent().parent().parent().find('[name="nohelp"]')[0].click()
			}  //此处jQuery无效，所以使用浏览器方法
		})
	}
}