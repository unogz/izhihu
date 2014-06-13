module.exports = function (grunt) {

    grunt.config('path', {
        dest: 'public',
        dist: 'dist',
        tmp: '.tmp',
        src: 'src'
    });

    grunt.loadTasks('tasks/compile');
    grunt.loadTasks('tasks/helper');


    grunt.config('clean.dev', {
        src: [
            '<%= path.dest %>'
        ]
    });


    grunt.config('concurrent.dev', {
        tasks: ['connect:corsServer', 'watch'],
        options: {
            logConcurrentOutput: true
        }
    });


    grunt.registerTask('build', ['clean:dev', 'browserify.libs', 'browserify', 'copy:chrome']);

    grunt.registerTask('default', ['build', 'concurrent:dev']);

    return grunt;
};