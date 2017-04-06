var mainDiv;
var strArray = new Array();
var openState;
var url;
$(function() {
	
	createMainDiv();
//	$("body").loaded();
	mainDiv.initDiv();
});

function createMainDiv() {
	/*
	 * 2种模式，1、开发模式，2、sitemesh上线模式
	 */
	if (!$("#mainDiv")[0]) {
		mainDiv = $("body");
	} else {
		mainDiv = $("body");
	}
	
	/**
	 * 常量
	 */
	mainDiv.isInitDataTable = true;
	
	
	var serchForm = mainDiv.find("#serchForm");
	mainDiv.serchForm = serchForm;
	/**
	 * 搜索按钮
	 */
	var searchButtion = mainDiv.find("#searchButtion");
	mainDiv.searchButtion = searchButtion;
	if (!!searchButtion[0]) {
		searchButtion.linkbutton({
			iconCls : "icon-search"
		});

		searchButtion.click(function() {
			
			if( serchForm.form('validate')){
				dataTable.datagrid('options').url = mainDiv.baseUrl+'/list/json.json';
			
				dataTable.datagrid("reload",serchForm.serializeObject());
			}else{
				return;
			}
		});
	}
	
	
	var resetButtion = mainDiv.find("#resetButtion");
	mainDiv.resetButtion = resetButtion;
	if (!!resetButtion[0]) {
		resetButtion.linkbutton({
			iconCls : "icon-redo"
		});

		resetButtion.click(function() {
			serchForm.form('clear');
		});
	}
	
	
	/**
	 * 数据table
	 */
	var dataTable = mainDiv.find("#dataTable");
	mainDiv.dataTable = dataTable;
	if (!!dataTable[0]) {
		dataTable.datagrid({
			url : null,
			toolbar : '#toolbar',
			idField : 'id',
//			fit: true, //填充父页面
			pagination : true,
			pageSize:30,
			pageList:[30,50,80,100],
			rownumbers : true,
			fitColumns : true,
			singleSelect : true,
			striped:true,//显示条纹
			onLoadSuccess:function(){
				dataTable.datagrid('clearSelections');
				//初始化tooltip
				$(".note").tooltip(
	                    {
	                    onShow: function(){
	                        $(this).tooltip('tip').css({ 
	                            width:'300',
	                            
	                            boxShadow: '1px 1px 3px #292929'                        
	                        });
	                    }
	                }
	            );
			}
		});
	}
	
	
	var toolbar = mainDiv.find("#toolbar");
	mainDiv.toolbar = toolbar;
	/**
	 * 增加按钮
	 */
	var addButton = toolbar.find("#addButton");
	mainDiv.addButton = addButton;
	if (!!addButton[0]) {
		addButton.linkbutton({
			iconCls : "icon-add",
			plain : true
		});

		addButton.click(function() {
			editDiv.url = mainDiv.baseUrl+'update.json';
			url = mainDiv.baseUrl+'update.json';
			editDiv.openType="add";
			openState = "add";
			if($('#treeData')!=null){
				$('#treeData').hide();
			}
			editDiv.dialog('open').dialog('setTitle', '新增');
			editForm.form('clear');
			//判断是否含有树结构
			var pdztree = document.getElementById("treeDemo");
			if(pdztree == null || pdztree == undefined){
			}else{
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				zTree.checkAllNodes(false);
			}
			if(typeof(KindEditor)!="undefined")
				KindEditor.html('textarea[id="content"]',"");
		});
	}

	/**
	 * 编辑按钮
	 */
	var editButton = toolbar.find("#editButton");
	mainDiv.editButton = editButton;
	if (!!editButton[0]) {
		editButton.linkbutton({
			iconCls : "icon-edit",
			plain : true
		});

		editButton.click(function() {
			var row = dataTable.datagrid('getSelected');
			if (row) {
				editDiv.url = mainDiv.baseUrl+'update.json?id='+row.id;
				url = mainDiv.baseUrl+'update.json?id='+row.id;
				editDiv.openType="edit";
				openState = "edit";
				if($('#treeData')!=null){
					$('#treeData').show();
				}
				editDiv.dialog('open').dialog('setTitle', '编辑');
				editForm.form('load', row);
				//根据数据返填菜单树
				var pdztree = document.getElementById("treeDemo");
				if(pdztree == null || pdztree == undefined){
				}else{
					if(row.remark!=null){
					    var qz =	row.remark.split(',');
						if(qz.length>0){
							for(var i=0;i<qz.length;i++){
								 var data = qz[i].split('_')[1];
								 if(i==0)
								 row.weightOne = data;
								 if(i==1)
									 row.weightTwo = data;
								 if(i==2)
									 row.weightThree = data;
								 if(i==3)
									 row.weightFour = data;
								 if(i==4)
									 row.weightFive = data;
							}
							
						}
					}
					var ids = "";
					if(row.weightOne!='0'){
						ids="3";
					}
					if(row.weightTwo!='0'){
						if(ids==""){
							ids="4";
						}else{
							ids = ids+",4";
						}
					}			
					if(row.weightThree!="0"){
						if(ids==""){
							ids="5";
						}else{
							ids = ids+",5";
						}
					}			
					if(row.weightFour!="0"){
						if(ids==""){
							ids="6";
						}else{
							ids = ids+",6";
						}
					}				
					if(row.weightFive!="0"){
						if(ids==""){
							ids="7";
						}else{
							ids = ids+",7";
						}
					}
					if(row.sort==1&&row.type==5){
						$('#qzData').hide();
						$('#type').combobox('disable');
					}else{
						$('#qzData').show();
					}
					editForm.form('load', row);
					var zTree = $.fn.zTree.getZTreeObj("treeDemo");
					zTree.checkAllNodes(false);

					if(row.u_roleids == "" || row.u_roleids == null || row.u_roleids == undefined){
						//题目选项树返填
						if(row.qid == "" || row.qid == null || row.qid == undefined){
							
						}else{
							var node = zTree.getNodeByParam("id", row.qid, null);
							zTree.checkNode(node, true, true);
						}
						//试卷题目树返填
						if(row.questions == "" || row.questions == null || row.questions == undefined){
							
						}else{
							if(row.type==5){
								ids = 2;
							}
							var childUrl = "/qsubjectmenu/tmAllInit?ids="+ids;
							//var childUrl = "/qsubjectmenu/tmAllInit";
							$.post(childUrl, function(data) {
								var datas = data;
								var zNode = [];
								for(var i=0;i<datas.length;i++){
									zNode[i] = {
										id:datas[i].id,
										pId:datas[i].parent_id,
										name:datas[i].menu_name
									}
								}
								$.fn.zTree.init($("#treeDemo"), setting, zNode);
								var zTree = $.fn.zTree.getZTreeObj("treeDemo");
								zTree.checkAllNodes(false);
								 
								var cdids = row.questions.split(",");
								var nodes = zTree.getNodes();
								var idxs = "";
								for(var i=0;i<cdids.length;i++){
									zTree.checkNode(zTree.getNodeByParam("id",cdids[i]),null);
									var node = zTree.getNodeByParam("id",cdids[i]);
									idxs = idxs + node.id + ",";
								}
								document.getElementById("questions").value = idxs.substring(0,idxs.length-1);
							}, 'json');
						/*	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
							zTree.checkAllNodes(false);
							 
							var cdids = row.questions.split(",");
							var nodes = zTree.getNodes();
							var idxs = "";
							for(var i=0;i<cdids.length;i++){
								zTree.checkNode(zTree.getNodeByParam("id",cdids[i]),null);
								var node = zTree.getNodeByParam("id",cdids[i]);
								idxs = idxs + node.id + ",";
							}
							document.getElementById("questions").value = idxs.substring(0,idxs.length-1);*/
						}
					}else{
						var cdids = row.u_roleids.split(",");
						var nodes = zTree.getNodes();
						var idxs = "";
						for(var i=0;i<cdids.length;i++){
							var node = zTree.getNodeByParam("id", cdids[i], null);
							zTree.checkNode(node, true, true);
							idxs = idxs + node.name + ",";
						}
						document.getElementById("qxxs").value = idxs.substring(0,idxs.length-1);
					}
				}
				if(typeof(KindEditor)!="undefined")
					KindEditor.html('textarea[id="content"]',row.content);
			}else{
				$.messager.alert('提示', '请选择编辑对象！', 'info');
				/*$.messager.show({ 
					title : '提示',
					msg : '请选择编辑对象！'
				});*/
			}
			
		});
	}
	/**
	 * 删除按钮
	 */
	var delButton = toolbar.find("#delButton");
	mainDiv.delButton = delButton;
	if (!!delButton[0]) {
		delButton.linkbutton({
			iconCls : "icon-remove",
			plain : true
		});
		delButton.click(function() {
			var row = dataTable.datagrid('getSelected');
			if (row) {
				$.messager.confirm('Confirm',
						'确定删除该信息?',
						function(r) {
							if (r) {
								$.post(mainDiv.baseUrl+'delete.json', {
									id : row.id
								}, function(result) {
									dataTable.datagrid("reload"); 
								}, 'json');
							}
						});
			}else{
				/*$.messager.show({ 
					title : '提示',
					msg : '请选择删除对象！'
				});*/
				
				$.messager.alert('提示', '请选择删除对象！', 'info');
			}
		});
	}

	var editDiv = mainDiv.find("#editDiv");
	mainDiv.editDiv = editDiv;
	if (!!editDiv[0]) {
		editDiv.dialog({
			buttons : '#editButtonsDiv',
			closed : true,
			validate : true
		});
	}
	
	var editForm = editDiv.find("#editForm");
	mainDiv.editForm = editForm;
	/**
	 * 保存按钮
	 */
	var editSaveButton = mainDiv.find("#editSaveButton");
	mainDiv.editSaveButton = editSaveButton;
	if (!!editSaveButton[0]) {
		editSaveButton.linkbutton({
			iconCls : "icon-ok"
		});

		editSaveButton.click(function() {
			if (editForm.form('validate')) {
				$.post(editDiv.url, editForm.serialize(),function(data){
//					var row = dataTable.datagrid('getSelected');
//					var rowIndex =dataTable.datagrid('getRowIndex',row);
					if(editDiv.openType=='add'){
						editDiv.dialog('close'); 
						if(!!data&&!!data.id){
							dataTable.datagrid('appendRow',data); 
						}else{
							dataTable.datagrid('reload'); 
						}
					}else if(editDiv.openType=='edit'){
						editDiv.dialog('close'); // close the dialog
						dataTable.datagrid('reload'); // reload the user data
					}
//					dataTable.datagrid('selectRow',rowIndex);
				}).error(function(XMLHttpRequest){
					var response = XMLHttpRequest.responseJSON;
					var responseText = XMLHttpRequest.responseText;
					var status = XMLHttpRequest.status;
					if(status==400){
						if(!!editSaveButton.clickError){
							editSaveButton.clickError(response.code,response.info,response.data);
						}else{
							$.messager.alert('模块异常', '异常代码:'+response.code+'\n'+'异常信息:'+response.info, 'error');
						}
					}
				});
			}
		});
	}

	var editCancelButton = mainDiv.find("#editCancelButton");
	mainDiv.editCancelButton = editCancelButton;
	if (!!editCancelButton[0]) {
		editCancelButton.linkbutton({
			iconCls : "icon-cancel"
		});

		editCancelButton.click(function() {
			editDiv.dialog('close');
		});
	}
	
	/**
	 * 将class='dictListFilterCombobox'设置字典LIST类型的COMBOBOX
	 */
	var filterCombobox = mainDiv.find(".dictListFilterCombobox");
	if(filterCombobox.length>0){
		for(var i=0;i<filterCombobox.length;i++){
			var cc = filterCombobox[i];
			var dictType = cc.getAttribute("dictType");
			if(dictType!=null && dictType!=''){
				$(cc).combobox({
					filter:function(q, row){
						var opts = $(this).combobox('options');
						return row[opts.textField].indexOf(q) >= 0 || row[opts.valueField].indexOf(q) >= 0;
					},
					formatter:function(row){
						return row.key+"-"+row.value;
					},
					dictType:dictType,
					ccData:[],
					loaded:false,
					valueField:"value",
					textField:"name",
					//panelWidth:"300",
					delay:300,
					loadFilter:function(data){
						if(data && data.length > 200){
							var opts = $(this).combobox('options');
							opts.ccData = data;
							var relData = [];
							for(var i=0;i<=200;i++){
								relData.push(data[i]);
							}
							return relData;
						}else return data;
					},
					onHidePanel:function(){
						var panel = $(this).combo('panel');
						if(panel.find('div.combobox-item-selected').length<1) $(this).combo('setText',null);
					},
					keyHandler:{
						up: function(){},
						down: function(){},
						enter: function(){},
						query:function(q){
							var opts = $(this).combobox('options');
							var ccData = opts.ccData;
							var panel = $(this).combo('panel');
							panel.find('div.combobox-item-selected').removeClass('combobox-item-selected');
							$(this).combo('setValue',null);
							if(ccData.length > 200){
								var relData = [];
								var count = 0;
								for(var i=0;i<ccData.length;i++){
									var row = ccData[i];
									if(row[opts.textField].indexOf(q) >= 0 || row[opts.valueField].indexOf(q) >= 0){
										relData.push(row);
										count += 1;
										if(count == 200) break;
									}
								}
								$(this).combobox('loadData',relData);
								$(this).combobox('setText',q);
								panel.find('div.combobox-item-selected').removeClass('combobox-item-selected');
							}else{
								panel.find('div.combobox-item').hide();
								var data = $.data(this, 'combobox').data;
								for(var i=0; i<data.length; i++){
									if (opts.filter.call(this, q, data[i])){
										var v = data[i][opts.valueField];
										var s = data[i][opts.textField];
										var item = panel.find('div.combobox-item[value="' + v + '"]');
										item.show();
										if (s == q){
											$(this).combo('setValues',[v]);
											item.addClass('combobox-item-selected');
										}
									}
								}
							}
						}
					}
				});
				if(dictType == "LIST_AREA"){
					$(cc).combobox({
						valueField:"id",
						textField:"area_name",
					})
					$(cc).combobox('loadData',common.getAreaList());
				}else{
					$(cc).combobox('loadData',common.getDictList(dictType));
				}
			}
		}
	}

	/**
	 * 初始化mainDiv数据
	 */
	mainDiv.initDiv = function() {

	};
	
	if(typeof extendMainDiv!='undefined'){
		extendMainDiv(mainDiv);
	}
	if(mainDiv.isInitDataTable){
		$(window).load(function () {
			//dataTable.datagrid('options').url = mainDiv.baseUrl+'queryPage.json';
			mainDiv.searchButtion.click();
		});
	}
	
}

