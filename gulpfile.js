var gulp = require("gulp");
var rename = require("gulp-rename")
var ejs = require("gulp-ejs")
var replace = require("gulp-replace")
var sass = require('gulp-sass')

var destination = 'dist/reform_test'

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
  gulp.src('src/sass/*.sass')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest(destination + '/css'))
  done()
})

gulp.task('watch', (done) => {
  gulp.watch('src/**/*.ejs', gulp.task('ejs'))
  gulp.watch('src/sass/*.sass', gulp.task('sass'))
  gulp.watch('src/images/*', gulp.task('copy'))
  gulp.watch('src/js/*', gulp.task('copy'))
  done()
})