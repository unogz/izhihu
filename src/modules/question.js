/**
 * 问题页
 */
$(function(){
  if(page =='question'){
    //答案按时间排序
    if(utils.getCfg('answer_orderByTime')){
      client.click('.zh-answers-filter-popup div[data-key=added_time]');
    }
  }
})