// Maybe Monad 及其子类 Maybe Either
class Maybe { // 容器父类
	static just(a) {
		return new Just(a);
	}

	static nothing() {
		return new Nothing();
	}

	static fromNullable(a) {
		return a !== null ? this.just(a) : this.nothing(a);
	}

	static of(a) {
		return just(a);
	}

	get isNothing() {
		return false;
	}

	get isJust() {
		return false;
	}
}

class Just extends Maybe {
	constructor(value) {
		super();
		this._value = value;
	}

	get value() {
		return this._value;
	}

	map(f) {
		// console.log(of)
		return Maybe.fromNullable(f(this._value));
	}

	getOrElse() {
		return this._value;
	}

	filter(f) {
		Maybe.fromNullable(f(this.value) ? this._value : null);
	}

	get isJust() {
		return true;
	}

	toString() {
		return `Maybe.Just(${this._value})`
	}
}



class Nothing extends Maybe {

	get value() {
		throw new TypeError(`Can't extract the value of a Nothing.`);
	}

	map(f) {
		return this;
	}

	getOrElse(other) {
		return other;
	}

	filter(f) {
		return this.value;
	}

	get isNothing() {
		return true;
	}

	toString() {
		return `Maybe.Nothing`
	}
}




const safeFn = val => Maybe.fromNullable(val);
// 任意位置有非法值、 都可以安全传递下去 ------ 可以在getOrElse方法里new Error等做处理
console.log(safeFn(123).map(val => null).map(val => val * 2).getOrElse('aaaa')); 
// null






