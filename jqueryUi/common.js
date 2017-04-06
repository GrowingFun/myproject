var common = $("html");

/**
 * 创建转换函数
 */
common.createFormatterFn = function(dictType){
	var dictList = common.getDictList(dictType);
	return function(value,rowData,rowIndex){
		var result =  null;
		for(var i=0;i<dictList.length;i++){
			if(dictList[i].value == value){
				result = dictList[i].name;
				break;
			}
		}
		if(!!result){
			return result;
		}else{
			return value;
		}
	}
}

common.areaFormatter = function(){
	var areaList = common.getAreaList();
	return function(value,rowData,rowIndex){
		var result =  null;
		for(var i=0;i<areaList.length;i++){
			if(areaList[i].id == value){
				result = areaList[i].area_name;
				break;
			}
		}
		if(!!result){
			return result;
		}else{
			return value;
		}
	}
}

/**
 * 获取字典Map
 */
common.getDictMap = function(dictType){
	var dictMap;
	if(!!common.data("DICT_TYPE_"+dictType)){
		dictMap = common.data("DICT_TYPE_"+dictType);
	}else{
		$.ajax({
			type : 'POST',
			url : "cwn/systemMng/dictMng/queryDictMap.json",
			data : "dictType=" + dictType,
			async : false,
			success : function(data) {
				if(!!data){
					dictMap = data.dictMap;
					common.data("DICT_TYPE_"+dictType,data.dictMap);
				}
			}
		});
	}
	return dictMap;
}

common.getAreaList = function(){
	var areaList;
	if(!!common.data("LIST_AREA")){
		areaList = common.data("LIST_AREA");
	}else{
		$.ajax({
			type : 'POST',
			url : "/allArea",
			data : "pId=0",
			async : false,
			success : function(data) {
				if(!!data){
					areaList = data;
					common.data("LIST_AREA", areaList);
				}
			}
		});
	}
	return areaList;
}

/**
 * 获取字典List
 */
common.getDictList = function(dictType){
	var dictList;
	if(!!common.data("LIST_DICT_TYPE_"+dictType)){
		dictList = common.data("LIST_DICT_TYPE_"+dictType);
	}else{
		$.ajax({
			type : 'POST',
			url : "/basedict/list/dict",
			data : "type=" + dictType,
			async : false,
			success : function(data) {
				if(!!data){
					dictList = data;
					common.data("LIST_DICT_TYPE_"+dictType,data.dictList);
				}
			}
		});
	}
	return dictList;
}

/**
* 为grid添加自己重新加载方法,解决带条件查询的时候分页栏不能回到首页问题
*/
$.extend($.fn.datagrid.methods, {
	initReload : function(jq, newposition) {
		return jq.each(function() {
			// 显示第一页数据
			$(this).datagrid("options").pageNumber = 1;
			// 分页栏上跳转到第一页
			$(this).datagrid('getPager').pagination({
				pageNumber : 1
			});
			$(this).datagrid("reload", newposition);
		});
	}
});

/**
 * 修改linkbutton禁用启用BUG
 * 
 */
/**
 * linkbutton方法扩展
 * @param {Object} jq
 */
