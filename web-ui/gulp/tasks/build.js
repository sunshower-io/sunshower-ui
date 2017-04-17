var gulp = require('gulp'),
     runSequence = require('run-sequence'),
     changed = require('gulp-changed'),
     plumber = require('gulp-plumber'),
     sourcemaps = require('gulp-sourcemaps'),
     paths = require('../paths'),
     assign = Object.assign || require('object.assign'),
     notify = require('gulp-notify'),
     typescript = require('gulp-typescript'),
     htmlmin = require('gulp-htmlmin'),
     pug = require('gulp-pug'),
     concat = require('gulp-concat'),
     less = require('gulp-less'),
     sass = require('gulp-sass'),
     sassJspm = require('sass-jspm-importer');

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


gulp.task('copy-fonts', function() {
    return gulp.src('jspm_packages/npm/materialize-css@0.98.1/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

});

gulp.task('copy-icons', function() {
    return gulp.src('assets/icons/**/*')
        .pipe(gulp.dest('dist/icons'));

});

gulp.task('build-sass', function() {
    return gulp.src('assets/styles/main.scss')
        .pipe(sass({
            errLogToConsole: true,
            functions: sassJspm.resolve_function('/jspm_packages/'),
            importer: sassJspm.importer
        }))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/css'));
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
    ['build-system', 'build-html', 'build-pug', 'copy-icons', 'build-sass', 'copy-fonts'],
    callback
  );
});
