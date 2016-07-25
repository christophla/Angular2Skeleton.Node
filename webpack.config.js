const webpack = require('webpack');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Webpack Config
var webpackConfig = {
    entry: {
        'polyfills': './src/client/polyfills.browser.ts',
        'vendor': './src/client/vendor.browser.ts',
        'main': './src/client/main.browser.ts',
    },

    output: {
        path: './dist',
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills'],
            minChunks: Infinity
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
        // new BrowserSyncPlugin({
        //     host: 'localhost',
        //     port: 3000,
        //     proxy: 'http://localhost:3100/'
        // }, {
        //     reload: false
        // })
    ],

    module: {
        loaders: [
            // .ts files for TypeScript
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            }, {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader']
            }, {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ]
    }

};


// Our Webpack Defaults
var defaultConfig = {

    devtool: 'cheap-module-source-map',
    cache: true,
    debug: true,

    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        root: [path.join(__dirname, 'src/client')],
        extensions: ['', '.ts', '.js']
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    node: {
        global: 1,
        crypto: 'empty',
        module: 0,
        Buffer: 0,
        clearImmediate: 0,
        setImmediate: 0
    }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
