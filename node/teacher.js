//writeFile向一个指定的文件写入数据 ，如果不存在，则新建，如果存在覆盖
/*var fs=require('fs');
var filename='2.txt';
fs.writeFile(filename,'helle',function(){
	console.log(arguments)
})
*/
/*var fs=require('fs');*/
/*var filename='2.txt';
fs.readFile(filename,function(err,data){
	console.log(arguments)
	if (err) {
		console.log("shibai")
	}else{
		console.log(data.toString())
	}

})
*/
/*fs.unlink(filename,function(err){
	if (err) {
		console.log("shibai")
	}else{
		console.log("chenggong")
	}
})*/
/*fs.rename('1.txt','w.txt',function(){
	console.log(arguments)
})
fs.stat('w.txt',function(){
	console.log(arguments)
})*/
/*var fs=require('fs');
var filename='w.txt';
fs.watch(filename,function(ev,fn){
	console.log(ev)
	if (fn) {
		console.log(fn+'发生了改变')
	}else{
		console.log("ddd")
	}
})*/

/*var fs=require('fs');
fs.mkdir('./e',function(err){
	console.log(err)
})*/

/*var fs=require('fs');
fs.rmdir('./e',function(){

})*/
var fs=require('fs');
fs.readdir('./',function(err,fileList){
	fileList.forEach(function(f){
		fs.stat(f,function(err,info){
			switch(info.mode){
				case 16822:
				console.log('[文件夹]'+f);
				break;
				case 33206:
				console.log('[文件]'+f);
				break;
				default :
				console.log('[其它']+f);
				break;
			}
		})
	})

})