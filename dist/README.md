发布目录,用于存放打包后的userscript或crx

打包方法：

- 安装nodejs
- 安装spm： `npm install spm -g`
- 进入源码根目录, 执行`spm build`或`makefile.bat` (后者会生成压缩过的文件:izhihu-output.js)
- 生成的文件在dist里
