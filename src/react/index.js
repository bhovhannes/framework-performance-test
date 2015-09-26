/*** @jsx React.DOM */
var React = require('react'),
	PerfTestApp = require('./perf-test-app');

React.render(
	<PerfTestApp />,
	document.getElementById('content')
);
