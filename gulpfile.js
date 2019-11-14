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
base = path.join(distribute, out_dir)

// Source
var src = {
  src: source,
  js: path.join(source, 'js', '*.js'),
  sass: path.join(source, 'sass', '*.sass'),
  image: path.join(source, 'images', '*'),
  service: path.join(source, 'services', '*.json'),
  page: path.join(source, 'pages', '*.ejs'),
  component: path.join(source, 'components', '_*.ejs'),

}

// Distribute
var dist = {
  dist: distribute,
  base: base,
  css: path.join(base, 'css')
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


gulp.task('sass', (done) => {
  console.log(src.sass + ' -> ' + dist.css)
  gulp.src(src.sass)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest(p.dist.css))
  done()
})

gulp.task('watch', (done) => {
  gulp.watch('src/**/*.ejs', gulp.task('ejs'))
  gulp.watch('src/sass/*.sass', gulp.task('sass'))
  gulp.watch('src/images/*', gulp.task('copy'))
  gulp.watch('src/js/*', gulp.task('copy'))
  done()
})