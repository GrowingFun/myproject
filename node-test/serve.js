var http = require("http");
var url = require("url")
var server = http.createServer();
server.on('request', function(req, res) {
    /*	console.log(req.url)*/
    var urlStr = url.parse('http://www.baidu.com/a/index.html?a=2#r=8')
    var str = urlStr.query.split('&&');
    var arr = new Array();
    var arr2 = new Array();
    str.forEach(function(f) {
        arr.push(f.split('='))
    })
    var reg = /[\d\.]+\,([\d\.]+)/g;
    var arr2 = arr.join(",").replace(reg, "$1").split(",");
    console.log(arr2)
})

/*url后面问号后面叫查询串*/
server.listen(8085, 'localhost');
