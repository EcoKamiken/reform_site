var gulp = require("gulp");
var plumber = require('gulp-plumber')
var notify = require('gulp-notify')
var sass = require('gulp-sass')
var ejs = require("gulp-ejs")
var rename = require("gulp-rename")
var changed = require('gulp-changed')
var fs = require('fs')
var del = require('del')
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
  component: [source, 'components', '_*.ejs'].join('/'),
  image: [source, 'images', '*'].join('/'),
  js: [source, 'js', '*.js'].join('/'),
  meta: [source, 'settings', 'meta.json'].join('/'),
  page: [source, 'pages', '*.ejs'].join('/'),
  sass: [source, 'sass', '*.sass'].join('/'),
  service: [source, 'services', '*.json'].join('/'),
}

// Distribute
var dist = {
  dist: distribute,
  base: base,
  css: [base, 'css'].join('/'),
  image: [base, 'images'].join('/'),
  js: [base, 'js'].join('/'),
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
gulp.task('clean', (done) => {
  del(dist.dist)
  done()
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

// imagesコピー
gulp.task('image', (done) => {
  gulp.src(src.image)
    .pipe(changed(dist.image))
    .pipe(gulp.dest(dist.image))
  done()
})

// jsコピー
gulp.task('js', (done) => {
  gulp.src(src.js)
    .pipe(changed(dist.js))
    .pipe(gulp.dest(dist.js))
  done()
})

// ejsビルド
gulp.task("ejs", (done) => {
  var meta = JSON.parse(fs.readFileSync(src.meta, 'utf8'))
  gulp
    .src([src.page, "!" + src.component])
    .pipe(ejs({
      meta
    }, {}, {
      ext: '.html'
    }))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest(dist.base))
  done()
})

gulp.task('watch', (done) => {
  gulp.watch('src/**/*.ejs', gulp.task('ejs'))
  gulp.watch('src/sass/*.sass', gulp.task('sass'))
  gulp.watch('src/images/*', gulp.task('copy'))
  gulp.watch('src/js/*', gulp.task('copy'))
  done()
})