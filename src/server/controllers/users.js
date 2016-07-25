
module.exports = {
    salute: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
};