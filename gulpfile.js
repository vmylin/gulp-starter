const gulp = require("gulp"),
    // Now that we've installed the terser package we can require it:
    terser = require("gulp-terser"),
    rename = require("gulp-rename"),
    browserSync = require('browser-sync');
gulp.task("scripts", function () {
    return gulp
        .src("./js/*.js") // What files do we want gulp to consume?
        .pipe(terser()) // Call the terser function on these files
        .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
        .pipe(gulp.dest("./build/js")); // Where do we put the result?
});
gulp.task("say_hello", function (done) {
    console.log("Hello!");
    done();
});

// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['*.html', 'build/js/*.js', 'css/*.css'])
        .on('change', browserSync.reload);

});

gulp.task("watch", function () {
    gulp.watch("js/*.js", gulp.series("scripts"));
});

gulp.task("default", gulp.parallel("browser-sync", "scripts")); 