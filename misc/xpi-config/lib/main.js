var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
pageMod.PageMod({
  include: "*.zhihu.com",
  contentScriptWhen: 'ready',
  contentScriptFile: [data.url("jquery-1.8.2.min.js"),data.url("jquery.checkbox.min.js"),data.url("clientutils.js"),data.url("drag.js"),data.url("purl.js"),data.url("underscore-min.js"),data.url("izhihu.js")]
});
