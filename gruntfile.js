module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            views:      'source/views/',
            styles:     'source/sass/',
            imgs:       'source/images/',
            js:         'source/js/',
            public:     'public/'
        },
        pug: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [{
                    cwd: "<%= meta.views %>",
                    src: ["*.pug", "!*-bk.pug"],
                    dest: "public",
                    ext: ".html",
                    expand: true
                }]
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: "<%= meta.styles %>",
                    cssDir: '<%= meta.public %>css',
                    environment: 'production',
                    outputStyle: 'expanded',
                    sourcemap: true,
                    force: true
                }
            }
        },
        cssmin: {
            options: {
                advanced: false,
                keepBreaks: false,
                keepSpecialComments: 0
            },
            compress: {
                files: [{
                    '<%= meta.public %>css/plugins.min.css': 'source/css/libs/*.css',
                }]
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.imgs %>',
                    src: '**/*.{png, gif, jpg, jpeg, sgv, pdf}',
                    dest: '<%= meta.public %>images',
                    filter: 'isFile',
                    flatten: false
                }, {
                    expand: true,
                    src: '<%= meta.styles %>style.min.css',
                    dest: '<%= meta.public %>css',
                    flatten: true
                }, {
                    expand: true,
                    src: 'source/css/wordpress.css',
                    dest: '<%= meta.public %>css',
                    flatten: true
                }, {
                    expand: true,
                    src: 'source/fonts/*',
                    dest: '<%= meta.public %>fonts',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'source/js',
                    src: ['**/*.js','!**/libs/*.*'],
                    dest: 'public/js',
                    filter: 'isFile',
                    flatten: false
                }]
            }
        },
        uglify: {
            options: {
                compress: true,
                beautify: false,
                preserveComments: false
            },
            dist: {
                files: [{
                   "public/js/plugins.min.js": ['source/js/libs/jquery-2.2.5.min.js', 'source/js/libs/*.js']
                }]
            }
        },
        connect: {
            server: {
                options: {
                    port: 3008,
                    hostname: '*',
                    base: {
                        path: 'public/',
                        options: {
                            index: 'index.html',
                            maxAge: 300000
                        }
                    }
                }
            }
        },
        watch: [{
            files: "source/sass/**",
            tasks: ["compass"]
        }, {
            files: "source/views/**",
            tasks: ["pug"]
        }, {
            files: "source/js/libs/*",
            tasks: ["uglify"]
        },{
            files: "source/images/**",
            tasks: ["copy"]
        }, {
            files: "source/js/**",
            tasks: ["copy"]
        }, {
            files: "source/fonts/*",
            tasks: ["copy"]
        }, {
            files: "source/pdf/*",
            tasks: ["copy"]
        // }, {
        //     files: [ 'bower.json' ],
        //     tasks: [ 'exec:bower_install' ]
        }],
        // exec: {
        //     bower_install: {
        //         cmd: "bower install"
        //     }
        // },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'public/**/*.*',
                        'public/*.*'
                    ]
                },
                options: {
                    watchTask: true,
                    open: true,
                    server: './public/'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.file.expand('./node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
    // grunt.registerTask('default', ['pug', 'compass', 'cssmin', 'bower_concat', 'uglify','copy', 'connect:server', 'browserSync', 'watch']);
    grunt.registerTask('default', ['pug', 'compass', 'cssmin', 'uglify','copy', 'connect:server', 'browserSync', 'watch']);
};
