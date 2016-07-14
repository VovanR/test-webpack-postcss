const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    entry: {
        styles: './src/styles/styles.css'
    },
	output: {
		path: './dist',
        filename: '[name].js'
	},
    module: {
        loaders: [
            {
                test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
            }
        ]
    },
    plugins: [
        new StyleLintPlugin({
            files: './src/**/*.css'
        }),
        new ExtractTextPlugin('[name].css', {allChunks: true}),
    ],
    postcss: function (webpack) {
        return [
            require('postcss-import')({addDependencyTo: webpack}),
            require('precss')(),
            require('postcss-style-guide')({dest: './dist/styleguide/index.html'}),
            require('autoprefixer')({browsers: ['last 2 versions'], cascade: false}),
            require('postcss-csso')()
        ];
    }
};
