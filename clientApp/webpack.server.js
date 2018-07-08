const webpack = require('webpack');
const path = require('path');

const SERVER_DIR = path.resolve(__dirname, 'src/ServerApp');

const BUILD_DIR = path.resolve(__dirname, 'public/build');

const webpackNodeExternals = require('webpack-node-externals');

const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
    entry: SERVER_DIR + '/server.js',
    output: {
        path: BUILD_DIR, 
        filename: 'serverbundle.js',
        publicPath: '/'
    },
    mode: "development",
    externals: [webpackNodeExternals()]
};

// module.exports = config;

module.exports = merge(baseConfig, config);