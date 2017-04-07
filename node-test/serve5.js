var http = require('http')
var fs = require('fs')
var server = http.createServer();
var url = require('url');
var preUrl = __dirname + '/prox/';
var querystring=require('querystring');
server.on('request', function(req, res) {
    /*	res.writeHead(200,"ok",{"content-type":"text/html;charset=utf-8"});
    	res.end("<h2>你好</h2>");*/
    var urlStr = url.parse(req.url);
    var pathPre = urlStr.pathname;
    switch (pathPre) {
        case '/':
            solvPath(preUrl + 'index.html', req, res)
            break;
        case '/user':
            solvPath(preUrl + 'user/a.html', req, res)
            break;
        case '/login':
            solvPath(preUrl + 'login/login.html', req, res)
            break;
        case '/login/check':
/*            console.log(req.method);
           var queryValue=querystring.parse(urlStr.query)
            console.log(queryValue.username)*/
            if (req.method.toUpperCase()=='POST') {
            	var str='';
            	req.on('data',function(chunk){
            		str+=chunk;
            	})
            	req.on("end",function(){
            		var queryValue=querystring.parse(str)
            		console.log(queryValue.username)
            	})
            }
            break;
    }
})

function solvPath(preUrl, req, res) {
    fs.readFile(preUrl, function(err, data) {
        if (err) {

            res.writeHead(404, "页面找不到", { 'content-type': "text/html;charset=utf-8" });
            res.end("<h2>404页面找不到</h2>")
        } else {
            console.log(preUrl)
            res.writeHead(404, "页面找不到", { 'content-type': "text/html;charset=utf-8" });
            res.end(data)
        }

    })

}
server.listen("8085", 'localhost')
