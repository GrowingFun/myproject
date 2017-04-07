/*var fs = require('fs');*/
/*fs.open(path,falgs,[mode],callback)
path:要打开文件的路径.
flags:打开文件的方式，读、写
mode：设置文件的模式，读、写、执行4/2/1*/
/*callback:回调*/
/*	err：文件打开的错误保存在ERR里面，如果成功ERR为null
	fd:被打开文件的标识和定时器很像 文件打开后产生的编码*/
/*fs.open('./a.html', 'r', function(err, fd) {*/
/*console.log(err)
console.log(fd)*/
/*    console.log(err)
    if (err) {
        console.log("文件打开失败")
        console.log(fd)

    } else {
        console.log("文件打开成功")
        console.log(fd)
    }
});
fs.open('./a.html', 'r', function(err, fd) {异步打开文件
    console.log(fd)
})
*/
/*var fs=require('fs')
var fd=fs.openSync('./a.html','r')*/
/*同步打开文件*/
/*console.log(fd)
console.log("dd")*/
/*读文件，fs.read(fd,buffer,offset,length,position,callback)*/
/*fd,通过open方法成功打开一个文件返回的编号 ;
buffer:buffer对象;;
offset,bf对象的哪个位置开始插入
postion,
callback
	err,错误
	bflengh,bf长度
	newbf，新的bf方法
*/
/*var fs=require('fs');
fs.open('./a.html','r',function(err,fd){
	if (err) {
		console.log("打开失败")
	}else{
		console.log("打开成功")
		console.log(fd);
		var bf=new Buffer(100);
		fs.read(fd,bf,0,100,0,function(err,newbf){
			console.log(bf.toString())
		})
	}
})*/
/*文件写*/
/*var fs = require('fs')
fs.open('./a.html', 'r+', function(err, fd) {*/
/*	fs.write(fd,buffer,offset,length[,position],callback);
	fd:打开的文件
	buffer:要写入的数据
	offset:buffer对象中要写入的数据的起始位置
	length,要写入的buffer数据长度
	postion，fd中的起始位置
	callback：回调
*/
/*	var bf=new Buffer('1111111111111')
	fs.write(fd,bf,0,10,0,function(err,newbf){
		console.log(bf)
	})
*/
/*    fs.write(fd,'1234', 5, 'utf-8')
    fs.close(fd,function(){

    });

})
*/
/*var fs = require('fs')
fs.open('./a.html', 'r+', function(err, fd) {
    var bf2 = new Buffer('wwww');
    fs.write(fd, bf2, 0, 4, 0, function(err, leng, nbf) {

        })
       	var bf=new Buffer(20)
        	fs.read(fd,bf,0,20,0,function(err,newbf,nbf){
        		console.log(bf.toString())
        	})
        
})
*/
/*var fs=require('fs')
var filename='1.txt';*/

/*fs.writeFile()向在一个文件中写入内容*/
/*fs.writeFile(filename,'hello',function(){
	console.log(arguments)
})*/
/*fs.writeFileSync(filename,'hello123')*/
/*console.log(",,,,")*/
/*fs.appendFile(filename,'aa',function(){

})
fs.open(filename,'r',function(err,fd){
	var bf=new Buffer(20);
	fs.read(fd,bf,0,20,0,function(err,leng,newbf){
		console.log(bf.toString())
	})
})*/
/*判断文件是否存在*/
/*var fs=require('fs')
var filename='3.txt';
fs.exists(filename,function(err){
	if (err) {
		fs.appendFile(filename,'rty',function(){

		})
		fs.open(filename,'r',function(err,fd){
			var bf=new Buffer(20);
			fs.read(fd,bf,0,20,0,function(){
				console.log(bf.toString())
			})
		})
	}else{
		fs.writeFileSync(filename,'123466');
		fs.open(filename,'r',function(err,fd){
			var bf2=new Buffer(20);
			fs.read(fd,bf2,0,20,0,function(){
				console.log(bf2)
			})
		})
	}

})*/
/*var fs=require('fs')
var filename='3.txt'
fs.writeFileSync(filename,'uuuuuuu');
var readFile=fs.readFileSync(filename);
console.log(readFile.toString())*/
/*fs.readFileSync(filename)
fs.unlinkSync(filename)*/
/*fs.renameSync(filename,'rrr.txt');*/
/*fs.stat(filename,function(){读取文件状态信息
	console.log(arguments)
})*/
/*var fs=require('fs');
var filename='3.txt';
fs.watch(filename,function(event,fn){*//*文件修改监听*/
/*	console.log(event)
	if (fn) {
		console.log(fn+'发生了改变')
	}else{
		console.log('fn不生效')
	}

})*/
/*var fs=require('fs')
fs.mkdir('./10',function(){
	console.log(arguments)
})

fs.writeFileSync('index.html','<h2>你好,nodejs</h2>');
*/
/*var fs=require('fs')
fs.rmdir('./6',function(){删除文件夹

})*/
/*var fs=require('fs');
fs.mkdir('./3',function(){/*新建文件夹*/
/*	console.log(arguments)
})*/
var fs=require('fs');
fs.readdir('./3',function(err,fileList){/*读取文件*/
	console.log(fileList)
	
})
