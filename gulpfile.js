'use strict'

var gulp = require('gulp')
var babel = require('gulp-babel')
var mocha = require('gulp-mocha')
var jsdoc = require('gulp-jsdoc3')
var del = require('del')

var buildDir = 'build'
var jsSources = [ 'src/**/*.js', 'test/**/*.js' ]
var testSources = [ 'test/**/*-spec.js' ]
var testBuildSources = [ buildDir + '/test/**/*-spec.js' ]

var babelOptions = {
  presets: ['es2015']
}
function dirFirst (dir) { return (dir.substr(0, dir.indexOf('/')) || '') }

// Clean Build directory
gulp.task('clean', function () {
  return del([
    buildDir + '/**/*',
    '!' + buildDir + '/.empty'
  ])
})

// Clean and Build Source
gulp.task('build', ['clean'], function () {
  jsSources.forEach(function (src) {
    gulp.src(src)
      .pipe(babel(babelOptions))
      .pipe(gulp.dest(buildDir + '/' + dirFirst(src)))
  })
})

// Test on Sources
gulp.task('test', function () {
  return gulp.src(testSources)
    .pipe(mocha())
})

// Generate JS Docs
gulp.task('docs', function (cb) {
  var config = require('./jsdocs.json')
  return gulp.src(jsSources, {read: false})
    .pipe(jsdoc(config, cb))
})

// Build and Run Tests on Build Sources
gulp.task('test:build', ['build'], function () {
  return gulp.src(testBuildSources)
    .pipe(mocha())
})

gulp.task('default', ['test:build'])
