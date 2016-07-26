const Path = require('path');
const Hapi = require('hapi');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackMiddleware = require('webpack-dev-middleware');
const isDeveloping = process.env.NODE_ENV !== 'production';

console.log(' ');
console.log('*********************************************************');
console.log('* Skeleon Application                                   *');
console.log('*********************************************************');

// exception handling
process.on('uncaughtException', function (err) {
    console.error('uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});

function endIfErr(err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
}

// config
var options = require('./options.js');

// webpack config
webpackConfig.devtool = 'source-map';

//create the webpack compiler
compiler = webpack(webpackConfig);

// hapi webserver
const server = new Hapi.Server({
    debug: {
        request: ['error']
    },
    connections: {
        routes: {
            cors: options.main.cors,
            files: {
                relativeTo: Path.join(__dirname, options.main.public)
            }
        }
    }
});

server.connection({
    host: options.main.host,
    labels: [options.main.labels.api],
    port: options.main.port
});

// register our server plugins

var plugins = [
    { register: require('bell') },
    { register: require('inert') }
];

// webpack development plugin
if (isDeveloping) {
    plugins.push({
        register: require('hapi-webpack-dev-plugin'),
        options: {
            compiler: compiler,
            quiet: true,
            devIndex: ".",
            watchDelay: 200,
            noInfo: false,
            stats: {
                colors: true
            }
        }
    })
}

server.register(plugins, { routes: { prefix: '/api' } }, function (err) {
    endIfErr(err);

    // client route
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true
            }
        }
    });

    // Add the server routes
    server.route(require('./routes'));

    server.start(function (err) {
        endIfErr(err);
        console.log('* listening at: ' + server.info.port);
    });

});

