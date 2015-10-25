module.exports = function(grunt) {

	grunt.initConfig({

		jshint: {
			all: ['Gruntfile.js', 'cookie.js', 'tests/spec.js'],
			options: {
				browser: true,
				evil: false,
				expr: true,
				supernew: true,
				eqeqeq: true,
				eqnull: true,
				forin: true,
				smarttabs: true
			}
		},

		mocha: {
			all: {
			    src: 'tests/index.html',
			    run: true
			}
		},

		uglify: {
			options: {
				banner: grunt.file.read('cookie.js').split('\n')[0] + "\n"
			},

			my_target: {
				files: {
					'cookie.min.js': ['cookie.js']
				}
			}
		},

		watch: {
			files: ['cookie.js', 'tests/*'],
			tasks: 'development'
		}

	});

	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('test', 'mocha');
	grunt.registerTask('min', 'uglify');
	grunt.registerTask('default', ['jshint', 'mocha', 'uglify']);
	grunt.registerTask('release', 'default');
	grunt.registerTask('development', ['jshint', 'mocha']);

};
