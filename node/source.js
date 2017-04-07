var fs=require("fs");
var filedir='./source';
fs.watch(filedir,function(ev,file){
	//只要有一个文件发生变化,就需要对此文件亚下的文件进许读取，合并
	fs.readdir(filedir,function(){
		var arr=[];
		dataList.forEach(function(f){
			console.log(f)
			
		})
	})
})
