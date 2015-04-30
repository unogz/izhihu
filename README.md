# iZhihu 我爱知乎

## 它是什么

**What we do:**

- 「知乎」（[www.zhihu.com](www.zhihu.com)）是一个类似 Quora.com 的 SNS 问答社区。
- 此脚本用于在「知乎」当前产品的基础上满足用户自身需要，对「知乎」产品本身不产生任何影响。
- 基于对知乎的热爱，而目前知乎还在进化中，一些知友广泛需求的小功能还不能及时满足。
- 所以我们希望能对知乎社区有所回馈，不是简单的知乎反馈，而是通过我们的技术去改造去帮助知乎试错。
- 并希望若某些功能经过一段时间知友的使用/完善/认可后，知乎团队能考虑整合进去，方便更多的用户。

**What we don't:**

- 数据挖掘类的需求，我们会谨慎评估。
- 一方面因为我们是基于个人浏览器前端的，并无法获取到太多数据，也不希望抓取太多知乎的数据进行二次分析。
- 因为那由知乎自己来做效果会更好,另一方不希望本插件被滥用。

**更新历史**

[http://zhuanlan.zhihu.com/izhihu/19566032](http://zhuanlan.zhihu.com/izhihu/19566032)

**主要功能（标记 * 的功能为可配置选项）**

- *美化包括首页布局在内的大多数常用页面样式外观
- *滚动页面至下方时，自动收起顶部导航栏
- *将回答者信息挪至回答的下方
- *在页面右侧浮动弹出评论列表及输入框
- *快速屏蔽/取消关注评论列表、赞同列表中的用户
- *快速收藏（原收藏按钮处浮动弹出菜单）
- *问题页回答目录（预览及跳转，回答数超过 100 条时将提示是否关闭）
- *查看全部搜索结果使用「外部搜索引擎」（Google、百度）
- 首页动态过滤选项
- 首页条目展开后在赞同/反对按钮下提供「收起」
- 原评论列表底部提供「收起」按钮
- 自动展开「折叠区」
- 问题下方提供「我要回答」、「我的回答」跳转
- 收藏、回答列表的地址清单导出
- 「消息通知列表」内提供「隐藏已读」开关
- 搜索结果「在新页面打开」

## 下载安装

**使用浏览器扩展**

- iZhihu for Chrome：[https://chrome.google.com/webstore/detail/izhihu/omcldpfdihfogiklcdlopeokkedbhjop](https://chrome.google.com/webstore/detail/izhihu/omcldpfdihfogiklcdlopeokkedbhjop) 
- iZhihu for Firefox：[https://addons.mozilla.org/zh-CN/firefox/addon/izhihu/](https://addons.mozilla.org/zh-CN/firefox/addon/izhihu/) 
- iZhihu for Safari：[http://izhihu.unogz.com/safari/iZhihu.safariextz](http://izhihu.unogz.com/safari/iZhihu.safariextz) 

**使用油猴脚本**

- Chrome 推荐使用扩展：「[Tampermonkey](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)」
- Firefox 推荐使用扩展：「[Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)」
- iZhihu 脚本：[https://greasyfork.org/scripts/350-izhihu](https://greasyfork.org/scripts/350-izhihu) 

## 码农醒目

- 安装 Node.js：[http://nodejs.org/](http://nodejs.org/)
- 安装 Grunt：在命令行（终端）运行 `npm install -g grunt-cli`（ Grunt 入门：[http://www.gruntjs.net/docs/getting-started/](http://www.gruntjs.net/docs/getting-started/)）
- 安装依赖库：
	1. 将命令行（终端）的当前目录转到项目的根目录下
	2. 执行 `npm install` 命令安装项目依赖的库
- build：
	1. 将命令行（终端）的当前目录转到项目的根目录下
	2. 执行 `grunt buildall`（更多配置请查看 grunt/config.js ）
	3. 生成内容位于 dist 目录下

## 关于我们

**知乎专栏**

[http://zhuanlan.zhihu.com/izhihu](http://zhuanlan.zhihu.com/izhihu)

**代码仓库**

[https://github.com/unogz/izhihu](https://github.com/unogz/izhihu)

**贡献者**

- [@钢盅郭子](http://www.zhihu.com/people/unogzx)
- [@刘勇](http://www.zhihu.com/people/liuyong25)
- [@罗大睿](http://www.zhihu.com/people/luoxr)
- [@墨磊](http://www.zhihu.com/people/morlay)

**欢迎您的加入或反馈**
