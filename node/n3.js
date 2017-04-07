var http=require("http");
var n2=require("./user.js");
console.log(n2)
http.createServer(function(request,response){
	response.writeHead(200,{'Conent-Type':'text/html;charset=utf-8'});
	if (request.url!=='/favicon.ico') {
		user=new n2();
		user.id=1;
		user.name="张三";
		user.age=30;
		user.enter();


		response.end("");
	}
}).listen(3000)