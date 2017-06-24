const webpack = require('webpack');
const pkg     = require('./package.json');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ReactStaticPlugin = require('react-static-webpack-plugin');

/**
 * Webpack reads a config object like Grunt. This must be a CommonJS module
 * because node can't import ES6 modules on the command line yet.
 */
module.exports = {
    entry: {
        'app': path.resolve('./src/index.js')
        // 'vendor': Object.keys(pkg.dependencies).filter(dep => dep !== 'react-icons')
    },
    plugins: [
        new ReactStaticPlugin({
            routes: './src/index.js',
            template: './src/components/template/template.jsx',
            renderToStaticMarkup: true
        }),
        new ExtractTextPlugin('style.css'),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'vendor.js',
        //     minChunks: Infinity
        // })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    output: {
        /**
         * Where to spit out all the JS files
         */
        path: path.resolve('./dist'),

        /**
         * What to call the `app` file.
         */
        filename: 'bundle.js'
    },
    module: {
        /**
         * Webpack loaders are the equivalent of grunt tasks / plugins
         */
        loaders: [
            {
                /**
                 * Only apply on `.js` and `.jsx` files
                 */
                test: /\.(js|jsx)$/,
                /**
                 * npm packages are already babelified to ES5
                 */
                exclude: /node_modules/,
                /**
                 * The name of the plugin / loader
                 */
                loader: 'babel-loader',
                /**
                 * Options passed to the plugin (in this case it's
                 * babel settings)
                 */
                query: {
                    plugins: [
                        /**
                         * Some polyfills that need to be loaded at runtime
                         */
                        'transform-es2015-modules-commonjs',
                        'transform-runtime',
                        'transform-object-rest-spread',
                        'transform-es2015-destructuring',
                        'transform-async-functions'
                    ],
                    presets: [
                        'es2017',
                        'react'
                    ]
                }
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'file-loader?name=[name].[ext]',
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    node: {
        fs: 'empty'
    }
};