const HtmlPlugin = require('html-webpack-plugin');
const { resolve } = require('path')

module.exports = () => {
	const rootPath = resolve(__dirname, '..');
	const srcPath = resolve(rootPath, 'src');
	return {
		entry: resolve(srcPath, 'app', 'index.tsx'),
		output: {
			filename: 'app-[hash:6].js',
			path: resolve(rootPath, 'dist'),
			publicPath: '/'
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
		},
		plugins: [
			new HtmlPlugin({
				template: resolve(srcPath, 'public', 'index.html'),
				filename: 'index.html'
			})
		]
	}
}
