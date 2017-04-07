/*http请求baidu.com*/
/*1、用户通过浏览器发送一个http的请求到指定主机*/
/*2、服务器接收到该请求，对该请求进行分析和处理
3、服务器处理完成以后，返回对应的数据到用户机器
4、浏览器接收服务器返回的数据，并根据接收到的进行分析处理*/
/*客户端 服务端
由客户端发送一个http请求到服务端，服务端接收并处理请求，返回数据到客户端*/
/*搭建一个http服务器，用户处理用户发送的http请求*/
var http=require('http')
/*通过http模块下的createServe创建一下web服务器对象*/
var server=http.createServer();
server.on('listening',function(){
	console.log("listening")
})
server.on('request',function(req,res){
	res.writeHead(200,'你好你好',{'content-type':'text/html;charset=utf-8'})
	res.write('<h2>你好</h2>');
	res.end();
})
server.listen(8086,'localhost')