var gulp = require("gulp");
var rename = require("gulp-rename")
var ejs = require("gulp-ejs")
var replace = require("gulp-replace")

gulp.task("ejs", (done) => {
  gulp
    .src(["src/**/*.ejs", "!" + "src/**/_*.ejs"])
    .pipe(ejs({}, {}, {
      ext: '.html'
    }))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest("./"));
  done();
})