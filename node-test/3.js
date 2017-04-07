var fs=require('fs')
var filedir='./miaov/source';
fs.watch(filedir,function(ev,file){
	
	fs.readdir(filedir,function(err,dataList){
		var arr=[];
		dataList.forEach(function(f){
			
		})

	})
})