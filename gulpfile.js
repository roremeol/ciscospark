'use strict'

var gulp = require('gulp')
var babel = require('gulp-babel')
var mocha = require('gulp-mocha')
var istanbul = require('gulp-istanbul')
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

gulp.task('clean', function () {
  return del([
    buildDir + '/**/*',
    '!' + buildDir + '/.empty'
  ])
})

gulp.task('build', ['clean'], function () {
  jsSources.forEach(function (src) {
    gulp.src(src)
      .pipe(babel(babelOptions))
      .pipe(gulp.dest(buildDir + '/' + dirFirst(src)))
  })
})

gulp.task('pre-test', function () {
  return gulp.src(jsSources)
  .pipe(istanbul())
  .pipe(istanbul.hookRequire())
})

gulp.task('test', ['pre-test'], function () {
  return gulp.src(testSources)
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 60 } }))
})

gulp.task('docs', function (cb) {
  var config = require('./jsdocs.json')
  gulp.src(jsSources, {read: false})
    .pipe(jsdoc(config, cb))
})

gulp.task('test:build', ['build'], function () {
  gulp.src(testBuildSources)
    .pipe(mocha())
})

gulp.task('default', ['test:build'])
