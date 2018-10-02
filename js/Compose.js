// 可以与柯里化混合搭配
function compose() {
	let args = arguments;
	let start = args.length - 1;
	return function() {
		let i = start;
		let result = args[start].apply(this, arguments);
		while( i-- )
			result = args[i].call(this, result);
		return result;
	}
}


// // 示例
// let testFn = compose((val) => val.length, (val) => val.split(/\s+/));

// console.log(testFn('what happened ?')) // 3