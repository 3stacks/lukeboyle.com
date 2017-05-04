const webpack = require('webpack');
const pkg     = require('./package.json');
const Path = require('path');
module.exports = {

    entry: {
        'app': './src/js/index.js',
        'vendor': Object.keys(pkg.dependencies)
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: Infinity
        })
    ],
    output: {
        path: Path.resolve('./assets'),

        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    plugins: [
                        'transform-runtime'
                    ],
                    presets: [
                        'es2015'
                    ]
                }
            }
        ]
    }
};