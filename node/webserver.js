//加载一个HTTP模块
var http=require("http");
//通过HTTP下的createServer创建一下WEB服务 器对象
var server=http.createServer();
server.listen(8081,'localhost');
server.on('request',function(req,res){
	res.setHeader('miaov','leo')
	console.log(req);
	res.writeHead(200,'成功',{
		'content-type':'text/html;charset=utf-8'
	});
	res.write("<h2>你好</h2>");
	res.end();
})


