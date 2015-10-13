module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    babel: {
      options: {
        stage: 0
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.js'],
          dest: 'generators'
        }]
      }
    },
    copy: {
      templates: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['*/**'],
            dest: 'generators/',
            filter: function (path) {
              return /^src\/[a-z]+\/templates/.test(path);
            }
          }
        ]
      }
    },
    eslint: {
      target: ['src/**/*.js']
    },
    watch: {
      scripts: {
        files: ['src/*/*.js'],
        tasks: ['babel'],
        options: {
          spawn: false
        }
      },
      templates: {
        files: ['src/*/templates/**/*'],
        tasks: ['copy'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask('test', ['eslint']);
  grunt.registerTask('build', ['babel']);
  grunt.registerTask('default', ['test', 'build']);
};
