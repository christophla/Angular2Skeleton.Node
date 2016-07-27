const webpack = require('webpack');
const path = require('path');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
//const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const config = require('./variables');

//const APP_ENTRY = path.join(config.paths.source, 'main-app');
const WEBPACK_HOT_ENTRY = 'webpack-hot-middleware/client?path=' + config.webpack.devServerUrl + '/__webpack_hmr';
const JS_JSX = /\.(js|jsx)$/;


// Webpack Config
var webpackConfig = {

    entry: {
        'polyfills': ['./src/client/polyfills.browser.ts', WEBPACK_HOT_ENTRY],
        'vendor': ['./src/client/vendor.browser.ts', WEBPACK_HOT_ENTRY],
        'main': ['./src/client/main.browser.ts', WEBPACK_HOT_ENTRY]
    },

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
    },

    output: {
        filename: config.webpack.outputFilename, // Bundle filename pattern
        path: config.paths.build,  // Put bundle files in this directory (Note: dev server does not generate bundle files)
        publicPath: config.publicPaths.build // Expose bundles in this web directory (Note: only dev server uses this option)
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills'],
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        //new SlowWebpackPlugin({delay: 2000}),
        new AssetsWebpackPlugin({
            filename: config.webpack.assetsFilename,
            path: config.webpack.assetsPath,
            prettyPrint: true
        })
    ],

    resolve: {
        // Webpack tries to append these extensions when you require(moduleName)
        // The empty extension allows specifying the extension in a require call, e.g. require('./main-app.css')
        extensions: ['', '.js', '.jsx']
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
        Buffer: 0,
        clearImmediate: 0,
        crypto: 'empty',
        global: 1,
        module: 0,
        setImmediate: 0
    }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
