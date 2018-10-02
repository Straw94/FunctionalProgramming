// Either Monad 方式 
// Left Right 分别为错误与正确
class Either {
	constructor(value) {
		this._value = value;
	}

	get value() {
		return this._value;
	}

	static left(a) {
		return new Left(a);
	}

	static right(a) {
		return new Right(a);
	}

	// 入口
	// 非法值返回Left 否则返回Right
	static initNullAble(val) {
		return val !== null ? this.right(val) : this.left(val);
	}

	// 返回包涵Right的实例
	static of(a) {
		return this.right(a);
	}

}


class Left extends Either {

	// 不对值进行任何操作
	map(_) {
		return this;
	}

	get value() {
		throw new TypeError(`Can't extract the value of a Left(a).`);
	}


	getOrElse(other) {
		return other;
	}

	orElse(f) {
		return f(this._value);
	}

	chain(f) {
		return this;
	}

	getOrElseThrow(a) {
		throw new Error(a);
	}


	filter(f) {
		return this;
	}

	toString() {
		return `Either.Left(${this._value})`;
	}
}


class Right extends Either {
	map(f) {
		return Either.of(f(this._value));
	}

	get value() {
		return this._value;
	}


	getOrElse(other) {
		return this._value;
	}

	orElse(f) {
		return f(this._value);
	}

	chain(f) {
		return f(this._value);
	}

	getOrElseThrow(a) {
		return this._value;
	}


	filter(f) {
		return Either.initNullAble(f(this._value)) ? this.value : null;
	}

	toString() {
		return `Either.Right(${this._value})`;
	}
}

// 测试
const safeFn = function(val){
	if(typeof val === 'number') {
		return Either.of(val);
	}
	return Either.left(`arguments is not instanceof Number.`);
}

// 任意位置有非法值、 都可以安全传递下去 ------ 可以在getOrElse方法里new Error等做处理
console.log(safeFn(123).map(val => val * 2).value) // 246
console.log(safeFn(null).map(val => val * 2)); // Left对象



// // 也可以
// function todoSomething() {
// 	try {
// 		...
// 		return Either.of(value)
// 	}
// 	catch(err) {
// 		return Either.left(err)
// 	}
// }







