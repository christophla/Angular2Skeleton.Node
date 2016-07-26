var gulp = require('gulp');
var gutil = require("gulp-util");
//var server = require( 'gulp-develop-server' );
var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');


gulp.task("webpack", function () {
    return gulp.src('client/app/modules/app.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest('dist/'))
});

// gulp.task('watch', function(){
//     gulp.watch('src/client/app/app.ts', ['jade']);
// });

// gulp.task( 'server:start', function() {
//     server.listen( { path: './src/server/server' } );
// });

gulp.task("webpack-dev-server", function (callback) {

    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/src/client",
        stats: {
            colors: true
        }
    }).listen(3000, "localhost", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

gulp.task('default', ['webpack-dev-server']);