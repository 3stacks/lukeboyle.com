const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.modifyWebpackConfig = ({ config, stage }) => {

    switch (stage) {
        case 'develop':
        case 'build-css':
        case 'build-html':
        case 'build-javascript':
            config.loader('sass', {
                test: /\.(sass|scss)$/,
                exclude: /\.module\.(sass|scss)$/,
                loader: null
            });

            config.loader('babel!react-markdown', {
               test: /\.md$/
            });

            break;
    }

    return config
};