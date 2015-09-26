/*** @jsx React.DOM */
var React = require('react');

var dataSize = require('../common/dataSize');
var generateData = require('../common/generateData');
var getRandomColor = require('../common/getRandomColor');
var updateStatsHood = require('../common/updateStatsHood');
var Timer = require('../common/timer');
var hoodTemplate = require('./hood.mustache.html');
var PerfTestCell = require('./perf-test-cell');
/*
function getCellStyle(cell) {
	return {
		backgroundColor: 'rgb('+cell.color.r+', '+cell.color.g+', '+cell.color.b+')'
	};
}*/

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

	handlePartialRenderInFirstRowsClick: function() {
		var timer = Timer.start('Render (partial first)');
		this.setState(
			function(previousState) {
				for(var i=0; i<10; ++i) {
					var randomRow = Math.floor(Math.random()*5);
					var randomCol = Math.floor(Math.random()*dataSize.cols);
					var cell = previousState.cells[randomRow][randomCol];
					previousState.cells[randomRow][randomCol] = {
						index: cell.index,
						color: getRandomColor()
					};
				}
				return {
					cells: previousState.cells
				};
			},
			function() {
				this.partialRenderDurations.push(timer.stop());
				this.updateStats();
			}.bind(this)
		);
	},

	handlePartialRenderInLastRowsClick: function() {
		var timer = Timer.start('Render (partial last)');
		this.setState(
			function(previousState) {
				for(var i=0; i<10; ++i) {
					var randomRow = (dataSize.rows - 5) + Math.floor(Math.random()*5);
					var randomCol = Math.floor(Math.random()*dataSize.cols);
					var cell = previousState.cells[randomRow][randomCol];
					previousState.cells[randomRow][randomCol] = {
						index: cell.index,
						color: getRandomColor()
					};
				}
				return {
					cells: previousState.cells
				};
			},
			function() {
				this.partialRenderDurations.push(timer.stop());
				this.updateStats();
			}.bind(this)
		);
	},

	handlePartialRenderClick: function() {
		var timer = Timer.start('Render (partial)');
		this.setState(
			function(previousState) {
				for(var i=0; i<10; ++i) {
					var randomRow = Math.floor(Math.random()*dataSize.rows);
					var randomCol = Math.floor(Math.random()*dataSize.cols);
					var cell = previousState.cells[randomRow][randomCol];
					previousState.cells[randomRow][randomCol] = {
						index: cell.index,
						color: getRandomColor()
					};
				}
				return {
					cells: previousState.cells
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

	render: function() {
		return (
			<div>
				<button onClick={this.handleRenderClick}>Render</button>
				{function() {
					if (this.state.cells.length > 0) {
						return [
							<button onClick={this.handlePartialRenderClick}>Render 10 random cells</button>,
							<button onClick={this.handlePartialRenderInFirstRowsClick}>Render 10 random cells in top 5 rows</button>,
							<button onClick={this.handlePartialRenderInLastRowsClick}>Render 10 random cells in bottom 5 rows</button>
						];
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
//<div className="cell" key={colIndex} style={getCellStyle(cell)}>{cell.index}</div>

module.exports = PerfTestApp;