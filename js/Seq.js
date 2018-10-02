const seq = function() {
	const funcs = [].slice.call(arguments);
	return function(val) {
		funcs.forEach(function(fn) {
			fn(val);
		})
	}
}