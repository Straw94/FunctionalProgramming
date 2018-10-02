// 包裹不安全的值
// 类似透明映射的思路、 保证函数的出口只有一个
// 不需要离开当时上下文环境去处理错误！！！

const identity = (val) => val;

class Wrapper {
	constructor(value) {
		this._value = value;
	}

	// map :: (A -> B) -> A -> B
	map(f) {
		return f(this._value);
	};

	toString() {
		return 'Wrapper (' + this.value + ')';
	}
}


// wrap :: A -> Wrapper(A);
const wrap = (val) => new Wrapper(val);

const wrapTest = wrap('Get Functional');
console.log(wrapTest.map(identity));


// map的变种
// fmap :: (A -> B -> Wrapper[A] -> Wrapper[B])
Wrapper.prototype.fmap = function(f) {
	return wrap(f(this._value))
}

// 缺点 多层嵌套可能看着很闹心！！！ 两层以内的数据结构可以接受、
// 例如： studentAddress('12123').map(identity).map(identity)......
