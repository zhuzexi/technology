const HtmlWebpackPlugin = require('html-webpack-plugin');//打包html文件的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//将css从js文件中提取出来
const {resolve} = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'js/dist.js',
		path: __dirname + '/dist'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
//					'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				//出来less文件，需要下载less和less-loader
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				]
			},
			{
				//出来css样式中的图片路径 需要下载url-loader，file-loader
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 8 * 1024,
					outputPath: 'img'
				}
			},
			{
				//出来html中的img路径
				test: /\.html$/,
				loader: 'html-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/main.css'
		})
	],
	mode: 'development',
	devServer: {
		//开启热替换
		contentBase: '/dist',
		compress: true,
		port: 3000,
		//配置代理
//		proxy: {
//			'/api': {
//	        target: 'http://211.144.114.26:17072',
//	        ws: true,
//	        changeOrigin: true,
//	        pathRewrite: {
//	          '^/api': ''
//	        }
//	      }
//		}
	}
}
