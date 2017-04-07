var http=require('http');
http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
	console.log('访问');
	console.log(req)
	response.write("<html><h1>ffff</h1></html>");;
	response.end();
}).listen(3000);
