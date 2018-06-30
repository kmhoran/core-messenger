const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');
const PUBLIC_DIR = path.resolve(__dirname, 'public');
const BUILD_DIR = path.resolve(__dirname, 'public/build');

const config = {
    entry: APP_DIR + '/foo.js',
    output: {
        path: BUILD_DIR, 
        filename: 'bundle.js'
    },
    mode: "development",
    devServer: {
        contentBase: PUBLIC_DIR,
        port: 9000,
        open: true
    }
};

module.exports = config;