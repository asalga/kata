'use strict';

module.exports = function(grunt) {

  const LivereloadPort = 35729;
  const ServeStatic = require('serve-static');

  // for printing to console
  const Colors = {
    red: `"\x1B[91m"`,
    pink: `"\x1B[35m"`,
    default: `"\x1B[39m"`
  };

  // directories
  const src = 'src';
  const tmp = '.tmp';
  const app = 'app';
  const lib = 'src/libs';

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    /** 
     * Delete all working directories and contents
     */
    clean: {
      build: {
        src: [
          `${app}`,
          `${tmp}`
        ]
      }
    },

    /**
     * Connect port/livereload
     * https://github.com/gruntjs/grunt-contrib-connect
     */
    connect: {
      options: {
        port: 9000,
        hostname: '*'
      },
      livereload: {
        options: {
          middleware: function(connect, options) {
            return [
              ServeStatic(`${app}`),
              connect().use(`${app}`, ServeStatic(`${app}`)),
              ServeStatic(`${app}`)
            ]
          }
        }
      }
    },

    open: {
      dev: {
        path: 'http://localhost:9000/font_to_img.html',
        app: 'Google Chrome'
      },
      atlas_maker: {
        path: 'http://localhost:9000/atlas_maker.html',
        app: 'Google Chrome'
      },
      // build: {
      //   path: 'http://google.com/',
      //   app: 'Firefox'
      // },
      file: {
        path: '/etc/hosts'
      },
      custom: {
        path: function() {
          return grunt.option('path');
        }
      }
    },

    exec: {
      tp: {
        command: 'texturepacker data/atlas/hiragana/_hiragana.tps',
        stdout: true,
        stderr: true
      }
    },

    /**
     *
     */
    copy: {

      tools: {
        files: [{
            expand: true,
            cwd: `tools`,
            src: '**/*.*',
            dest: `${app}/`,
            filter: 'isFile'
          }
        ]
      },

      atlas: {
        files: [{
          src: 'data/json/chars.json',
          dest: `tools/`
        }]
      },

      // tools: {
      //   files: [{
      //     expand: true,
      //     cwd: `tools`,
      //     src: '**/*.*',
      //     dest: `${app}/tools/`
      //   }, ]
      // },

      data: {
        files: [{
          expand: true,
          // cwd: `data`,
          src: 'data/**/*.*',
          dest: `${app}/`
        }, ]
      },

      libs: {
        files: [{
          expand: true,
          cwd: `${lib}`,
          src: '*.js',
          dest: `${app}/libs`,
          filter: 'isFile'
        }]
      },

      dev: {
        files: [
          // MARKUP
          {
            expand: true,
            cwd: `${src}/`,
            src: 'index.html',
            dest: `${app}/`,
            filter: 'isFile'
          },
          // STYLE
          {
            expand: true,
            cwd: `${src}/css/`,
            src: '*.css',
            dest: `${app}/`,
            filter: 'isFile'
          },
          // JS
          {
            expand: true,
            cwd: `${src}/js/`,
            src: '**/*.js',
            dest: `${app}/js/`,
            filter: 'isFile'
          },
          // JS LIBS
          {
            expand: true,
            cwd: `${lib}`,
            src: '*.js',
            dest: `${app}/libs`,
            filter: 'isFile'
          },
          // JSON
          {
            expand: true,
            cwd: `data/json`,
            src: ['**/*.json'],
            dest: `${app}/data/json`,
            filter: 'isFile'
          },
          // FONT
          {
            expand: true,
            cwd: `data/font`,
            src: ['**/*.ttf'],
            dest: `${app}/data/font`,
            filter: 'isFile'
          },
          // ATLAS
          {
            expand: true,
            cwd: `data/atlas`,
            src: ['*.json', '*.png'],
            dest: `${app}/data/atlas`,
            filter: 'isFile'
          },
          // texturepacker data/atlas/hiragana/_hiragana.tps 

          // AUDIO
          {
            expand: true,
            cwd: `data/audio`,
            src: ['**/*.{mp3,ogg,wav}'],
            dest: `${app}/data/audio`,
            filter: 'isFile'
          },
          // IMAGES
          {
            expand: true,
            cwd: `data/img`,
            src: ['**/*.{jpg,jpeg,png,gif,svg}'],
            dest: `${app}/data/img`,
            filter: 'isFile'
          },
          // SHADERS
          {
            expand: true,
            flatten: false,
            cwd: `${src}/shaders/`,
            src: ['**/*.glsl'],
            dest: `${app}/shaders`,
            filter: 'isFile'
          }
        ]
      }
    },

    // /**
    //  * 
    //  */
    // browserify: {
    //   dev: {
    //     files: [{
    //       dest: `${app}/dev_bundle.js`,
    //       src: `${config.target}/index.js`
    //     }],
    //     options: {
    //       mangle: false
    //     }
    //   }
    // },


    /**
     * https://github.com/gruntjs/grunt-contrib-jshint
     * options inside .jshintrc file
     */
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },

      files: [
        `${src}/js/**/*.js`,
        `${src}/json/**/*.js`,
        `!${src}/js/vendor/**/*.js`
      ]
    },

    // /**
    //  *  https://www.npmjs.com/package/grunt-processhtml
    //  *
    //  *  process <!-- build:include --> directives
    //  */
    // processhtml: {
    //   dev: {
    //     options: {
    //       process: true,
    //       data: config,
    //       strip: true,
    //     },
    //     files: [{
    //       src: `${src}/index.html`,
    //       dest: `${app}/index.html`
    //     }]
    //   }
    // },

    /**
     * https://github.com/gruntjs/grunt-contrib-watch
     *
     */
    watch: {
      options: {
        spawn: true,
        livereload: true
      },

      tools: {
        files: [
          'tools/**/*'
        ],
        tasks: [
          'copy:tools',
          'open:dev'
        ],
        options: {
          livereload: true
        }
      },

      scripts_dev: {
        files: [
          `${src}/js/**/*.js`
        ],
        tasks: [
          'copy:dev',
          // 'jshint',
          'bundle'
        ],
        options: {
          livereload: true
        }
      },
      // AUDIO
      audio: {
        files: [`data/**/*.{mp3,ogg,wav}`],
        tasks: [
          'copy:dev'
        ],
        options: { livereload: true }
      },
      // // IMAGES
      // images: {
      //   files: [
      //     `${config.target}/data/**/*.{png,jpg,jpeg,gif,svg}`
      //   ],
      //   tasks: [
      //     'copy:dev'
      //   ],
      //   options: {
      //     livereload: true
      //   }
      // },
      // DATA
      data: {
        files: ['data/**/*.*'],
        tasks: [
          'copy:dev'
        ],
        options: {
          livereload: true
        }
      },
      // STYLE
      style: {
        files: [`src/css/style.css`],
        tasks: [
          'copy:dev'
        ],
        options: { livereload: true }
      },
      // MARKUP
      markup: {
        files: [
          `src/index.html`
        ],
        tasks: [
          'copy:dev'
          // 'processhtml'
        ],
        options: { livereload: true }
      }
    }
  });

  /*
    To bundle or not to bundle
  */
  grunt.registerTask('bundle', function() {
    grunt.task.run('copy');
    // if (`${config.bundleMethod}` === 'browserify') {
    //   grunt.task.run('browserify:dev');
    // }
    // //
    // else if (`${config.bundleMethod}` === 'concat') {
    //   grunt.task.run('concat');
    // }
    // //
    // else if (`${config.bundleMethod}` === 'module') {
    //   grunt.task.run('copy');
    // }
  });

  grunt.registerTask('default', [
    'copy:dev',
    // 'jshint',
    'connect:livereload',
    'watch'
  ]);

  // 
  grunt.registerTask('font_to_img', [
    'copy:data',
    'copy:libs',
    'copy:tools',
    'connect:livereload',
    'open:dev',
    'watch:tools'
  ]);

  grunt.registerTask('tp', [
    'exec'
  ]);

  grunt.registerTask('atlas_maker', [
    'copy:data',
    'copy:tools',
    'connect:livereload',
    'open:atlas_maker',
    'watch:tools'
  ]);

  grunt.registerTask('prod', [
    'copy:dev',
    'bundle'
  ]);

};