var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
pageMod.PageMod({
  include: "*.zhihu.com",
  contentStyleFile: data.url("blue.css"),
  contentScriptWhen: 'ready',
  contentScriptFile: [data.url("jquery-1.8.2.min.js"),data.url("jquery-ui.min.js"),data.url("icheck.min.js"),data.url("purl.js"),data.url("underscore-min.js"),data.url("izhihu.js")]
});
