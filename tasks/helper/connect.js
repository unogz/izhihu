module.exports = function (grunt) {
    grunt.config('connect.devServer', {
        options: {
            port: 3000,
            base: '<%= path.dest %>',
            keepalive: true
        }
    });
};