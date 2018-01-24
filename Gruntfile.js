module.exports = function(grunt) {

	grunt.initConfig({

		jshint: {
			all: ['Gruntfile.js', 'src/cookie.js', 'tests/spec.js'],
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

		watch: {
			files: ['src/cookie.js', 'tests/*'],
			tasks: 'development'
		}

	});

	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('test', 'mocha');
	grunt.registerTask('default', ['jshint', 'mocha']);
	grunt.registerTask('release', 'default');
	grunt.registerTask('development', ['jshint', 'mocha']);

};
