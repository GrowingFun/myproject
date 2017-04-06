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
    $(window).scroll(function(event) {
        var scrollValue = $(window).scrollTop();
        //当页面的高度刚好满屏或大一点，搜索条就不需要浮动定位
        if ($(window).height()+90> $(document).height()) {
             return false;

        }
        if (scrollValue > 1 && scrollValue < 58) {
            $(".searchbox").hide();
        }
        if (scrollValue > 58) {
            $(".searchbox").addClass('fixed').slideDown(400);
        } else if (scrollValue == 0) {
            if (searchboxstatu) {
                $(".searchbox").show().removeClass('fixed');
            } else {
                $(".searchbox").hide().removeClass('fixed');
            }
        }
    });



    // banner轮播图效果
    $(".banner").find('.listitem').eq(0).css("display", "block")
    var len = $(".banner").find('.listitem').length;
    var i = 0;
    $(".turnleft").click(function() {
        clearInterval(lunbo);
        run();
        lunbo = setInterval(run, 3000);

    })

    function run() {

        if (i < len - 1) {
            i++;
        } else {
            i = 0;
        }
        $(".bannerup").find('.page').eq(i).show()
        $(".banner").find('.listitem').eq(i).fadeIn(400).siblings('.listitem').fadeOut(400);
        $(".bannerup").find('.page').eq(i).fadeIn(400).siblings('.page').hide();

    }

    var lunbo = setInterval(run, 3000);

    //在搜索框内按回车主动触提交按钮
    $(".searchBar").keyup(function(event) {
        if (event.keyCode == 13) {
            $(".subtn").trigger('click');
        }
    });

})
