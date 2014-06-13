module.exports = function (grunt) {
    grunt.config('copy.chrome', {
        files: [
            {
                expand: true,
                filter: 'isFile',
                flatten: true,
                src: [
                    '<%= path.dest %>/modules/loader.js',
                    'misc/crx-config/init4CRX.js',
                    'misc/crx-config/manifest.json'
                ],
                dest: '<%= path.dist %>/iZhihu for Chrome/'
            }
        ]
    });


    grunt.registerTask('buildnum', 'build num +1', function () {
        var manifest = grunt.file.readJSON('./misc/crx-config/manifest.json');
        var versions = manifest.version.split('.');
        versions[3] = parseInt(versions[3]) + 1;
        manifest.version = versions.join('.');
        console.log('cur build', versions[3]);
        grunt.file.write('./misc/crx-config/manifest.json', JSON.stringify(manifest));
    });


    grunt.registerTask('updateManifest', 'update crx manifest', function () {
        var manifest = grunt.file.readJSON('./misc/crx-config/manifest.json');
        manifest.version = grunt.config('version') + '.' + manifest.version.split('.')[3];
        manifest.content_scripts[0].js = ['init4CRX.js', grunt.config('filename') + '.js'];
        grunt.file.write('./misc/crx-config/manifest.json', JSON.stringify(manifest));
    });

    grunt.registerTask('chrome', ['default', 'updateManifest', 'copy:chrome']);
};