var firstRun = parseInt(utils.getValue('izh_fr','1'));

function _FRshow(){
if(firstRun>0 && document.domain=='zhihu.com'){
    var tboxleft=0;
    var accitem1= $('#zh-top-inner div.top-nav-profile .zu-top-nav-userinfo');
    if(accitem1.length>0){
        tboxleft = accitem1.offset().left;
    }
    if(tboxleft>0){
        $('<div id="iZhihu_tbox" class="t_frshow"><div class="t_txtshow t_tbox">感谢使用 <b>iZhihu</b><br />您可通过菜单【iZhihu】对功能进行设置<br /><s><i></i></s></div></div>').appendTo('body.zhi').hide();
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
 
if(typeof window.iZhihu4CRX === 'undefined' || !window.iZhihu4CRX){
    //helper method to auto update
    function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
      try {
        if (!utils.getValue) return; // Older version of Greasemonkey. Can't run.
    
        // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
        // and a script with * includes or opening a tabgrop
        var DoS_PREVENTION_TIME = 2 * 60 * 1000;
        var isSomeoneChecking = utils.getValue('izh-CHECKING', null);
        var now = new Date().getTime();
        //utils.setValue('izh-CHECKING', now.toString());
    
        //if (!SCRIPT.forceUpdate && isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;
    
        // check daily
        var ONE_DAY = 24 * 60 * 60 * 1000;
        //var ONE_WEEK = 7 * ONE_DAY;
        //var TWO_WEEKS = 2 * ONE_WEEK;
        var lastChecked = utils.getValue('izh-LAST_CHECKED', null);
        //if (!SCRIPT.forceUpdate && lastChecked && (now - lastChecked) < ONE_DAY) return;
    
    GM_xmlhttpRequest({
      method: 'GET',
        url: SCRIPT.url.replace('.user.','.meta.') + '?'+new Date().getTime(), // don't increase the 'installed' count just for update checks
        headers: {'Cache-Control': 'no-cache'},
        onload: function(result) {
              if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header
        
              var theOtherVersion = RegExp.$1;
              var verList1 = RegExp.$1.split('.');
              var verList2 = SCRIPT.version.split('.');
              var isOldVersion = false;
              for(var i=0;i<verList1.length;i++){
                if(i<verList2.length){
                  if(parseInt(verList1[i])>parseInt(verList2[i])){
                    isOldVersion = true;
                    break;
                  }else{
                    
                  }
                }else{
                  break;
                }
              }
              if (!isOldVersion)
            {
              // no updates or older version on userscripts.orge site
              if(SCRIPT.forceUpdate)
              {
                alert("您当前所安装的 v" + SCRIPT.version + " 是最新版本，无需更新。")
              }
              return;
            }
            //find the name of the script
            result.responseText.match(/@name\s+(.+)/);
            var scriptName = RegExp.$1;
            result.responseText.match(/@updateinfo\s+(.+)/);
            var updateInfo = RegExp.$1;
            updateInfo = updateInfo.replace(/\|/g,'<br>');
            _ShowUpdate(scriptName,SCRIPT.version,theOtherVersion,updateInfo,SCRIPT.web,SCRIPT.url);
           }
        });
        //utils.setValue('izh-LAST_CHECKED', now.toString());
      } catch (ex) {
          console.log(ex);
      }
    }
    
    function _ShowUpdate(p_name,p_cur_ver,p_new_ver,p_updateinfo,p_weburl,p_scripturl){
        var domDlgSettings = [
          '<div id="izh-dlg-update" class="modal-dialog" tabindex="0" style="display:none;width:500px">',
            '<div class="modal-dialog-title modal-dialog-title-draggable">',
              '<span class="modal-dialog-title-text">更新提示</span>',
              '<span class="modal-dialog-title-close"></span>',
            '</div>',
            '<div class="modal-dialog-content">',
              '<div>',
                '<div class="zg-section">',
                  '<table class="t_set_tb"border="0"cellspacing="0"cellpadding="0"width="100%"><thead><tr><td colspan="2"align="left"><b>脚本：'+p_name+'</b></td></tr></thead><tr><th style="width:20%;">当前版本</th><td style="width:80%;">'+p_cur_ver+'</td></tr><tr><th>最新版本</th><td>'+p_new_ver+'</td></tr><tr><th>更新内容</th><td class="t_upinfo">'+p_updateinfo+'</td></tr><tfoot><tr><td colspan="2"style="line-height:15px">提示：脚本更新安装完毕后请刷新当前页面</td></tr></tfoot></table>',
                  '</div>',
                  '<div class="zm-command">',
                  '<span href="javascript:void(0);" class="zm-command-cancel izh-cancel">取消</span>',
                  '<span class="zg-btn-blue izh-update" href="javascript:void(0);">更新</span>',
                '</div>',
              '</div>',
            '</div>',
          '</div>'
        ].join('');
        
        var $dlg=$(domDlgSettings).appendTo(_doc.body)
        ;
        $dlg.drags({handler:'.modal-dialog-title-draggable'});
        $dlg.find('.modal-dialog-title-close').click(function(){
            $(this).closest('.modal-dialog').hide();
            $('.modal-dialog-bg').hide();
        });
        $dlg.find('.izh-cancel').click(function(){
    	    $(this).closest('.modal-dialog').hide();
            $('.modal-dialog-bg').hide();
    	});
        $dlg.find('.izh-update').click(function(){
            GM_openInTab(p_scripturl);
            //GM_openInTab(p_weburl);
    	    //$(this).closest('.modal-dialog').hide();
            //$('.modal-dialog-bg').hide();
    	});
        $('.modal-dialog-bg').show();
        $dlg.css({
            'z-index':'123'
          , 'position':'fixed'
          , 'top': ($win.height() - $dlg.height()) / 2
          , 'left': ($win.width() - $dlg.width()) / 2
        }).fadeIn('slow');
    }
    
    function update(forceUpdate)
    {
      autoUpdateFromUserscriptsDotOrg({
        url: 'http://userscripts.org/scripts/source/126619.user.js',
        version: version,
        forceUpdate: forceUpdate,
        web: 'http://userscripts.org/scripts/show/126619'
      });
    }
    
    if(GM_registerMenuCommand){
        GM_registerMenuCommand('从 userscript.org 更新 iZhihu',function(){update(true)});
    }

    update(false);
}
