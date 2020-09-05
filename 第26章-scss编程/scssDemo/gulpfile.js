const gulp = require("gulp");
const scss = require("gulp-sass");

/* 
    编写任务，编写.scss文件
*/
gulp.task("scss", function(){
    return gulp.src("*.{sass,scss}")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"));
})

const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");

gulp.task("scss2", function(){
    return gulp.src("07scss的注释.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("07scss的注释.min.css"))
    .pipe(gulp.dest("dist/css"));
})


gulp.task("watch", function(){
    gulp.watch("*.{sass,scss}", ['scss']);
})

