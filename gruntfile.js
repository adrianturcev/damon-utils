/**
 * Grunt configuration file.
 *
 * @param {*} grunt - Grunt.
 */
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            devBuild: {
                files: ['main.js', 'DamonUtils.js'],
                tasks: ['esbuild:dev', 'exec:mocha'],
                options: {
                    livereload: true
                },
            },
            tests: {
                files: ['tests/*.js'],
                tasks: ['exec:mocha'],
                options: {
                    livereload: true
                },
            },
        },
        exec: {
            mocha: {
                command: 'npx mocha tests/main.test.js --parallel --slow 0',
            },
        },
        esbuild: {
            options: {
                buildFunction: require('esbuild').build
            },
            prod: {
                entryPoints: ['main.js'],
                outfile: './dist/damon-utils.min.js',
                bundle: true,
                minify: true
            },
            dev: {
                entryPoints: ['main.js'],
                outfile: './out.js',
                bundle: true,
                sourcemap: true,
            }
        }
    });

    // Load the plugin that provides the tasks.
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-esbuild');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('test', ['exec:mocha']);
    grunt.registerTask('dist', ['esbuild:prod']);
};
