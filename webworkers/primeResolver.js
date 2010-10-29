function PrimeResolver() {
}

PrimeResolver.prototype = {
	isPrime: function(x) {
		if (x<2) return false;
		if (x == 2) return true;
		if ((x % 2) == 0) return false;

		var i = 3;
		while(i*i <= x) {
			if ((x % i) == 0) return false;
			i += 2;
		}

		return true;
	},

	searchForPrime: function(min, max, callback) {
		for(var i = min; i < max; i++) {
			if (this.isPrime(i))
				callback(i);
		}
	}
};

onmessage = function(event) {
	var range = JSON.parse(event.data);
	var primeResolver = new PrimeResolver();
	primeResolver.searchForPrime(range.min, range.max, function(i) { postMessage(i); });
}
