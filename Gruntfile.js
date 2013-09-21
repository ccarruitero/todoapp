module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dom_munger: {
      readcss: {
        options: {
          read: {
            selector: 'link', attribute: 'href', writeto: 'cssRefs',
            isPath: true
          },
        },
        src: 'index.html'
      },
      readjs: {
        options: {
          read: { 
            selector: 'script', attribute: 'src', writeto: 'jsRefs',
            isPath: true 
          },
        },
        src: 'index.html'
      },
     cleancss: {
        options: {
            remove: 'link[href]'
        },
        src: 'dist/index.html'
      },
      cleanjs: {
        options: {
          remove: 'script[src]'
        },
        src: 'dist/index.html'
      },
      updatecss: {
        options: {
          append: {selector:'head',html:'<link rel="stylesheet" href="style/app.min.css">'}
        },
        src:'dist/index.html'
      },
      updatejs: {
        options: {
          append: {selector:'body',html:'<script src="js/app.min.js"></script>'}
        },
        src: 'dist/index.html'
      }
    },
    cssmin: {
      main: {
        src:'<%= dom_munger.data.cssRefs %>',
        dest:'dist/style/app.min.css'
      }
    },
    uglify: {
      main: {
        dest: 'dist/js/app.min.js',
        src: ['<%= dom_munger.data.jsRefs %>']
      }
    },
    copy: {
      main: {
        files:[{
          src: ['index.html', 'manifest.webapp', 'images/*', 'icons/*'],
          dest: 'dist/'
        }]
      /*},
      js: {
        files: {
          src: ['<%= dom_munger.data.jsRefs %>'],
          dest: 'dist/js/app.min.js'
        }*/
      }
    },
    zip: {
      dist: {
        cwd: 'dist/',
        src: 'dist/**',
        dest: 'dist/app.zip'
      }
    },
    clean: {
      dist: ['dist/']
    },
    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js']
    },
    emberTemplates: {
      options: {
        templateBasePath: /js\/templates\//
      },
      'compiled/templates.js': ['js/templates/**/*.hbs']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-dom-munger');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-ember-templates');

  grunt.registerTask('default', ['jshint', 'emberTemplates']);
  grunt.registerTask('pack', ['clean', 'default', 'copy', 'dom_munger', 
                              'uglify', 'cssmin'/*, 'zip'*/]);
};
