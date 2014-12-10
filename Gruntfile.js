module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      js_frontend: {
        src: [
          './bower_components/jquery/jquery.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './app/assets/javascript/frontend.js'
        ],
        dest: './public/assets/javascript/frontend.js',
      },
      js_backend: {
        src: [
        './bower_components/jquery/jquery.js',
        './bower_components/bootstrap/dist/js/bootstrap.js',
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
        mangle: false //manteniamo i nomi delle funzioni e delle variabili
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
    watch: {
      js_frontend: {
        files: [
          './bower_components/jquery/jquery.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './app/assets/javascript/frontend.js'
        ],
        tasks: ['concat:js_frontend', 'uglify:frontend'],
        options: {
          livereload: true
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
          livereload: true
        }
      },
      less: {
        files: ['./app/assets/stylesheets/*.less'],
        tasks: ['less'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['watch']);

}
