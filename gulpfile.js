var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var cssimport = require('gulp-cssimport');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['src/scss/style.scss'])
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/simplebar/dist/simplebar.min.js'])
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

gulp.task('importcss', function () {
    return gulp.src(['node_modules/@csstools/normalize.css/normalize.css', 'node_modules/simplebar/dist/simplebar.min.css'])
        .pipe(cssimport({}))
        .pipe(gulp.dest("dist/css"));
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./dist"  
    });

    gulp.watch(['src/scss/*.scss'], gulp.series('sass'));
    gulp.watch("dist/*.html").on('change', browserSync.reload);
}));

//gulp.task('default', gulp.parallel('js','serve'));
gulp.task('default', gulp.parallel('js','serve', 'importcss'));