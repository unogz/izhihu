var firstRun = parseInt(utils.getValue('izh_fr','1'));

function _FRshow(){
if(firstRun>0 && document.domain=='zhihu.com'){
    var tboxleft=0;
    var accitem1= $('#zh-top-inner div.top-nav-profile .zu-top-nav-userinfo');
    if(accitem1.length>0){
        tboxleft = accitem1.offset().left;
    }
    if(tboxleft>0){
        $('<div>', { id: 'iZhihu_tbox', 'class': 't_frshow' }).appendTo('body.zhi').hide()
            .append($('<div>', { 'class': 't_txtshow t_tbox' })
                .append('感谢使用')
                .append($('<b>', { html: 'iZhihu' }))
                .append($('<br />'))
                .append('您可通过菜单【iZhihu】对功能进行设置')
                .append($('<br />'))
                .append($('<s>')
                    .append($('<i>'))
                )
            );
        $('#iZhihu_tbox').css('left',tboxleft-100).show().mouseenter(function(){
            utils.setValue('izh_fr','0');
            //_Menu();
                $(this).remove();
            });
        }
    }
}
    
setTimeout(function(){
    _FRshow();
},1000);


  console.log('iZhihu '+version+' started.');
  //console.log(window.iZhihu);
  //console.log((new Date()).getTime());
//});
