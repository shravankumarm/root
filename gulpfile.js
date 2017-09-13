'use strict';
const gulp = require('gulp'),
      concat = require('gulp-concat'),
      minifyJS = require('gulp-uglify'),
      minifyCSS = require('gulp-clean-css'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer')
        
gulp.task('autoprefixer', ['build-css'], function () {
  return gulp.src('./dist/build.css')
  .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
  .pipe(gulp.dest('./dist'));
});

gulp.task('build-css', function() {
  var src = [
    './public/stylesheets/style.css',
    './public/stylesheets/bootstrap.min.css',
    './public/stylesheets/material-kit.css'
  ];
  return gulp.src(src)
  .pipe(concat('build.css'))
  .pipe(gulp.dest('dist'));
});

gulp.task('build-js', [], function (){
  var src = [
    './public/js/index.js',
    './public/js/jquery.min.js',
    './public/js/bootstrap.min.js',
    './public/js/material.min.js',
     './public/js/material-kit.js'
  ];
  return gulp.src(src)
  .pipe(concat('build.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('concat-vendor-css', function () {
  var src = [
		'node_modules/bootstrap/dist/css/bootstrap.css',
	];  
	return gulp.src(src)
  .pipe(concat('build.vendor.css'))
  .pipe(gulp.dest('dist'));
});

gulp.task('concat-all-css', ['concat-vendor-css', 'autoprefixer'], function () {
  var src = [
    'dist/build.vendor.css',
    'dist/build.css'
	];
	return gulp.src(src)
  .pipe(concat('msg-register.css'))
  .pipe(gulp.dest('dist'));
});

gulp.task('minify-all-css', ['concat-all-css'], function () {  
	return gulp.src('dist/msg-register.css')
  .pipe(minifyCSS())
  .pipe(concat('build.msg-register.min.css'))
  .pipe(gulp.dest('dist'));
});

gulp.task('build', ['minify-all-css','build-js']);


gulp.task('default', ['build']);