module.exports = {
	entry: './index.js',
	output: {
		filename: 'dist.js',
		path: __dirname + '/dist'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins: [
	
	],
	mode: 'development',
//	mode: 'production'
}
