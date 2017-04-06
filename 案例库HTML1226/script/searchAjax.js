  var listSearchValue = null; /*侧边导航子类搜索的条件 */
  var orderValue = null; /*排序条件*/
  var url = 'data/dataList.json'; /*请求的后台搜索页面接口*/
  $(function() {
      /*按时间和热度排序按钮效果*/
      $(".orderTogg").delegate("span", "click", function() {
          $(this).addClass('active').siblings('span').removeClass('active');
          var parm = getAllValue();
          getListAjax(parm); /*ajax请求*/

      })

      /* 获取搜索框中搜索大类类型*/
      $(".typelist").find("a").on("click", function() {
          cancalActive() /*清除左边焦点*/
          var parm = getAllValue();
          getListAjax(parm); /*ajax请求*/

      })
      $(".listBox").delegate("li", "click", function() {
          $(this).find('a').addClass('active').end().siblings('li').find('a').removeClass('active');
          var parm = getAllValue();
          getListAjax(parm); /*ajax请求*/
      })
      $(".subtn").on("click", function() {
          var parm = getAllValue();
          if (parm.searText == '') {
              $(".searchBar").focus(); /*输入框获取焦点*/
              return false;
          } else {
              getListAjax(parm); /*ajax请求*/
          }
      })

  })

  /*获取ajax搜索需要的所有值*/
  function getAllValue() {
      var bigValue = $(".myshow").text(); /*大类*/
      var childValue = $(".listBox").find(".active").text(); /*当前选中的子类*/
      var orderType = $(".orderTogg").find('.active').text(); /*当前排序方式*/
      var indexList = $(".listBox").find(".active").closest("li").index(); /*当前选中的二级类的索引值*/
      var searText = $(".searchBar").val(); /*获取搜索框的值 */

      var parm = {
          bigValue: bigValue,
          childValue: childValue,
          orderType: orderType,
          indexList: indexList,
          searText: searText
      }
      return parm;

  }

  /*获取右边的高度 获取搜索内容高度让左边的分类搜索高度跟右边的内容高度一样*/
  function getHeight() {
      var righBoxH = $(".rightBox").get(0).scrollHeight;
      if (righBoxH < 475) {
          $(".leftBox").height("568px");
      } else {
          $(".leftBox").height(righBoxH);
      }
  }

  function getListAjax(parm) {
      $.ajax({
          url: url,
          data: $.parseJSON(parm),
          dataType: 'json',
          beforeSend: function() {
              /*加载动画显示*/
              $(".loging").show();
          },
          success: function(data) {
              /*加载动画隐藏*/
              $(".loging").hide();
              console.log(parm)
              var leftValue = '' /*左边类型列表值*/
              var html = ''; /*右边列表值*/
              var intro = ''; /*大类类型简介*/
              /*加载动画隐藏*/
              $(".loging").hide();
              /*大类类型简介*/
              intro = ' <div class="searchIntroduce "><div class="innerBox clearfix">' +
                  '<p class="intorText fl">' + data.intro + '</p>' +
                  '<h2 class="searchTit fl">' + parm.bigValue + '</h2>' +
                  '</div></div>';
              $(".r-IntroBox").html(intro);
              /*左边搜索数量*/
              for (var j = 0; j < data.dataCount.length; j++) {
                  leftValue += '<li class="list">' +
                      '<a class="listTitle clearfix" href="javascript:;"><span class="title fl">' + data.dataCount[j].typeName + '</span><span class="count fr">' + data.dataCount[j].typeValue + '篇</span></a>' +
                      '</li>';
              }
              $(".listBox").html(leftValue);
              if (parm.indexList !== -1) {
                  $(".listBox").find('li').eq(parm.indexList).find('a').addClass('active'); /*把焦点放在选中的记录上*/
              }

              for (var i = 0; i < data.dataList.length; i++) {
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
              }
              /*总的记录数*/
              $(".searchcount").find('.count').html(data.total);
              /*把列表加到文档中*/
              $(".listWrap").html(html);
              $(".current").text(parm.bigValue); /*页面导航显示当前位置*/
              getHeight();
          }
      })
  }

  /*清除左边子类中的焦点*/
  function cancalActive() {
      $(".listBox").find('li').each(function() {
          if ($(this).find("a").hasClass("active")) {
              $(this).find('a').removeClass("active");
          }
      })

  }
  /*点击下载PDF弹窗提示下载*/
  $(document).delegate(".down", "click", function() {
      /*获取当前点击的下载按钮所对应的文章内容*/
      var preContentPdf = $(this).closest(".contentList").find(".articlecontent").html();
      var html = '<h2 class="downPdf-title">下载全文</h2><div class="downContent"><span class="format">格   式:</span><span class="pdfForm">PDF格式</span></div><p class="downSure">确定</p>';
      var layerPage = layer.open({
          type: 1,
          title: '',
          skin: 'downPdf', //样式类名
          closeBtn: 1, //不显示关闭按钮
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
