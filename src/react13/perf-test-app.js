/*** @jsx React.DOM */
var React = require('react13');

var dataSize = require('../common/dataSize');
var generateData = require('../common/generateData');
var getRandomColor = require('../common/getRandomColor');
var updateStatsHood = require('../common/updateStatsHood');
var Timer = require('../common/timer');
var hoodTemplate = require('./hood.mustache.html');
var PerfTestCell = require('./perf-test-cell');


var PerfTestApp = React.createClass({
	getInitialState: function() {
		return {
			cells: []
		};
	},

	componentDidMount: function() {
		this.renderDurations = [];
		this.partialRenderDurations = [];
	},

	getAverageRenderDuration: function() {
		if (this.renderDurations.length < 2) {
			return 'UNAVAILABLE';
		}
		return ((this.renderDurations.reduce(function(a, b) {
			return a + b;
		}) - this.renderDurations[0]) / (this.renderDurations.length-1)).toFixed(3)+'ms';
	},

	getAveragePartialRenderDuration: function() {
		if (this.partialRenderDurations.length < 1) {
			return 'UNAVAILABLE';
		}
		return (this.partialRenderDurations.reduce(function(a, b) {
			return a + b;
		}) / (this.partialRenderDurations.length)).toFixed(3)+'ms';
	},

	updateStats: function() {
		updateStatsHood(hoodTemplate, {
			renderCount: this.renderDurations.length,
			totalCellCount: this.state.cells.length * this.state.cells[0].length,
			firstRenderDuration: this.renderDurations[0].toFixed(3)+'ms',
			lastRenderDuration: this.renderDurations[this.renderDurations.length-1].toFixed(3)+'ms',
			averageRenderDuration: this.getAverageRenderDuration(),
			partialRenderCount: this.partialRenderDurations.length,
			lastPartialRenderDuration: this.partialRenderDurations.length > 0 ? this.partialRenderDurations[this.partialRenderDurations.length-1].toFixed(3)+'ms' : 'UNAVAILABLE',
			averagePartialRenderDuration: this.getAveragePartialRenderDuration()
		});
	},

	handlePartialRenderClick: function() {
		var timer = Timer.start('Render (partial)');
		this.setState(
			function(previousState) {
				var cells = new Array(dataSize.rows),
					i, j;
				for (i=0; i<dataSize.rows; ++i) {
					cells[i] = new Array(dataSize.cols);
					for (j=0; j<dataSize.cols; ++j) {
						cells[i][j] = previousState.cells[i][j];
					}
				}

				for(i=0; i<dataSize.partialCellsCount; ++i) {
					var randomRow = Math.floor(Math.random()*dataSize.rows);
					var randomCol = Math.floor(Math.random()*dataSize.cols);
					cells[randomRow][randomCol] = {
						index: cells[randomRow][randomCol].index,
						color: getRandomColor()
					};
				}
				return {
					cells: cells
				};
			},
			function() {
				this.partialRenderDurations.push(timer.stop());
				this.updateStats();
			}.bind(this)
		);
	},

	handleRenderClick: function() {
		var cells = generateData(dataSize.rows, dataSize.cols);
		var timer = Timer.start('Render');
		this.setState(
			{
				cells: cells
			},
			function() {
				this.renderDurations.push(timer.stop());
				this.updateStats();
			}.bind(this)
		);
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		return this.state.cells !== nextState.cells;
	},

	render: function() {
		return (
			<div>
				<button onClick={this.handleRenderClick}>Render</button>{' '}
				{function() {
					if (this.state.cells.length > 0) {
						return (
							<button onClick={this.handlePartialRenderClick}>Render {dataSize.partialCellsCount} random cells</button>
						);
					}
				}.call(this)}
				<div className="table">
					{
						this.state.cells.map(function(row, rowIndex) {
							return (
								<div className="row" key={rowIndex}>
									{
										row.map(function(cell, colIndex) {
											return (
												<PerfTestCell cell={cell} />
											);
										})
									}
								</div>
							);
						}, this)
					}
				</div>
			</div>
		);
	}
});

module.exports = PerfTestApp;