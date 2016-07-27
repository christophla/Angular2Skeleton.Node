
module.exports = {
    salute: function (request, reply) {
        reply('Hello 22, ' + encodeURIComponent(request.params.name) + '!');
    }
};