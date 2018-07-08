const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src/App');
const PUBLIC_DIR = path.resolve(__dirname, 'public');
const BUILD_DIR = path.resolve(__dirname, 'public/build');

const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
    entry: APP_DIR + '/client.js',
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
    }
};

// module.exports = config;

module.exports = merge(baseConfig, config);