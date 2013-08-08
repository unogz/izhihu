// 安装 node.js
// 安装 grunt - 在控制台（ window 运行 cmd）输入 npm install -g grunt-cli 即可
// 项目目录 npm install  安装关联库
// grunt 执行相关任务 (在目录下)

// 定义 grunt 的设置
module.exports = function (grunt) {

    // 根据 package.json 获取 NpmTasks 并 loadNpmTasks 所用用到了什么常用 任务在 package.json 配置即可
    var npmTaskNames = JSON.stringify(grunt.file.readJSON('package.json').devDependencies).match(/grunt\-[^"^']+/g)
        , i = npmTaskNames.length;

    while (i--) {
        grunt.loadNpmTasks(npmTaskNames[i]);
    }

    // 引入配置 与 任务
    require('./grunt/config.js')(grunt);

    return grunt;
};