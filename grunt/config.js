module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json') //
        ,
        version: '<%= pkg.version %>' //
        ,
        dist: 'dist' //
        ,
        filename: '<%= pkg.name %>' //

        // 合并 js 文件
        // 文档 https://github.com/gruntjs/grunt-contrib-concat
        ,
        concat: {
            dist: {
                options: {
                    // banner: '<%= meta.modules %>\n'
                },
                src: [

                    "src/meta.js",
                    "src/jquery.min.js",
                    "src/import/*.js",
                    "src/lib/*.js",
                    'src/izhihu.js',
                    "src/modules/*.js",
                    "src/end.js"
                ], //src filled in by build task
                dest: '<%= dist %>/<%= filename %>-<%= version %>.js'
            }
        }
        // 压缩 js 文件
        // 文档 https://github.com/gruntjs/grunt-contrib-uglify
        ,
        uglify: {
            options: {
                mangle: true, // 是否替换变量名
                report: 'gzip'
            },
            dist: {
                src: ['<%= dist %>/<%= filename %>-<%= version %>.js'],
                dest: '<%= dist %>/<%= filename %>-<%= version %>.min.js'
            },
        }
        // copy 文档
        // 文档 https://github.com/gruntjs/grunt-contrib-copy
        ,
        copy: {
            toChrome: {
                files: [{
                    expand: true,
                    filter: 'isFile',
                    flatten: true,
                    src: [
                        '<%= dist %>/<%= filename %>-<%= version %>.js',
                        'misc/crx-config/init4CRX.js',
                        'misc/crx-config/manifest.json'
                    ],
                    dest: 'iZhihu for Chrome/package'
                }, {
                    expand: true,
                    flatten: true,
                    filter: 'isFile',
                    src: [
                        'misc/crx-config/iZhihu for Chrome.pem'
                    ],
                    dest: 'iZhihu for Chrome/'
                }]
            },
        }
        // 监控文件变化并动态执行任务
        // 如下设置是 js 文件夹的任一 js 文件有变化则执行合并
        // 文档 https://github.com/gruntjs/grunt-contrib-watch
        ,
        watch: {
            scripts: {
                files: ['src/**/**.js'],
                tasks: ['chrome']
            }
        }
    });

    // 设定 任务
    grunt.registerTask('default', ['concat', 'uglify']);


    grunt.registerTask('buildnum', 'build num +1', function() {
        var manifest = grunt.file.readJSON('./misc/crx-config/manifest.json');

        var versions = manifest.version.split('.');

        versions[3] = parseInt(versions[3]) + 1;

        manifest.version = versions.join('.');

        console.log('cur build', versions[3]);

        grunt.file.write('./misc/crx-config/manifest.json', JSON.stringify(manifest));
    });


    grunt.registerTask('updateManifest', 'update crx manifest', function() {
        var manifest = grunt.file.readJSON('./misc/crx-config/manifest.json');
        manifest.version = grunt.config('version') + '.' + manifest.version.split('.')[3];
        manifest.content_scripts[0].js = ['init4CRX.js', grunt.config('filename') + '-' + grunt.config('version') + '.js'];
        grunt.file.write('./misc/crx-config/manifest.json', JSON.stringify(manifest));
    });

    grunt.registerTask('chrome', ['concat', 'updateManifest', 'copy:toChrome']);

    return grunt;
};