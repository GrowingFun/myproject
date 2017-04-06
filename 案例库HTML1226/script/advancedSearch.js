 var sumRecord = 0 /*选择的记录数*/
 var selectStatus = 1 /*判断大类有选中项*/
 var page = 1; /*分页*/
 var pageStart = 0,
     pageEnd = 0;
 var pagePrv = null;
 var pageNext = '2';
 var pagePrvIndex = null;
 var pageNextIndex = 2;
 var thisPage = $(".pageWrap").find("li:has(a)").eq(0); /*初始化*/
 var pageCount = 1;
 /*所有大类下面对应子类*/
 var zhenwuwenxiang = ['地方公务员库', '高级公务员库', '全国人大公务员库', '全国政协公务员库', '社会团体公务员库', '中央机构公务员库', '部委动态', '政府公报']
 var zhengqingshuju = ['政情数据库'];
 var sifaanliku = ['婚姻继承', '民商案例', '消费维权', '刑事案例', '医疗纠纷', '知识产权', '最高院判例', '行政案例'];
 var zhengwuyuqing = ['地方舆情', '国际舆情', '名人舆情', '农业舆情', '舆情分析', '企业舆情', '舆情案例', '舆情报告', '舆情调研', '舆情案例'];
 var jueceanli = ['政务决策案例', '商务案例库', '案例分析库', '综合案例数据库'];
 var waiwenshujuku = ['英语国家政府案例库', '俄语国家政府案例库', '日语国家政府案例库', '英语舆情库', '俄语舆情库', '英语案例分析库'];
 var fanfuchangliang = ['反腐倡廉', '反腐倡廉分析'];
 var keyWord = ['时间', '来源', '正文', '分类号', '关键词', '点评'];

 /*所有子类对应的关键词*/
 /*政务文献库*/
 /*地方公务员库*/
 var dfgwy = ['全部', '姓名', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /*高级公务员库*/
 var gjgwy = ['全部', '姓名', '职位', '标题', '正文', '分类号', '地域', '关键词', '点评', '来源'];
 /*全国人大公务员库*/
 var qgrdgwy = ['全部', '姓名', '职位', '标题', '正文', '分类号', '地域', '关键词', '点评'];
 /*全国政协公务员库*/
 var qgzxgwy = ['全部', '姓名', '职位', '标题', '正文', '分类号', '地域', '关键词', '点评'];
 /*社会团体公务员库*/
 var shttgwy = ['全部', '姓名', '职位', '标题', '正文', '分类号', '地域', '关键词', '点评'];
 /*中央机构公务员库*/
 var zyjggwy = ['姓名', '职位', '标题', '正文', '分类号', '地域', '关键词', '点评'];
 /*部委动态*/
 var bwdt = ['全部', '标题', '来源', '正文', '网址', '分类号', '地域', '关键词', '点评'];
 /*政府公报*/
 var zfgb = ['全部', '省市', '年份', '期数', '标题', '链接', '正文', '文献类型', '发文字号', '分类号', '关键词', '地域'];
 var zwwxSum = dfgwy.concat(gjgwy, qgrdgwy, qgzxgwy, shttgwy, zyjggwy, bwdt, zfgb); /*把以上小类合并成一个大类*/
 zwwxSum = arrayRepeat(zwwxSum);

 /*政情(地理)数据库*/
 var zqsj = ['全部', '省市', '简介', '历史沿革', '地理环境', '交通', '气候', '自然资源', '人口民族', '经济', '特产', '社会', '文化', '旅游', '页面网址'];


 /* 司法案例库*/
 /* 婚姻继承*/

 var hyjch = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评']
     /* 民商案例*/
 var msal = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评']
     /* 消费维权*/
 var xfwq = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评']
     /*刑事案例*/
 var xsal = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评']
     /*医疗纠纷*/
 var yljf = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评']
     /*知识产权*/
 var zscq = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评']
     /*最高院判例*/
 var zgypl = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评']
     /*行政案例*/
 var xzal = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 var sfalSum = hyjch.concat(msal, xfwq, xsal, yljf, zscq, zgypl, xzal);
 sfalSum = arrayRepeat(sfalSum);
 /* 政务舆情库*/
 /*地方舆情*/
 var dfyq = ['全部', '省市', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /*旅游舆情*/
 var lyyq = ['全部', '省市', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /* 国际舆情*/
 var gjyq = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /*名人舆情*/
 var mryq = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];

 /*农业舆情*/
 var nyyq = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /*舆情分析
  */
 var yqfx = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];

 /*企业舆情*/
 var qyyq = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /*舆情案例*/
 var yqal = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /*舆情报告*/
 var yqbg = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /*舆情调研*/
 var yqdy = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 var zwyqSum = dfyq.concat(lyyq, gjyq, mryq, nyyq, yqfx, qyyq, yqal, yqbg, yqdy);
 zwyqSum = arrayRepeat(zwyqSum);

 /*决策案例库
  */
 /*政务决策案例*/
 var zwjcal = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评', '性质', '借鉴', '意义', '决策依据', '正反面', '决策目标'];
 /*商务案例库*/
 var zwal = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /*案例分析库*/
 var alfx = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /*综合案例数据库*/
 var zgalsj = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 var jcanSum = zwjcal.concat(zwal, alfx, zgalsj);
 jcanSum = arrayRepeat(jcanSum);

 /*外语案例库*/
 /*英语国家政府案例库*/
 var yygjzfal = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /*俄语国家政府案例库*/
 var eygjzfal = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /*日语国家政府案例库*/
 var rygjzfal = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /*英语舆情库
  */
 var yyyq = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /*俄语舆情库*/
 var eyyq = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /*英语案例分析库*/
 var yyalfx = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 var yygjzfSum = yygjzfal.concat(eygjzfal, rygjzfal, yyyq, eyyq, yyalfx);
 yygjzfSum = arrayRepeat(yygjzfSum);

 /*党风廉洁建设和反腐败斗争*/
 /*反腐倡廉*/
 var ffcl = ['全部', '标题', '来源', '正文', '分类号', '地域', '关键词', '点评'];
 /*反腐倡廉分析*/
 var ffclfx = ['全部', '贪官姓名', '贪官级别', '贪官军衔级别', '贪官情妇', '贪官家属', '贪官亲属', '贪官秘书', '贪官司机', '新闻题目', '区域（落马区域）', '职务', '行业'];
 var dfljSum = ffcl.concat(ffclfx);
 dfljSum = arrayRepeat(dfljSum);
 /*点击下载PDF弹窗提示下载*/
 $(function() {
     $(document).delegate(".down", "click", function() {
             /*获取当前点击的下载按钮所对应的文章内容*/
             var preContentPdf = $(this).closest(".contentList").find(".articlecontent").html();
             var html = '<h2 class="downPdf-title">下载全文</h2><div class="downContent"><span class="format">格   式:</span><span class="pdfForm">PDF格式</span></div><p class="downSure">确定</p>';
             var layerPage = layer.open({
                 type: 1,
                 title: '',
                 skin: 'downPdf', //样式类名
                 closeBtn: 1, //显示关闭按钮
                 anim: 2,
                 area: ['500px', '190px'],
                 shadeClose: true, //开启遮罩关闭
                 content: html
             });
             $(".downSure").on("click", function() {
                 /*把文章变成PDF下载*/
                 $(".layui-layer-close").trigger("click");
             })

         })
         /*使用帮助弹窗*/
     $(".useHelp").on("click", function() {
             var html = '<div class="use-help-box clearfix"><div class="use-help-left fl"><h3>欢迎使用中国政府管理国际案例库！</h3>' +
                 '<p>您可以通过系统给您提供的各种检索以及辅助分析工具，对查新点的新颖性进行查证。</p>' +
                 '<p class="tag-red">确定检索词，您可以：</p>' +
                 '<p>提供一段文本（比如科学技术要点），由系统给您推荐检索词</p>' +
                 '<p class="tag-red">确定检索策略，您可以：</p>' +
                 '<p>使用“主题”字段检索：主题字段包含标题，关键词，摘要</p>' +
                 '<p>使用“标题或关键词”字段检索，即标题或者关键词</p>' +
                 '<p>检索词进行与、或、非逻辑运算</p>' +
                 '<p>查看检索历史，检索历史表达式可以拼接</p>' +
                 '<p>在高级检索中构造检索条件，由系统给您生成表达式</p>' +
                 '<p>查看检索结果的高频关键词，提供相关检索词</p>' +
                 '<p class="tag-red">检索完成后，您可以：</p>' +
                 '<p>使用查新格式导出功能，还可以自定义字段导出</p></div>' +
                 '<div class="use-help-contact fr">' +
                 '<p>如果您有任何意见和建议，欢迎与我们联系！</p>' +
                 '<p>我们的联系方式是：</p>' +
                 '<p>联系电话：010-65936654</p>' +
                 '<p>E-mail: baiwen@baiwendata.com.cn</p>' +
                 '</div>' +
                 '</div>';
             var layerPage = layer.open({
                 type: 1,
                 title: false,
                 skin: 'layui-layer-demo1', //样式类名
                 closeBtn: 1, //显示关闭按钮
                 anim: 2,
                 area: ['700px', '490px'],
                 shadeClose: true, //开启遮罩关闭
                 content: html
             });
             $(".downSure").on("click", function() {
                 /*把文章变成PDF下载*/
                 $(".layui-layer-close").trigger("click");
             })

         })
         /*增加筛选条件*/
     $(".addFilter").on("click", function() {
             var html = $(".selectList").first().clone(true);
             if ($(".selectList").length >= 1 && $(".selectList").length <= 6) {
                 $(".reduceFilter").show();
                 $(".selectFilteWrap").append(html);
             } else {
                 $(this).hide();
             }
         })
         /*全选记录*/
     $(".allReList").on("click", function() {
             sumRecord = 0;
             $(".contentList").each(function(index, el) {
                 $(this).find('.selectIco').addClass('active');
                 sumRecord++;
             });
             $(".recordCount").html(sumRecord); /*把选中的记录条数显示出来*/
         })
         /*减少筛选条件按钮*/
     $(".reduceFilter").on("click", function() {

             if ($(".selectList").length > 2) {
                 $(".selectList").last().remove();
             } else {
                 $(".selectList").last().remove();
                 $(this).hide();
                 return false;
             }
             $(".addFilter").show();

         })
         /*记录前面选择按钮效果*/
     $(document).delegate(".selectIco", "click", function() {
             $(this).toggleClass('active');
         })
         /*排序按钮效果*/
     $(".orderBox").find("span").on("click", function() {
             $(this).addClass('active').siblings('span').removeClass('active');
         })
         //清除选择搜索结果记录条数的输入框
     $(".elemWrap ").find('.deleAllSelect').on("click", function() {
             sumRecord = 0; /*记录数为0*/
             $(".elemWrap").find('input').val('');
             $(".contentList").each(function() {
                 $(this).find('.selectIco').removeClass('active');
             })
             $(".recordCount").html(sumRecord); /*把选中的记录条数显示出来*/
         })
         /*需要选择第几条记录*/
     $(".elemWrap").find('.BtnSelect').on("click", function() {
         sumRecord = 0;
         var status = true;
         var inputValue = [];
         var input = $(".elemWrap").find('input');
         input.each(function() {
             inputValue.push($(this).val());
         });
         if (input.val() == '') {
             alert("请填写序号");
             return false;
         }

         for (var i = 0; i < inputValue.length; i++) {
             if (isNaN(inputValue[i])) {
                 alert("请输入正确的数字序号");
                 status = false;
                 return false;
             }
         }
         if (inputValue[1] < inputValue[0]) {
             alert("后面的序号不可以大于前面的序号");
             status = false;
             return false;
         }

         if (status) {
             $(".contentList").each(function(index, el) {
                 var indexValue = inputValue[1];
                 if (index + 1 <= indexValue && index + 1 >= inputValue[0]) {
                     sumRecord++; /*记录数累加*/
                     $(this).find('.selectIco').addClass('active');
                 } else {
                     $(this).find('.selectIco').removeClass('active');
                 }

             });
         }
         $(".recordCount").html(sumRecord); /*把选中的记录条数显示出来*/

     });

     /*选择全部大类*/
     $(".allSelectType").on("click", function() {
             var childType = '';
             if ($(".childType").find('span').length == 0) {
                 $(".childType").css("border-bottom", "1px solid #dbdbdb")
             }
             $(".seveType").find('span').each(function() {
                 $(this).addClass('active');
             })

             var allChild = zhenwuwenxiang.concat(zhengqingshuju, sifaanliku, zhengwuyuqing, jueceanli, waiwenshujuku, fanfuchangliang);
             for (var i = 0; i < allChild.length; i++) {
                 childType += '<span>' + allChild[i] + '</span>';
             }

             $(".childType").html(childType);
             var allArray = zwwxSum.concat(zqsj, sfalSum, zwyqSum, dfljSum, jcanSum, yygjzfSum)
             allArray = arrayRepeat(allArray); /*合并所有关键词并去重*/
             var select = equal(allArray);
             $(".selectList").find('.filterSelect').append(select)

         })
         /*清除全部大类*/
     $(".clearAllType").on("click", function() {
             $(".seveType").find('span').each(function() {
                 $(this).removeClass('active');
             })
             $(".childType").empty(); /*清空子类*/
             $(".childType").css("border", "none"); /*去掉父级下面的线*/
             $(".selectList").find('.filterSelect').find('option').remove(); /*清除下拉列表里面的条件*/
             $(".selectList").find('.filterSelect').append('<option value=0>全部</option>'); /*只添加全部*/
         })
         /*大类选择与取消*/
     $(".seveType").find('span').on("click", function() {
             var thisText = $(this).text();
             var thisIndexX = $(this).index();
             $(".childType").css("border-bottom", "1px solid #dbdbdb")
             if ($(this).hasClass("active")) {
                 switch (thisText) {
                     case '政务文献库':
                         deleSeconType(zhenwuwenxiang) /*删除对应子类*/
                         break;
                     case '政情数据库':
                         deleSeconType(zhengqingshuju)
                         break;
                     case '司法案例库':
                         deleSeconType(sifaanliku)
                         break;
                     case '政务舆情库':
                         deleSeconType(zhengwuyuqing)
                         break;
                     case '决策案例库':
                         deleSeconType(jueceanli)
                         break;
                     case '外文数据库':
                         deleSeconType(waiwenshujuku)
                         break;
                     case '党风廉洁建设和反腐败斗争库':
                         deleSeconType(fanfuchangliang)
                         break;
                 }
                 var indexSelectType = forBigType(thisIndexX);
                 var activeMerge = allMerge(indexSelectType);
                 console.log(activeMerge)
                 if (activeMerge.length) {
                     $(".selectList").find(".filterSelect").html(equal(activeMerge)); /*重组所有关键词*/
                 } else {
                     $(".selectList").find('.filterSelect').find('option').remove(); /*清除下拉列表里面的条件*/
                     $(".selectList").find('.filterSelect').append('<option value=0>全部</option>'); /*只添加全部*/
                 }

             } else {
                 seleWhich(thisText) /*把关键词遍历到SELECT中去*/
                 switch (thisText) {
                     case '政务文献库':
                         addSeconType(zhenwuwenxiang) /*把对应子类添加到页面中*/
                         break;
                     case '政情数据库':
                         addSeconType(zhengqingshuju)
                         break;
                     case '司法案例库':
                         addSeconType(sifaanliku)
                         break;
                     case '政务舆情库':
                         addSeconType(zhengwuyuqing)
                         break;
                     case '决策案例库':
                         addSeconType(jueceanli)
                         break;
                     case '外文数据库':
                         addSeconType(waiwenshujuku)
                         break;
                     case '党风廉洁建设和反腐败斗争库':
                         addSeconType(fanfuchangliang)
                         break;
                 }
             }
             $(this).toggleClass('active');

         })
         /*下拉框获得焦点后边框颜色改变*/
     $("select").on("focus", function() {
         $(this).addClass('focus');
     })
     $("select").on("blur", function() {
         $(this).removeClass('focus');
     })
     $(".detailFilter").on("focus", function() {
         $(this).addClass('focus');
     })
     $(".detailFilter").on("blur", function() {
             $(this).removeClass('focus');
         })
         /*二级子类选择字体变色*/
     $(".childType").delegate("span", "click", function() {
         $(this).toggleClass('active');
         console.log($(this).text()); /*获取当前选中的二级子类文本*/
         /*以下为ajax*/
     })

     /*给日期下拉列表赋值*/
     var Udate = new Date();
     /*当前年份*/
     var curYear = Udate.getFullYear();
     var starYear = 2000;
     var yearAll = [];
     for (var starYear = 2000; starYear <= curYear; starYear++) {
         yearAll.push(starYear);
     }
     $(".dateSelect").find('select').append(equal(yearAll))

     /*点搜索搜索按钮提交*/
     $(".search_StartBtn").on("click", function() {
         var parm = getValuej_Ajax()
         if (parm) {
             subAjax(parm) /*页面AJAX请求*/
             pageAjax(parm)
         } else {
             return false;
         }

     })

     /*选中页面中显示记录数时触发AJAX请求*/
     $(".showRecordCount").find('select').change(function() {
             var parm = getValuej_Ajax()
             if (parm) {
                 subAjax(parm) /*页面AJAX请求*/
             } else {
                 return false;

             }
             pageAjax(parm);
         })
         /*排序方式请求*/
     $(".orderBox").find('span').on("click", function() {
             if ($(this).hasClass("active")) {
                 var parm = getValuej_Ajax()
                 if (parm) {
                     subAjax(parm) /*页面AJAX请求*/
                 } else {
                     return false;

                 }
             }
             pageAjax(parm);
         })
         /*分页效果*/
     $(".pageUl").delegate("a", "click", function() {
         page = parseInt($(this).text());
         thisPage = $(this).closest("li");
         getNextPrv(thisPage)
         var parm = getValuej_Ajax();
         if (parm) {
             subAjax(parm) /*页面AJAX请求*/
         } else {
             return false;

         }
         $(this).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
         $(this).addClass('active').closest('li').siblings('li').find('a').removeClass('active');
         whichPage(thisPage);
     })



     $(".pageUl").delegate("span", "click", function() {
             if ($(this).hasClass("prepage")) {
                 page = parseInt(pagePrv);
                 $(".pageUl").find("li").removeClass("active");
                 $(".pageUl").find("li").find("a").removeClass("active");
                 $(".pageUl").find("li").eq(parseInt(pagePrvIndex)).addClass("active");
                 $(".pageUl").find("li").eq(parseInt(pagePrvIndex)).find("a").addClass("active");
             }

             if ($(this).hasClass("nextpage")) {
                 page = parseInt(pageNext);
                 $(".pageUl").find("li").removeClass("active");
                 $(".pageUl").find("li").find("a").removeClass("active");
                 $(".pageUl").find("li").eq(parseInt(pageNextIndex)).addClass("active");
                 $(".pageUl").find("li").eq(parseInt(pageNextIndex)).find("a").addClass("active");
             }
             var That = $(".pageUl").find("li.active");
             getNextPrv(That)
             whichPage(That);
             var parm = getValuej_Ajax();
             if (parm) {
                 subAjax(parm) /*页面AJAX请求*/
             } else {
                 return false;

             }

         })
         /*初始化SELECT下拉框值*/
     var select_v2 = selectAllValue();
     var allVjoin = zwwxSum.concat(select_v2);
     var allVjoin_x = arrayRepeat(allVjoin);
     var selex = equal(allVjoin_x);
     $(".filterSelect").empty();
     $(".filterSelect").html(selex);
 })


 /*数组去重*/
 function arrayRepeat(arr) {
     var new_arr = [];
     for (var i = 0; i < arr.length; i++) {　　
         var items = arr[i];　　
         if ($.inArray(items, new_arr) == -1) {　
             new_arr.push(items);　　
         }
     }
     return new_arr;
 }


 /*给select框赋值*/
 function equal(seleLen) {
     var seleWrap = null;
     for (var i = 0; i < seleLen.length; i++) {
         seleWrap += '<option value=' + i + '>' + seleLen[i] + '</option>';
     }
     return seleWrap;
 }

 /*判断哪个大类被选中，默认把选中的大类所有关键词都放入筛选条件SELECT框中*/
 function seleWhich(textV) {
     switch (textV) {
         case '政务文献库':
             var select_v2 = selectAllValue();
             var allVjoin = zwwxSum.concat(select_v2);
             var allVjoin_x = arrayRepeat(allVjoin);
             var selex = equal(allVjoin);
             $(".filterSelect").html(selex)
             break;
         case '政情数据库':
             var select_v2 = selectAllValue();
             console.log("option里面的内容:" + select_v2);
             var allVjoin = zqsj.concat(select_v2);
             console.log("合并之后的内容：" + allVjoin)
             var allVjoin_x = arrayRepeat(allVjoin);
             console.log("去重之后的内容:" + allVjoin_x)
             var selex = equal(allVjoin_x);
             $(".filterSelect").html(selex)
             break;
         case '司法案例库':
             var select_v2 = selectAllValue();
             var allVjoin = sfalSum.concat(select_v2);
             var allVjoin_x = arrayRepeat(allVjoin);
             var selex = equal(allVjoin_x);
             $(".filterSelect").html(selex)
             break;
         case '政务舆情库':
             var select_v2 = selectAllValue();
             var allVjoin = zwyqSum.concat(select_v2);
             var allVjoin_x = arrayRepeat(allVjoin);
             var selex = equal(allVjoin_x);
             $(".filterSelect").html(selex)
             break;
         case '决策案例库':
             var select_v2 = selectAllValue();
             var allVjoin = jcanSum.concat(select_v2);
             var allVjoin_x = arrayRepeat(allVjoin);
             var selex = equal(allVjoin_x);
             $(".filterSelect").html(selex)
             break;
         case '外文数据库':
             var select_v2 = selectAllValue();
             var allVjoin = yygjzfSum.concat(select_v2);
             var allVjoin_x = arrayRepeat(allVjoin);
             var selex = equal(allVjoin_x);
             $(".filterSelect").html(selex)
             break;
         case '党风廉洁建设和反腐败斗争库':

             var select_v2 = selectAllValue();
             var allVjoin = dfljSum.concat(select_v2);
             var allVjoin_x = arrayRepeat(allVjoin);
             var selex = equal(allVjoin_x);
             $(".filterSelect").html(selex)
             break;
     }
 }

 /*删除二级类*/
 function deleSeconType(seconTypeArray) {
     for (var i = 0; i < seconTypeArray.length; i++) {
         for (var j = 0; j < $(".childType span").length; j++) {
             var thisHtml = $(".childType").find("span").eq(j);
             if (thisHtml.text() == seconTypeArray[i]) {
                 thisHtml.remove();
             }
         }
     }
     /*如果子类没有数据清除下面的横线*/
     if (!$(".childType span").length) {
         $(".childType").css("border", "none")
     }

 }
 /*添加二级类*/
 function addSeconType(seconTypeArray) {
     for (var i = 0; i < seconTypeArray.length; i++) {
         $(".childType").append('<span class="animated fadeIn">' + seconTypeArray[i] + '</span>')
     }
 }
 /*获取当前大类选中的内容*/
 function getAllKey(bigTypeNode) {
     var bigType = [];
     bigTypeNode.find('.active').each(function() {
         bigType.push($(this).text());
     })
     return bigType;
 }
 /*遍历select框所有当前值*/
 function selectCurrent() {
     var seleLine = [];
     var selectLen = $(".selectFilteWrap").find('.selectList').length;
     for (var i = 0; i < selectLen; i++) {
         var ThisSelect = $(".selectFilteWrap").find('.selectList').eq(i).find('.filterSelect').find('option:selected').text();
         var ThisKeyLike = $(".selectFilteWrap").find('.selectList').eq(i).find('.likeType').find('option:selected').text();
         var ThisKeyInput = $(".selectFilteWrap").find('.selectList').eq(i).find('.detailFilter').val();
         var ThisKeyLogic = $(".selectFilteWrap").find('.selectList').eq(i).find('.relatio').find('option:selected').text();
         var lineMerge = ThisSelect.concat(ThisKeyLike, ThisKeyInput, ThisKeyLogic);
         seleLine.push(lineMerge);
     }
     return seleLine;
 }
 /*遍历所有select里面的所有文本值转为数组*/
 function selectAllValue() {
     var option_all_value = $(".selectFilteWrap").find('.selectList').eq(0).find('.filterSelect').find('option').length;
     var optionText = [];
     for (var i = 0; i < option_all_value; i++) {
         optionText.push($(".selectFilteWrap").find('.selectList').eq(0).find('.filterSelect').find('option').eq(i).text());
     }
     console.log(optionText)
     return optionText;
 }


 /*重组SELECT里面的值*/
 function seleWhich(textV) {
     switch (textV) {
         case '政务文献库':
             var select_v2 = selectAllValue();
             var allVjoin = zwwxSum.concat(select_v2);
             var allVjoin_x = arrayRepeat(allVjoin);
             var selex = equal(allVjoin);
             $(".filterSelect").html(selex)
             break;
         case '政情数据库':
             var select_v2 = selectAllValue();
             console.log("option里面的内容:" + select_v2);
             var allVjoin = zqsj.concat(select_v2);
             console.log("合并之后的内容：" + allVjoin)
             var allVjoin_x = arrayRepeat(allVjoin);
             console.log("去重之后的内容:" + allVjoin_x)
             var selex = equal(allVjoin_x);
             $(".filterSelect").html(selex)
             break;
         case '司法案例库':
             var select_v2 = selectAllValue();
             var allVjoin = sfalSum.concat(select_v2);
             var allVjoin_x = arrayRepeat(allVjoin);
             var selex = equal(allVjoin_x);

             $(".filterSelect").html(selex)
             break;
         case '政务舆情库':
             var select_v2 = selectAllValue();
             var allVjoin = zwyqSum.concat(select_v2);
             var allVjoin_x = arrayRepeat(allVjoin);
             var selex = equal(allVjoin_x);
             $(".filterSelect").html(selex)
             break;
         case '决策案例库':
             var select_v2 = selectAllValue();
             var allVjoin = jcanSum.concat(select_v2);
             var allVjoin_x = arrayRepeat(allVjoin);
             var selex = equal(allVjoin_x);
             $(".filterSelect").html(selex)
             break;
         case '外文数据库':
             var select_v2 = selectAllValue();
             var allVjoin = yygjzfSum.concat(select_v2);
             var allVjoin_x = arrayRepeat(allVjoin);
             var selex = equal(allVjoin_x);
             $(".filterSelect").html(selex)
             break;
         case '党风廉洁建设和反腐败斗争库':
             var select_v2 = selectAllValue();
             var allVjoin = dfljSum.concat(select_v2);
             var allVjoin_x = arrayRepeat(allVjoin);
             var selex = equal(allVjoin_x);
             $(".filterSelect").html(selex)
             break;
     }
 }
 /*遍历哪些大类被选中，获取所有选中的index值*/
 function forBigType(thisIndexX) {
     var ThisIndex = [];
     $(".seveTypeWrap").find('span').each(function() {
         if ($(this).index() !== thisIndexX) {
             if ($(this).hasClass("active")) {
                 ThisIndex.push($(this).index());
             }
         }

     })
     return ThisIndex;
 }
 /*把当前选中的大类下面的关键词重组*/
 function allMerge(ThisOrder) {
     console.log("序号：" + ThisOrder)

     var allArray = [zwwxSum, zqsj, sfalSum, zwyqSum, jcanSum, yygjzfSum, dfljSum];
     var ThisSet = [];
     var ALLSet = [];
     for (var i = 0; i < ThisOrder.length; i++) {
         ThisSet.push(allArray[ThisOrder[i]])
     }
     console.log(ThisSet)
     for (var i = 0; i < ThisSet.length; i++) {
         for (var j = 0; j < ThisSet[i].length; j++) {
             ALLSet.push(ThisSet[i][j])
         }
     }
     console.log("ALLSet" + ALLSet)
     ALLSet = arrayRepeat(ALLSet);
     return ALLSet;
 }
 /*搜索的排序方式*/
 function orderWay() {
     var orderWay = $(".orderBox").find(".active").text();
     return orderWay;
 }
 /*每页显示多少条数据*/
 function showRecord() {
     var showRecord = $(".showRecordCount").find("option:selected").text();
     return showRecord;
 }
 /*提交AJAX请求*/
 function subAjax(parm) {
     $.ajax({
         url: 'data/dataList.json',
         data: parm,
         dataType: 'json',
         beforeSend: function() {
             /*加载动画*/
             $(".loging").show();
         },
         success: function(data) {

             /*加载动画隐藏*/
             $(".loging").hide();
             var html = '';
             var leftCount = '';
             var num = parseInt(parm.showRecord);
             /*左边搜索数量*/
             for (var j = 0; j < data.dataCount.length; j++) {
                 leftCount += '<p class="">' + data.dataCount[j].typeName + '<span><i>(' + data.dataCount[j].typeValue + ')</i>条</span></p>';
             }
             $(".left_All_Record").html(leftCount);
             page = parm.page;
             pageEnd = num * page;
             pageStart = pageEnd - num;
             for (var i = pageStart; i < pageEnd; i++) {
                 /*右边列表获取值 */
                 html += '<div class="contentList">' +
                     '<div class="articlecontent">' +
                     '<h2 class="artTitle"><span class="selectIco"></span><a href=""><i class="indexRe">' + data.dataList[i].index + '.</i>' + data.dataList[i].title + '</a></h2>' +
                     '<p class="articleDetail">' + data.dataList[i].articleDetail + '</p>' +
                     '</div>' +
                     '<div class="articleFooter clearfix">' +
                     '<p class="seachtag fl"><a href="">' + data.dataList[i].tag1 + '</a><a href="">' + data.dataList[i].tag2 + '</a><a href="">' + data.dataList[i].tag3 + '</a></p>' +
                     '<p class="fr articledown"><a class="read" href="profile.html">查看摘要</a><a class="down">下载pdf</a></p>' +
                     '</div>' +
                     '</div>'
                 if ((i + 1) >= data.dataList.length) {
                     break;
                 }
             }
             $(".listWrap").html(html);
         },
         error: function(err) {
             alert("请求出错")
         }

     })
 }
 /*获取所有AJAX所需要值*/
 function getValuej_Ajax() {
     /*判断搜索词里面是否有值*/
     if ($(".detailFilter").val() == '') {
         alert("请填写搜索关键词")
         return false;
     }
     /*获取日期当前选中的值*/
     var starDate = $(".dateSelect").find('.startDate').find('option:selected').text();
     var overDate = $(".dateSelect").find('.overDate').find('option:selected').text();
     if (parseInt(starDate) > parseInt(overDate)) {
         alert("搜索结束时间不可以小于开始时间")
         return false;
     }
     if (!$(".seveType").find(".active").length) {
         alert("请选中一个类型")
         return false;
     }
     var BigTypeNode = $(".seveType");
     var childTypeNode = $(".childType");
     var selectNode = selectCurrent(); /*所有下拉框中的值*/
     var BigType = getAllKey(BigTypeNode); /*获取选中所有大类*/
     var childType = getAllKey(childTypeNode); /*获取选中子类*/
     console.log("当前选中的大类:  " + '~' + BigType + '~' + "\n" + "当前大类下面的小类:  " + '~' + childType); /*打印搜索关键词*/
     console.log("下拉框中值为: " + selectNode);
     console.log("日期初始值:" + '~' + starDate + '~');
     console.log("日期结束值:" + '~' + overDate + '~');
     console.log("当前排序方式:" + '~' + orderWay());
     console.log("当前需要显示的记录数:" + '~' + showRecord())
     var parm = {
         BigType: BigType,
         childType: childType,
         selectNode: selectNode,
         starDate: starDate,
         overDate: overDate,
         orderWay: orderWay(),
         showRecord: showRecord(),
         page: page /*分页全局变量*/
     }
     return parm;
 }
 /*判断当页*/
 function whichPage(thisPage) {
     if (parseInt(thisPage.find("a").text()) >= 2) {
         $(".pageWrap").first().show();
     } else {
         $(".pageWrap").first().hide();
     }
     if (parseInt(thisPage.find("a").text()) < pageTotal) {
         $(".pageWrap").last().show();

     } else {
         $(".pageWrap").last().hide();
     }
 }
 /*动态创建page*/
 function creaPage(pageTotal) {
     var html = '';
     var preBtn = '';
     var nextBtn = '';
     if (pageTotal >= 2) {
         preBtn = '<li class="pageWrap first" style="">' +
             '<span class="prepage">' +
             '<<上一页</span>' +
             '</li>';
         nextBtn = '<li class="pageWrap last" style="">' +
             '<span class="nextpage">' +
             '<<下一页</span>' +
             '</li>';
     }
     for (var i = 1; i <= pageTotal; i++) {
         html += '<li class="pageWrap">' +
             '<a href="javascript:;">' + i + '</a>' +
             '</li>';
     }
     $(".pageUl").html(preBtn + html + nextBtn);
     $(".pageUl").find('.first').hide();
     $(".pageUl").find('li').eq(0).addClass('active');
     $(".pageUl").find('li').find("a").eq(0).addClass('active');

 }
 /*分页AJAX*/
 function pageAjax(parm) {
     $.ajax({
         url: 'data/dataList.json',
         data: parm,
         dataType: 'json',
         success: function(data) {
             pageTotal = Math.ceil(parseInt(data.total) / parseInt(parm.showRecord)); /*总的多少条记录*/
             creaPage(pageTotal)
         }

     })
 }
 /*获取当前位置的前一页和后一页*/
 function getNextPrv(That) {
     pagePrv = That.prev("li").find('a').text();
     pagePrvIndex = That.prev("li:has(a)").index();
     pageNextIndex = That.next("li:has(a)").index();
     pageNext = That.next("li").find('a').text();
 }
