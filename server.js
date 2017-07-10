//引入express模块并调用其方法
var app = require('express')();


app.get("*", function(req,res){
	res.sendFile(__dirname+req.url);
});

//设置启动端口
app.listen(9999, function(){
	console.log("端口为9999的node服务器启动成功,请验明正身后登陆!!!");
});
