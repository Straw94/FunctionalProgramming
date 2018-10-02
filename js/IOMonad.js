// // 前提需求
// // 多次调用可能会有不同结果
// const read = function(document, id) {
// 	return document.querySelector(`\#${id}`).innerHTML;
// }
// // 不返回任何职 但会造成改变
// const write = function(document, id, val) {
// 	document.querySelector(`\#${id}`).innerHTML = val;
// }


const identity = (val) => val;


class IO {
	constructor(effect) {
		if(typeof effect !== 'function') {
			throw 'IO Usage: function required';
		}
		this.effect = effect;
	}

	static of(a) {
		return new IO(() => a);
	}


	static from(fn) {
		return new IO(fn);
	}

	map(fn) {
		const self = this;
		return new IO(function() {
			return fn(self.effect());
		})
	}


	chain(fn) {
		return fn(this.effect());
	}

	run() {
		return this.effect();
	}
}

const read = function(id) {
	let result = document.getElementById(id).innerHTML;
	console.log(result)
	// console.log(document.getElementById(id).innerHTML)
	return result;
}
const write = function(id, val) {
	document.querySelector(`\#${id}`).innerHTML = val;
}

// 应该用函数柯里化、 哥们真是累了...省略......
const readDom = function(id) {
	return function() {
		return read(id)
	}
}
const writeDom = function(id) {
	return function(val) {
		write(id, val)
	}
}


// 测试
const ChangeMessage = IO.from(readDom('IOMonad'))
.map(val => 'Please give me a github star !!!')
.map(writeDom('IOMonad'))

// // 启动 -- 惰性计算
// ChangeMessage.run();

// 总结： 符合引用透明性的IO操作， 将不纯的代码分离出来
// dom操作都在同一时刻执行， 保证发生在读写操作之间什么都不会发生， 不会导致不可预测的结果！！！




