const Path = require('path');
const Hapi = require('hapi');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.js');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackMiddleware = require('webpack-dev-middleware');
const isDeveloping = process.env.NODE_ENV !== 'production';
const chokidar = require('chokidar');

console.log(' ');
console.log('*********************************************************');
console.log('* Skeleton Application                                   *');
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

// Do "hot-reloading" of express stuff on the server
// Throw away cached modules and re-require next time
// Ensure there's no important state in there!
// const watcher = chokidar.watch('./src/server');

// watcher.on('ready', function() {
//   watcher.on('all', function() {
//     console.log("Clearing /server/ module cache from server");
//     Object.keys(require.cache).forEach(function(id) {
//       if (/[\/\\]server[\/\\]/.test(id)) {
//           delete require.cache[id];
//         }
//     });
//   });
// });

// webpack config
webpackConfig.devtool = 'source-map';


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
    //create the webpack compiler
    // var compiler = webpack(webpackConfig);
    // plugins.push({
    //     register: require('hapi-webpack-dev-plugin'),
    //     options: {
    //         compiler: compiler,
    //         quiet: false,
    //         devIndex: ".",
    //         watchDelay: 200,
    //         noInfo: false,
    //         stats: {
    //             colors: true
    //         }
    //     }
    // });
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