$.extend($.fn.linkbutton.methods, {
    /**
     * 激活选项（覆盖重写）
     * @param {Object} jq
     */
    enable: function(jq){
        return jq.each(function(){
            var state = $.data(this, 'linkbutton');
            if ($(this).hasClass('l-btn-disabled')) {
                var itemData = state._eventsStore;
                //恢复超链接
                if (itemData.href) {
                    $(this).attr("href", itemData.href);
                }
                //回复点击事件
                if (itemData.onclicks) {
                    for (var j = 0; j < itemData.onclicks.length; j++) {
                        $(this).bind('click', itemData.onclicks[j]);
                    }
                }
                //设置target为null，清空存储的事件处理程序
                itemData.target = null;
                itemData.onclicks = [];
                $(this).removeClass('l-btn-disabled');
            }
        });
    },
    /**
     * 禁用选项（覆盖重写）
     * @param {Object} jq
     */
    disable: function(jq){
        return jq.each(function(){
            var state = $.data(this, 'linkbutton');
            
            if (!state._eventsStore) 
                state._eventsStore = {};
            if (!$(this).hasClass('l-btn-disabled')) {
                var eventsStore = {};
                eventsStore.target = this;
                eventsStore.onclicks = [];
                //处理超链接
                var strHref = $(this).attr("href");
                if (strHref) {
                    eventsStore.href = strHref;
                    $(this).attr("href", "javascript:void(0)");
                }
                //处理直接耦合绑定到onclick属性上的事件
                var onclickStr = $(this).attr("onclick");
                if (onclickStr && onclickStr != "") {
                    eventsStore.onclicks[eventsStore.onclicks.length] = new Function(onclickStr);
                    $(this).attr("onclick", "");
                }
                //处理使用jquery绑定的事件
                var eventDatas = $(this).data("events") || $._data(this, 'events');
                if (eventDatas["click"]) {
                    var eventData = eventDatas["click"];
                    for (var i = 0; i < eventData.length; i++) {
                        if (eventData[i].namespace != "menu") {
                            eventsStore.onclicks[eventsStore.onclicks.length] = eventData[i]["handler"];
                            $(this).unbind('click', eventData[i]["handler"]);
                            i--;
                        }
                    }
                }
                state._eventsStore = eventsStore;
                $(this).addClass('l-btn-disabled');
            }
        });
    }
});
/**
 * 扩展Jquery序列化
 */
$.fn.serializeObject = function() {
    var object = {};
    var array = this.serializeArray();
    $.each(array, function() {
        if (object[this.name]) {
            if (!object[this.name].push) {
            	object[this.name] = [ o[this.name] ];
            }
            object[this.name].push(this.value || '');
        } else {
        	object[this.name] = this.value || '';
        }
    });
    return object;
}

$.fn.loading = function(msg) {
	var body = $(this);
    if (msg == undefined) {  
        msg = "正在加载数据，请稍候...";  
    }  
    //$("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: body.width(), height: body.height() }).appendTo(body);  
    //$("<div class=\"datagrid-mask-msg\"></div>").html(msg).appendTo(body).css({ display: "block", left: (body.width() - $("div.datagrid-mask-msg", body).outerWidth()) / 2, top: (body.height() - $("div.datagrid-mask-msg", body).outerHeight()) / 2 });
    $("<div id=\"pageInitMask\"  class=\"datagrid-mask\"></div>").appendTo(body);  
    $("<div id=\"pageInitMaskMsg\"  class=\"datagrid-mask-msg\"></div>").html(msg).appendTo(body);
}

$.fn.loaded = function() {
	var panel = $(this);
	panel.find("div.datagrid-mask-msg").remove();  
	panel.find("div.datagrid-mask").remove();  
    
}


/**
 * AJAX全局设置，数据过滤，解析异常
 */
jQuery.ajaxSetup({
	dataType : 'json',
	dataFilter : function(data, type) {
		if (type == 'json') {
			return data;
		}
		return data;
	},
	statusCode : {
		/**
		 * 错误代码500 系统异常,处理系统异常
		 */
		500 : function(XMLHttpRequest) {
			var response = XMLHttpRequest.responseJSON;
			var responseText = XMLHttpRequest.responseText;
			var status = XMLHttpRequest.status;
			var code = response.code;
			var info = response.info;
			var data = response.data;
			switch (code) {
			case 0:// 系统未知异常
				$.messager.show({ // show error
					// message
					title : '系统异常',
					msg : info
				});
				break;
			case 1:// session异常
				$.messager.alert('系统异常', info, 'error', function() {
					window.location.href = webBaseUrl;
				});
				break;
			default:
				$.messager.alert('系统异常', info, 'error');
				break;
			}

		},
		404 : function(XMLHttpRequest) {
			$.messager.show({ // show error
				// message
				title : '404 错误！',
				msg : '请不要访问未知URL'
			});

		}
	}
});




