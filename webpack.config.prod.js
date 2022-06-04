const path = require('path');

module.exports = {
	mode: 'production',
	devtool: 'eval',
	entry: './src/main.ts',
	target: 'electron-main',
	node: {
		__dirname: true
	},
  	module: {
		rules: [
	  		{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
	  		},
		],
  	},
  	resolve: {
	extensions: ['.tsx', '.ts', '.js'],
  	},
  	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
};