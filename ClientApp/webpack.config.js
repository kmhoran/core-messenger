const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src/App');
const PUBLIC_DIR = path.resolve(__dirname, 'public');
const BUILD_DIR = path.resolve(__dirname, 'public/build');

const config = {
    entry: APP_DIR + '/Client.js',
    output: {
        path: BUILD_DIR, 
        filename: 'bundle.js',
        publicPath: '/'
    },
    mode: "development",
    devServer: {
        contentBase: PUBLIC_DIR,
        port: 9000,
        open: true,
        historyApiFallback: true
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        'react',
                        'stage-2',
                        ['env', { targets: { browsers: ['last 2 versions'] } }]
                    ]
                }
            }
        ]
    }
};

module.exports = config;