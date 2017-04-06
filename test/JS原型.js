var arr = new Array(); //创建数组对象;系统 自带的对象，就叫做系统对象
var data = new Date(); //创建日期对象;
// 面向对象编程特点：
// 抽象：抓住核心问题;
// 封装：只能通过对象访问方法
// 继承：从已有的对象上继承出新的对象(复用代码)
// 多态：多对象的不同形态(复用)
//对象的组成：两部分组成，属性，方法
//属性：静态,对象下面的变量，叫做对象的属性
//方法：动态的,对象下面的函数，有括号，像函数；

// var obj = new Object(); //创建 一个空对象;没有属性和方法;;
// obj.name = "小明"; //属性
// obj.showName = function() { //方法
//     console.log(this.name);
// }
// obj.showName();

//工厂方式:面向对象的封装
//当new去调用一个函数：这个时候 函数中的this就是创建 出来的对象,而且函数的返回值直接就是this（隐式返回）
// function crea(name) {
//     this.name = name; 
//     this.showName = function() {
//         console.log(this.name);
//     }

// }
// var p1=new crea("小络");//new后面就叫做构造 函数
// p1.showName();
// var p2=new crea("小刚");
// p2.showName();

//对象引用：赋值不仅是值的复制还是引用的复制
//基本类型的特点：赋值的时候，只是值的复制
//只要赋值，内存中重新生成一个地址
//基本类型的比较，只要值相同就是true
//对像类型如果想等的话，必需值和内存引用都要相同
//原型：去改写对象下面的共用的方法或者属性，让同样共用的方法或属性在内存中存在一份，好处是提高性能
//原型：CSS中的class
//普通方法：CSS中的style
//原型:prototype:要写在构造函数的下面;
// var arr=[1,2,3,4,5];
// var arr2=[2,2,2,2,2,2];
// arr.sum=function(){
// 	var Su=0;
// 	for (var i = 0; i < this.length; i++) {
// 		Su+=this[i];
// 	}
// 	return Su;
// }
// console.log(arr.sum());
// var arr=[1,2,3,4,5];
// var arr2=[2,2,2,2,2,2]
// Array.prototype.sum=function(){//原型
// 	var Su=0;
// 	for (var i = 0; i < this.length; i++) {
// 		Su+=this[i];
// 	}
// 	return Su;
// }
// console.log(arr.sum());
// console.log(arr2.sum());
//原型优先级低于工厂方法
// function Crea(name){
// 	this.name=name;
// }
// Crea.prototype.showName=function(){
// 	console.log(this.name);
// }
// var p1=new Crea("小明");
// var p2=new Crea("小强");
// console.log(p1.showName==p2.showName);



// var arr1=[3,4,656,7657]
// var arr=[1,3,34,5,6];
// Array.prototype.sum=function(){
// 	var count=0;
// 	for (var i = 0; i < this.length; i++) {
// 		count+=this[i];
// 	}
// 	return count;
// }
// console.log(arr.sum());
// console.log(arr1.sum());

// function Crea(name){
// 	this.name=name;
// }
// Crea.prototype.showName=function(){
// 	console.log(this.name);
// }
// var p1=new Crea("小明");
// var p2=new Crea("小强");
// console.log(p1.showName());

// var str=new Array();
// str=["44","5g","fdsf","fsdfdsf","ytrytryr"];
// Array.prototype.link=function(){
// 	var str1="";
// 	for (var i = 0; i < this.length; i++) {
// 		str1+=this[i];
// 	}
// 	return str1;
// }
// console.log(str.link());

//原型要写在构造 函数下面
//原则：不能共用的不能放在原型里，只能放在构造函数里;;
// function 构造函数(){
// 	对象.属性
// }
// 构造函数.原型.方法=function(){

// }
// var 对象1=new 构造函数();
// 对象1.方法();
