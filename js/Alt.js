const alt = function(fun1, fun2) {
	return function(val) {
		return fun1(val) || fun2(val);
	}
}