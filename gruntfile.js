/**
 * @file
 *
 * ### Responsibilities
 * - automate common tasks using grunt
 *
 * Scaffolded with generator-microjs v0.1.2
 *
 * @author Nathan Kerr <>
 */
'use strict';

module.exports = function (grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	var config = {
		app: 'lib',
		dist: 'dist'
	};

	grunt.initConfig({
		config: config,
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'gruntfile.js',
				'lib/**/*.js',
				'test/spec/{,*/}*.js'
			]
		},
		clean: {
            all: ['dist/*', 'dist/**/*']
        },
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		},
		uglify: {
			app: {
				options: {
					mangle: {
					}
				},
				files: {
					'dist/firefoxos.min.js': 'dist/firefoxos.js'
				}
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			app: {
				files: {
					'dist/firefoxos.js': [
						'lib/firefoxos.js'
					]
				}
			}
		}
	});

	grunt.registerTask('test', [
		'karma:unit'
	]);

	grunt.registerTask('build', [
		'clean',
		'concat',
		'uglify',
		'karma:unit'
	]);

	grunt.registerTask('default', [
		'jshint',
		'build'
	]);
};