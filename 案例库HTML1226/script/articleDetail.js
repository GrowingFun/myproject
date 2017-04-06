  $(function() {
          var selectBg = "#fff"; /*设置默认的背景色*/
          var sizefont = '14px'; /*设置默认字体大小*/
          var status = 0; /*上一个背景状态*/

          //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
          $(window).scroll(function() {
              if ($(window).scrollTop() > 100) {
                  $(".backTop").fadeIn(1500);
              } else {
                  $(".backTop").fadeOut(1500);
              }
          });

          //当点击跳转链接后，回到页面顶部位置
          $(".backTop").click(function() {
              $('body,html').animate({
                  scrollTop: 0
              }, 1000);
              return false;
          });
          /*取消和收藏弹出效果*/
          var okOn = true;
          $(".collBtn").on("click", function() {
                  if (okOn) {
                      $(this).find('.collIco').addClass('active');
                      layer.msg('收藏成功', {
                          icon: 1,
                          time: 1500
                      })
                  } else {
                      $(this).find('.collIco').removeClass('active');
                      layer.msg('取消收藏成功', {
                          icon: 1,
                          time: 1500
                      })
                  }
                  okOn = !okOn;
              })
              /*点设置按钮时出现文章字体及背景颜色设置*/
          $(".setBtn").on("click", function() {
                  $(".setBtn").css("background-color", selectBg)
                  $(".setBtn").toggleClass("active").next(".setContent").fadeToggle(300);

                  if ($(".setContent").css("display") == 'block') {
                      $(this).addClass('active');
                      $(this).find('.setIco').addClass('active');
                      $(".colorBox").find("span").eq(status).addClass('active').siblings('span').removeClass('active');
                      if ($(".colorBox").find("span.active").hasClass("black")) {
                          setFontColor()

                      } else {
                          removeFontColor()
                      }
                  } else {
                      $(this).removeClass('active');
                      $(this).find('.setIco').removeClass('active');
                  }

              })
              /*文章背景颜色设置*/
          $(".colorBox").find("span").on("click", function() {
                  selectBgTime = $(this).css("background-color");
                  setBg(selectBgTime) /*设置背景色*/
                  $(this).addClass("active").siblings("span").removeClass("active");
                  if ($(this).hasClass("black")) {
                      $(".sizeBox").find('span').addClass('blackModul');
                        $(".setContent").find('h3').addClass('night');
                      setFontColor(); /*设置文章字的颜色为反色*/
                  } else {
                      $(".sizeBox").find('span').removeClass('blackModul');
                        $(".setContent").find('h3').removeClass('night');
                      removeFontColor() /*移除文章字的反色颜色*/
                  }
              })
              /*文章字体大小设置*/
          $(".sizeBox").find("span").on("click", function() {
                  sizefontTime = $(this).css("font-size");
                  setFontSize(sizefontTime)
                  $(this).addClass("active").siblings("span").removeClass("active");

              })
              /* 设置里面点击保存按钮*/
          $(".save").on("click", function() {
              status = $(".colorBox").find('.active').index();
              selectBg = $(".colorBox").find('.active').css("background-color");
              sizefont = $(".sizeBox").find(".active").css("font-size");
              $(".close").trigger("click");
              /*判断有没有选中夜间模式*/
              if ($(".colorBox").find("span.active").hasClass("black")) {
                  setFontColor()

              } else {
                  removeFontColor()
              }
          })

          /* 设置里面点击重置按钮*/
          $(".cancal").on("click", function() {
                  status = 0;
                  selectBg = "#fff";
                  sizefont = "14px";
                  removeFontColor();
                  reset();

              })
              /* 设置里面点击关闭按钮*/
          $(".close").on("click", function() {
                  setFontSize(sizefont);
                  $(this).closest(".setContent").hide();
                  setBg(selectBg);
                  setBtnReset();
                  if (status !== 4) {
                      removeFontColor();

                  } else {
                      setFontColor()
                  }


              })
              /*下载PDF弹出框*/
          $(".downBtn").on("click", function() {
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
                  $(".layui-layer-close").trigger("click");
              })

          })
      })
      /*设置背景色*/
  function setBg(selectBg) {
      $(".articleDetail").css("background-color", selectBg);
      $(".setContent").css("background-color", selectBg);
      $(".setBtn").css("background-color", selectBg)

  }
  /*文章格式设置按钮效果*/
  function setBtnReset() {
      $(".setBtn").css("background-color", "#e6696a")
      $(".setBtn").removeClass("active");
      $(".setBtn").find(".setIco").removeClass("active");
  }
  /*设置字体大小*/
  function setFontSize(sizefont) {
      $(".pageDetail").css("font-size", sizefont);
  }
  /*在夜间模式下设置文章字的颜色*/
  function setFontColor() {
      $(".sizeBox").find('span').addClass('blackModul');
      $(".setContent").find('h3').addClass('night');
      $(".contDetail").addClass('night');
      $(".aboutTag").addClass('night');
      $(".titleBottom").addClass('night');
      $(".artTitle").find('.title').addClass('night');
      $(".pubshTime").addClass('night');
      $(".aboutArticle").addClass('night');
      $(".aboutList").addClass('night');
      $(".articledown .read").addClass('night');
      $(".listWrap li a").addClass('night');
  }
  /*去掉夜间模式下设置文章字的颜色*/
  function removeFontColor() {
      $(".sizeBox").find('span').removeClass('blackModul');
        $(".setContent").find('h3').removeClass('night');
      $(".contDetail").removeClass('night');
      $(".aboutTag").removeClass('night');
      $(".titleBottom").removeClass('night');
      $(".artTitle").find('.title').removeClass('night');
      $(".pubshTime").removeClass('night');
      $(".aboutArticle").removeClass('night');
      $(".articledown .read").removeClass('night');
      $(".listWrap li a").removeClass('night');

  }
  /*设置里面的重置*/
  function reset() {
      var selectBg = "#fff"; /*设置默认的背景色*/
      var sizefont = '14px'; /*设置默认字体大小*/
      /*判断有没有选中夜间模式*/
      if ($(".colorBox").find("span.active").hasClass("black")) {

          removeFontColor()

      }
      $(".colorBox").find('span').removeClass("active");
      $(".sizeBox").find("span").removeClass("active");
      $(".colorBox").find('span').eq(0).addClass("active");
      $(".sizeBox").find("span").eq(1).addClass("active");
      setBg(selectBg);
      setFontSize(sizefont);


  }
