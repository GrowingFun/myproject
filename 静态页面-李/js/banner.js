/**
 * Created by Administrator on 2015/12/31.
 */
var width=$(".bannerbox").width();
var i=-1;
var timer=0;
$(document).ready(function () {
    move();
    timer=setInterval("move()",2000);
    $('.banner_nav dl dd').click(function(){
        var ddIndex=$(this).index()-1;
        i=ddIndex;
        timer;
    })
})
function move(){
    i++;
    $('.banner_01').css({"left":"-100%"});
    $('.banner_02').css({"left":"-100%"});
    $('.banner_03').css({"left":"-100%"});
    $('.banner_04').css({"left":"-100%"});
    $('.banner_05').css({"left":"-100%"});
    $('.banner_06').css({"left":"-100%"});
    if(i>=6){
        i=0;
    }
    if(i<6){
        if(i==0){
            $('.banner_nav dl dd').eq(i).addClass('bg').siblings().removeClass('bg');
            $('.bannerbox ul li').eq(i).fadeIn(1000).siblings().fadeOut();
            $('.banner_01').animate({"left":"5%"});
        }
        if(i==1){
            $('.banner_nav dl dd').eq(i).addClass('bg').siblings().removeClass('bg');
            $('.bannerbox ul li').eq(i).fadeIn(1000).siblings().fadeOut();
            $('.banner_02').animate({"left":"5%"});
        }
        if(i==2){
            $('.banner_nav dl dd').eq(i).addClass('bg').siblings().removeClass('bg');
            $('.bannerbox ul li').eq(i).fadeIn(1000).siblings().fadeOut();
            $('.banner_03').animate({"left":"5%"});
        }
        if(i==3){
            $('.banner_nav dl dd').eq(i).addClass('bg').siblings().removeClass('bg');
            $('.bannerbox ul li').eq(i).fadeIn(1000).siblings().fadeOut();
            $('.banner_04').animate({"left":"5%"});
        }
        if(i==4){
            $('.banner_nav dl dd').eq(i).addClass('bg').siblings().removeClass('bg');
            $('.bannerbox ul li').eq(i).fadeIn(1000).siblings().fadeOut();
            $('.banner_05').animate({"left":"5%"});
        }
        if(i==5){
            $('.banner_nav dl dd').eq(i).addClass('bg').siblings().removeClass('bg');
            $('.bannerbox ul li').eq(i).fadeIn(100).siblings().fadeOut();
            $('.banner_06').animate({"left":"5%"});
        }
    }
}
