var gulp = require("gulp");
var plumber = require('gulp-plumber')
var notify = require('gulp-notify')
var del = require('del')
var sass = require('gulp-sass')
var ejs = require("gulp-ejs")
var rename = require("gulp-rename")
var path = require('path')

var destination = 'dist/reform_test'

// 変数定義
out_dir = 'reform_test'
source = 'src'
distribute = 'dist'
base = [distribute, out_dir].join('/')

// FIXME: array.join('/') 遅すぎる

// Source
var src = {
  src: source,
  js: [source, 'js', '*.js'].join('/'),
  sass: [source, 'sass', '*.sass'].join('/'),
  image: [source, 'images', '*'].join('/'),
  service: [source, 'services', '*.json'].join('/'),
  page: [source, 'pages', '*.ejs'].join('/'),
  component: [source, 'components', '_*.ejs'].join('/'),
}

// Distribute
var dist = {
  dist: distribute,
  base: base,
  css: [base, 'css'].join('/')
}

// src, distディクショナリの中身を一覧表示
gulp.task('vars', (done) => {
  var vars = Object.assign(src, dist)
  for (path in vars) {
    console.log(path + ':' + vars[path] + ':' + typeof (vars[path]))
  }
  done()
})

// distディレクトリを削除
gulp.task('clean', () => {
  console.log('Delete: ' + dist.dist)
  return del(dist.dist)
})

// sassビルド
gulp.task('sass', (done) => {
  gulp.src(src.sass)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest(dist.css))
  done()
})

gulp.task('copy', () => {
  return gulp.src([
      'src/images/*', 'src/js/*'
    ], {
      base: 'src'
    })
    .pipe(gulp.dest(destination))
})

gulp.task("ejs", (done) => {
  gulp
    .src(["src/pages/*.ejs", "!" + "src/**/_*.ejs"])
    .pipe(ejs({}, {}, {
      ext: '.html'
    }))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest(destination))
  done()
})



gulp.task('watch', (done) => {
  gulp.watch('src/**/*.ejs', gulp.task('ejs'))
  gulp.watch('src/sass/*.sass', gulp.task('sass'))
  gulp.watch('src/images/*', gulp.task('copy'))
  gulp.watch('src/js/*', gulp.task('copy'))
  done()
})