module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['./public/src/**.js'],
      tasks: ['browserify']
    },
    browserify: {
      dist: {
        files: {
          './public/coca-cola.js': ['./index.js'],
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
};
