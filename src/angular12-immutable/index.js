require('angular12');
require('angular-immutable');

var _module = angular.module('PerfTest', ['ng', 'immutable']);
require('./perf-test-app.directive')(_module);

angular.bootstrap(document.getElementById('content'), [_module.name]);