$.extend($.fn.validatebox.defaults.rules, {
	isAfter: {
		validator: function(value, param){
            var dateA = Date.parse(Swith(value));
            var dateB = Date.parse(Swith($(param[0]).datetimebox('getValue')));
            return dateA<=dateB;
        },
        message: '开始必须小于结束日期！'
	},
	isLSWeek: {
        validator: function(value, param){
        	var dateA = Date.parse(Swith(value));
        	var dateB = Date.parse(Swith($(param[0]).datetimebox('getValue')));
            return dateA>=dateB && ((dateA-dateB)/3600/1000/24)<=7;
        },
        message: '日期区间不能大于7天！'
    },
    isDateTimeLSDays: {
        validator: function(value, param){
        	var dateA = Date.parse(Swith(value));
        	var dateB = Date.parse(Swith($(param[0]).datetimebox('getValue')));
            return dateA>=dateB && ((dateA-dateB)/3600/1000/24)<=parseInt(param[1]);
        },
        message: '日期区间不能大于{1}天！'
    },
    isDateAfter: {
		validator: function(value, param){
            var dateA = Date.parse(Swith(value));
            var dateB = Date.parse(Swith($(param[0]).datebox('getValue')));
            return dateA<=dateB;
        },
        message: '开始必须小于结束日期！'
	},
	isDateLSDays: {
        validator: function(value, param){
        	var dateA = Date.parse(Swith(value));
        	var dateB = Date.parse(Swith($(param[0]).datebox('getValue')));
            return dateA>=dateB && ((dateA-dateB)/3600/1000/24)<=parseInt(param[1]);
        },
        message: '日期区间不能大于{1}天！'
    },
    isDATD:{
    	validator:function(value, param){
    		var   d=new   Date(Date.parse(value.replace(/-/g,"/") + " 23:59:59"));
    		var   curDate=new   Date();
    		return d >= curDate;
    	},
    	message: '日期必须大于今天'
    },
    checkinteger:{
    	validator: function(value, param){
    		var argvalue = value;
    	    var validChars = "0123456789";
    	    var startFrom = 0;
    	    if (argvalue.substring(0, 2) == "0x") {
    	       validChars = "0123456789abcdefABCDEF";
    	       startFrom = 2;
    	    } else if (argvalue.charAt(0) == "0") {
    	       validChars = "0123456789";
    	       startFrom = 1;
    	    } else if (argvalue.charAt(0) == "-") {
    	        startFrom = 1;
    	    }
    	    
    	    for (var n = startFrom; n < argvalue.length; n++) {
    	        if (validChars.indexOf(argvalue.substring(n, n+1)) == -1) 
    	        {
    	        return false;
    	        }
    	    }
    	    
    		if (argvalue < 0  || argvalue>2147483647 ) {				
    			value="";
    		 	return false;
    		 }
    	    return true;
    	},
    	message: '必须输入整数！'
    },
    checkmailno:{
    	validator: function(value, param){
    		var argvalue = value;
    	    var validChars = "0123456789-\\/";
    	    var startFrom = 0;
    	    for (var n = startFrom; n < argvalue.length; n++) {
    	        if (validChars.indexOf(argvalue.substring(n, n+1)) == -1) 
    	        {
    	        return false;
    	        }
    	    }
    	    return true;
    	},
    	message: '只能输入数字！'
    },
    checkintandstring:{
    	validator: function(value, param){
    		var pattern =/^[0-9a-zA-Z]*$/;
    		if(!pattern.test(value)){
    			return false;
    		}
    		return true;
    	},
    	message: '只能输入数字和字母！'
    },
    checkAccount:{
    	validator: function(value, param){
    		var pattern =/^[\x00-\xff]*$/;
    		if(!pattern.test(value)){
    			return false;
    		}
    		return true;
    	},
    	message:'非法字符!'
    },
    checkfloat:{
    	validator: function(value, param){
    		var argvalue = value;
    	    // remove '.' before checking digits
    	    argvalue= argvalue.split('.');
    	    argvalue= argvalue.join('');
    	    var validChars = "0123456789";
    	    var startFrom = 0;
    	    if (argvalue.substring(0, 2) == "0x") {
    	       validChars = "0123456789abcdefABCDEF";
    	       startFrom = 2;
    	    } else if (argvalue.charAt(0) == "0") {
    	       validChars = "0123456789";
    	       startFrom = 1;
    	    } else if (argvalue.charAt(0) == "-") {
    	        startFrom = 1;
    	    }
    	    
    	    for (var n = startFrom; n < argvalue.length; n++) {
    	        if (validChars.indexOf(argvalue.substring(n, n+1)) == -1) 
    	        {
    	        return false;
    	        }
    	    }
    	    return true;
    	},
    	message:'请输入float型的数据!'
    },
    intRange:{
    	validator: function(value, param){
    		var argvalue = value;
    	    var iMin = param[0];
    	    var iMax = param[1];
    	    var validChars = "0123456789";
    	    var startFrom = 0;
    	    if (argvalue.substring(0, 2) == "0x") {
    	       validChars = "0123456789abcdefABCDEF";
    	       startFrom = 2;
    	    } else if (argvalue.charAt(0) == "0") {
    	       validChars = "0123456789";
    	       startFrom = 1;
    	    } else if (argvalue.charAt(0) == "-") {
    	        startFrom = 1;
    	    }
    	    
    	    for (var n = startFrom; n < argvalue.length; n++) {
    	        if (validChars.indexOf(argvalue.substring(n, n+1)) == -1) 
    	        {
    	        return false;
    	        }
    	    }
    	    
    	    if (!(parseInt(argvalue) >= parseInt(iMin) && parseInt(argvalue) <= parseInt(iMax))) {
    	        return false;

    		}
    	    return true;
    	},
    	message:'输入数为整数且值必须介于{0}和{1}之间!'
    },
    checkNumber:{
    	validator: function(value, param){
    		var j = value;
    		if(j == null || j == ''){
    			return true;
    		}
    	    var rule = /^[0-9]*[0-9][0-9]*$/;//由    /^[0-9]*[1-9][0-9]*$/   改为  /^[0-9]*[0-9][0-9]*$/
    	    if(!rule.test(value))
    	    {
    		return false;
    	    }
    	    return true;
    	},
    	message:'必须输入数字!'
    },
    floatRange:{
    	validator: function(value, param){
    		var argvalue = value;
    		var iMin = param[0];
    		var iMax = param[1];
    	    argvalue= argvalue.split('.');
    	    argvalue= argvalue.join('');

    	    var validChars = "0123456789";
    	    var startFrom = 0;
    	    if (argvalue.substring(0, 2) == "0x") {
    	       validChars = "0123456789abcdefABCDEF";
    	       startFrom = 2;
    	    } else if (argvalue.charAt(0) == "0") {
    	       validChars = "0123456789";
    	       startFrom = 1;
    	    } else if (argvalue.charAt(0) == "-") {
    	        startFrom = 1;
    	    }
    	    
    	    for (var n = startFrom; n < argvalue.length; n++) {
    	        if (validChars.indexOf(argvalue.substring(n, n+1)) == -1) 
    	        {
    	        return false;
    	        }
    	    }
    	    
    	    if (!(parseFloat(value) >= parseFloat(iMin) && parseFloat(value) <= parseFloat(iMax))) {
    	        return false;
    		}
    	    return true;
    	},
    	message:'输入的数值应为float型且值介于{0}和{1}之间!'
    },
    checkMoney:{
    	validator: function(value, param){
    		var pattern =/^[1-9]{1}\d{0,15}(\.\d{1,2})?$/;
    		var money= value;
    		if (money=="0"){
    			return true;
    		}else if(!pattern.test(money)){
    			return false;
    		}else{
    			return true;
    		}
    	},
    	message:'输入的数值长度16位，小数点后2位!'
    },
    unique: {  
        validator: function(value, param){
        	var url = param[0];
        	var dd = "";
        	if(url.indexOf("?") > 0){
        		dd = url.split("?")[1];
        		url = url.split("?")[0];
        		
        	}
        	dd += "&"+param[1]+"="+value;
        	var has = $.ajax({url:url,data:dd,async:false,type:"post"}).responseText;
			if(has == "false") {
				return true;
			} else {
				return false;
			}
        },  
        message: '已存在!'  
    },
    isLength:{
    	validator: function(value, param){
    		if(value.length == param[0]) return true;
    		else return false;
    	},
    	message: '长度{0}位'
    },
    checkTime:{
    	validator: function(str){
    		var reg = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;    
    	    var r = str.match(reg);    
    	    if(r==null)return false;    
    	    r[2]=r[2]-1;    
    	    var d= new Date(r[1],r[2],r[3],r[4],r[5],r[6]);    
    	    if(d.getFullYear()!=r[1]  || d.getFullYear()<1900)return false;    
    	    if(d.getMonth()!=r[2])return false;    
    	    if(d.getDate()!=r[3])return false;    
    	    if(d.getHours()!=r[4])return false;    
    	    if(d.getMinutes()!=r[5])return false;    
    	    if(d.getSeconds()!=r[6])return false;    
    	    return true;  
    	},
    	message: '时间格式:\"YYYY-MM-DD HH:mm:SS\"'
    },
    checkDate:{
    	validator: function(str){
    		var reg = /^(\d{4})-(\d{2})-(\d{2})$/;    
    	    var r = str.match(reg);    
    	    if(r==null)return false;    
    	    r[2]=r[2]-1;    
    	    var d= new Date(r[1],r[2],r[3]);    
    	    if(d.getFullYear()!=r[1] || d.getFullYear()<1900)return false;    
    	    if(d.getMonth()!=r[2])return false;    
    	    if(d.getDate()!=r[3])return false;      
    	    return true;  
    	},
    	message: '日期格式:\"YYYY-MM-DD\"'
    },
    checkHHmm:{
    	validator: function(str){
    		var reg = /^(\d{2})(\d{2})$/;    
    	    var r = str.match(reg);    
    	    if(r==null)return false; 
    	    if(parseInt(r[1]) >= 24 || parseInt(r[2]) >= 60) return false;
    	    return true;
    	},
    	message:'输入格式:HHmm'
    },
    checkIdcard:{// 验证身份证 
        validator : function(value) { 
            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value); 
        }, 
        message : '身份证号码格式不正确' 
    },
    checkName:{// 验证姓名，可以是中文或英文 
        validator : function(value) { 
            return /^[\Α-\￥]+$/i.test(value)|/^\w+[\w\s]+\w+$/i.test(value); 
        }, 
        message : '请输入姓名' 
    },
    checkOrg:{
    	validator:function(value){
    		var has = $.ajax({url:"../systemMng/orgMng/checkOrg.json?"+"orgNo="+value,async:false,type:"post"}).responseText;
			if(has == "true") {
				return true;
			} else {
				return false;
			}
    	}, 
        message : '请输入正确的机构编号！' 
    },
    checkGzh:{
    	validator: function(value){
    		if(value.length != 10) return false;
    		var pattern =/^[0-9A-Z]*$/;
    		if(!pattern.test(value)){
    			return false;
    		}
    		return true;
    	},
    	message: '请输入10位冠字号！'
    },
    mhcheckGzh:{
    	validator: function(value){
    		if(value.length != 10) return false;
    		var pattern =/^[_0-9A-Z]*$/;
    		if(!pattern.test(value)){
    			return false;
    		}
    		return true;
    	},
    	message: '请输入10位冠字号,模糊用通配符“_”！'
    },
	isDAfter: {
		validator: function(value, param){
            var dateA = Date.parse(Swith(value));
            var dateB = Date.parse(Swith($(param[0]).datetimebox('getValue')));
            return dateA<=dateB;
        },
        message: '装箱日期要大于清分日期！'
	},
	checkIp: { 
		validator: function(value){
			var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g; //匹配IP地址的正则表达式 
            if(re.test(value)){ 
               if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) return true; 
            } 
           return false;  
		}, 
		message: '格式不正确！'
	}
});



