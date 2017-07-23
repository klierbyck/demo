/* 基本文件处理 */
var gulp = require('gulp');
//引入css压缩
var cssnano = require('gulp-cssnano');
//引入js压缩
var uglify = require('gulp-uglify');
//引入html压缩
var htmlmin = require('gulp-htmlmin');

var clean = require('gulp-clean');

/**
 *  安装模块 npm install gulp-cssnano
 *  执行任务 ：gulp mini-css
 *  gulp.src 指定要处理的文件
 *  pipe 管道
 *  gulp.dest 放到指定的目录
 *  最终上线的就是哪dist目录的内容去上线。
 */
/**
 *
 * 1.安装插件
 * 2.在对应插件文档看看对应的用户
 * 3.修改路径
 * 4.测试是否符合要求
 */

//css压缩
gulp.task('mini-css',function(){
    gulp.src('./modules/*/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/modules'))
})
//js压缩
gulp.task('mini-js',function(){
    gulp.src('./modules/*/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/modules'))

    gulp.src('./script/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/script'))
})
//html压缩
gulp.task('mini-html',function(){
    var options = {
        removeComments: true, // 移除注释
        collapseWhitespace: true,// 移除空白内容
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
        //collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        //removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        //removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        //removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    };
    gulp.src('./modules/*/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./dist/modules'));

    gulp.src('index.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});
//某文件删除时，将dist中生成的对应文件删除
gulp.task('clean',function(){
    return gulp.src('./dist', {read: false})
        .pipe(clean());
})
//通过gulp命令执行css、js、html压缩
gulp.task('default',['clean','mini-css','mini-js','mini-html'])