/**
 * 功能描述：通用导出Excel
 * @param url 请求路径
 * @param names 所有参数名称
 * @param values 所有对应参数值
 */
function exportexcel(url,names,values){
	if (names == null || values == null){
		return;
	}
	if (names.length != values.length){
		return;
	}
	
	var tempForm = document.createElement("form");
    tempForm.method="post";    
    tempForm.action=url;    
	for (var i = 0; i < names.length; i++){
		 var hideInput = document.createElement("input");    
		 hideInput.type="hidden";    
		 hideInput.name= names[i];
		 hideInput.value=values[i];
		 tempForm.appendChild(hideInput);
	}
	
	if(tempForm.attachEvent){
		tempForm.attachEvent("onsubmit",function(){}); 
	}else if(tempForm.addEventListener){
		tempForm.addEventListener("onsubmit",function(){}); 
	}
	
	document.body.appendChild(tempForm);
	
	//tempForm.fireEvent("onsubmit");  
	tempForm.submit();
	document.body.removeChild(tempForm);
}


/**
 * 功能描述：通用导出报表
 * @param url 请求路径
 * @param names 所有参数名称
 * @param values 所有对应参数值
 */

function exportreport(url,names,values){
	
	strArray[0] = new Object();
	strArray[0].name = "url";
	strArray[0].value = url;
	for (var i = 0; i < names.length; i++){
		strArray[i+1] = new Object();
		strArray[i+1].name = names[i];
		strArray[i+1].value = values[i];
	}
	if(navigator.userAgent.indexOf("Firefox")>0){
		var style = "dialogHeight:"+screen.availHeight+",dialogWidth:"+screen.availWidth+",dialogTop:px,dialogLeft:px,edge:raised,center:yes,help:no,resizable:yes,status:no,modal:yes";
		window.open(webBaseUrl+"cwn/query/openAlone.html",'_blank',"");
	}else{
		var style = "dialogHeight:"+screen.availHeight+";dialogWidth:"+screen.availWidth+";dialogTop:px;dialogLeft:px;edge:raised;center:yes;help:no;resizable:yes;status:no;";
		window.showModalDialog(webBaseUrl+'cwn/query/modalAlone.html',strArray,style);
	}
}

function findStrArray(){
	return strArray;
}
function clearStrArray(){
	strArray = new Array();
}