'use strict';
var path = require('path'),
	nodeModulesDir = __dirname + '/node_modules';

var webpackConfig = {
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
	resolve: {
		alias: {}
	},
	devtool: 'source-map',
	module: {
		noParse: [],
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
	}
};

var aliases = webpackConfig.resolve.alias;
if (process.env.NODE_ENV === 'production') {
	aliases['mustache'] = path.join(nodeModulesDir, 'mustache', 'mustache.min.js');
	webpackConfig.module.noParse.push(aliases['mustache']);
	aliases['react'] = path.join(nodeModulesDir, 'react', 'dist', 'react.min.js');
	webpackConfig.module.noParse.push(aliases['react']);
	aliases['angular'] = path.join(nodeModulesDir, 'angular', 'angular.min.js');
	webpackConfig.module.noParse.push(aliases['angular']);
}
else {
	aliases['mustache'] = path.join(nodeModulesDir, 'mustache', 'mustache.js');
	aliases['react'] = path.join(nodeModulesDir, 'react', 'react.js');
	aliases['angular'] = path.join(nodeModulesDir, 'angular', 'angular.js');
}

module.exports = webpackConfig;