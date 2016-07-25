const Path = require('path');
const Hapi = require('hapi');

console.log(' ');
console.log('*********************************************************');
console.log('* Skeleon Application                                   *');
console.log('*********************************************************');

// exception handling
process.on('uncaughtException', function(err) {
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

// hapi webserver
const server = new Hapi.Server({
    debug: {
        request: ['error']
    },
    connections: {
        routes: {
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

    server.start(function (err) {
        endIfErr(err);
        console.log('* listening at: ' + server.info.port);
    });

});
