   //设置元素透明
    function opacityS(obj, step,time) {
        var colorOpa = '';
        colorOpa = parseInt(getStyle(obj, 'opacity'));
        obj.timer = setInterval(function() {
            obj.style.opacity = colorOpa;
            colorOpa = colorOpa + step;
            console.log(colorOpa)
            if (colorOpa > 1) {

                clearInterval(obj.timer);
            }
            if (colorOpa < 0) {

            	clearInterval(obj.timer);

            }

        }, time);
    }
    
    //获取元素样式
     function getStyle(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
    }