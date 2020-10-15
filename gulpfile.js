//一、 导入模块
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      cssnano = require('gulp-cssnano'),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify'),
      imagemin = require('gulp-imagemin'),
      babel = require('gulp-babel');
      htmlmin = require('gulp-htmlmin');
//二、 发布任务
function fnCopyLib(){
    return gulp.src('./src/lib/*.js')
     .pipe(gulp.dest('./dist/js'));
}
function fnJS(){
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
     .pipe(uglify())
     .pipe(rename({suffix:'.min'}))
     .pipe(gulp.dest('./dist/js'));
}
function fnHtml(){
    return gulp.src('./src/pages/*.html')
     .pipe(htmlmin())
     .pipe(rename({suffix:'.min'}))
     .pipe(gulp.dest('./dist/pages'))
}
function fnImg(){
    return gulp.src('./src/img/*')
     .pipe(imagemin())
     .pipe(gulp.dest('./dist/img'));
}
function fnCss(){
    return gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/css'));
}
function fnCopyIndex(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
}
function fnWatch(){
    gulp.watch('./src/sass/*.scss',fnCss);
    gulp.watch('./src/index.html',fnCopyIndex);
    gulp.watch('./src/js/*.js',fnJS);
    gulp.watch('./src/pages/*.html',fnHtml);
    gulp.watch('./src/lib/*.js',fnCopyLib);
}
//三、导出模块
exports.css = fnCss;
exports.copy = fnCopyIndex;
exports.default = fnWatch;
exports.image = fnImg;
exports.html = fnHtml;
exports.js = fnJS;
exports.lib = fnCopyLib;