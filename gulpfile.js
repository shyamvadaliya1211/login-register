const gulp = require('gulp');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const ngAnnotate = require('gulp-ng-annotate');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sequence = require('gulp-sequence');

gulp.task('sass', function() {
    return gulp.src('./public/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/sass'));
});

gulp.task('default', () => {
    nodemon({
        script: 'index.js',
        ext: 'js html',
        env: {},
    });
});

const allCSSFiles = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/angular-toastr/dist/angular-toastr.min.css',
    './public/css/sass/login.css',
    './public/css/sass/register.css',
    './public/css/sass/global.css',
];

gulp.task('min-css', () => gulp.src(allCSSFiles)
    .pipe(cleanCSS({
        compatibility: 'ie8',
        rebase: false,
    }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./public/build/')));


const allJsFiles = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/angular/angular.min.js',
    './node_modules/angular-ui-router/release/angular-ui-router.min.js',
    './node_modules/angular-animate/angular-animate.min.js',
    './node_modules/angular-toastr/dist/angular-toastr.tpls.min.js',
];

gulp.task('min-js', () => gulp.src(allJsFiles)
    .pipe(concat('script.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify({
        mangle: false,
    }).on('error', console.error))
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('public/build/')));
