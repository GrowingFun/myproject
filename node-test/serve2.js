var http = require("http")
var server = http.createServer();
var url = require("url");

server.on('request', function(req, res) {
    var urlStr = url.parse(req.url);
    switch (urlStr.pathname) {
        case '/':
            res.writeHead(200, "index", { 'content-type': 'text/html;charset-utf-8' });
            res.end('<h3>首页</h3>')
            break;
        case '/user':
            res.writeHead(200, "index", { 'content-type': 'text/html;charset-utf-8' });
            res.end('<h3>个人中心</h3>')
            break;
        case '/user/a':
            res.writeHead(200, "index", { 'content-type': 'text/html;charset-utf-8' });
            res.end('<h3>我的个人信息</h3>')
            break;
        default:
            break;
    }
    res.end();

})
server.listen("8085", "localhost")
