module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      // define the files to lint
      src: {
        files: {
          src: ['lib/**/*.js', 'test/**/*.js']
        },
        options: {
          node: true
        }
      },
      gruntfile: {
        files: {
         src: ['Gruntfile.js']
        }
      },
    },
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'dot',
          require: 'coverage/blanket'
        },
        src: ['test/**/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          // use the quiet flag to suppress the mocha console output
          quiet: true
        },
        src: ['test/**/*.js'],
        // specify a destination file to capture the mocha
        // output (the quiet option does not suppress this)
        dest: 'coverage.html'
      }
    },

    watch: {
        gruntfile: {
          files: 'Gruntfile.js' ,
          tasks: ['jshint:gruntfile']
        },
        src: {
          files: ['lib/**/*.js','bin/*','test/**/*.js'],
          tasks: ['test']
        },
        options: {
          nospawn: false
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-release');

  grunt.registerTask('test', ['jshint','mochaTest']);

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};
