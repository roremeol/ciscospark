'use strict'

const gulp = require('gulp')
const babel = require('gulp-babel')
const mocha = require('gulp-mocha')
const istanbul = require('gulp-istanbul')
const jsdoc = require('gulp-jsdoc3')
const del = require('del')

const jsSources = [ 'src/**/*.js' ]
const testSources = [ 'test/**/*-spec.js' ]
const babelOptions = {
  presets: ['es2015']
}
const buildDir = 'build'
const dirFirst = (dir) => (dir.substr(0, dir.indexOf('/')) || '')

gulp.task('clean', () => {
  return del([
    buildDir + '/**/*',
    '!' + buildDir + '/.empty'
  ])
})

gulp.task('build', ['clean'], () => {
  jsSources.forEach((src) => {
    gulp.src(src)
      .pipe(babel(babelOptions))
      .pipe(gulp.dest(buildDir + '/' + dirFirst(src)))
  })
})

gulp.task('pre-test', () => {
  return gulp.src(jsSources)
  .pipe(istanbul())
  .pipe(istanbul.hookRequire())
})

gulp.task('test', ['pre-test', 'build'], () => {
  return gulp.src(testSources)
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 60 } }))
})

gulp.task('docs', (cb) => {
  const config = require('./jsdocs.json')
  gulp.src(jsSources, {read: false})
    .pipe(jsdoc(config, cb))
})

gulp.task('mocha', () => {
  gulp.src(testSources)
    .pipe(mocha())
})

gulp.task('default', ['docs', 'test'])
