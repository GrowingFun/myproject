var http=require("http");
var newadd=require("./modus.js");
http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/heml;charset=utf-8'})
	if (request.url!=='/favicon.ico') {
		newadd.fun2(response);
		newadd.fun3(response);
		response.end('');
	}

}).listen(3000);
console.log('server runing at');
function fun1(res){
	 console.log("fun1");
	 res.write("hello,我是fun1")
}