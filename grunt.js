module.exports = function(grunt) {

	grunt.initConfig({

		meta: {
			banner: grunt.file.read('cookie.js').split('\n')[0]
		},

		lint: {
			all: ['grunt.js', 'cookie.js']
		},

		jshint: {
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

		min: {
			dist: {
				src: ['<banner>', 'cookie.js'],
				dest: 'cookie.min.js'
			}
		},

		watch: {
			files: ['cookie.js', 'tests/*'],
			tasks: 'development'
		}

	});

	grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask('default', 'lint mocha min');
	grunt.registerTask('release', 'default');
	grunt.registerTask('development', 'lint mocha');
	grunt.registerTask('test', 'mocha');

};