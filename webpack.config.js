'use strict';
var path = require('path');

module.exports = {
	context: __dirname,
	entry: {
		'common': './src/common/index.js',
		'angular12': './src/angular12/index.js',
		'angular12-react': './src/angular12-react/index.js',
		'react': './src/react/index.js'
	},
	output: {
		libraryTarget: 'umd',
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{test: /\.html$/, loader: 'raw'},
			{
				test: /\.less$/, loaders: [
					'style-loader',
					'css-loader',
					'less-loader?cleancss'
				]
			},
			{
				test: /\.css$/, loaders: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader'
			}
		]
	},
	externals: [
		//'angular'
	],
	plugins: [
	]
};
