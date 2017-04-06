  var searType = null; /*搜索类型值*/
  var searText = null; /*获取搜索框的值 */
  var listSearchValue = null; /*获取侧边导航搜索的条件 */
  $(function() {

      /*侧边分类导航效果*/
      $(".listTitle").on("click", function() {
              $(this).addClass('active').closest('li').siblings('li').find('.listTitle').removeClass('active');
              /*获取搜索条件*/
              listSearchValue = $(this).find(".title").text();

          })
          /*翻页点击焦点效果*/
      $(".pageWrap").delegate("a", "click", function() {
              $(this).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
              $(this).addClass('active').closest('li').siblings('li').find('a').removeClass('active');
          })
          /*获取搜索内容高度让左边的分类搜索高度跟右边的内容高度一样*/
      var righBoxH = $(".rightBox").get(0).scrollHeight;
      if (righBoxH < 475) {
          $(".leftBox").height("568px");
      } else {
          $(".leftBox").height(righBoxH);
      }


      /*按时间和热度排序按钮效果*/
      $(".orderTogg").delegate("span", "click", function() {
          $(this).addClass('active').siblings('span').removeClass('active')
      })

      /* 获取搜索框中搜索大类类型*/
      /*获取搜索条件*/
      $(".typelist").find("a").on("click", function() {
          /*获取搜索类型*/
          searType = $(this).text();
          /*获取搜索框的值 */
          searText = $(".searchBar").val();
          /*页面导航显示当前位置*/
          $(".current").text(searType);
          typeList();
         /* getSearchRuslt();*/

      })

  })


  //获取大类下面的小类的AJAX
  function typeList() {

      var url = null;
      switch (searType) {
          case '政务文献库':
              url = 'script/type.json';
              break;
          case '政情数据库':
              url = 'script/type1.json';
              break;
          case '司法案例库':
              url = 'script/type2.json';
              break;
          case '政务舆情库':
              url = 'script/type3.json';
              break;
          case '决策案例库':
              url = 'script/type4.json';
              break;
          case '外文数据库':
              url = 'script/type5.json';
              break;
          case '党风廉洁建设和反腐败斗争':
              url = 'script/type6.json';
              break;

      }

      $.ajax({
              url: url,
              datatype: 'json',
              data: '',
              success: function(data) {
                  $(".leftBox").html("<ul class='listBox'></ul>");
                  var html = '';
                  var typetext = '';
                  for (var i = 0; i < data.list.length; i++) {
                      html += '<li class="list">' +
                          '<a class="listTitle clearfix" href="javascript:;"><span class="title fl">' + data.list[i].title + '</span><span class="count fr">' + data.list[i].value + '</span></a>' +
                          '</li>'
                  }
                  /* 大类简介*/
                  $(".intorText").html(data.typeintro)
                      /*大类标题*/
                  $(".searchTit").html(data.typetitle)
                  $(".listBox").append(html);
              },
              error: function() {
                  alert("请求出错")
              }

          })
          /*获取查找内容JS*/
      function getSearchRuslt() {
          $.ajax({
              url: '',
              datatype: 'json',
              data: '',
              success: function(data) {
                  var searesult = '';
                  for (var i = 0; i < data.length; i++) {
                      html = '<div class="contentList">' +
                          '<div class="articlecontent">' +
                          '<a href=""><h2 class="artTitle"><i class="index">' + data.index + '</i>' + data.title + '</h2></a>' +
                          '<p class="articleDetail">' + data.detail + '</p>' +
                          '</div>' +
                          '<div class="articleFooter clearfix">' +
                          '<p class="seachtag fl"><span>' + data.tag1 + '</span><span>' + data.tag2 + '</span><span>航' + data.tag3 + '</span></p>' +
                          '<p class="fr articledown"><span class="read">全文阅读</span><span class="down">下载pdf</span></p>' +
                          '</div>' +
                          '</div>';
                  }
              },
              error: function(data) {
                  alert("请求出错")
              }

          })



      }
  }
