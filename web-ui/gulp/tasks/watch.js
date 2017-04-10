var gulp = require('gulp'),
    karma = require('./test'),
    Karma = require('karma').Server,
    paths = require('../paths');


var browserSync = require('browser-sync');

// outputs changes to files to the console
function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['serve' ], function () {
    gulp.watch(paths.source, ['build-system', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.html, ['build-html', browserSync.reload]).on('change', reportChange);
    //gulp.watch(paths.css, ['build-css', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.pug, ['build-pug', browserSync.reload]).on('change', reportChange);

    gulp.watch(paths.inlineLess,
        ['build-less', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.less, ['less', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.style, browserSync.reload).on('change', reportChange);
});


gulp.task('tdd', function () {
    gulp.watch(
        [paths.source, paths.test],
        ['build-system']
    ).on('change', function (e) {
        reportChange(e);
        new Karma({
            singleRun: true,
            configFile: __dirname + '/../../karma.conf.js'
        }, function (e) {
        }).start();
    });
});
