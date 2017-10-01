const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.modifyWebpackConfig = ({ config, stage }) => {

    switch (stage) {
        case 'develop':
            config.loader('sass', {
                test: /\.(sass|scss)$/,
                exclude: /\.module\.(sass|scss)$/,
                loaders: ['style', 'css', 'sass'],
            });

            break;

        case 'build-css':
            config.loader('sass', {
                test: /\.(sass|scss)$/,
                exclude: /\.module\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css?minimize', 'sass']),
            });

            break;

        case 'build-html':
            config.loader('sass', {
                test: /\.(sass|scss)$/,
                exclude: /\.module\.(sass|scss)$/,
                loader: 'null',
            });

            break;

        case 'build-javascript':
            config.loader('sass', {
                test: /\.(sass|scss)$/,
                exclude: /\.module\.(sass|scss)$/,
                loader: 'null',
            });

            break;
    }

    return config
}