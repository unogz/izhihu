module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json')
    grunt.initConfig({
        version: [ pkg.version, pkg.buildNum ].join('.') //
        ,
        buildNum: parseInt(pkg.buildNum)
        ,
        dist: 'dist' //
        ,
        filename: pkg.name //

        // 合并 js 文件
        // 文档 https://github.com/gruntjs/grunt-contrib-concat
        ,
        concat: {
            dist: {
                options: {
                    // banner: '<%= meta.modules %>\n'
                },
                src: [
                    'src/begin.js',
                    "src/lib/*.js",
                    'src/izhihu.js',
                    "src/modules/*.js",
                    "src/pages/*.js",
                    "src/end.js"
                ], //src filled in by build task
                dest: '<%= dist %>/<%= filename %>.js'
            },
            distUserscript: {
                src: [
                    "src/meta.js",
                    "<%= dist %>/<%= filename %>.js"
                ], //src filled in by build task
                dest: '<%= dist %>/<%= filename %>.user.js'
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
                src: ['<%= dist %>/<%= filename %>.js'],
                dest: '<%= dist %>/<%= filename %>.min.js'
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
                        '<%= dist %>/<%= filename %>.js',
                        'misc/crx-config/manifest.json',
                        'misc/crx-config/*.png',
                        'import/*'
                    ],
                    dest: '<%= dist %>/iZhihu for Chrome/'
                }]
            },
            toFirefox1: {
                files: [{
                    expand: true,
                    flatten: false,
                    cwd: 'misc/xpi-config',
                    src: [
                        '**',
                    ],
                    dest: '<%= dist %>/iZhihu for Firefox/'
                }]
            },
            toFirefox2: {
                files: [{
                    expand: true,
                    filter: 'isFile',
                    flatten: true,
                    src: [
                        'import/*'
                    ],
                    dest: '<%= dist %>/iZhihu for Firefox/data/'
                }]
            },
            toSafari: {
                files: [{
                    expand: true,
                    filter: 'isFile',
                    flatten: true,
                    src: [
                        'misc/ext-config/**',
                        '<%= dist %>/izhihu.js',
                        'import/*'
                    ],
                    dest: '<%= dist %>/iZhihu.safariextension/'
                }]
            }
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
        ,
        'string-replace': {
            dist_safari: {
                files: {
                    'dist/iZhihu.safariextension/Info.plist': 'dist/iZhihu.safariextension/Info.plist'
                },
                options: {
                    replacements: [{
                        pattern: '[version]',
                        replacement: '<%= version %>'
                    }]
                }
            }
            ,
            dist_chrome: {
                files: {
                    'dist/iZhihu for Chrome/blue.css': 'dist/iZhihu for Chrome/blue.css'
                },
                options: {
                    replacements: [{
                        pattern: 'url(blue.png)',
                        replacement: 'url("chrome-extension://__MSG_@@extension_id__/blue.png")'
                    },{
                        pattern: 'url(blue@2x.png)',
                        replacement: 'url("chrome-extension://__MSG_@@extension_id__/blue@2x.png")'
                    }]
                }
            }
        }
    });

    // 设定 任务
    grunt.registerTask('default', ['concat']);


    grunt.registerTask('buildnum', 'build num +1', function() {
        var manifest = grunt.file.readJSON('./package.json');

        var buildNum = grunt.config('buildNum') + 1;//parseInt(manifest.buildNum) + 1;

        manifest.buildNum = [ buildNum ].join();

        console.log('cur build', [ manifest.versions, buildNum ].join('.'));

        grunt.file.write('./package.json', JSON.stringify(manifest));
    });


    grunt.registerTask('updateManifest', 'update crx manifest', function() {
        var manifest = grunt.file.readJSON('./dist/iZhihu for Chrome/manifest.json');
        manifest.version = grunt.config('version')// + '.' + manifest.version.split('.')[3];
        grunt.file.write('./dist/iZhihu for Chrome/manifest.json', JSON.stringify(manifest));
    });

    grunt.registerTask('updateManifestXPI', 'update xpi manifest', function() {
        var manifest = grunt.file.readJSON('./dist/iZhihu for Firefox/package.json');
        manifest.version = grunt.config('version');
        grunt.file.write('./dist/iZhihu for Firefox/package.json', JSON.stringify(manifest));
    });

    grunt.registerTask('chrome', ['copy:toChrome', 'updateManifest', 'string-replace']);
    grunt.registerTask('firefox', ['copy:toFirefox1', 'copy:toFirefox2', 'updateManifestXPI']);
    grunt.registerTask('safari', ['copy:toSafari', 'string-replace']);

    grunt.registerTask('buildall', ['default', 'chrome', 'firefox', 'safari'])

    grunt.registerTask('test', '', function(){// using this task to test code for grunt
        console.log(grunt.config('version'))
    })

    return grunt;
};