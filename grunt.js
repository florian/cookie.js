module.exports = function(grunt) {

	grunt.initConfig({

		meta: {
			banner: grunt.file.read('cookie.js').split('\n')[0]
		},

		lint: {
			all: ['grunt.js', 'cookie.js', 'tests/tests.js']
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

		qunit: {
			all: ['tests/index.html']
		},

		min: {
			dist: {
				src: ['<banner>', 'cookie.js'],
				dest: 'cookie.min.js'
			}
		},

		watch: {
			files: ['cookie.js'],
			tasks: 'development'
		}

	});

	grunt.registerTask('default', 'lint qunit min');
	grunt.registerTask('development', 'lint qunit');

};