/**
 * Standard options for the Browserify builds.
 *
 * @type {Object}
 */
var debugOptions = {
  debug:      true,
  transform:  [],
  standalone: 'simulateEvent'
};

/**
 * Options for a minified Browserify build.
 *
 * @type {Object}
 */
var minifyOptions = {
  debug:      false,
  transform:  ['uglifyify'],
  standalone: 'simulateEvent'
};

/**
 * Initialize the grunt configuration script.
 *
 * @param {Object} grunt
 */
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    /**
     * Lint all JavaScript according the current JSHint config.
     *
     * @type {Object}
     */
    jshint: {
      all: {
        src: ['lib/**/*.js', 'test/**/*.js', '*.js']
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },

    /**
     * Compile browser-side modules for simplified consumption.
     *
     * @type {Object}
     */
    browserify: {
      debug: {
        src:  'simulate-event.js',
        dest: 'dist/simulate-event.js',
        options: debugOptions
      },
      minify: {
        src:  'simulate-event.js',
        dest: 'dist/simulate-event.min.js',
        options: minifyOptions
      }
    },

    /**
     * Uglify the output of the minified Browserified files.
     *
     * @type {Object}
     */
    uglify: {
      minify: {
        files: {
          'dist/simulate-event.min.js': ['dist/simulate-event.min.js']
        }
      }
    },

    /**
     * Execute the test suite using Karma.
     *
     * @type {Object}
     */
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
        singleRun: false,
        background: true
      },
      ci: {
        singleRun: true
      }
    },

    /**
     * Watch for any file changes and run the supporting processes.
     *
     * @type {Object}
     */
    watch: {
      build: {
        files: ['lib/**/*.js'],
        tasks: ['build']
      },
      lint: {
        files: ['<%= jshint.all.src %>'],
        tasks: ['newer:jshint:all']
      },
      karma: {
        files: ['lib/**/*.js', 'test/**/*.js'],
        tasks: ['karma:unit:run']
      }
    }
  });

  grunt.registerTask('test',    ['jshint', 'karma:ci']);
  grunt.registerTask('build',   ['browserify', 'uglify']);
  grunt.registerTask('default', ['build', 'karma:unit', 'watch']);
};
