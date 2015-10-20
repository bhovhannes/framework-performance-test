var template = require('./perf-test-app.html');

var dataSize = require('../common/dataSize');
var generateData = require('../common/generateData');
var getRandomColor = require('../common/getRandomColor');
var updateStatsHood = require('../common/updateStatsHood');
var Timer = require('../common/timer');

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

			scope.partialCellsCount = dataSize.partialCellsCount;

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
				updateStatsHood({
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

			scope.handlePartialRenderClick = function() {
				window.setTimeout(function() {
					for(var i=0; i<dataSize.partialCellsCount; ++i) {
						var randomRow = Math.floor(Math.random()*dataSize.rows);
						var randomCol = Math.floor(Math.random()*dataSize.cols);
						cells[randomRow][randomCol].color = getRandomColor();
					}
					var timer = Timer.start('Digest (partial)');
					scope.$digest();
					partialRenderDurations.push(timer.stop());
					updateStats();
				}, 0);
			};

			scope.handleRenderClick = function() {
				window.setTimeout(function() {
					cells = generateData(dataSize.rows, dataSize.cols);
					var timer = Timer.start('Digest');
					scope.$digest();
					renderDurations.push(timer.stop());
					updateStats();
				}, 0);
			};
		}
	};
}];

module.exports = function(_module) {
	_module.directive('perfTestApp', directive);
};