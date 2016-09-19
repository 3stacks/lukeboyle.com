const webpack = require('webpack');
const pkg     = require('./package.json');
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
        path: './assets',

        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
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