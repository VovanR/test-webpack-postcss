const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const ENV = {
	production: 'production',
	development: 'development'
};

const isDev = process.env.NODE_ENV !== ENV.production;

module.exports = {
    entry: {
        styles: './src/css/index.css'
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								minimize: false,
								url: false,
								sourceMap: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								// sourceMap: 'inline',
								plugins: function () {
									const plugins = [
										require('precss')(),
										require('postcss-flexbugs-fixes')(),
										require('postcss-clearfix')(),
                                        require('postcss-style-guide')({dest: './dist/styleguide/index.html'}),
										require('autoprefixer')({cascade: false})
									];

									if (isDev) {
										return plugins;
									}

									plugins.push(
										require('postcss-csso')()
									);
									return plugins;
								}
							}
						}
					]
				})
			}
		]
	},
	plugins: (() => {
		const plugins = [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(isDev ? ENV.development : ENV.production)
			}),
		    new StyleLintPlugin({
		        files: './src/**/*.css'
		    }),
			new ExtractTextPlugin({
				filename: '[name].css',
				allChunks: true
			})
		];

		return plugins;
	})(),
	devtool: isDev && 'cheap-module-source-map'
};
