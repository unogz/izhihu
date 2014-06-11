var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
pageMod.PageMod({
  include: "*.zhihu.com",
  contentScriptWhen: 'ready',
  contentScriptFile: [data.url("init4XPI.js"),data.url("izhihu.js")]
});
