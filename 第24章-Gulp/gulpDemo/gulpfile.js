/* 
    commonJS规范
    1、require() 将这个模块引入  
    2、使用这个模块上的函数
*/
const gulp = require("gulp");


//编写第一个任务
/* 
    第一个参数：任务的名字  自定义
    第二个参数：回调函数，任务执行的功能
*/
gulp.task("hello", function(){
    console.log("hello world");
})
/* 
    gulp.src()  找到源文件路径
    gulp.dest() 找到目的文件路径 【注】如果设置的这个目的文件路径不存在，会自动创建
    pipe()  理解程序运行管道
*/

//1、整理.html文件
gulp.task("copy-html", function(){
    return gulp.src("index.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})

/* 
    2、静态文件
    拷贝图片
*/
gulp.task("images", function(){
    // return gulp.src("img/*.jpg").pipe(gulp.dest("dist/images"));
    // return gulp.src("img/*.{jpg,png}").pipe(gulp.dest("dist/images"));

    // return gulp.src("img/*/*").pipe(gulp.dest("dist/images"));
    return gulp.src("img/**/*").pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

/* 
    3、拷贝多个文件到一个目录中
*/
gulp.task("data", function(){
    return gulp.src(["json/*.json", "xml/*.xml", "!xml/04.xml"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

/* 
    4、一次性执行多个任务的操作
*/
gulp.task("build", ["copy-html", "images", "data"], function(){
    console.log("任务执行完毕");
})




/*              使用第三方插件的步骤：
                        commonJS规范
                    <1>先去下载插件到本地
                        cnpm install 插件名字 --save-dev
                        cnpm i 插件名字 -D
                    <2>通过require() 引入文件
                    <3>查阅插件的用法 
            
            开发版本  index.css
            上线版本  index.min.css
                    
*/
const sass = require("gulp-sass");
//压缩css  gulp-minify-css
const minifyCSS = require("gulp-minify-css");
//重命名插件 gulp-rename
const rename = require("gulp-rename");

gulp.task("sass", function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

/* 
    处理js文件的插件
    gulp-concat  合并文件
    gulp-uglify  压缩.js文件
*/
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

gulp.task("scripts", function(){
    return gulp.src("javascript/*.js")
    .pipe(concat("index.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(uglify())
    .pipe(rename("index.min.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

/* 
    监听，如果监听到文件有改变，会自动去执行对应的任务，更新数据
*/
gulp.task("watch", function(){
    /* 
        第一个参数，是文件监听的路径
        第二个参数，我们要去执行的任务
    */
    gulp.watch("index.html", ["copy-html"]);
    gulp.watch("img/**/*", ["images"]);
    gulp.watch(["json/*.json", "xml/*.xml", "!xml/04.xml"], ["data"]);
    gulp.watch("stylesheet/index.scss", ['sass']);
    gulp.watch("javascript/*.js", ['scripts']);
})

/* 
    gulp-connect 启动一个服务器
*/

const connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root: "dist", //设置跟目录
        port: 8888,
        livereload: true //启动实时刷新功能
    })
})


//同时启动监听和服务   default 我们可以直接在控制台通过  gulp命令启动
gulp.task("default", ["watch", "server"]);