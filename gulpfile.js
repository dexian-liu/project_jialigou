//导入插件
let gulp = require('gulp');
let concat = require('gulp-concat');
let cssnano = require('gulp-cssnano');
let html = require('gulp-htmlmin');
let image = require('gulp-imagemin');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let uglify = require('gulp-uglify');
let babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');

//创建任务
function fncopy(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
}

function fnlib(){
    return gulp.src('./src/lib/*')
    .pipe(gulp.dest('./dist/lib'))
}

function fnphp(){
    return gulp.src('./src/php/*.php')
    .pipe(gulp.dest('./dist/php'))
}

function fnhtml(){
    return gulp.src('./src/html/*.html')
    .pipe(gulp.dest('./dist/html'))
}

function fnsass(){
    return gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/css'))
}

function fnjs(){
    return gulp.src('./src/js/**/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./dist/js'))
}

function fnimg(){
    return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
}

//监视
function fnWatch(){
    gulp.watch('./src/html/*.html',fnhtml);
    gulp.watch('./src/index.html',fncopy);
    gulp.watch('./src/lib',fnlib);
    gulp.watch('./src/php/*.php',fnphp);
    gulp.watch('./src/sass/*.scss',fnsass);
    gulp.watch('./src/js/**/*.js',fnjs);
    gulp.watch('./src/img/*',fnimg);
}

//导出任务
exports.html = fnhtml;
exports.copy = fncopy;
exports.lib = fnlib;
exports.php = fnphp;
exports.sass = fnsass;
exports.js = fnjs;
exports.img = fnimg;

exports.default = fnWatch;

