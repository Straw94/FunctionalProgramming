// 辅助柯里化函数 --- 上一个讲过了
const Curry = function(fn) {
    let args = Array.prototype.slice.call(arguments, 1)
    return function () {
      	let newArgs = args.concat(Array.from(arguments))
	    if (newArgs.length < fn.length) {
	        return Curry.call(this, fn, ...newArgs)
	    } else if (newArgs.length == fn.length){
	        return fn.apply(this, newArgs)
	    } else {
	    	throw new Error('arguments is too longer than enough !');
	    }
    }
 }


const CheckType = Curry(function(type, actualType) {
	if(typeof actualType == type) {
		return actualType
	} else {
		throw new TypeError('Type mismatch.')
	}
})


const Tuple = function() {
	// 读取参数作为元组的元素类型
	const typeInfo = Array.prototype.slice.call(arguments, 0);
	const _T = function() {
		// 提取参数作为元组内的值
		const values = Array.prototype.slice.call(arguments, 0);

		// 非法值检测
		if(values.some(val => val === null || val === undefined)) {
			throw new ReferenceError('Tuples may not have any null values !');
		}

		// 参数个数
		if(values.length !== typeInfo.length) {
			throw new TypeError('Tuple arity does not match its prototype !');
		}


		// 检查匹配定义的类型
		values.map(function(val, index) {
			this['_' + (index + 1)] = CheckType(typeInfo[index])(val);
		}, this);

		//// ES6冻结 chrome暂不支持、 可以使用nodeJS 或者babel转译
		// Object.freeze(this);
	}

	_T.prototype.values = function() {
		return Object.keys(this).map(function(k) {
			return this[k];
		}, this)
	}

	return _T;
}



const trim = Tuple('boolean', 'string');

trim(true, 'asdf');

trim('aaa', true); // 报错 Type mismatch.

