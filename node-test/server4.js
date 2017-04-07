var http = require("http")
var url = require("url")
var fs = require("fs")
var server = http.createServer();
var HtmlDir = __dirname + '/html/';
server.on('request', function(req, res) {
    var urlStr = url.parse(req.url);
    console.log(urlStr.pathname)
    console.log(HtmlDir+'index.html')
    switch (urlStr.pathname) {
        case '/':
        	sendData(HtmlDir+'index.html', req, res)
            break;
        case  '/user':
        	sendData(HtmlDir+'user.html',req,res)

        break;
    }
})

function sendData(HtmlDir, req, res) {
    fs.readFile(HtmlDir, function(err,data) {
        if (err) {
            res.writeHead(404, "找不到", { 'content-type': 'text/html;charset=utf-8' });
            res.end('<h1>页面找不到</h1>')
        } else {
            res.writeHead(200, "ok", { 'content-type': 'text/html;charset=utf-8' });
            res.end(data)
        }
    })
}

server.listen(8085, 'localhost')
