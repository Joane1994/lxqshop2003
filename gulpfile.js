const gulp = require('gulp');
// css
const sass = require('gulp-sass');
const autoprefix = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
// js
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
// html
const htmlmin = require('gulp-htmlmin');

// del
const del = require('del')
// webserver
const webserver = require('gulp-webserver');

// sass
const sassHandler = ()=>{
    return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
    
}
const cssHandler = ()=>{
    return gulp.src('./src/css/*.css')
    .pipe(autoprefix())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
}
// js
const jsHandler = ()=>{
    return gulp.src('./src/js/*.js')  // 读取src/js下面的所有js文件；
    .pipe(babel({
        presets: ['@babel/env']
    }))  // 转语法es6-es5；
    .pipe(uglify()) // 压缩所有js文件；
    .pipe(gulp.dest('./dist/js')) //将压缩好的js代码写入dist/js文件夹
}
// img
const imgHandler = ()=>{
    return gulp.src('./src/images/**')
    .pipe(gulp.dest('./dist/images'))
}
// lib
const libHandler = ()=>{
    return gulp.src('./src/lib/**')
    .pipe(gulp.dest('./dist/lib'))
}
// html
const htmlHandler =()=>{
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin({
        collapseBooleanAttributes:true,    
        collapseWhitespace:true,    
        conservativeCollapse:true,  
        removeAttributeQuotes:true,     
        removeComments:true,    
        minifyCSS:true,  
        minifyJS:true
    }))
    .pipe(gulp.dest('./dist/pages'))
}

// del
const delHandler = ()=>{
    return del(['./dist'])
}

// webserver
const webserverHandler = ()=>{
    return gulp.src('./dist')
    .pipe(webserver({
        port:8080,
        livereload:true,
        open:'./pages/index.html',
        proxies:[
            {
                source:'/shop',
                target:'http:127.0.0.1/homework/xx-hw-21/prepare.php'
            }
        ]
    }))
}
const watchHandler = ()=>{
    gulp.watch('./src/sass/*.scss',sassHandler);
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/images/**',imgHandler);
    gulp.watch('./src/js/*.js',jsHandler)
    gulp.watch('./src/pages/*.html',htmlHandler);
    gulp.watch('./src/lib/**',libHandler)
}
module.exports.default = gulp.series(
        delHandler,
        gulp.parallel(cssHandler,imgHandler,imgHandler,htmlHandler,libHandler),
        webserverHandler,
        watchHandler
    )
