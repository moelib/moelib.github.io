var fs = require("fs"),
    gulp = require("gulp"),
    clean = require("gulp-clean"),
    sequence = require("run-sequence"),
    sourcemaps = require("gulp-sourcemaps"),
    swig = require('gulp-swig'),
    webserver = require("gulp-webserver");

var htmlsrc = ['views/**/*.html','!views/includes/**','!views/layouts/**'];

gulp.task("watch", function () {
    gulp.watch(['views/**/*.html'], [ "templates" ]);
});

gulp.task("templates", function(){
    gulp.src(htmlsrc)
        .pipe(swig())
        .pipe(gulp.dest('./'));
});

gulp.task("webserver", function() {
    gulp.src('./')
        .pipe(webserver({
            port: 8080,
            livereload: true,
            open: true
        }));
});

gulp.task("default", function (cb) {
    sequence("templates", "watch", "webserver", cb);
});

gulp.task("build", function (cb) {
    sequence("templates", cb);
});