/*process.stdout.write("hello")*/ /*输出数据*/
/*function cog(data){
	process.stdout.write(data)
}
cog("aa")*/
var a, b;
process.stdout.write("请输入a的值:")
    /*默认情况下输入流是关闭的，如果要坚挺输入流首先开启*/
process.stdin.resume();
process.stdin.on('data', function(chunk) {
    if (!a) {
        a = Number(chunk);
        process.stdout.write("请输入b的值:")
    } else {
        b = Number(chunk);
         process.stdout.write("a+b的和为：" +(a+b))
    }
    

})
