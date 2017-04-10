var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var assign = Object.assign || require('object.assign');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var typescript = require('gulp-typescript');
var htmlmin = require('gulp-htmlmin');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var less = require('gulp-less');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
var typescriptCompiler = typescriptCompiler || null;
gulp.task('build-system', function() {
  if(!typescriptCompiler) {
    typescriptCompiler = typescript.createProject('tsconfig.json', {
      "typescript": require('typescript')
    });
  }
  return gulp.src(paths.dtsSrc.concat(paths.source))
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changed(paths.output, {extension: '.ts'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(typescript(typescriptCompiler))
    .pipe(typescriptCompiler())
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '/dev/src'}))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function() {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.output));
});

// copies changed css files to the output directory
gulp.task('build-less', function() {
  return gulp.src(paths.inlineLess)
      .pipe(less())
      .pipe(concat('styles.min.css'))
      .pipe(gulp.dest('styles'));
    // .pipe(changed(paths.output, {extension: '.css'}))

    // .pipe(gulp.dest(paths.output))
    // .pipe(browserSync.stream());
});


gulp.task('build-pug', function() {
  return gulp.src(paths.pug)
      .pipe(pug({pretty: true}).on('error', function(er){
        console.log(er);
      }))
      .pipe(changed(paths.output, {extension: '.html'}))
      .pipe(gulp.dest(paths.output));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'build-pug'],
    callback
  );
});
