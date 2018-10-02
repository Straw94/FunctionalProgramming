Function.prototype.memoized = function() {
	let key = JSON.stringify(arguments);

	this._cache = this._cache || {};
	// 查看是否有缓存
	this._cache[key] = this._cache[key] || this.apply(this, arguments);

	return this._cache[key];
}





Function.prototype.memoize = function() {
	let fn = this;

	if(fn.length === 0 || fn.length > 1) {
		return fn;
	}

	return function() {
		return fn.memoized.apply(fn, arguments);
	}
}





let test = function(num) {
	let arr = 0;
	for(let i = 0; i < num; i++) {
		arr += i;
	}
	return arr
}



function dates() {
	return Date.now();
}

function fixed(start, end) {
	return (end - start).toFixed(3)
}


// // 此示例为单参数缓存， 可以有效利用柯里化
// let testFn = test.memoize();


// let start1 = dates();
// console.log(testFn(50000000));
// let end1 = dates();
// let result1 = fixed(start1, end1)
// console.log(result1); // >= 60.000



// let start2 = dates();
// console.log(testFn(50000000)) 
// let end2 = dates();
// let result2 = fixed(start2, end2)
// console.log(result2);	// <= 1.000




// 此示例为递缓存 --- 更多相关递归优化可以参考es6的尾递归(TCO)
const factorial = (n => (n === 0) ? 1 : (n * factorial(n - 1))).memoize();

let start3 = dates();
factorial(100);
let end3 = dates();
let result3 = fixed(start3, end3)
console.log(result3)


let start4 = dates();
factorial(101);
let end4 = dates();
let result4 = fixed(start4, end4)
console.log(result4);


//////////////////// 到此结束 /////////////////////////

// 相关推荐 Rxjs的函数响应式编程 https://cn.rx.js.org/
// Lodash.js 函数式相关的封装库 https://www.lodashjs.com/
// Blanket.js 代码覆盖工具 https://www.bootcdn.cn/blanket.js/











