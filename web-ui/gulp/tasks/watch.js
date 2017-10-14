var gulp = require('gulp'),
    karma = require('./test'),
    Karma = require('karma').Server,
    paths = require('../paths');


var browserSync = require('browser-sync');

function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve' ], function () {
    gulp.watch(
        paths.source,
        ['build-system', browserSync.reload]
    ).on('change', reportChange);

    gulp.watch(
        paths.pug,
        ['build-pug', browserSync.reload]
    ).on('change', reportChange);

    gulp.watch(
        paths.sass,
        ['build-sass', browserSync.reload]
    ).on('change', reportChange);
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
