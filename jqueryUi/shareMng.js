function extendMainDiv(mainDiv){
	mainDiv.baseUrl = "/sharebook/";
	mainDiv.isInitDataTable  = true;
}

function statusFormat(value, row, index) {

	if(value == 1){
		str = "邮寄";
	}else	if(value == 1){
		str = "图书自取";
	}else{
		str = "";
	}

	return str;                             
}



/*function toutiaoFormat(value, row, index) {
	str = "<img src='/themes/icons/ok.png' >";
	if(value =='否')
		str = "";
	return str;                             
}*/

/*function typeFormat(value, row, index) {;
	return types[value-1].value;                             
}*/

KindEditor.ready(function(K) {
	var editor1 = K.create('textarea[name="content"]', {
		uploadJson : '/file_upload',
		fileManagerJson : '/file_manager',
		afterChange: function () {
	          this.sync();
	    },
	    afterBlur: function () { this.sync(); }
	});
});




var share_book_status = [
                   {"key":1,"value":"申请中"},
                   {"key":2,"value":"借阅中"},
                   {"key":3,"value":"已取消"},
                   {"key":4,"value":"归还中"},
                   {"key":5,"value":"已完成"},
                   {"key":6,"value":"已拒绝"},
                   /*{"key":0,"value":"可借阅"},*/
                   ];

/*var share_book_shzt =  [
                          {"key":0,"value":"待审核"},
                          {"key":1,"value":"通过"},
                          {"key":2,"value":"不通过"},
                          ];*/


/*function typeformatter(status){
	var  str="";
	if(status==0){
		str="可借阅"
	}else if(status==1){
		str="申请中"
	}else if(status==2){
		str="借阅中"
	}else if(status==3){
		str="已取消"
	}else if(status==4){
		str="归还中"
	}else if(status==5){
		str="已完成"
	}else if(status==6){
		str="已拒绝"
	}
	return str;
}*/

