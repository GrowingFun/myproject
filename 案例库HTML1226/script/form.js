$(function() {

    //导航TAB切换
    var searchboxstatu = 1;
    $(".tosearch").find('span').click(function() {
        $(this).addClass('active').siblings('span').removeClass('active');
        if ($(this).hasClass('source')) {
            $(".searchbox").fadeOut(0);
            $(".sourceBox").fadeIn(300);
            searchboxstatu = 1;

        } else {
            $(".sourceBox").fadeOut(0);
            $(".searchbox").fadeIn(300);
            searchboxstatu = 0;
        }
        searchboxstatu = !searchboxstatu;
    });

    //获取搜索内容
    $(".type").find('a').click(function() {
        $(".myshow").text($(this).text());

    });

    //鼠标点击搜索下拉时选中之后，内容隐藏
    $(".searchStart").click(function(event) {
        if ($(".type").css("display") == "none") {
            $(this).find('.type').fadeIn(400);
        } else {
            $(this).find('.type').fadeOut(400);
        }
    });

    // 鼠标向下滚动时，搜索条定位
    $(".searchbox").smartFloat(); 

    //在搜索框内按回车主动触提交按钮
    $(".searchBar").keyup(function(event) {
        if (event.keyCode == 13) {
            $(".subtn").trigger('click');
        }
    });
    // 兼容IE8placeholder
    $('input').placeholder({
        isUseSpan: true
    });

    /*表单验证*/
    $("form").Validform({
        btnSubmit: ".subBtn",
        tiptype: 4,
        showAllError: true
    })

    /*登录和注册TAB切换*/
    $(".formTitle").find("span").on('click', function() {

        $(this).addClass("active").siblings("span").removeClass('active');
        if ($(this).text() == "会员注册") {

            $(".loginform").hide();
            $(".registform").show();
        } else {
            $(".loginform").show();
            $(".registform").hide();
        }
    })

    //当checkbox选中状态时，提交按钮生效
    $(".checkbtn").click(function() {
        if ($(this).is(':checked')) {
            $('.subBtn').removeAttr('disabled').removeClass("disabled").addClass('active');
        } else {
            $('.subBtn').attr('disabled', 'true').removeClass('active').addClass('disabled');
        }
    });

    //手机号验证及提示信息
    $("#telCode").on("blur change input", function() {
            var valueCount = $("input[type=text]").val().length;
            var phone = document.getElementById('telCode').value;
            if (!(/^1[34578]\d{9}$/.test(phone))) {
                $("#btnGetCodeNum").removeClass('active').addClass('disabled').attr('disabled', true);

            } else {
                $("#btnGetCodeNum").removeClass('disabled').addClass('active').attr('disabled', false)
            }
        })
        /* 点返回登录主动触发tab上的会员登录按钮*/
    $(".backlogin").on('click', function() {
        $(".formTitle").find("span").eq(0).trigger('click');
    })

})
 // 鼠标向下滚动时，搜索条定位
$.fn.smartFloat = function() {
    var position = function(element) {
        var top = element.position().top; //当前元素对象element距离浏览器上边缘的距离 
        var pos = element.css("position"); //当前元素距离页面document顶部的距离 

        $(window).scroll(function() { //侦听滚动时 
            element.show();
            var scrolls = $(this).scrollTop();
            if (scrolls > top) { //如果滚动到页面超出了当前元素element的相对页面顶部的高度 
                if (window.XMLHttpRequest) { //如果不是ie6 
                    element.css({ //设置css 
                        position: "fixed", //固定定位,即不再跟随滚动 
                        top: 0,
                        zIndex: 1000 //距离页面顶部为0 
                    }).addClass("fixed"); //加上阴影样式.shadow 
                } else { //如果是ie6 
                    element.css({
                        top: scrolls //与页面顶部距离 
                    });
                }
            } else {
                element.css({ //如果当前元素element未滚动到浏览器上边缘，则使用默认样式 
                    position: pos,
                    top: top
                }).removeClass("fixed"); //移除阴影样式.shadow 
                if ($(".source").hasClass("active")) {
                    element.hide();
                }
            }

        });

    };

    return $(this).each(function() {
        position($(this));
    });
};
