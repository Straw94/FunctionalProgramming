// 如果没有看过上一篇Monad的代码
// 建议先阅读上一篇便于理解原理

// 辅助组合子函数
const identity = (val) => val;

class Wrapper {
	constructor(value) {
		this._value = value;
	}
	static of(a) {
		return new Wrapper(a);
	}
	map(f) {
		return Wrapper.of(f(this._value));
	}

	// 扁平化
	join() {
		if(typeof this._value.join !== 'function') {
			return this;
		}
		return this._value.join();
	}

	toString() {
		return `Wrapper (${this._value})`
	}
}



let test = Wrapper.of('Hello Scholar')
	.map(val => val.toUpperCase())
	.map(identity);
// console.log(test); // Wrapper('HELLO SCHLOAR');


let test1 = Wrapper.of(Wrapper.of(Wrapper.of('Hello Scholar!!!')));
// console.log(test1); // Wrapper(Wrapper(Wrapper('Hello Scholar!!!')));
let test2 = Wrapper.of(Wrapper.of(Wrapper.of('Hello Scholar!!!'))).join();
console.log(test2); // Wrapper('Hello Scholar!!!')
