/**
 * Grunt configuration file.
 *
 * @param {*} grunt - Grunt.
 */
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Replaces watch:devBuild.tasks for modules
        concurrent: {
            testAndBuildDev: {
                main: ['exec:mocha', 'esbuild:dev'],
            }
        },
        watch: {
            devBuild: {
                files: ['app.js', 'js/*.js'],
                tasks: ['esbuild:dev', 'exec:mocha'],
                options: {
                    livereload: true
                },
            },
            cssConcatenation: {
                files: ['css/*.css', '!css/main.css'],
                tasks: ['concat:css'],
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
                entryPoints: ['app.js'],
                outfile: './dist/client.min.js',
                bundle: true,
                minify: true
            },
            dev: {
                entryPoints: ['app.js'],
                outfile: './out.js',
                bundle: true,
                sourcemap: true,
            }
        },
        concat: {
            css: {
                options: {
                    separator: '\n',
                },
                src: [
                    'css/0-noscript.css',
                    'css/1-root.css',
                    'css/2-contents.css'
                ],
                dest: 'css/main.css'
            }
        },
        cssmin: {
            options: {},
            target: {
                files: {
                    'css/main.min.css': ['css/main.css']
                }
            }
        }
    });

    // Load the plugin that provides the tasks.
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-esbuild');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('test', ['exec:mocha']);
    grunt.registerTask('dist', ['esbuild', 'cssmin']);
};
