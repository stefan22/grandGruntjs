module.exports = function(grunt) {
  
  //SL Proj Config.
  grunt.initConfig({

      cachebreaker: {
        dev: {
          options: {
            match: [
              'bootstrap.css', 'reset.css','styles.css',
              'jquery.js','bootstrap.js','scripts.min.js',
              'index.html'
            ]
          },
          files: {
            src: ['index.html']
          }
        } //dev
      }, // cachebreaker
    

      clean: {
          all_css: ['.sass-cache/'],
          //before generating any new files, remove any previously-created
          //html files
          test: ['public/builds/index.html']
      }, //clean

      copy: {
        single: {
          files: [{
            src: ['index.html'], dest: 'public/builds/index.html'
          }]
        }  
      }, //copy

      uglify: {
        options: {
          banner: '//----------------------top of document -----------------\n\n',
          footer: '\n\n//--------------------end of file ---------------------\n',
          //maps the code in compressed files
          sourceMap: true,
          sourceMapName: 'public/builds/assets/sourcemap.map'
        },
        builds: {
          src:['public/js/scripts.js'],
          dest:'public/builds/js/scripts.min.js'
        }

      }, // uglify

      // copies index.html,readme.md and process scss/css to dest folder
      concat: {
        options: {
          //banner: '\n----------------------top of document ------------\n\n',
          //separator:'\n\n-------------------end of a file---------------\n\n',
          //footer: '\n\n----------------------end of document --------------\n'
        },

       
        /*
        dist1: {
          //sends index.html to dest folder
          src: ['index.html'],
          dest: 'public/builds/index.html'
        }, //concat1
       */

        dist2: {
          // sends readme.md to dest folder
          src: ['README.md'],
          dest: 'public/builds/assets/README.md'
        } //concat2

      }, // concat ends

      // compass for sass - src/dest settings in config.rb
      // compass:dev is task - cleans cache first.
      compass: {
        dev: {
          options: {
            config: 'config.rb'
          }
        }

      }, //compass

      // launches local server
      connect: {
        //connect
        server: {

            options: {
              hostname: 'localhost',
              port: 9001,
              base: '',
              livereload: true,
              debug:true

            }, //options

            livereload: {
              options: {
                base: ''
              } //options

            } //livereload

        } //server

      }, //connect & livereload

     open: {
        all: {
          //opens browser - gets port from server config above
          path: 'http://localhost:9001'
        }

      },//open browser


      watch: {
        // watching everybody
        options: {
          //run faster
          spawn: false,
          livereload: true,
          //reload:true
        }, //options watch

        configFiles: {
          files: 'gruntfile.js',
          options: {
            reload: true
          }
         
        }, //confiFiles

        scripts: {
          files: 'public/js/*.js',
          tasks: ['uglify']  
        
        },//scripts

        html: {
          //runs clean and then copy
          //cachebreakers gives me 200s & 304s everytime
          files: 'index.html',
          tasks: ['clean:test', 'cachebreaker', 'copy']
        
        },//html

        mdfiles: {
          files: '*.md',
          tasks: ['concat:dist2']

        }, //mdfiles

        sass: {
          //run clean cache then processes
          files: 'public/sass/*.scss',
          tasks: ['clean:all_css', 'compass:dev'],
          options: {
            livereload: true
          }

        } //sass

      } //watch

  }); //initConfig

 

  // :grunt cache-breaker
  grunt.loadNpmTasks('grunt-cache-breaker');

  // :grunt clean
  grunt.loadNpmTasks('grunt-contrib-clean');

  // :grunt copy
  grunt.loadNpmTasks('grunt-contrib-copy');

  // :grunt uglify
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // :grunt concat
  grunt.loadNpmTasks('grunt-contrib-concat');

  // :grunt compass
  grunt.loadNpmTasks('grunt-contrib-compass');

  // :grunt watch
  grunt.loadNpmTasks('grunt-contrib-watch');

  // :grunt connect
  grunt.loadNpmTasks('grunt-contrib-connect');

  // :grunt open
  grunt.loadNpmTasks('grunt-open');

//register concat dist2 
  grunt.registerTask('dist', ['concat:dist2']);

// :grunt
// default tasks
grunt.registerTask('default', ['cachebreaker', 'clean', 'copy',  'open', 'dist',  'uglify', 'compass:dev', 'connect',  'watch']);




}; //wrapper function
