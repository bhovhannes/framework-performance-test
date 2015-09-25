
function getCurrentMs() {
	if (window.performance && window.performance.now) {
		return window.performance.now();
	}
	return (new Date()).getTime();
}

module.exports = {
	start: function(msg) {
		var t0 = getCurrentMs(),
			t1;

		if (msg) {
			console.log(msg + ' ...');
		}

		var timer = {
			getStart: function() {
				return t0;
			},

			getCurrent: function() {
				return getCurrentMs();
			},

			getElapsed: function() {
				if (t1 === undefined) {
					t1 = timer.getCurrent();
				}
				return t1 - t0;
			},

			stop: function() {
				var elapsed = timer.getElapsed();
				if (msg) {
					console.log(msg + ' finished in ' + elapsed.toFixed(3) + 'ms');
				}
				return elapsed;
			}
		};

		return timer;
	}
};