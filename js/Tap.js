const tap = function(fn) {
	return function() {
		fn(arguments[0]);
		return arguments[0]
	}
}


// let testTap = tap(val => console.log(val + ': tapFn'));

// // 示例
// let test = compose((val) => val.length, testTap, (val) => val.split(/\s+/));

// console.log(test('what happened ?')) // 3