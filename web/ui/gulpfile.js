// all gulp tasks are located in the ./build/tasks directory
// gulp configuration is in files in ./build directory

var gulp = require('gulp');

require('require-dir')('gulp/tasks');


gulp.task('default', [
    'clean',
    'copy-img',
    'sass',
    'sass:watch',
    'watch'
]);