function Swith(strdate){
	var strYear=strdate.substring(0,4);
	var strMonth=strdate.substring(5,7); 
	var strDay=strdate.substring(8,10);
	var strHours=strdate.substring(11,13);
	var strMinutes=strdate.substring(14,16);
	return new Date(strYear,strMonth,strDay,strHours,strMinutes); 
} 
//格式化时间
function dateTimeFormat(val,row){
	if(val != null && val != ""){
		var rowTime = new Date(val);
		return rowTime.getFullYear()+"-"+((rowTime.getMonth()+1)<10?("0"+(rowTime.getMonth()+1)):(rowTime.getMonth()+1))+"-"+(rowTime.getDate()<10?("0"+rowTime.getDate()):rowTime.getDate())+" "+(rowTime.getHours()<10?("0"+rowTime.getHours()):rowTime.getHours())+":"+(rowTime.getMinutes()<10?("0"+rowTime.getMinutes()):rowTime.getMinutes())+":"+(rowTime.getSeconds()<10?("0"+rowTime.getSeconds()):rowTime.getSeconds());
	}else{
		return "";
	}
}

//超过10个字会弹出tooltip
function showFullContent(value, row, index) {
    var abValue = value;
    if (value.length>=10) {
        abValue = value.substring(0,9) + "...";
    }
    var content = '<div  title="' + value + '" class="note" >' + abValue + '</div>';
    return content;
}
