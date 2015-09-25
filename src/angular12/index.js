require('angular');

var _module = angular.module('PerfTest', ['ng']);
require('./perf-test-app.directive')(_module);

angular.bootstrap(document.getElementById('content'), [_module.name]);
