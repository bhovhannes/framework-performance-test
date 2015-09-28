require('angular13');

var _module = angular.module('PerfTest', ['ng']);
_module.config(['$compileProvider', function ($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
}]);
require('./perf-test-app.directive')(_module);

angular.bootstrap(document.getElementById('content'), [_module.name]);
