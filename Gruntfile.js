module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['./src/**/*.js'],
      tasks: ['browserify']
    },
    browserify: {
      dist: {
        files: {
          './public/game.js': ['./index.js'],
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
};
