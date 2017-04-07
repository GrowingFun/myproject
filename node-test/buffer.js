
/*Buffer类，用于操作二进制数据流，new Buffer(size),sixe(Number)创建一个Buffer对象，并为这个对象分配 一个大小*/
/*当我们为一个Buffer对象分配 空间大小以后，其长度是固定。*/
/*var bf=new Buffer(5);*/
/*process.stdout.write(bf)*/
/*console.log(bf.length);


console.log(bf);*/
/*var bf=new Buffer('miaov','utf-8')/*16进制*/
/*console.log(bf)
console.log(bf.length)*//*内容的字节长度，并不是字符串长度*/
/*console.log(bf.toString())*/
/*var bf=new Buffer("我们");
console.log(bf.length)
console.log(bf)*//*默认输出16进制*/
/*var str='miaov';
var bf=new Buffer(5);*/
/*bf.write(str,0)*//*把字符串写入到buffer中*/
/*bf.write(要写入字符串，从buffer对象中的第几位开始写，从字符串第几个开始写)
bf.write(str,0,1)
console.log(bf)*/
/*Buffer的toString方法,toString(编码，写几个字符)*/
/*var bf=new Buffer('miaov')
console.log(bf.toString())
console.log(bf.toString('utf-8',1))*/
/*var bf=new Buffer("你好")
console.log(bf.toJSON())*//*buffer转为json*/
/*var bf=new Buffer('miaov')
console.log(bf)
var bf2=bf.slice(1,3);
console.log(bf2);*/
/*var str='1,3,4,5';
var arr=str.split(',');
console.log(arr)*/
/*var bf=new Buffer('miaov')
var bf4=new Buffer(5);
bf.copy(bf4);Bf对象copy
var bf5=bf4.slice(0,2);
console.log(bf5.toString())
console.log(bf.toString())*/
/*console.log(Buffer.isEncoding('utf-8'))*//*测试buffer对象支持某种编码*/
/*var arr=[1,2,3]
var bf=new Buffer(10)
console.log(Buffer.isBuffer(arr))
console.log(Buffer.isBuffer(bf))*/
/*var str1='miaov'
console.log(str1.length);
console.log(Buffer.byteLength(str1))*/
/*var bf=new Buffer("你好")
console.log(Buffer.byteLength(bf,'ascii'))*/
/*var str1='miaov'
var str2='妙味'
var list=[new Buffer(str1),new Buffer(str2)];

var bf=Buffer.concat(list,11)
console.log(bf.length)*/
process.stdout.write("你好");
process.stdin.resume()
process.stdin.on("data",function(chunk){
	console.log(chunk);
	
})
