'use strict';
var path = require('path'),
	nodeModulesDir = __dirname + '/node_modules',
	bowerComponentsDir = __dirname + '/bower_components';

var webpackConfig = {
	context: __dirname,
	entry: {
		'common': './src/common/index.js',
		'angular12': './src/angular12/index.js',
		'angular12-immutable': './src/angular12-immutable/index.js',
		'angular12-hacks': './src/angular12-hacks/index.js',
		'angular13': './src/angular13/index.js',
		'angular14': './src/angular14/index.js',
		'react13': './src/react13/index.js'
	},
	output: {
		libraryTarget: 'umd',
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	resolve: {
		alias: {
		}
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
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader'
			}
		]
	}
};

var aliases = webpackConfig.resolve.alias;
if (process.env.NODE_ENV === 'production') {
	aliases['mustache'] = path.join(nodeModulesDir, 'mustache', 'mustache.min.js');
	aliases['react13'] = path.join(bowerComponentsDir, 'react13', 'react.min.js');
	aliases['angular12'] = path.join(bowerComponentsDir, 'angular12', 'angular.min.js');
	aliases['angular13'] = path.join(bowerComponentsDir, 'angular13', 'angular.min.js');
	aliases['angular14'] = path.join(bowerComponentsDir, 'angular14', 'angular.min.js');
	aliases['angular-immutable'] = path.join(bowerComponentsDir, 'angular-immutable', 'dist', 'immutable.min.js');
	aliases['immutable'] = path.join(bowerComponentsDir, 'immutable', 'dist', 'immutable.min.js');
}
else {
	aliases['mustache'] = path.join(nodeModulesDir, 'mustache', 'mustache.js');
	aliases['react13'] = path.join(bowerComponentsDir, 'react13', 'react.js');
	aliases['angular12'] = path.join(bowerComponentsDir, 'angular12', 'angular.js');
	aliases['angular13'] = path.join(bowerComponentsDir, 'angular13', 'angular.js');
	aliases['angular14'] = path.join(bowerComponentsDir, 'angular14', 'angular.js');
	aliases['angular-immutable'] = path.join(bowerComponentsDir, 'angular-immutable', 'dist', 'immutable.js');
	aliases['immutable'] = path.join(bowerComponentsDir, 'immutable', 'dist', 'immutable.js');
}

for(var alias in aliases) {
	webpackConfig.module.noParse.push(aliases[alias]);
}

module.exports = webpackConfig;