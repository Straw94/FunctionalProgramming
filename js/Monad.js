class Wrapper {
	constructor(value) {
		this._value = value;
	}
	map(f) {
		return f(this._value);
	};

	toString() {
		return 'Wrapper (' + this.value + ')';
	}
}
const wrap = (val) => new Wrapper(val);




// Monad 示例
const Empty = function(_) {

}
Empty.prototype.fmap = function() {
	return this;
}

const empty = () => new Empty();

const isEven = n => Number.isFinite(n) && (n % 2 == 0);

const half = val => isEven(val) ? wrap(val / 2) : empty();



half(4); // Wrapper(2);
half(3); // Empty


const plus = val => val + 1;

// 容器应用函数、即便值是违法的
console.log(half(4).fmap(plus)); // Wrapper(5);
console.log(half(3).fmap(plus)); // Empty