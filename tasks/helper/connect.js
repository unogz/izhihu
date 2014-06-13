var fs = require('fs');
var path = require('path');

module.exports = function (grunt) {
    grunt.config('connect.corsServer', {
        options: {
            port: 3000,
            debug: true,
            base: '<%= path.dest %>',
            keepalive: true,
            middleware: function (connect, options, middlewares) {
                return [ function (req, res, next) {

                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Headers', [
                        'X-Requested-With',
                        'X-HTTP-Method-Override',
                        'Content-Type',
                        'Accept'
                    ].join(','));
                    res.setHeader('Access-Control-Allow-Methods', '*');


                    var content = null;

                    console.log(options.base, req.url);

                    try {
                        content = fs.readFileSync(path.join(options.base[0], req.url), 'utf-8')
                    } catch (e) {
                        console.log(e);
                        return next();
                    }

                    res.end(content);
                }];
            }
        }
    });
};