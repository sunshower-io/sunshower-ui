
var gulp = require('gulp');


gulp.task('copy-img', function() {
    return gulp.src(['./assets/**/*'])
        .pipe(gulp.dest('dist/'))
});