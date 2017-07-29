/*
 * @Author: klier
 * @Date:   2017-07-29 
 */
'use strict';

//载入Gulp模块
var gulp = require('gulp');
//删除文件插件
var clean = require('gulp-clean');
//less插件
var less = require('gulp-less');
//css自动前缀插件
var autoprefixer = require('gulp-autoprefixer');
//css压缩插件
var cssnano = require('gulp-cssnano');
//文件合并插件
var concat = require('gulp-concat');
//图片压缩插件
var imagemin = require('gulp-imagemin');
//js压缩插件
var uglify = require('gulp-uglify');
//html压缩插件
var htmlmin = require('gulp-htmlmin');
//浏览器同步插件
var browserSync = require('browser-sync');
var reload = browserSync.reload;


//某文件删除时，将build中生成的对应文件删除
gulp.task('clean', function () {
  return gulp.src('./build', {
      read: false
    })
    .pipe(clean());
})

// less转css、增加前缀、压缩
gulp.task('style', ['clean'], function () {
  gulp.src('src/styles/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      //每一个主要浏览器的最后两个版本
      //参考链接http://www.cnblogs.com/tinyphp/p/4738571.html
      browsers: ['last 2 versions']
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('build/styles'))
    .pipe(reload({
      stream: true
    }));
});


//css压缩
// gulp.task('style', ['clean'], function () {
//   gulp.src('src/styles/*.css')
//     .pipe(cssnano())
//     .pipe(gulp.dest('build/styles'))
//     .pipe(reload({
//       stream: true
//     }));
// }) 


// js文件合并、压缩
gulp.task('script', ['clean'], function () {
  gulp.src('src/scripts/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'))
    .pipe(reload({
      stream: true
    }));
});

/* 
// js文件压缩
gulp.task('script', ['clean'], function () {
  gulp.src('src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'))
    .pipe(reload({
      stream: true
    }));
});
*/

//图片压缩
gulp.task('image', ['clean'], function () {
  gulp.src('src/images/*.{png,jpg,gif,ico}')
    .pipe(imagemin({
      //类型：Number  默认：3  取值范围：0-7（优化等级）
      optimizationLevel: 5,
      //类型：Boolean 默认：false 无损压缩jpg图片
      progressive: true,
      //类型：Boolean 默认：false 隔行扫描gif进行渲染
      interlaced: true,
      //类型：Boolean 默认：false 多次优化svg直到完全优化
      multipass: true
    }))
    .pipe(gulp.dest('build/images'))
    .pipe(reload({
      stream: true
    }));
  gulp.src('src/*.{png,jpg,gif,ico}')
    .pipe(imagemin())
    .pipe(gulp.dest('build'))
    .pipe(reload({
      stream: true
    }));
});

//html压缩
gulp.task('html', ['clean'], function () {
  gulp.src('src/*.html')
    .pipe(htmlmin({
      // 移除注释
      removeComments: true,
      // 移除空白内容
      collapseWhitespace: true,
      //压缩页面JS
      minifyJS: true,
      //压缩页面CSS
      minifyCSS: true
      //省略布尔属性的值 <input checked="true"/> ==> <input />
      //collapseBooleanAttributes: true,
      //删除所有空格作属性值 <input id="" /> ==> <input />
      //removeEmptyAttributes: true,
      //删除<script>的type="text/javascript"
      //removeScriptTypeAttributes: true,
      //删除<style>和<link>的type="text/css"
      //removeStyleLinkTypeAttributes: true
    }))
    .pipe(gulp.dest('build'))
    .pipe(reload({
      stream: true
    }));
});

//监听文件变化
gulp.task('watch', function () {
  //监听文件变化执行对应任务
  // gulp.watch('src/styles/*.less', ['style']);
  // gulp.watch('src/styles/*.css', ['style']);
  // gulp.watch('src/scripts/*.js', ['script']);
  // gulp.watch('src/images/*.*', ['image']);
  // gulp.watch('src/*.html', ['html']);
  gulp.watch(['src/styles/*.less', 'src/scripts/*.js', 'src/images/*.*', 'src/*.html'], ['style', 'script', 'image', 'html']);
});

//清除build目录下的文件、开启服务器、执行任务
gulp.task('serve', ['clean'], function () {
  browserSync({
    notify: false,
    port: 2017,
    server: {
      baseDir: ['build']
    }
  });
  gulp.start('style', 'script', 'image', 'html', 'watch');
});

//执行默认任务
gulp.task('default', ['serve']);
