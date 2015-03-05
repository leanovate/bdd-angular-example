/*jslint node: true */
'use strict';

var pkg = require('./package.json');

//Using exclusion patterns slows down Grunt significantly
//instead of creating a set of patterns like '**/*.js' and '!**/node_modules/**'
//this method is used to create a set of inclusive patterns for all subdirectories
//skipping node_modules, _bc, dist, and any .dirs
//This enables users to create any directory structure they desire.
var createFolderGlobs = function(fileTypePatterns, withSrcPrefix) {
    fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
    var ignore = ['node_modules', 'bower_components', 'dist', 'temp'];
    var fs = require('fs');
    var srcWithPattern = fileTypePatterns.map(function(pattern) {
        return 'src/' + pattern;
    });
    return fs.readdirSync('./src')
        .map(function(file) {
            if(ignore.indexOf(file) !== -1 ||
                file.indexOf('.') === 0 || !fs.lstatSync('./src/' + file).isDirectory()) {
                return null;
            } else {
                return fileTypePatterns.map(function(pattern) {
                    return (withSrcPrefix ? 'src/' : '') + file + '/**/' + pattern;
                });
            }
        })
        .filter(function(patterns) {
            return patterns;
        })
        .concat(srcWithPattern);
};

module.exports = function(grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    var modRewrite = require('connect-modrewrite');

    var mountFolder = function(connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    /* configure rewrites for html5 mode */
    var middlewares = function(connect) {
        return [
            modRewrite(['^[^\\.]*$ /index.html [L]']),
            modRewrite(['^temp/app.css$ /temp/app.css [L]']),
            connect().use(
                '/temp',
                mountFolder(connect, './temp')
            ),
            connect().use(
                '/bower_components',
                mountFolder(connect, './bower_components')
            ),
            mountFolder(connect, 'src')
        ];
    };

    // Project configuration.
    grunt.initConfig({
        connect: {
            main: {
                options: {
                    port: '9001',
                    middleware: middlewares
                }
            },
            test: {
                options: {
                    port: '9002',
                    middleware: middlewares
                }
            }
        },
        watch: {
            options: {
                spawn: false
            },
            livereload: {
                options: {
                    livereload: true,
                    livereloadOnError: false
                },
                files: [
                    createFolderGlobs(['*.js', '*.html'], true),
                    '!*.spec.js',
                    '!_SpecRunner.html',
                    'temp/app.css'
                ]
            },
            main: {
                files: [
                    createFolderGlobs(['*.js', '*.html', '*.feature'], true), '!_SpecRunner.html', '!.grunt'
                ],
                tasks: [] //all the tasks are run dynamically during the watch event handler
            },
            less: {
                files: [createFolderGlobs(['*.less'], true)],
                tasks: ['less:development'],
                options: {
                    spawn: true
                }

        },
            css: {
                files: ['temp/app.css']
            }
        },
        jshint: {
            main: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: createFolderGlobs('*.js', true)
            }
        },
        clean: {
            before: {
                src: ['dist', 'temp']
            },
            after: {
                src: ['temp']
            }
        },
        less: {
            production: {
                options: {},
                files: {
                    'temp/app.css': 'src/app.module.less'
                }
            },

            development: {
                options: {},
                files: {
                    "temp/app.css": "src/app.module.less" // destination file and source file
            }
            }
        },
        ngtemplates: {
            main: {
                options: {
                    module: pkg.name,
                    htmlmin: '<%= htmlmin.main.options %>'
                },
                src: [createFolderGlobs('*.html'), '!index.html', '!_SpecRunner.html'],
                dest: 'temp/templates.js',
                cwd: 'src/'
            }
        },
        copy: {
            main: {
                files: [
                    {src: ['img/**'], dest: 'dist/'},
                    {
                        src: ['bower_components/font-awesome/fonts/**'],
                        dest: 'dist/',
                        filter: 'isFile',
                        expand: true
                    },
                    {
                        src: ['bower_components/bootstrap/fonts/**'],
                        dest: 'dist/',
                        filter: 'isFile',
                        expand: true
                    }
                    //{src: ['bower_components/angular-ui-utils/ui-utils-ieshiv.min.js'], dest: 'dist/'},
                    //{src: ['bower_components/select2/*.png','bower_components/select2/*.gif'], dest:'dist/css/',flatten:true,expand:true},
                    //{src: ['bower_components/angular-mocks/angular-mocks.js'], dest: 'dist/'}
                ]
            }
        },
        dom_munger: {
            read: {
                options: {
                    read: [
                        {selector: 'script[data-concat!="false"]', attribute: 'src', writeto: 'appjs', isPath: true},
                        {
                            selector: 'link[rel="stylesheet"][data-concat!="false"]',
                            attribute: 'href',
                            writeto: 'appcss',
                            isPath: true
                        }
                    ]
                },
                src: 'src/index.html'
            },
            update: {
                options: {
                    remove: ['script[data-remove!="false"]', 'link[data-remove!="false"]'],
                    append: [
                        {selector: 'body', html: '<script src="app.full.min.js"></script>'},
                        {selector: 'head', html: '<link rel="stylesheet" href="app.full.min.css">'}
                    ]
                },
                src: 'src/index.html',
                dest: 'dist/index.html'
            }
        },
        cssmin: {
            main: {
                src: ['temp/app.css', '<%= dom_munger.data.appcss %>'],
                dest: 'dist/app.full.min.css'
            }
        },
        concat: {
            main: {
                src: ['<%= dom_munger.data.appjs %>', '<%= ngtemplates.main.dest %>'],
                dest: 'temp/app.full.js'
            }
        },
        ngAnnotate: {
            main: {
                src: 'temp/app.full.js',
                dest: 'temp/app.full.js'
            }
        },
        uglify: {
            main: {
                src: 'temp/app.full.js',
                dest: 'dist/app.full.min.js'
            }
        },
        htmlmin: {
            main: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        //Imagemin has issues on Windows.
        //To enable imagemin:
        // - "npm install grunt-contrib-imagemin"
        // - Comment in this section
        // - Add the "imagemin" task after the "htmlmin" task in the build task alias
        // imagemin: {
        //   main:{
        //     files: [{
        //       expand: true, cwd:'dist/',
        //       src:['**/{*.png,*.jpg}'],
        //       dest: 'dist/'
        //     }]
        //   }
        // },
        karma: {
            options: {
                frameworks: ['jasmine'],
                files: [  //this files data is also updated in the watch handler, if updated change there too
                    '<%= dom_munger.data.appjs %>',
                    'bower_components/angular-mocks/angular-mocks.js',
                    createFolderGlobs('*.spec.js', true)
                ],
                logLevel: 'ERROR',
                reporters: ['mocha', 'coverage'],
                autoWatch: false, //watching is handled by grunt-contrib-watch
                singleRun: true,
                preprocessors: {
                    'src/**/!(*.spec).js': ['coverage']
                },
                coverageReporter: {
                    type: 'html',
                    dir: 'coverage/'
                }
            },
            all_tests: {
                browsers: ['PhantomJS'/*, 'Chrome', 'Firefox'*/]
            },
            during_watch: {
                browsers: ['PhantomJS']
            }
        },

        protractor: {
            options: {
                // Location of your protractor config file
                configFile: "./protractor-conf.js",

                // Do you want the output to use fun colors?
                noColor: false,

                // Set to true if you would like to use the Protractor command line debugging tool
                // debug: true,

                // Additional arguments that are passed to the webdriver command
                args: {}
            },
            e2e: {
                options: {
                    // Stops Grunt process if a test fails
                    keepAlive: false,
                    args: {
                        specs: ['src/**/*.feature']
                    }
                }
            },
            continuous: {
                options: {
                    keepAlive: true,
                    args: {
                        specs: []
                    }
                }
            }
        }
    });

    grunt.registerTask('build', [
        'jshint', 'clean:before', 'less', 'dom_munger', 'ngtemplates', 'cssmin', 'concat', 'ngAnnotate', 'uglify',
        'copy', 'htmlmin', 'clean:after'
    ]);
    grunt.registerTask('serve', ['dom_munger:read', 'jshint', 'karma:during_watch', 'connect', 'less:development', 'watch']);
    grunt.registerTask('test', ['dom_munger:read', 'karma:all_tests', 'e2e-test']);

    grunt.registerTask('e2e-test', ['connect:test', 'protractor:e2e']);

    grunt.event.on('watch', function(action, filepath) {
        //https://github.com/gruntjs/grunt-contrib-watch/issues/156

        var tasksToRun = [];

        if(filepath.match(/\.js|\.spec|\.feature/)) {

            //lint the changed js file
            if(filepath.match(/\.js/)) {
                grunt.config('jshint.main.src', filepath);
                tasksToRun.push('jshint');
            }

            var spec = false;
            var e2e = false;
            //find the appropriate unit test for the changed file

            //changed file was a test
            var match = filepath.match(/\.spec|\.feature|\.steps\.js/);
            if(match && match[0] === '.spec') {
                spec = filepath;
            } else if(match && match[0] === '.feature') {
                e2e = filepath;
            } else if(match && match[0] === '.steps.js') {
                e2e = filepath
                        .replace(match[0], '.feature')
                        .replace('step_definitions/', '');
            } else if(!match) {
                spec = filepath.replace('.js', '.spec.js');
                e2e = filepath.split('.').slice(0, -2) + '.feature';
            }

            //if the spec exists then lets run it
            if(spec && grunt.file.exists(spec)) {
                var files = [].concat(grunt.config('dom_munger.data.appjs'));
                files.push('bower_components/angular-mocks/angular-mocks.js');
                files.push(spec);
                grunt.config('karma.options.files', files);
                tasksToRun.push('karma:during_watch');
            }

            if(e2e && grunt.file.exists(e2e)) {
                var e2eFiles = [];
                e2eFiles.push(e2e);
                grunt.config('protractor.continuous.options.args.specs', e2eFiles);
                tasksToRun.push('protractor:continuous');
            }
        }

        //if index.html changed, we need to reread the <script> tags so our next run of karma
        //will have the correct environment
        if(filepath === 'src/index.html') {
            tasksToRun.push('dom_munger:read');
        }

        grunt.config('watch.main.tasks', tasksToRun);

    });
};
