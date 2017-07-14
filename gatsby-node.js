const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.modifyWebpackConfig = ({ config, stage }) => {
    switch (stage) {
        case 'develop':
            config.loader('sass', {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: [
                    'style',
                    'css',
                    'sass'
                ]
            });

            return config;
        case 'build-css':
            return config.loader('sass', {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: [
                    {
                        loader: ExtractTextPlugin.extract(["css?minimize", "sass"])
                    }
                ]
            });
        case 'build-html':

            config.loader('sass', {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: null
            });

            return config;
        case 'build-javascript':

            config.loader('sass', {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: null
            });

            return config;
        default:
            console.log('hello'); // this always goes off during gatsby develop
            return config;
    }
}