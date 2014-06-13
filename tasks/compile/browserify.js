var gulp = require('vinyl-fs');

var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

var stylusify = require('./lib/stylusify');
var jadify = require('./lib/jadify');

var nib = require('nib');
var path = require('path');


module.exports = function (grunt) {


    var baseOpts = {
        globals: {
            './jquery/dist/jquery.js': {
                expose: 'jquery',
                basedir: path.join(process.cwd(), 'bower_components')
            },
            './purl/purl.js': {
                expose: 'purl',
                basedir: path.join(process.cwd(), 'bower_components')
            }
        },
        extensions: ['.styl', '.jade'],
        transform: [
            [
                {
                    use: [nib()],
                    import: [
                        'nib'
                    ]
                },
                stylusify
            ],
            jadify
        ]
    };

    grunt.registerTask('browserify', function () {

            var done = this.async();

            entryModules(Object.create(baseOpts), function () {
                done();
            });

            function entryModules(options, callback) {

                options['external'] = options['external'] || [];

                Object.keys(options['globals']).forEach(function (key) {
                    options['external'].push(options['globals'][key].expose);
                });

                gulp.src('src/modules/**/index.js', {read: false})
                    .pipe(browserify(options))
                    .pipe(rename(function (pathObj) {
                        pathObj.basename = pathObj.dirname;
                        pathObj.dirname = '';
                    }))
                    .pipe(gulp.dest(path.join(grunt.config('path.dest'), 'modules')))
                    .on('end', function () {
                        callback();
                    });
            }
        }
    );

    grunt.registerTask('browserify.libs', function () {

            var done = this.async();

            globalModules(Object.create(baseOpts), function () {
                done();
            });


            function globalModules(options, callback) {

                if (options['globals']) {

                    var globals = Object.keys(options['globals']);
                    var cnt = 0;

                    globals.forEach(function (key) {

                        options['external'] = options['external'] || [];

                        Object.keys(options['globals']).forEach(function (keyName) {
                            if (key !== keyName) {
                                options['external'].push(options['globals'][keyName].expose);
                            }
                        });

                        gulp.src(path.join(options['globals'][key].basedir, key), {read: false})
                            .pipe(browserify(options))
                            .on('prebundle', function (bundler) {
                                bundler.require(key, options['globals'][key]);
                            })
                            .pipe(gulp.dest(path.join(grunt.config('path.dest'), 'lib')))
                            .on('end', function () {
                                cnt++;
                                if (cnt === globals.length) {
                                    callback();
                                }
                            });
                    });

                } else {
                    callback()
                }


            }

        }
    );

    grunt.config('watch.browserify', {
        files: [
            path.join(grunt.config('path.src'), 'modules/{,*/}*{.js,.jade,.styl}'),
            path.join(grunt.config('path.src'), 'components/{,*/}*{.js,.jade,.styl}')
        ],
        tasks: ['browserify'],
        option: {
            livereload: true
        }
    });


};