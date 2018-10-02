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



let fn = function(a, b, c) {
	return a + b + c
}

var test = Curry(fn, 1);

// console.log(fn.apply(null, [1,2,3]))

test(2)(3) // 6