const fork = function(join, func1, func2) {
	return function(val) {
		return join(func1(val), func2(val));
	}
}