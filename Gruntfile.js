module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //JS hint
   jshint: {
      files: ['Gruntfile.js', 'Scripts/*.js', '!Scripts/*min.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    //to clean unwanted files
    clean: {
      css: ['CSS/*.merged.css','CSS/*.merged.min.css'],
      js: ['Scripts/scripts.merged.js','Scripts/scripts.merged.min.js']
    },
    //concat CSS files o create merged file
    concat_css: {
      files: {
       src: ["CSS/*.css", "!CSS/*min.css"],
       dest: "CSS/styles.merged.css"
      }
    },
    //minification of merged file
    cssmin: {
      target: {
        files: [{
          expand: true,
          src: 'CSS/styles.merged.css',
          dest: '',
          ext: '.merged.min.css'
        }]
      }
    },
   //concat JS files o create merged file
    concat: {
      files: {
       src: ["Scripts/*.js", "!Scripts/*min.js"],
       dest: "Scripts/scripts.merged.js"
      }
    },
    //uglify JS mergred file
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*Merged - uglified file */\n'
      },
      dist: {
        files: {
          'Scripts/scripts.merged.min.js': ['Scripts/scripts.merged.js']
        }
      }
    },
    //wahtch JS files
     watch: {
      files: ['Gruntfile.js', 'Scripts/*.js'],
      tasks: ['jshint']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch'); 

  // Default task(s).
  grunt.registerTask('default', ['jshint','clean','concat_css','cssmin','concat','uglify']);

};