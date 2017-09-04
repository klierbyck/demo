// 引入express模块
var express = require('express');
//调用express方法
var app = express();
//调用express中的Router方法
var router = express.Router();
//默认路由(可以不设置)
app.get("/", function(req,res){
    // res.sendFile(__dirname+req.url);
    res.send('接口测试请使用以下地址：http://172.30.208.107:9999/mockapi或者localhost:9999/mockapi');
});
//设置启动端口
var server = app.listen(9999, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('服务器启动成功： http://%s:%s', host, port);
});
//定义API接口
router.get('/mockapi', function(req, res, next){
    //引入mockjs
    var Mock = require('mockjs');
    // 创建mockjs数据
    var data = Mock.mock({
        'categorys|3-5': [{
            categoryName: '@chineseName(2)',
            'categoryID|+1': 10,
            logo: '@image(64x64,#eee,Logo)',
            'categoryItems|1-4': [{
                cname: '@cname(2)',
                'cid|+1': 100,
                'items|1-7': [{
                    name: '@cname(2)',
                    'id|+1': 1000,
                    link: '@url'
                }]
            }],
            'seller|8-15': ['@word(3,8)']
        }]
    });
    //将该接口数据返给前端
    var r = JSON.stringify(data, null, 4);
    res.send(r);
});
//使用router
app.use(router);







// var xhrurl = 'http://172.30.208.107:9999/mockapi';
// $.ajax({
//     type : "get",
//     async : false,
//     url :xhrurl,
//     cache : false,
//     dataType : "jsonp",
//     success : function(json){
//         console.log(json);
//     },
//     error:function(e){
//         alert("error");
//     }
// });