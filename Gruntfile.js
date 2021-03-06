module.exports = function(grunt) {

  grunt.initConfig({
    connect: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0", // usare 0.0.0.0 per renderlo accessibilia anche dall'esterno
        }
      }
    },
    open: {
      all: {
        path: 'http://localhost:<%= connect.all.options.port %>/public'
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      js_frontend: {
        src: [
          './bower_components/jquery/dist/jquery.js',
          './bower_components/jquery-easing/js/jquery.easing.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './bower_components/packery/dist/packery.pkgd.js',
          './bower_components/components-webfontloader/webfont.js',
          './bower_components/angular/angular.js',
          //'./bower_components/angular-i18n/angular-locale_it-it.js',
          //'./bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
          //'./bower_components/ng-file-upload/angular-file-upload-shim.js',
          //'./bower_components/ng-file-upload/angular-file-upload.js',
          './app/assets/javascript/frontend.js'
        ],
        dest: './public/assets/javascript/frontend.js',
      },
      js_backend: {
        src: [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/jquery-easing/js/jquery.easing.js',
        './bower_components/bootstrap/dist/js/bootstrap.js',
        './bower_components/packery/dist/packery.pkgd.js',
        './bower_components/components-webfontloader/webfont.js',
        './bower_components/angular/angular.js',
        //'./bower_components/angular-i18n/angular-locale_it-it.js',
        //'./bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        //'./bower_components/ng-file-upload/angular-file-upload-shim.js',
        //'./bower_components/ng-file-upload/angular-file-upload.js',
        './app/assets/javascript/backend.js'
        ],
        dest: './public/assets/javascript/backend.js',
      },
    },
    less: {
      development: {
        options: {
          compress: true,
        },
        files: {
          "./public/assets/stylesheets/frontend.css":"./app/assets/stylesheets/frontend.less",
          "./public/assets/stylesheets/backend.css":"./app/assets/stylesheets/backend.less"
        }
      }
    },
    uglify: {
      options: {
        mangle: false //manteniamo i nomi delle funzioni e delle variabili utile per debug passare a true in produzione
      },
      frontend: {
        files: {
          './public/assets/javascript/frontend.js': './public/assets/javascript/frontend.js',
        }
      },
      backend: {
        files: {
          './public/assets/javascript/backend.js': './public/assets/javascript/backend.js',
        }
      },
    },
    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['./bower_components/bootstrap/fonts/*',
            './bower_components/components-font-awesome/fonts/*'], dest: './public/assets/fonts/', filter: 'isFile'},
        ],
      },
    },
    watch: {
      js_frontend: {
        files: [
          './bower_components/jquery/jquery.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './app/assets/javascript/frontend.js'
        ],
        tasks: ['concat:js_frontend', 'uglify:frontend'],
        options: {
          livereload: 35729
        }
      },
      js_backend: {
        files: [
        './bower_components/jquery/jquery.js',
        './bower_components/bootstrap/dist/js/bootstrap.js',
        './app/assets/javascript/backend.js'
        ],
        tasks: ['concat:js_backend', 'uglify:backend'],
        options: {
          livereload: 35729
        }
      },
      less: {
        files: ['./app/assets/stylesheets/*.less'],
        tasks: ['less', 'copy'],
        options: {
          livereload: 35729
        }
      },
      html: {
        files: [
        './public/*.html',
        './public/assets/fragment/*.html'
        ],
        options: {
          livereload: 35729
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [
    'connect',
    'open',
    'watch']);

}
