'use strict';

// Perform babel transforms defined in .babelrc (ES6, JSX, etc.) on server-side code
// Note: the options in .babelrc are also used for client-side code
// because we use a babel loader in webpack config
require('babel-register');

const Hapi = require('hapi');
const HapiReactViews = require('hapi-react-views');
const path = require('path');

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
var config = require('../config/variables');


// hapi webserver
const server = new Hapi.Server();

server.connection({
    host: config.server.host,
    port: config.server.port
});


// register our server plugins
var plugins = [
    { register: require('bell') },
    { register: require('inert') },
    { register: require('vision') }
];

// enable proxying requests to webpack dev server (proxy handler)
if (process.env.NODE_ENV === 'development') {
    var H2o2 = require('h2o2');
    plugins.push({ register: H2o2 });
}


// register
server.register(plugins, function (err) {
    endIfErr(err);

    // setup server side react views using Vision
    server.views({
        engines: { jsx: HapiReactViews },
        path: config.paths.serverViews
    });


    // serve all files from the assets directory
    // note: in production this also serves webpack bundles
    server.route({
        method: 'GET',
        path: config.publicPaths.assets + '{path*}',
        handler: {
            directory: {
                path: config.paths.assets,
                index: false,
                listing: false,
                showHidden: false
            }
        }
    });


    // serve white-listed files from the webRoot directory
    config.server.publicFiles.forEach(
        (filename) => {
            server.route({
                method: 'GET',
                path: '/' + filename,
                handler: {
                    file: {
                        path: path.join(config.paths.webRoot, filename)
                    }
                }
            });
        }
    );

    // catch-all
    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: (request, reply) => {
            reply('Hapi catch-all view for /' + encodeURIComponent(request.params.path));
        }
    });

    // app
    server.route({
        method: 'GET',
        path: '/',
        handler: {
            view: 'app' // app.jsx in /views
        }
    });

    // add the server routes
    server.route(require('./routes'));

    // DEV SETUP
    if (process.env.NODE_ENV === 'development') {

        // Proxy webpack assets requests to webpack-dev-server
        // Note: in development webpack bundles are served from memory, not filesystem
        server.route({
            method: 'GET',
            path: config.publicPaths.build + '{path*}', // this includes HMR patches, not just webpack bundle files
            handler: {
                proxy: {
                    host: config.server.host,
                    port: config.webpack.port,
                    passThrough: true
                }
            }
        });

        // Note: We also make requests to Webpack Dev Server EventSource endpoint (typically /__webpack_hmr).
        // We don't need to proxy these requests because we configured webpack-hot-middleware
        // to request them directly from a webpack dev server URL in webpack-config.js

    }

    server.start(function (err) {
        endIfErr(err);
        console.log('* listening at: ' + server.info.port);
    });

});

