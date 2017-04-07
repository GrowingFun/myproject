var projectDate = {
    "name": "miaov",
    "fileDate": [{
        "name": "css",
        "type": "dir"
    }, {
        "name": "js",
        "type": "dir"
    }, {
        "name": "images",
        "type": "dir"
    }, {
        "name": "index.html",
        "type": "file",
        "content": "<html><head><meta charset='utf-8'></head><body><h2>你好，nodejs</h2></body></html>"
    }]
}

var fs = require('fs')
if (projectDate.name) {
    fs.mkdirSync(projectDate.name);
    var fileDate = projectDate.fileDate;
    if (fileDate && fileDate.forEach) {
        fileDate.forEach(function(f) {
            f.path = projectDate.name + '/' + f.name;
            f.content = f.content || '';
            switch (f.type) {
                case "dir":
                    fs.mkdirSync(f.path);
                    break;
                case "file":
                    fs.writeFileSync(f.path, f.content)
                    break;
            }

        })
    }
} else {
    console.log("请指定一个文件目录名")
}
