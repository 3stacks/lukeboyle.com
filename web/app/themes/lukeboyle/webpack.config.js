const webpack = require('webpack');
const pkg     = require('./package.json');

/**
 * Webpack reads a config object like Grunt. This must be a CommonJS module
 * because node can't import ES6 modules on the command line yet.
 */
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