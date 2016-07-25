
var concat = require('gulp-concat');
var gulp = require('gulp');
var gutil = require("gulp-util");
var sourcemaps = require('gulp-sourcemaps');
var stream = require('webpack-stream');
var uglify = require('gulp-uglify');
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var WebpackDevServer = require("webpack-dev-server");

gulp.task('webpack', [], function () {
    return gulp.src(path.ALL)
        .pipe(sourcemaps.init())
        .pipe(stream(webpackConfig))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.DEST_BUILD));
});



gulp.task("webpack-dev-server", function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        stats: {
            colors: true,
            inline: true,
            progress: true
        }
    }).listen(8080, "localhost", function (err) {
        if (err) { throw new gutil.PluginError("webpack-dev-server", err); }
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

var path = {
    HTML: 'src/index.html',
    ALL: ['src/**/*.jsx', 'src/**/*.js'],
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: 'dist/src',
    DEST_BUILD: 'dist/build',
    DEST: 'dist'
};



gulp.task('watch', function () {
    gulp.watch(path.ALL, ['webpack']);
});


gulp.task('default', ['webpack-dev-server', 'watch']);
