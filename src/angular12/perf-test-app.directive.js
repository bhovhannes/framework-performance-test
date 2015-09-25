var template = require('./perf-test-app.html');

var dataSize = require('../common/dataSize');
var generateData = require('../common/generateData');
var getRandomColor = require('../common/getRandomColor');
var updateStatsHood = require('../common/updateStatsHood');
var Timer = require('../common/timer');
var hoodTemplate = require('./hood.mustache.html');

var directive = [function () {
	return {
		restrict: 'A',
		replace: false,
		scope: {},
		template: template,
		link: function(scope) {

			var cells = [],
				renderDurations = [],
				partialRenderDurations = [];

			scope.getCells = function() {
				return cells;
			};

			scope.getCellStyle = function(cell) {
				return {
					backgroundColor: 'rgb('+cell.color.r+', '+cell.color.g+', '+cell.color.b+')'
				};
			};

			var getAverageRenderDuration = function() {
				if (renderDurations.length < 2) {
					return 'UNAVAILABLE';
				}
				return ((renderDurations.reduce(function(a, b) {
					return a + b;
				}) - renderDurations[0]) / (renderDurations.length-1)).toFixed(3)+'ms';
			};

			var getAveragePartialRenderDuration = function() {
				if (partialRenderDurations.length < 1) {
					return 'UNAVAILABLE';
				}
				return (partialRenderDurations.reduce(function(a, b) {
					return a + b;
				}) / (partialRenderDurations.length)).toFixed(3)+'ms';
			};

			var updateStats = function() {
				updateStatsHood(hoodTemplate, {
					renderCount: renderDurations.length,
					totalCellCount: cells.length * cells[0].length,
					firstRenderDuration: renderDurations[0].toFixed(3)+'ms',
					lastRenderDuration: renderDurations[renderDurations.length-1].toFixed(3)+'ms',
					averageRenderDuration: getAverageRenderDuration(),
					partialRenderCount: partialRenderDurations.length,
					lastPartialRenderDuration: partialRenderDurations.length > 0 ? partialRenderDurations[partialRenderDurations.length-1].toFixed(3)+'ms' : 'UNAVAILABLE',
					averagePartialRenderDuration: getAveragePartialRenderDuration()
				});
			};

			var doRender = function(msg, durationsVec) {
				var timer = Timer.start('Digest (partial first) started');
				scope.$digest();
				durationsVec.push(timer.stop());
				updateStats();
			};

			scope.partialRenderInFirstRows = function() {
				window.setTimeout(function() {
					for(var i=0; i<10; ++i) {
						var randomRow = Math.floor(Math.random()*5);
						var randomCol = Math.floor(Math.random()*dataSize.cols);
						cells[randomRow][randomCol].color = getRandomColor();
					}
					doRender('Digest (partial first) started', partialRenderDurations);
				}, 0);
			};

			scope.partialRenderInLastRows = function() {
				window.setTimeout(function() {
					for(var i=0; i<10; ++i) {
						var randomRow = (dataSize.rows - 5) + Math.floor(Math.random()*5);
						var randomCol = Math.floor(Math.random()*dataSize.cols);
						cells[randomRow][randomCol].color = getRandomColor();
					}
					doRender('Digest (partial last) started', partialRenderDurations);
				}, 0);
			};

			scope.partialRender = function() {
				window.setTimeout(function() {
					for(var i=0; i<10; ++i) {
						var randomRow = Math.floor(Math.random()*dataSize.rows);
						var randomCol = Math.floor(Math.random()*dataSize.cols);
						cells[randomRow][randomCol].color = getRandomColor();
					}
					doRender('Digest (partial) started', partialRenderDurations);
				}, 0);
			};

			scope.render = function() {
				window.setTimeout(function() {
					cells = generateData(dataSize.rows, dataSize.cols);
					doRender('Digest started', renderDurations);
				}, 0);
			};
		}
	};
}];

module.exports = function(_module) {
	_module.directive('perfTestApp', directive);
};