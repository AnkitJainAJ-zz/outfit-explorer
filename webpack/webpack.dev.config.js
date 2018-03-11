const webpack=require('webpack');
const path = require('path');

var parentDir = path.join(__dirname, '../');
module.exports ={
	entry: [
		path.join(parentDir, 'index.js')
	],
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},{
			test: /\.less$/,
			loaders: ["style-loader", "css-loader", "less-loader"]
		}

		]
	},
	output: {
		path: parentDir + 'dist',
		filename: 'bundle.js'
	},
	devServer: {
    	contentBase: parentDir + 'dist',
   		historyApiFallback: true,
   		host: '0.0.0.0',
		port: 9013
	}
}