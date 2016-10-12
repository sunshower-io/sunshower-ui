'use strict';


var gulp = require('gulp'), 
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    paths = require('../paths');


gulp.task('sass', function() {
    return gulp.src(paths.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./dist/styles'))
    
});

gulp.task('sass:watch', function() {
    gulp.watch(paths.scss, ['sass']);
});