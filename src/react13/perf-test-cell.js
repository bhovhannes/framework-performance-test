/*** @jsx React.DOM */
var React = require('react13');

var PerfTestCell = React.createClass({

	propTypes: {
		cell: React.PropTypes.shape({
			color: React.PropTypes.shape({
				r: React.PropTypes.number,
				g: React.PropTypes.number,
				b: React.PropTypes.number
			}),
			index: React.PropTypes.number
		})
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		return this.props.cell !== nextProps.cell;
	},

	render: function() {
		var cellStyle = {
			backgroundColor: 'rgb('+this.props.cell.color.r+', '+this.props.cell.color.g+', '+this.props.cell.color.b+')'
		};
		return (
			<div className="cell" key={this.props.cell.index} style={cellStyle}>{this.props.cell.index}</div>
		);
	}
});

module.exports = PerfTestCell;