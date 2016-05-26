var gulp = require("gulp");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var notify = require("gulp-notify");

/*
 * Opens a webserver (usually localhost:3000) and runs the site.
 */

gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('copy-assets', function() {
    gulp.src([
        './assets/**'
    ])
        .pipe(gulp.dest('./dist/assets'))
});

gulp.task('copy-html', function () {
    gulp.src('./*.html')
        .pipe(gulp.dest('./dist'))
});

gulp.task('copy-reveal', function () {
    gulp.src('./reveal/**/*')
        .pipe(gulp.dest('./dist/reveal'))
});


// Compiles your selected scss file, autoprefixes and minifies it and saves it to dist folder.

gulp.task("scss", function () {
    gulp.src(["./scss/*.scss", "./reveal/css/theme/source/*.scss", "./reveal/css/reveal.scss"])
        .pipe(sass({
            onError: function (err) {
                return notify().write(err);
            }
        }))
        .pipe(autoprefixer("last 2 version", "ie 9"))
        .pipe(gulp.dest("./dist/css"))
        .pipe(reload({stream: true}));
});

gulp.task('serve', ['build'], function() {
    browserSync({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch(['./*.html', './scss/*.scss', './assets/*'], ['scss', 'copy']);
});

gulp.task('copy', ['copy-assets', 'copy-html', 'copy-reveal']);
gulp.task('build', ['copy', 'scss']);
gulp.task('default', ['build']);